---
title: 'Resizing with CSS'
date: '2023-02-17'
tags: ['post', 'css', 'layout']
---

In case you missed it, [container queries landed in all stable browsers](https://web.dev/cq-stable/) this week! It’s a pretty exciting time to be working with CSS, seeing this long-awaited feature finally become useable.

Una’s post on [web.dev](https://web.dev/cq-stable/) includes a rundown of how to use container queries, as well as some nifty demos. By coincidence, I’ve also been editing a soon-to-be-published article by [Stephanie](https://thinkdobecreate.com/) on container queries, which also includes some rather lovely demos. Something I’ve noticed about both sets of demos is that they make use of the `resize` CSS property to create a resizeable area within the document, rather than relying on the user having to resize their entire viewport to see the container queries in action.

<p class="codepen" data-height="560" data-default-tab="result" data-slug-hash="ZEMzNGj" data-user="web-dot-dev" style="height: 560px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/web-dot-dev/pen/ZEMzNGj">
  Untitled</a> by web.dev (<a href="https://codepen.io/web-dot-dev">@web-dot-dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I was vaguely aware of the `resize` property, but I hadn’t really thought about any use case for it before, so it kind of passed me by. But it seems perfect for this! I’ll definitely keep it in mind for future demos. You can select which direction to apply the resizing: `horizontal`, `vertical` or `both`, as well as logical properties `inline` and `block`, with `none` as the default.

```css
/* Makes the element horizontally resizeable */
div {
  resize: horizontal;
}
```

The element must be a scroll container, meaning that it must have its `overflow` property value set to `scroll` or `auto` in order for `resize` to have any effect.

## Use cases

Besides these container query demos, I guess another scenario where it might be handy is if you have a floating toolbar or some user controls, and you want the user to be able to move these around the page and position them however they want. Another possible use case could be a long list of options in a scrollable container: the user could resize the element vertically to see more of the options and reduce the amount the need to scroll.

<p class="codepen" data-height="497" data-default-tab="result" data-slug-hash="QWVbzMX" data-user="michellebarker" style="height: 497px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/QWVbzMX">
  Untitled</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

A kind of cool thing here is that we can set a `max-height` too, permitted the user to resize only up to a point if we so choose.

`resize` also respects flex and grid layouts. In this demo the user is permitted to resize the navigation column and the main content area will adapt, as we’re using `1fr` for the grid column on the right, which causes it to fill the available space.

<p class="codepen" data-height="423" data-default-tab="result" data-slug-hash="eYLNepQ" data-user="michellebarker" style="height: 423px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/eYLNepQ">
  Resize</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Limitations

One drawback is the resize control is only positioned in the bottom right corner of the element, and it’s not possible to style it. It would be nice to have this customiseable ability, and increase the area of the resize control. In the menu example it would be better if the user could grab **any** part of the right hand edge, for example.

In any case, `resize` will feature much more highly on my radar from now on.

- [Read about it on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/resize)
- [Read the spec](https://w3c.github.io/csswg-drafts/css-ui/#resize)
