---
title: 'Preventing Scroll “Bounce” with CSS'
date: '2023-11-25'
tags: ['post', 'quick tip', 'National Blog Posting Month', 'css', 'layout']
intro: 'Day 25 of National Blog Posting Month #NaBloPoMo'
---

When you scroll rapidly to the top or bottom of a webpage you might notice a “bounce” effect, where the browser momentarily allows you to scroll beyond the uppermost or lowermost point, before bouncing you to correct position.

A typical layout pattern I’ve built a few times uses grid to position a sidebar menu next to a scrollable content area. I use `position: sticky` so that the menu stays in view, while the main content area scrolls. Using `position: sticky` is handy for this, as it means the sidebar width can still be determined by the content, unlike with `position: fixed`.

Unfortunately this can result in an undesirable effect in some browsers when the user scrolls to the bottom — particularly if the sidebar has a different coloured background to the rest of the page, as the user will see a brief flash of the colour below below.

There’s a simple way to prevent this with css, using the `overscroll-behavior` property on the document root:

```css
:root {
  overscroll-behavior: none;
}
```

By setting the value to `none`, the browser will no longer scroll beyond the top (or bottom) of the page, and your sidebar will remain fixed in place.

<p class="codepen" data-height="452" data-default-tab="result" data-slug-hash="vYbrpbX" data-user="michellebarker" style="height: 452px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/vYbrpbX">
  overscroll-behaviour</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
