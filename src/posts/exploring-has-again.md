---
title: 'Exploring :has() Again'
date: '2023-04-16'
tags: ['post', 'layout', 'css']
---

It’s been a while since my last article on here (well, a month is a while for me, anyway 😅), as I’ve been busy with my head down preparing for my talk on modern CSS layout at [Beyond Tellerand](https://beyondtellerrand.com/events/dusseldorf-2023), which is (**checks notes**) tomorrow!

Although I haven’t had much time for blogging, it has given me a chance to delve once again into messaging about with CSS layout and the `:has()` pseudo-class, or “parent selector”. I’ve already written about `:has()` in a [previous post](https://css-irl.info/animated-grid-tracks-with-has/), and you can read an in-depth guide by Jen Simmons on [the Webkit blog](https://webkit.org/blog/13096/css-has-pseudo-class/). But to recap, `:has()` allows us to select a parent or sibling of an element by taking a relative selector list as its argument (to paraphrase [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)).

But what I’m realising as I continue to play around with `:has()` is that in practice, we can select **any** element in the DOM relative to another, as long as they share a common ancestor — which they should, right? As any element that we want to select is going to have the `<body>` as its ancestor. This makes it pretty powerful.

So here a couple of demos to that effect. (You’ll need to view these in a browser that supports `:has()`, e.g. Chrome or Safari.) In this one, hovering on a list item on the left animates our grid tracks on the right. They share a common wrapper element as their ancestor, but they don’t necessarily have to.

<p class="codepen" data-height="483.28997802734375" data-default-tab="result" data-slug-hash="vYzqaNO" data-user="michellebarker" style="height: 483.28997802734375px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/vYzqaNO">
  Animated grid tracks with :has()</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

In this second demo, we’re adding a background colour to the `<section>` element targeted by a link in another `<section>` on hover or click. This is perhaps a bit of a silly demo, but I can see some potential use cases, such as providing a visual clue for users as to the targeted section of a document.

<p class="codepen" data-height="475.6033020019531" data-default-tab="result" data-slug-hash="xxyVNOz" data-user="michellebarker" data-token="9fb466159ce1904301e96f319e7a42c6" style="height: 475.6033020019531px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/xxyVNOz/9fb466159ce1904301e96f319e7a42c6">
  Untitled</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Lastly, this demo (best viewed on desktop) opens a panel (using animated grid tracks) when the user clicks the link on the left. The link’s target is hidden within the collapsed panel. (It also combines container queries for the content on the right.) Hiding and revealing content is often something that should be done with JS, and there are likely some accessibility issues here — I’m not suggesting you should do anything like this in production. But it’s interesting to see the power of CSS today!

<p class="codepen" data-height="490.4861145019531" data-default-tab="result" data-slug-hash="XWPNqyP" data-user="michellebarker" style="height: 490.4861145019531px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/XWPNqyP">
  Animated grid tracks, :has() + container queries</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
