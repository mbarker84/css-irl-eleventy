---
title: 'Another Anchor Positioning Demo: Multiple Anchors'
date: '2024-06-12'
tags: ['post', 'demo', 'css', 'layout']
related:
  [
    {
      title: 'Anchor Positioning and the Popover API for a JS-Free Site Menu',
      url: '//anchor-positioning-and-the-popover-api',
    },
    {
      title: 'Progressively Enhanced Popover Toggletips',
      url: '/progressively-enhanced-popover-toggletips',
    },
  ]
---

Here’s a new demo where we’re positioning article references for a body of text relative to two different anchors for the block and inline axes. Each reference is positioned so that it aligns vertically with the position it’s referred to in the text, but appears adjacent to the main content wrapper on the horizontal axis.

The content area has its own anchor name:

```css
.content {
  anchor-name: --content;
}
```

We reference this anchor to alternately position our references to the left or right of the text using the `anchor()` function:

```css
.ref {
  position: absolute;
  inset-inline-start: anchor(--content right);

  &:nth-of-type(even) {
    inset-inline-end: anchor(--content left);
    inset-inline-start: auto;
  }
}
```

Additionally we’ll set a named anchor on each of the anchor links in our body of text, using the `href` attribute as a selector:

```css
[href='#ref_1'] {
  anchor-name: --anchor_1;
}

[href='#ref_2'] {
  anchor-name: --anchor_2;
}

/* etc. */
```

We then refer to these in order to position our references vertically. I’m using ID selectors, as there should only be one of each of these on the page:

```css
#ref_1 {
  inset-block-start: anchor(--anchor_1 top);
}

#ref_2 {
  inset-block-start: anchor(--anchor_2 top);
}
/* etc. */
```

This demo uses logical properties, but we could just as easily use physical properties (`top`, `right`, `bottom`, `left`) if we prefer:

```css
#ref_1 {
  top: anchor(--anchor_1 top);
}

#ref_2 {
  top: anchor(--anchor_2 top);
}
/* etc. */
```

Here’s the full demo (view in a supporting browser!):

<p class="codepen" data-height="440" data-default-tab="result" data-slug-hash="pomWryN" data-pen-title="Anchor positioning with multiple anchors" data-user="michellebarker" style="height: 440px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/pomWryN">
  Anchor positioning with multiple anchors</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<aside>This is a quick and dirty demo, and not ideal for viewing on mobile. Additionally, it’s only going to work in browsers that support anchor positioning, which right now is the latest versions of Chrome and Edge.</aside>

I’ll be speaking about CSS layout and anchor positioning at [Pixel Pioneers](https://pixelpioneers.co/events/bristol-2024) conference in Bristol, UK this Friday! There’s still time to grab a ticket!
