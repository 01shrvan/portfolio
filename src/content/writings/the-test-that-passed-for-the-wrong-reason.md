---
title: the test that passed for the wrong reason
tldr: "i wrote six concurrency tests. they all passed. then i deleted the lock they were supposed to be testing and they still passed. here's that, plus the other calls i made building doctask."
date: 2026-08-14
---

i built a thing called doctask for an engineering round. the repo is private but i can talk about what's in it.

it reads a pile of procurement documents. a purchase order, a supplier acknowledgement, an msa, a few amendments. they all describe the same deal and none of them agree. it works out where they disagree and writes that into one table, with a citation to the exact line each claim came from.

![the doctask pipeline, from watched folder and api through the langgraph stage machine to a human review gate and postgres](/writings/doctask-architecture.png)

fastapi serves the api and the ui. an mcp server exposes the same operations as tools. langgraph runs the stages and checkpoints them so a killed run resumes. postgres holds the register.

anyway. the part i actually want to write about is a test that lied to me.

## the lock i could delete

the register is shared state. multiple documents can land at once and each one rewrites part of it. so there's a lock around it, and i wrote six tests for that lock. sixteen threads hammering the same pile, that sort of thing.

all six passed.

then i deleted the lock and ran them again. they still passed.

six tests, all green, none of them able to detect the absence of the thing they existed to check.

## why they couldn't fail

cpython switches threads between bytecodes, not inside them. a read-then-write is more than one bytecode, so the race window is real, but it's tiny. the scheduler mostly doesn't land in it.

sixteen threads sounds like a lot. it isn't. they spend almost none of their time sitting in that two instruction gap. a test can pass a hundred times in a row and still be measuring nothing but scheduling luck.

![sixteen threads racing a read-then-write window, with and without the lock](/writings/doctask-race.png)

## the fix

the version that counts doesn't add more threads. it holds the read-then-write window open on purpose, so the scheduler has to make the choice that matters.

```
with the lock:     7 passed
without the lock:  FAILED — assert 16 == 1
```

sixteen copies of one document where there should be one. now deleting the lock breaks something.

i kept the other six. they check that the normal path doesn't deadlock under load, which is worth having. i just stopped calling them concurrency tests.

if you can't say what change would turn a test red, you don't know what it covers. deleting the code and re-running takes ten seconds.

## silence

comparing two documents has three outcomes, not two. they agree, they conflict, or one of them just doesn't mention it.

"the supplier accepted our liability cap" and "the supplier never mentioned liability" are not the same fact. a tool that reports them the same way is worse than no tool, because it looks like coverage over exactly the gaps that hurt you later.

so silence is its own verdict. no model gets consulted for it, it's decided structurally, and a test injects a judge that raises if it ever gets called. every row records what judged it. for silence that field is null, so "no model touched this" is queryable instead of being a claim in a readme.

the rule is a check constraint in the schema too. if the app is wrong the database still refuses.

## the second pile

a clause called "limitation of liability" and one called "maximum recoverable amount" are the same clause, so matching is semantic rather than string equality on headings.

to keep myself honest there are two test piles. pile a has conventional headings and is full of conflicts. pile b uses none of pile a's headings and is mostly agreements.

pile b exists because a system that always finds conflicts looks great on pile a and is useless.

## updates

new documents land in a watched folder. recomputing the whole register every time is fine for seven clause areas and terrible for seven hundred. so each arrival only recomputes what the new document touches. everything else is carried over as the same object and hashed to prove it.

```
revised acknowledgement, payment term changed  →  3 areas recomputed, 3 judge calls
the same bytes arriving again                  →  0 areas recomputed, 0 judge calls
```

counting calls beats timing them. "it was fast" is a vibe. "it made zero model calls" is something you can regress against.

if a new document contradicts something already committed it flags the conflict instead of quietly overwriting. the old value stands until a person approves the change.

## the documents are hostile

these come from counterparties. some of them are adversarial by definition.

the reviewer sees the source exactly as written, because they need to see what the supplier actually said. what a model reads goes through a wrapper. there's a test with an instruction buried inside a real clause rather than sitting at the end where it would be obvious.

the honest part: the denylist loses to paraphrase. it raises the cost and makes the attempt show up in logs, and that's it. claiming more would be the same mistake as collapsing silence into agree.

## limits

the offline judge is a keyword heuristic. it reports itself as `heuristic` so no verdict looks better than it is. it only compares the newest document per side, so merging a po with its amendments is the next thing.

that's all written down in the repo next to the code. a limitation you've stated is a known edge. one you've buried is a bug someone else finds.
