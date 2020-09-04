---
title: 'Drop-Shadow: The Underrated CSS Filter'
date: '2020-08-04'
tags: ['post', 'css']
---

**This article was updated on 13 August 2020 to include additional reference material.**

If you’re familiar with CSS, you probably know all about the `box-shadow` property. But did you know there is a CSS filter, `drop-shadow`, that [does something similar](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow)? Like `box-shadow`, we can pass in values for x-offset, y-offset, blur radius and colour:

```css
.my-element {
  filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));
}
```

Unlike `box-shadow`, it doesn’t take a `spread` parameter (more on that later).

## Why is drop-shadow useful?

If we have `box-shadow`, why do we need `drop-shadow` at all?

### Non-rectangular shapes

Using `drop-shadow` allows us to add a shadow to an element that doesn’t correspond to its bounding box, but instead uses the element’s alpha mask. We could add a drop shadow to a transparent PNG or SVG logo, for instance.

```css
img {
  filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
}
```

We can compare the effect of `box-shadow` versus `drop-shadow`:

<figure>
  <img src="/drop-shadow-01.jpg" alt="A pink cat logo with box-shadow on the left and the same logo with drop-shadow on the right">
</figure>

Using `box-shadow` gives us a rectangular shadow, even though the element has no background, while `drop-shadow` creates a shadow of the non-transparent parts of the image.

[Demo](https://codepen.io/michellebarker/pen/RwrXXby)

This will work whether the image is inline in the HTML (either as an inline SVG, or in `<img>` tag), or a CSS background image. That means we could also add a shadow to a gradient background. These shapes are created with background gradients, with the `drop-shadow` filter applied:

<iframe height="414" style="width: 100%;" scrolling="no" title="Gradient shapes with drop-shadow" src="https://codepen.io/michellebarker/embed/RwrXXaB?height=414&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/RwrXXaB'>Gradient shapes with drop-shadow</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Clipped elements

If we clip or mask an element using `clip-path` or `mask-image`, any `box-shadow` we add will be clipped too - so it will be invisible if it’s outside of the clipped area.

But we can create a drop shadow on the clipped element by applying the `drop-shadow` filter on the element’s parent. Pretty cool!

```css
.parent-element {
	filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
}

.clipped-element {
	clip-path: polygon(0 0, 50% 0, 100% 50%, 50% 100%, 0 100%, , 50% 50%))
}
```

<figure>
  <img src="/drop-shadow-02.jpg" alt="Pink chevron shape with blue drop-shadow">
  <figcaption>The drop-shadow filter is applied on the parent element of the clipped shape.</figcaption>
</figure>

[See the demo](https://codepen.io/michellebarker/pen/PoNYwvY)

### Grouped elements

On occasion I’ve needed to build components made up of overlapping elements, which itself needs to cast a shadow.

If we add a `box-shadow` to the whole component, we’ll be left with strange empty spaces:

<figure>
  <img src="/drop-shadow-03.jpg" alt="Two call-to-action components with box-shadow">
  <figcaption>Box-shadow applied to component</figcaption>
</figure>

If we add a `box-shadow` to each element individually, then each one will cast its own shadow, which might not be the desired effect. We’d need to employ some clever CSS to hide those shadows where elements overlap.

<figure>
  <img src="/drop-shadow-04.jpg" alt="Two call-to-action components with box-shadow">
  <figcaption>Box-shadow applied to columns</figcaption>
</figure>

But by using `drop-shadow` on the whole component, we get the shadow exactly where we want it, without resorting to hacks:

<figure>
  <img src="/drop-shadow-05.jpg" alt="Two call-to-action components with drop-shadow">
  <figcaption>Drop-shadow applied to component</figcaption>
</figure>

[See the demo](https://codepen.io/michellebarker/pen/poyogzm)

## Multiple drop shadows

Here’s a fun thing: You can use multiple drop shadows for some pretty cool effects! Check out the following demo.

<iframe height="498" style="width: 100%;" scrolling="no" title="Multiple drop-shadows on clipped element" src="https://codepen.io/michellebarker/embed/MWygYdm?height=498&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/MWygYdm'>Multiple drop-shadows on clipped element</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

(Side note: transitioning and animating CSS filters isn’t particularly performant, and it’s probably best to avoid animating this many filters at once in real projects. This one’s just for fun though!)

## Limitations

As mentioned above, `drop-shadow` doesn’t include the `spread` parameter. This means we can’t currently use it to create an outline effect, which I think would be really useful. For example, if it was supported, we could use `drop-shadow` to create an outline on a gradient background, in the way we can with `box-shadow` on other elements.

## Gotchas

`drop-shadow` doesn’t render the exact same shadow effect as `box-shadow`, even when given the same parameters. `box-shadow` tends to give a darker, heavier shadow than `drop-shadow` when the same values are used. I suspect this is something to do with CSS filters being based on SVG filter primitives. Whatever the case, you’ll likely need to compensate for the difference by adjusting your `drop-shadow` values somewhat.

<aside>
  <p>If you’re interested in further reading, <a href="https://twitter.com/anatudor">Ana Tudor</a> pointed me to <a href="https://dbaron.org/log/20110225-blur-radius">this article</a> on how blur radius is calculated.</p>
</aside>

## Browser support

CSS filters (including `drop-shadow`) are supported in all modern browsers. I tend to use it as progressive enhancement, without the need for a workaround for older browsers, as it isn’t normally something that would affect the user experience in any significant way. But if you do need to provide alternative styling for older browsers, you could do so using a feature query, with a `box-shadow` fallback:

```css
.my-element > * {
  box-shadow: 0 0.2rem 0.25rem rgba(0, 0, 0, 0.2);
}

@supports (filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2))) {
  .my-element {
    filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));
  }

  .my-element > * {
    box-shadow: none;
  }
}
```

## Conclusion

Despite having excellent support, the `drop-shadow` filter is highly under-utilised. I hope this article highlights some cases where it could save you hacking around with `box-shadow` – maybe you could use it in your next project!
