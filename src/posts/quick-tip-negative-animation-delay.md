---
title: 'Quick Tip: Negative Animation Delay'
date: '2022-07-28'
tags: ['post', 'css', 'animation', 'quick tip']
layout: post-alt.njk
headerColors: ['lemonchiffon', 'gold']
textColor: 'var(--black)'
---

Here’s a tiny CSS tip for making staggered animations feel waaaay more natural: Negative animation delay. I’ve seen this idea shared by master CSS animators [Jhey](https://twitter.com/jh3yy) and [Amit](https://twitter.com/amit_sheen) on separate occasions, and it’s such a neat little trick that it’s worth recording here!

Let’s say we have a group of elements, and we want them to animate in turn on a loop — such as this wavy text example. We’re calculating the `animation-delay` value them using a custom property corresponding to the element’s index.

```html
<h1>
  <span style="--i: 0">B</span>
  <span style="--i: 1">O</span>
  <span style="--i: 2">U</span>
  <span style="--i: 3">N</span>
  <span style="--i: 4">C</span>
  <span style="--i: 5">I</span>
  <span style="--i: 6">N</span>
  <span style="--i: 7">G</span>
</h1>
```

```css
span {
  --delay: calc(var(--i) * 200ms);
  animation: bounce 500ms var(--delay, 0) infinite;
}
```

Here I’m setting that in the HTML, but we could use [Splitting.js](https://splitting.js.org/), a library that handles assigning custom properties for us (which enables a whole lot of cool text effects and more — [I've written about it on this blog before](/variable-font-animation-with-css-and-splitting-js/)).

<aside>If you’re doing this kind of animation with text, which involves wrapping each letter in a <code>span</code>, you’ll need to consider <a href="how-to-accessibly-split-text">how to make sure it’s accessible</a>.</aside>

Here’s the demo with a regular, positive animation delay. You’ll notice that on the first iteration of the animation, each letter begins from a standing start.

<figure>
  <img src="/quick-tip-negative-animation-delay.webp" alt="The word “bouncing” animated letter by letter" width="758" height="383">
  <figcaption>With a positive delay, the looping animation begins with the first character. The last characters aren’t animated yet.</figcaption>
</figure>

Now, if we instead calculate a negative delay (using -200ms instead of 200ms), we’ll see the animation behave as if it’s already in progress — we won’t be waiting for the last element to finally animate once **all** the others have done so. Lovely!

```css
span {
  --delay: calc(var(--i) * -200ms);
  animation: bounce 500ms var(--delay, 0) infinite;
}
```

<figure>
  <img src="/quick-tip-negative-animation-delay-02.webp" alt="The word “bouncing” animated letter by letter" width="758" height="383">
  <figcaption>With a negative delay, all the characters are animating straight away.</figcaption>
</figure>

Try commenting out the `--stagger` custom property in this demo to see the difference.

<p class="codepen" data-height="483" data-default-tab="result" data-slug-hash="dymZMgo" data-user="michellebarker" style="height: 483px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/dymZMgo">
  Bouncing letters</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
