---
title: 'Drawing Raindrops with CSS Gradients and Masks'
date: '2023-11-18'
tags: ['post', 'note', 'National Blog Posting Month', 'css']
intro: 'Day 18 of National Blog Posting Month #NaBloPoMo'
---

<figure>
  <img src="/rainy-gradient_900.webp" width="1600" height="900" srcset="/rainy-gradient_1800.webp 1800w, /rainy-gradient_1600.webp 1600w, /rainy-gradient_1200.webp 1200w, /rainy-gradient_900.webp 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="Blue raindrops on a light blue background">
</figure>

If you live in the UK like I do, you can’t escape the fact that it’s been a wet few months. Since today had been yet another rainy day, I was inspired to see if I could create a rainy background with CSS.

<aside>
<p>After I created this demo, I belatedly discovered that it didn’t work as expected in Chrome. It turns out `mask-size` and `mask-repeat` (which the demo relies on) aren’t supported right now. These demos are best viewed in Firefox or Safari.</p>
</aside>

I started of thinking I could get away with just using `background` properties. That enabled me to create the raindrop shape, but creating the highlights (which attempt to allude to reflections and refractions present in water droplets) was trickier. I decided to apply the raindrop shape as a mask, with the `mask-image` property. That mean the highlight (that I drew with `radial-gradient`) could bleed off the shape and wouldn’t be present in the background.

Using a mask meant I had to use a pseudo-element, as a mask on the `<body>` element won’t do anything. I’m using viewport units so that the raindrops will scale.

<p class="codepen" data-height="455" data-default-tab="result" data-slug-hash="RwvQNgx" data-user="michellebarker" style="height: 414px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/RwvQNgx">
  Rainy day gradient pattern (with viewport units)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I made a few more tweaks, cleaned up the code a little (with custom properties) and added a second pseudo-element, so the raindrops are staggered, which I think looks a lot better.

Here’s the result!

<p class="codepen" data-height="455" data-default-tab="result" data-slug-hash="MWLQwpJ" data-user="michellebarker" style="height: 455px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/MWLQwpJ">
  Staggered rainy day gradient pattern</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
