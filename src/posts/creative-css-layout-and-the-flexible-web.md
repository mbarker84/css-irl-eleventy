---
title: 'Creative CSS Layout (and the Flexible Web)'
date: '2022-08-31'
tags: ['post', 'events', 'css', 'layout', 'video']
---

Hi friends! Way back in June (which already feels like such a long time ago in CSS land!) I had the pleasure of speaking about CSS layout at [CSS Day conference](https://cssday.nl/2022). I’m pleased to say the video has now been published! Take a look to learn about a whole bunch of modern CSS layout techniques, with a few little tricks thrown in.

https://www.youtube.com/embed/tueTFd2TQUA

I attempted to pack a lot into this talk, but what I tried to emphasise is that many of the new CSS features we have at our disposal help (and even encourage) us to embrace the flexible web of the present day. One where we can’t possibly predict what kind of devices our user is browsing our website on, but where we can ensure our layouts are robust across **all** devices, by eschewing pixel-perfection in favour of something more intrinsic to the web. **Material honesty**, as [Jeremy talked about](https://www.youtube.com/watch?v=CdZZcbZG83o). Diversity is the web’s strength, not its limitation.

## Container queries are here!

Speaking of CSS layout, [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) have finally landed in the latest (stable) version of Chrome! Miriam Suzanne has a great [write-up covering the syntax](https://www.oddbird.net/2022/08/18/cq-syntax/).

There’s also a [polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) by the Chrome team, so you can use it now!

## :has() too!

As if that wasn’t enough exciting CSS layout news, both Chrome and Safari have shipped support for `:has()`, AKA “the parent selector”! Jen Simmons [has the lowdown here](https://webkit.org/blog/13096/css-has-pseudo-class/), and Una Kravets covers both features for the [Chrome Developer Blog](https://developer.chrome.com/blog/has-with-cq-m105/).

## On flexibility

Somewhat related to the flexibility of the web, I enjoyed reading a recent blog post exchange between [Dave Rupert](https://twitter.com/davatron5000) and [Matthias Ott](https://twitter.com/m_ott). Dave laments the increasingly wild range of jobs thrust onto the shoulders of front end developers. They both talk about “bridge” roles, and Matthias points out that an evolution in design thinking is needed now more than ever, when we take into account all the flexibility that CSS now provides us with (see above!).

I love to see these conversations play out, even if it may be some time before we agree on the solutions.

- [The Web is a Harsh Manager](https://daverupert.com/2022/08/web-is-a-harsh-manager/) by Dave
- [Better Bridges](https://matthiasott.com/notes/better-bridges) by Matthias

## Smashing Conference Freiburg 2022

Want to learn all about the latest and greatest CSS layout features? Come along to [Smashing Conference](https://smashingconf.com/freiburg-2022) in Freiburg, 5–7 September! We’ll explore container queries and much more, live on stage!
