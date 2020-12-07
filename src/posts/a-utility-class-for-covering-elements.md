---
title: 'A Utility Class for Covering Elements'
date: '2020-12-06'
tags: ['post', 'css']
---

<figure>
  <img src="/a-utility-class-for-covering-elements-01.jpg" alt="A diagonally striped square overlaid on a purple one">
</figure>

Here’s something I find myself needing to do again and again in CSS: completely covering one element with another. It’s the same CSS every time: the first element (the one that needs to be covered) has `position: relative` applied to it. The second has `position: absolute` and is positioned so that all four sides align to the edges of the first element. The full CSS looks like this:

```css
.original-element {
  position: relative;
}

.covering-element {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

(We only need `display: block` if it’s not a block-level element that we’re covering it with.)

Often it’s a heading or caption that needs to cover an image, sometimes with a translucent background colour or gradient. (I’d refer to this as an overlay.) Usually it’s a direct child of the first element which is being overlaid, but not always. Sometimes I want to overlay a pseudo element, maybe even transition or animate it for a hover state. Either way, I do it so often that it makes sense to create a utility class that covers it, rather than writing out the CSS properties longhand every time.

## Utility classes

Utility classes are single-purpose classes that can be applied to any element in our web application code. They usually (but not always) consist of a single CSS property and value. There are whole frameworks, like the increasingly-popular [Tailwind CSS](https://tailwindcss.com/), that encourage a utility-first CSS methodology, where virtually all your CSS consists of applying utility classes. Even for those who have no wish to adopt such an extreme approach, many web projects include a sprinkling of utility classes to help things along.

As a utility class for our overlaid element would include several properties, it’s more verbose than most. Nevertheless, it does the job.

We can create a utility we’ll call `.overlay` to cover an element:

```css
.overlay {
  position: absolute;
  content: '';
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

While very flexible as a utility, using `position: absolute` sets the element’s position in relation to the nearest relative-position ancestor, so we need to remember to set `position: relative` on the element we want to cover (and ensure it’s an ancestor of the covering element).

In most cases the element I want to use as an overlay is a direct child, or a pseudo-element, so it might make sense to create further utilities to apply in those cases, which mean we don’t additionally need to set `position: relative`. Any of these three classes could instead be applied to the parent – that is, the original element that we want to cover.

```css
.overlay-child,
.overlay-before,
.overlay-after {
  position: relative;
}

.overlay-child > *,
.overlay-before::before,
.overlay-after::after {
  position: absolute;
  content: '';
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

For the pseudo-elements we need the extra property `content` (in this case with a value of an empty string).

We now have three utilities – `overlay-child` (to position a direct child element), `overlay-before` (to position a `::before` pseudo-element) and `overlay-after` (to position a `::after` pseudo-element), in addition to `overlay`, which would apply when we want to target the element doing the covering. An example of when you might use `overlay` instead of one of the parent-targeting classes is if the covering element is not a direct child but a descendent further down the DOM tree.

<p class="codepen" data-height="460" data-theme-id="dark" data-default-tab="css,result" data-user="michellebarker" data-slug-hash="KKgzJQy" style="height: 460px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Overlay utility classes">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/KKgzJQy">
  Overlay utility classes</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Tip: Getting the nearest positioned parent with JavaScript

While we’re on the subject, when we’re dealing with complex components and absolute positioning, a rogue `position: relative` can sometimes be a cause of layout bugs. To debug, we’ll generally want to find the nearest relative-positioned ancestor to the absolute-positioned element that’s causing us issues. Luckily, we can do that easily with a tiny bit of JavaScript!

In Firefox and Chrome’s dev tools, typing `$0` in the console panel will return the currently selected element. If we type `$0.offsetParent`, the nearest positioned ancestor of the currently selected element will be returned. We can then check whether it has `position: relative` in the styles panel. (Or if we want to check it in JavaScript, we can use
`getComputedStyle($0.offsetParent).position`.)

## Logical properties

Positioning an element in this way is about to become more concise with the help of the new `inset` property. Part of the [CSS Logical Properties](https://www.w3.org/TR/css-logical-1/#inset-properties) specification, `inset` is effectively a shorthand for the position properties `top`, `right`, `bottom`, `left`. That’s not quite the whole story – we also have the new logical properties, which allow us to achieve a similar thing: `inset-block-start`, `inset-block-end`, `inset-inline-start`, and `inset-inline-end`. If we’re using the default left-to-right [writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) this will map to `top`, `bottom`, `left`, `right` in that order, but other writing modes (as well as the `direction` property) will cause the values to be mapped differently. Right now though, we only need the `inset` property for our covered element.

If you’re not too familiar with writing modes or logical properties, this can feel a little confusing at first. [Here’s a great explainer](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/) by Rachel Andrew from a couple of years back.

Back to our utility classes, instead of:

```css
.overlay {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
```

We can condense those four lines down to one:

```css
.overlay {
  inset: 0;
}
```

Replacing them in our utility classes makes our code considerably shorter:

```css
.overlay-child,
.overlay-before,
.overlay-after {
  position: relative;
}

.overlay-child > *,
.overlay-before::before,
.overlay-after::after {
  position: absolute;
  content: '';
  display: block;
  inset: 0;
}
```

### Browser support

At the time of writing `inset` is only supported in Chrome and Firefox, so if you want to use it in production you’ll need to provide a fallback for non-supporting browsers. But it looks like browsers are getting behind logical properties on the whole, with many of them implementing [at least part of the Logical Properties specification](https://caniuse.com/?search=logical%20properties) – so I’d like to think we can expect to be able to use it pretty soon!
