---
title: 'Logical Properties for Useful Shorthands'
date: '2022-07-19'
tags: ['post', 'css', 'layout']
layout: 'post-alt.njk'
headerColors: ['lightblue', 'darkviolet']
textColor: 'var(--black)'
---

Something I like about logical properties is the ability to set margins or padding on just a single axis on an element, while leaving the other alone. Say we have an element on which we’ve set some padding using the `padding` shorthand:

```css
/* This gives us 1rem padding all the way around */
.box {
  padding: 1rem;
}
```

If, later on, we want to adjust the padding **only** on the x-axis (while preserving our original value on the y-axis), we have a couple of choices:

1. We could use `padding-left` and `padding-right`. Fine, but longer than our original shorthand.

```css
.box--some-variant {
  padding-right: 2rem;
  padding-left: 2rem;
}
```

2. We could use the shorthand, but remembering to include our original values.

```css
.box--some-variant {
  padding: 1rem 2rem;
}
```

I’m not a huge fan of having to repeat the original value for the y-axis padding. We **could** abstract those values out into custom properties — something like this:

```css
.box {
  padding: var(--py, 1rem) var(--px, 1rem);
}

.box--some-variant {
  --px: 2rem;
}
```

On the other hand, there is a [logical property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) that enables us to adjust the padding on a single axis: `padding-inline` refers to the padding on the x-axis when the document is in the left-to-right (default) or right-to-left [writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode). `padding-block` refers to the y-axis. (Those directions are reversed for a vertical writing mode.)

So instead we could write:

```css
.box {
  padding: 1rem;
}

.box--some-variant {
  padding-inline: 2rem;
}
```

[Codepen demo →](https://codepen.io/michellebarker/pen/RwMpBRO)

The same applies to margins, borders and a bunch of others. And check out the [`inset`](/a-utility-class-for-covering-elements/) property for a great positioning shorthand!

Logical properties are [very well supported](https://caniuse.com/?search=logical%20properties) in browsers now, so it’s a good time to start using them.
