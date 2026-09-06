---
title: packdaddy
description: "zero-dependency CLI that finds unused, outdated, vulnerable, and heavy packages across npm, pnpm, yarn, and bun. published on npm. audit any project in one command."
role: tooling lead
href: https://packdaddy.vercel.app/
repo: https://github.com/01shrvan/packdaddy
date: 2026-05-09
featured: true
order: 4
stack: [Node.js, CLI, npm, pnpm, yarn, bun]
verify:
  - command: "npx packdaddy"
  - command: "npx packdaddy --all"
  - command: "npx packdaddy --fix"
  - command: "pnpm dlx packdaddy"
numbers:
  - label: package managers
    value: "4"
    note: "npm, pnpm, yarn, bun"
  - label: dependencies
    value: "0"
  - label: install step
    value: "none"
    note: "runs through npx"
---

it runs against a project you already have rather than a demo repo, which is the only
honest way to test a dependency auditor. point it at something real and it will tell you
what is unused, what is behind, what has an advisory against it, and what is simply heavy.
