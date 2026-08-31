---
title: 146 out of 146 and still broken
tldr: "i wrote an http/2 server in rust with no dependencies and got a perfect score on h2spec, the conformance suite. then i pointed a real client at it and it refused to connect. this is the bug the suite couldn't see, and the second one my own fix introduced."
date: 2026-08-31
---

i spent a couple of days writing an http/2 server in rust. from raw tcp sockets, no h2 crate, no hyper, no hpack library. zero dependencies, all of it, framing and huffman coding and the dynamic table included.

the reason i picked a protocol and not another crud app is that i didnt want to be the one deciding whether it worked. h2spec already exists. its 146 cases written by people who actually read rfc 7540, and it prints a number you dont get to argue with. every other project in this folder i scoped myself and then graded myself, which is not the same thing as being right.

first run: 41 passed, 104 failed, 209 seconds. most of that time was the suite waiting on responses that never came.

then hpack and streams landed and it went to 136. then flow control and it hit 146 out of 146, and the whole run dropped to 12 seconds because nothing was timing out anymore.

so, done.

## except a real client wouldnt connect

i wrote a small node script to poke at it, just to watch one request go end to end. node's http2 client, about ten lines. it printed:

```
connection error: Protocol error
```

146 out of 146 and an actual client wont open a session with it.

rfc 7540 section 6.5.2 says a server must not send SETTINGS_ENABLE_PUSH set to 1. clients are allowed to, servers arent. my settings encoder was helpfully emitting every field it knew about, that one included, and node was correctly hanging up on me.

h2spec never caught it, and thats not a flaw in h2spec. it grades how a server *answers*. it sends you a malformed frame and checks you reject it with the right error code. it doesnt audit what you volunteer unprompted, because thats not what a conformance suite is.

one line to fix. the part i want to keep is that a perfect score on someone else's suite and a working server are two separate claims, and for about an hour i had them confused.

## then the fix broke the score

after that i went at speed. every frame was doing a `write_all` followed by a `flush`, with TCP_NODELAY on, so one response cost four syscalls and went out as two separate tcp segments. node batches. i wasnt.

buffering the frames and flushing once per read cycle took it from around 8,800 requests a second to 11,800, and roughly halved p99.

then h2spec went from 146 to 145.

the case that broke: the client overflows the connection flow control window and expects a GOAWAY frame with FLOW_CONTROL_ERROR. it got "connection closed" instead. which was confusing, because the goaway was in my buffer, i flushed it, and i could see the bytes leave.

what actually happens is this. if you close a tcp socket while unread data is still sitting in your receive queue, the stack sends an RST rather than a FIN. and on an RST the peer is entitled to bin whatever it had buffered from you, the goaway included. before buffering, the frames went out early enough that it never came up. after, the timing shifted and it did.

fix was shutting down the write side properly and draining the socket before dropping it. back to 146.

i like this one because the bug wasnt really in my code. it was in what i assumed `close()` meant. the write succeeded, it just didnt arrive.

## the benchmark that flattered node

last one, and this is the one i nearly got wrong in public.

i benchmarked weft against node's built-in http2 server. identical response, same load, same machine. first numbers said node was 2.8x faster.

then i ran two load generator processes instead of one, and weft went from 11,800 to 16,978 requests a second. the client was saturating before the server was. my measurement was capping the thing it was measuring.

run properly:

```
weft          16,978 rps   p99 38.5 ms
node http2    30,461 rps   p99 13.5 ms
```

so 1.8x, not 2.8x. if i hadnt checked i would have published a number that made node look 55% better than it actually is, and nobody would ever have told me.

worth being clear about what node is here though. node's http2 isnt javascript, its nghttp2, a c library with about a decade of work behind it. a first rust program landing inside 2x of that is fine by me. the p99 gap is the real thing to chase and its almost certainly allocation, im building a fresh vec for every frame in both directions.

## the table i didnt type

small thing, but it saved me. huffman coding in hpack is 257 codes listed in appendix b of rfc 7541. typing those out by hand is exactly how you end up with a bug you cannot find, because it only shows up on one byte value nobody tests.

so i downloaded the rfc as plain text, parsed the table out of it, and generated the rust from that. the sanity check was that symbol 48 came out as 0x0 in 5 bits and EOS as 0x3fffffff in 30 bits, which is what the spec says they are. all three of the appendix c vectors matched byte for byte on the first run.

thats the whole thing. 146 out of 146, 39 unit tests, and two bugs a green suite had nothing to say about. repo's at [github.com/01shrvan/weft](https://github.com/01shrvan/weft) if you want to run h2spec at it yourself.
