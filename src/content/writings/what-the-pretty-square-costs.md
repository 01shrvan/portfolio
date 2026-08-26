---
title: what the pretty square costs
tldr: "i rebuilt this site on astro so it would ship almost no javascript. then i measured it. one decorative 92px square pulls 217 KB of react, while the theme toggle, the live clock and the rotating quote together cost 9.6 KB. here is the measurement, and why i am keeping it anyway."
date: 2026-08-19
---

i rebuilt this site on astro. the pitch for astro is that it ships no javascript unless you ask for it, and everything is static html by default. that's the whole reason i moved.

then i actually measured what it ships. worth doing, because i was wrong about my own site.

## the numbers

there's one react component on the homepage. it's the small square next to my name, labelled fig. 1. it renders a dithering shader, it's about 92 pixels across, and it does nothing except look good.

here's what it drags in:

```
client.js    179.8 KB raw    55.8 KB gzip     react runtime
Figure.js     29.9 KB raw     9.4 KB gzip     the shader itself
react.js       7.9 KB raw     3.0 KB gzip     astro's react glue
                                        
total        217.5 KB raw    68.3 KB gzip
```

now the three things on that page that actually do something. the theme toggle, the clock that ticks every second, and the quote that changes each day. all three are plain inline script tags.

```
6 inline blocks, 9,655 bytes
```

9.6 KB, uncompressed, for everything functional. 217 KB for one square.

put differently: the decoration costs about 22x what the features cost. i did not know that until i ran the numbers, and i'd been telling myself the site was "basically static".

## why it happens

astro's islands work exactly as advertised. the square is marked `client:visible`, so nothing loads until it scrolls into view, and no other page pays for it.

but "one small component" and "one small download" aren't the same thing. the component is small. the runtime underneath it is not, and you pay the runtime the moment you use react even once. there's no partial react.

the html is 66 KB, 19 KB gzipped, and it contains everything you can read. the javascript is three times that and contains a decoration.

## the honest part

i knew there was a cheaper way, because i'd already built it.

earlier in the rebuild the square was a plain canvas halftone renderer. 170 lines, no dependencies, drawn with a bayer matrix and an image buffer. it looked good. i replaced it with the shader library because the shader looked slightly better and i wanted to use it.

that's the real decision, stated plainly. i traded 217 KB for a slightly nicer square. i just never checked the price at the time.

three ways out:

- go back to the canvas version. loses a little visual quality, saves the whole react runtime
- keep the shader but bake the plate to a png. a couple of KB, and most people would never know
- keep it exactly as is, and stop calling the site lightweight

i'm keeping it, for now. it loads on `client:visible` so it costs nothing until you scroll to it, no other page pays for it, and 68 KB gzipped isn't going to hurt anyone on a normal connection.

but i'm keeping it as a choice rather than an accident, which is the part that changed.

## the thing worth taking away

pick a framework for a reason, then check whether you actually got the thing you picked it for.

i moved to astro to ship less javascript. astro did its job. i then handed the savings straight back to a decoration, and because the framework was the "correct" one i never thought to look.

`find dist -name "*.js"` takes two seconds. run it on your own site. you might be surprised what's in there, and what it's for.
