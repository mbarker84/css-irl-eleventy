---
title: 'Scroll Timeline Parallax Effect'
date: '2023-11-21'
tags: ['post', 'demo', 'National Blog Posting Month', 'css', 'animation']
intro: 'Day 21 of National Blog Posting Month #NaBloPoMo'
---

I’ve been playing around with [scroll-driven animations](https://drafts.csswg.org/scroll-animations-1) a bit lately. Scroll timelines allow us to link the progress of element’s animation to the progress of a scroll container, as I wrote about not long ago for [MDN](https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/).

It’s remarkably easy to link an animation to the root scroller (which in most cases, is probably where it’s going to be most useful). This demo uses the `animation-timeline` property to create a parallax effect. We’re creating an anonymous scroll timeline linked to a keyframe animation. The animation translates an element on the _y_ axis, using a custom property value. We’re using three elements positioned on top of each other as the background, foreground and middle ground layers. For each one all we have to do is adjust the custom property to change the amount that each layer moves, thereby changing whether they appear nearer or further away relative to the user. Pretty cool!

This demo will only work in Chromium for the moment.

<p class="codepen" data-height="463.859375" data-default-tab="result" data-slug-hash="WNPzXew" data-user="michellebarker" style="height: 463.859375px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/WNPzXew">
  Multi-layer parallax effect scroll timeline</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
