---
title: 'Reactivity in Vanilla Javascript'
date: '2023-09-22'
tags: ['note', 'post', 'javascript', 'workflow']
---

When we talk about the concept of reactivity in Javascript, we generally mean a variable in our code responding to an event or change in state somewhere else in our code. Perhaps we need a button to respond to a `'click'` event, or maybe we need to update the DOM in response to new data. [The Vue docs have a great explanation of reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html#what-is-reactivity).

This Frontend Masters article, [Patterns for Reactivity with Modern Javascript](https://frontendmasters.com/blog/vanilla-javascript-reactivity/) by Marc Grabanski recently caught my attention. I consider myself a reasonably proficient JS developer (it took a long time to feel that way!) and work with it daily, but I wasn’t familar with several of the patterns in this article. That’s partly because day-to-day I work with [Vue](https://vuejs.org/), and for building a large web app using a framework seemed like the obvious choice. But **should** it be? How hard would it be to build an app with these techniques in vanilla JS, which after all, are web standards and don’t carry the dependency overhead of a framework?

To my mind it would be **very** hard. JS frameworks largely exist to take away some of the pain of this kind of thing (while giving us a whole different kind of pain, LOL), and actually use these techniques under the hood. But that doesn’t mean we shouldn’t question our choices every now and then, and maybe JS frameworks shouldn’t be the first tool we reach for for small pieces of reactivity. Either way, it’s super useful to learn about these patterns.

[Read the article](https://frontendmasters.com/blog/vanilla-javascript-reactivity/)
