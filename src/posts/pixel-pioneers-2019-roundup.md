---
title: 'Pixel Pioneers 2019 Roundup'
date: '2019-06-10'
tags: ['post', 'events', 'css', 'animation', 'design', 'css grid']
---

Last week I attended [Pixel Pioneers](https://pixelpioneers.co), an annual conference in my local city of Bristol. It has fast become a firm date in my calendar, and this year didn’t disappoint. In fact, I’d go so far as to say it might be the best one yet.

Due to work commitments I didn’t get to see all the talks, but those that I did see were all exemplary, with lots to learn from each one. Here’s a brief roundup of some key topics and where they sit in today’s web landscape:

## Fix those UX bugs

A sweary (but enjoyable!) rant by [Craig Sullivan](https://twitter.com/OptimiseOrDie), the first talk, _The 15-Minute Model for Optimising Device Experiences_ took no prisoners. Craig shared some shocking crimes against UX, and his formula for preventing these. Clue – it involves testing on real devices! The key takeaway here was that neglecting testing can result in skewed metrics, frustrated customers, and potential loss of thousands (or even millions) of dollars, especially for big companies. Prioritise these UX bugs over and above fancy new features.

## Exciting things are coming for web animation

[Lis Linhart](https://lisilinhart.info/) gave an exceptional talk on web animation, complete with beautiful illustrated slides, and bespoke demos. She took elements from the Pixel Pioneers website to craft examples that really drove home some key points around timing and easing to make animations feel more natural, and showcased some very cool 3D techniques. We learnt about the relative performance impact of animating different CSS properties – transforms and opacity being more performant than, say, widths and margins. She explained how promoting elements to a new layer can improve the performance of animations.

Lis also showed some examples of how you might code more complex animations using the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (WAAPI). Unfortunately it’s not supported in any browsers yet, but it looks pretty exciting!

## Demystify flexbox layouts with dev tools

I was really excited to see [Hui-Jing Chen](https://www.chenhuijing.com)’s talk, _Using DevTools to Understand Modern CSS Layouts_, and it was worth the wait! She didn’t use any slides – the entire presentation consisted of inspecting flexbox layouts using Firefox’s developer tools. Firefox has a fantastic flexbox inspector, which allows you to see exactly how space is distributed inside your flex container, and the resolved sizes of the flex items. I thought I had a good idea of how flexbox works, but this talk gave me a much better understanding of how `flex-basis` (one of flexbox’s more mysterious properties!) actually behaves. Viewing this in the browser dev tools suddenly helped it make a lot more sense.

## Subgrid is coming

As a CSS layout geek, It’s always a treat seeing [Rachel Andrew]() talk about CSS Grid. There’s no one more knowledgable on the subject than Rachel! In this talk she delved into subgrid, a much-requested feature of the CSS Grid Level 2 specfication, which is now available in Firefox Nightly. She showed some use cases that explained really well why we need subgrid – and how current options, like `display: contents` don’t satisfy all the requirements (as well as leaving gaping holes in accessibility).

Rachel also emphasised how important it is for developers to experiment with, and write about, new CSS features when they aren’t widely supported yet. These experiments and discussions can really shape how the specification develops, and everyone can have a voice in this.

## Design for the many

In the last talk of the day, designer [Jon Tan](http://jontangerine.com/) delivered a powerful rallying cry that really resonated with the audience. Part love-letter to web standards, part call-to-arms, he advocated for a radical approach to design, one with inclusivity at it’s heart. Design for the many, and not the few.
