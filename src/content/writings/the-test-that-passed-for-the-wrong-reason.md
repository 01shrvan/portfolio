---
title: the test that passed for the wrong reason
tldr: "i wrote six concurrency tests for an agentic document system. they all passed. then i deleted the lock they were supposed to be testing and re-ran them — and they still passed. this is what i learned about writing tests that can actually fail, and the other calls i made building doctask."
date: 2026-08-14
---

i built a thing called doctask for an engineering round. the repo is private for now, but the interesting parts are the decisions, not the code, so here they are.

the short version: it takes a pile of related procurement documents — a purchase order, a supplier acknowledgement, an MSA, some amendments, invoices — and works out where they disagree. every document describes the same commercial reality and none of them quite agree, and nobody reads all of it until something goes wrong.

what it produces is a contract position register. one row per clause area — warranty, liability, delivery, payment, governing law — recording what each side says, a verdict, and a citation to the exact place in the source it came from.

![the doctask pipeline, from watched folder and API through the langgraph stage machine to a human review gate and postgres](/writings/doctask-architecture.png)

fastapi serves the rest surface and the built ui from the same process. an mcp server exposes the same operations as tools. both call the same service methods, so neither surface has a privileged path. langgraph runs the stage machine and checkpoints it, so a killed run resumes. postgres with pgvector holds the register and its revision history.

but the part i actually want to write about is a test that lied to me.

## six passing tests and a lock i could delete

the register is shared state. multiple documents can land at once, and each one recomputes some subset of clause areas. so there's a lock around the read-then-write window, and i wrote six tests to prove it works. sixteen threads racing at the same pile, that kind of thing.

all six passed. good.

then, mostly out of paranoia, i deleted the lock and ran them again.

they still passed.

that is a genuinely bad feeling. six tests, all green, all of them incapable of detecting the absence of the thing they existed to check. if i'd shipped that and someone later refactored the lock away, nothing would have caught it. the tests were decoration.

## why they couldn't fail

cpython's GIL switches between bytecodes, not inside them. a read-then-write in python is more than one bytecode, so the window where a race can actually happen is real — but it's *narrow*, and the interpreter usually doesn't choose to switch inside it.

sixteen threads sounds like a lot. it isn't. it's sixteen threads that each spend most of their time doing something other than sitting in that specific two-instruction gap. the odds of the scheduler landing inside the window on any given run are low enough that a test can pass a hundred times in a row and still be worthless.

so "i ran it with lots of threads and it didn't break" is not evidence of anything. it's a test that measures the interpreter's scheduling luck.

![sixteen threads racing a read-then-write window, with and without the lock](/writings/doctask-race.png)

## the fix: widen the window on purpose

the version that counts doesn't add more threads. it reaches into the exact read-then-write window and holds it open — a deliberate yield at the point where the race actually lives, so the scheduler *has* to make the choice that matters.

that test behaves like a test should:

```
WITH the lock:     7 passed
WITHOUT the lock:  FAILED — assert 16 == 1
```

sixteen copies of one document, and without the lock you get sixteen where you should have one. now removing the lock breaks something. that's the whole bar.

i kept the other six. they check a weaker and different claim — that the happy path doesn't deadlock or corrupt under ordinary load — and that's worth having. i just stopped pretending they were the ones holding the lock to account.

the general lesson, which i keep relearning: **a test that has never failed hasn't been tested.** if you can't state the change that would make it go red, you don't know what it covers. deleting the implementation and re-running is about ten seconds of work and it's the only way to find out.

## silence is a verdict, and a model never decides it

the other decision i'd defend hardest.

when you compare two documents, there are three outcomes, not two. they can agree. they can conflict. or one of them can simply not mention the topic at all.

"the supplier accepted our liability cap" and "the supplier never mentioned liability" are completely different facts with completely different consequences, and a tool that reports them the same way is worse than no tool — it manufactures a false sense of coverage over exactly the gaps that hurt you later.

so `silence` is a first-class verdict and never collapses into `agree`. two things enforce it:

- when one side is absent, no model is consulted at all. it's decided structurally. a test injects a judge that **raises on contact** to prove that branch is unreachable.
- every verdict records `judged_by`. for silence it's `null` — so "no model was involved in this" is a queryable fact, not a claim in a readme.

and the rule is a `CHECK` constraint in the schema, not only in application code. if the app is wrong, the database still refuses.

## matching by substance, not by heading

a clause titled "limitation of liability" and one titled "maximum recoverable amount" are the same clause. so matching is semantic, not string equality on headings.

the way i kept myself honest about this: two test piles. pile a uses conventional headings and is full of conflicts. pile b uses **none** of pile a's headings — liability shows up as "liability ceiling", delivery as "mobilisation and site access", governing law as "forum for disputes" — and is mostly agreements.

pile b exists because a system that always finds conflicts would look fantastic on pile a and be completely useless. if your demo data only contains the answer you want, you've built a demo, not a system.

## an update should cost like an update

new documents land in a watched folder. the naive thing is to recompute the whole register every time, which is fine for seven clause areas and awful for seven hundred.

so each arrival recomputes only the areas the new source touches. everything else is carried across as the *identical object*, and its content hash is compared before and after. recomputations and model calls are counted, not asserted:

```
revised acknowledgement, payment term changed  →  3 areas recomputed, 3 judge calls
the same bytes arriving again                  →  0 areas recomputed, 0 judge calls
```

counting the calls matters more than it sounds. "it was fast" is a vibe. "it made zero model calls" is a fact you can regress against.

and when a new source contradicts something already committed, it surfaces the conflict rather than quietly resolving it. the old value stands until a person approves the revision. the system doesn't get to overwrite a human decision because new paper showed up.

## the documents are not allowed to give orders

these are documents from counterparties. some of them are adversarial by definition.

so the reviewer sees the source verbatim — citations have to be exact, because the buyer needs to see what the supplier actually wrote — but what a model reads goes through a wrapper that quarantines it. there's a test with an instruction welded into the middle of a real clause, not sitting in an obvious block at the end, because that's what an actual attempt would look like.

i'll say the honest part too: **the denylist is defeatable by paraphrase.** it raises the cost of the attack and makes the attempt visible in the logs. it is not proof of safety, and writing it down as though it were would be the same failure as the silence collapse — reporting more confidence than i have.

## what i'd tell past me

three things.

**delete the implementation and re-run the test.** if it still passes, you wrote a test for something else. this took ten seconds and saved me from shipping six green lies.

**count things instead of timing them.** call counts and object identity (`is`, not `==`) are assertions that survive refactors and slow CI machines. durations are not.

**write the limitations down while you still remember them.** the denylist being defeatable, the offline judge being a keyword heuristic that reports itself as `heuristic`, only comparing the newest document per side — all of that went into the repo in a file next to the code. a limitation you've stated is a known edge. one you've buried is a bug someone else finds.

the register survives a process restart, the tests run on a fresh clone with no api key and no docker, and the whole thing starts with one command. but the bit i'd actually want to be asked about in an interview is the lock i deleted on purpose.
