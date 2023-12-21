---
title: 'How Do You Vertically Centre an Element in CSS? (Even More) Easily!'
date: '2023-12-21'
tags: ['post', 'css', 'layout']
---

Rachel Andrew shared a [snippet of good news for CSS layout](https://rachelandrew.co.uk/archives/2023/12/19/align-content-in-block-layout/) on her blog the other day: it’ll soon be possible to vertically centre an element inside a parent **without** the parent needing to be a flex or grid container, using the `align-content` property.

Gone are the days when developers lamented they couldn’t center a `<div>` (hopefully), as we have a bunch of ways to do that, the shortest of which only require two properties set on the parent using Grid or flexbox:

```css
.parent {
  display: flex;
  align-items: center;
}

.parent {
  display: grid;
  align-items: center;
}
```

You can see the difference between the two in this demo.

<p class="codepen" data-height="437.234375" data-default-tab="result" data-slug-hash="zYbOjBz" data-user="michellebarker" style="height: 437.234375px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/zYbOjBz">
  Center align elements in flex and grid</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

When the child element is a flex item the resolved width will depend on the content, whereas `display: grid` will create a grid of one column spanning the available width, with the child element continuing to behave similarly to a block item and take up the entire width of the column (unless we’ve set an intrinsic width).

Using Grid, `align-content` will work just as well for a single item (although the effect will be different when you have several items in the grid):

```css
.parent {
  display: grid;
  align-content: center;
}
```

It won’t vertically centre a flex item though.

In addition, we can align an element both vertically **and** horizontally with `place-items` — shorthand for `justify-items` and `align-items`:

```css
.parent {
  display: grid;
  place-items: center;
}
```

It’s also possible to vertically align with `justify-content` in a flex layout if we switch the flex container to use the column direction rather than the row, but this requires one extra property:

```css
.parent {
  flex-direction: column;
  justify-content: center;
}
```

Once again, there’s a shorthand available to us with Grid if we want to combine `justify-content` and `align-content`:

```css
.parent {
  display: grid;
  place-content: center;
}
```

## Block layout

With the news Rachel shared, the parent items wouldn’t need to be a flex or Grid container, and could be any block element instead. We would only need the `align-content` property on the parent to centre its children:

```css
.parent {
  align-content: center;
}
```

I assume the resulting behaviour would be similar to using `align-content` with Grid rather than flexbox.

As Rachel pointed out, this has actually been part of the spec for some time (although I certainly wasn’t aware of it!). It’s apparently in Chrome Canary (but not working for me at the time of writing!) and planned for general release in Chrome 122.

## Testing for browser support

One thing that concerns me, is that this seems to fall into that tricky area where it becomes impossible to test for browser support and provide fallbacks using a feature query — much like `gap` when it was implemented for flexbox. As `align-content` is well-supported for Grid and flexbox, the feature query doesn’t help us here.

```css
@supports (align-content: center) {
  /* This will resolve true for any browsers supporting the property in grid or flexbox */
}
```

It would be great to see some improvements to how feature queries can handle these sorts of situations.
