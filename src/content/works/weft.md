---
title: weft
description: "an http/2 server in rust, written from raw tcp sockets. no h2 crate, no hyper, no hpack library, zero dependencies. passes all 146 cases of h2spec, a conformance suite i had no hand in writing. node's http2 is still 1.8x faster and that number is in the readme."
role: wrote it from the socket up
href: https://github.com/01shrvan/weft
writeup: /writings/146-out-of-146-and-still-broken
date: 2026-08-31
featured: true
order: 1
stack: [Rust, HTTP/2, HPACK, TCP]
verify:
  - command: "cargo run --release -- 127.0.0.1:8080"
    result: "weft listening on 127.0.0.1:8080 (h2c, prior knowledge)"
  - command: "h2spec -h 127.0.0.1 -p 8080"
    result: "146 tests, 146 passed, 0 skipped, 0 failed"
  - command: "cargo test"
    result: "39 passed"
numbers:
  - label: h2spec
    value: "146 / 146"
    note: "0 failed, 0 skipped"
  - label: tests
    value: "39 passed"
  - label: dependencies
    value: "0"
  - label: throughput
    value: "16,978 rps"
    note: "p99 38.5 ms"
counter:
  claim: "node's http2 does 30,461 rps to weft's 16,978. it is 1.79x faster, and its p99 is 13.5 ms against 38.5."
  detail: "node's http2 is nghttp2 underneath, which is C, not javascript. i am comparing my first http/2 implementation against a mature one and losing. buffering the write path took weft from 8,800 to 11,800 rps on a single client and halved p99, so there is more left in it, but the gap is real and it is in the readme."
---

both servers return an identical response over h2c on loopback, 200 with a `text/plain`
5-byte body. same client for both, 4 connections at 25 concurrent streams, 2s warmup and
8s measured, run as two client processes because one saturates before either server does.

the parts that were actually hard were not the frame codec. they were the streaming
decoder handling frames split across tcp reads, hpack's dynamic table with eviction and
huffman coding generated from the rfc appendix, and connection plus per-stream flow
control with window adjustment on settings change.
