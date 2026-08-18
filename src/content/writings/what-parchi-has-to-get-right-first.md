---
title: what parchi has to get right first
tldr: "parchi is a medical records organiser i'm building. the waitlist is open and nothing has shipped. two problems decide whether it's worth finishing at all. reading the page correctly, and being able to prove a deletion. here's where both stand."
date: 2026-08-18
---

parchi is the word people already use for the slip a doctor hands you. families under long treatment end up with a folder of several hundred of them. prescriptions, bills, lab reports, discharge summaries.

that folder is write only. things go in, nothing useful comes out. nobody can tell you how a number moved over two years without sitting down with the whole stack.

so: photograph the folder, get back something you can search, with the page each answer came from attached. waitlist is at [parchi.shrvan.xyz](https://parchi.shrvan.xyz). the product itself isn't built. i want to write down the two things that have to be true first, because if either one fails the rest doesn't matter.

## reading the page

this sounds like the boring part. it's the whole product.

general assistants are bad at this today, and not only on 200 page discharge bundles. two page lab reports break them too. the failures i keep hitting:

- scanned pdfs that are just images, no text layer at all
- a text layer that exists but comes out in the wrong order, so a two column lab table interleaves into nonsense
- tables flattened until a value loses its row, its unit and its reference range
- long documents quietly truncated part way through
- text that reads perfectly and isn't what the page says

the last one is the dangerous one. a paper folder is unhelpful, but it doesn't state a wrong haemoglobin with confidence. if parchi does that once it's worse than the folder.

so the bar i'm holding is narrower than "the extraction looks good". every value has to carry the region of the page it was read from. if a number can't be pointed back at a rectangle on a source image, it doesn't get stored. not flagged, not shown with a warning. rejected.

that's a structural rule rather than a prompt instruction, and it disqualifies most of the convenient tooling, because plenty of it returns text without coordinates. i'd rather find that out before getting attached to something than after.

the same goes for page counts. pages in has to equal pages processed, checked by a test. a document that half processed and looked fine is a correctness bug.

none of this is settled. text layer extractors, ocr engines, and vision models all handle a different slice of it, and i don't yet know whether one covers native pdfs, scans and phone photos or whether it takes a router across three. that gets decided by running them against real indian lab layouts, which i'm still assembling and labelling.

## deleting the data

health records are the most sensitive thing most people own, and the fear is specific. an insurer seeing one bad number from four years ago and pricing it in forever.

"never sold, never trained on, delete whenever you want" is what everyone says, including everyone who later sold the data. and deletion is usually a boolean in a row somewhere. you cannot check it from the outside, and the promise belongs to whoever owns the company in five years, not to me.

what i'm building toward instead: each record gets its own encryption key, and deleting the record destroys the key. backups then hold ciphertext that nobody can open, me included. that's a mechanism rather than a policy, which is the only kind of promise that survives a change of management.

the other half is who the customer is. brokerage happens wherever there's a hole in the revenue, so there's one payer, and it's the person holding the folder. no free tier paid for by reading the data. and export is free, complete, and in an open format, because a promise is worth what it costs to walk away from it.

the honest limits, since a page that only lists the good parts isn't worth reading: a document is legible for the seconds it takes to extract it at upload, and a court order is still a court order. anybody claiming otherwise is selling something.

## where it actually is

the landing page is up and taking signups. that's it.

no extraction numbers yet, because the labelled set they'd be measured against is still being built, and quoting accuracy before that exists would be theatre. i also haven't talked to enough people who aren't me. one founder's observation and a folder from my own family is not research, and it's the gap i'm least comfortable with.

what i'm fairly sure of is the order. reading the page correctly comes before every feature, and being able to prove a deletion comes before asking anyone to put their family's medical history somewhere. neither is glamorous and both are the reason to do it at all.

if you're the one in your family who holds the folder, the waitlist is the useful place to tell me so.
