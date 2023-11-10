---
title: 'CSS Nesting is Here'
date: '2023-11-10'
tags: ['post', 'National Blog Posting Month', 'css']
intro: 'Day 10 of National Blog Posting Month #NaBloPoMo'
---

In case you missed it, [nesting](https://www.w3.org/TR/css-nesting-1/) is now supported natively in CSS in all major browsers! Nesting is a popular feature of preprocessors like [Sass](https://sass-lang.com/) and has been, in my opinion, on of the main reasons to keep using preprocessors. But with nesting supported natively, it might soon be time to consider dropping a preprocessor altogether.

## Nested selectors

If you’re familiar with preprocessors then making the leap to native CSS nesting won’t be too difficult. Certainly the syntax is very similar to Sass. Consider the following markup:

```html
<div>
  <p>Child level 1</p>
  <div>
    <p>Child level 2</p>
  </div>
</div>
```

We can style the nested `<div>` (a child of the first-level `<div>`) by literally nesting the selector. The `&` operator is optional, but it should be noted that omitting this for element selectors is not currently supported in Chromium.

```css
div {
  background: lightblue;

  /* With the '&' operator */
  & div {
    background: pink;
  }

  /* Without the '&' operator */
  div {
    background: pink;
  }
}
```

This is the same as writing:

```css
div {
  background: lightblue;
}

div div {
  background: pink;
}
```

## Nesting combinators

We can also use nesting for combinators. In this example (using the adjacent sibling combinator), a `<div>` that directly follows another `<div>` will have a lavender background. A `<p>` that is a direct child of a `<div>` will have a background of lemonchiffon.

```css
div {
  background: lightblue;

  & + div {
    background: lavender;
  }

  & > p {
    background: lemonchiffon;
  }
}
```

Again, this can be written with or without the `&`.

This is the same as writing:

```css
div {
  background: lightblue;
}

div + div {
  background: lavender;
}

div > p {
  background: lemonchiffon;
}
```

## Compound selectors

In the case of compound selectors, the `&` is necessary. In this example, a `<div>` with a class of `.featured` will have a turquoise background.

```css
div {
  background: lightblue;

  &.featured {
    background: turquoise;
  }
}
```

## Reversing the context

Similarly to Sass, appending the `&` after the selector reverses the context. Here, if a `<div>` is a child of an element with a class of `featured` the `<div>` will have an orange background.

```html
<div class="featured">
  <p>Child level 1</p>
  <div>
    <p>Child level 2</p>
  </div>
</div>
```

```css
div {
  .featured & {
    background: orange;
  }
}
```

## Differences with Sass

Unlike in Sass, selectors cannot be concatenated. This is not possible with native CSS nesting:

```css
.featured {
  &--large {
    font-size: 1.4rem;
  }
}

/* Equivalent to: */
.featured--large {
  font-size: 1.4rem;
}
```

As we’ve seen above, we can combine selectors. This does increate the specificity though.

```css
.featured {
  &.featured--large {
    font-size: 1.4rem;
  }
}

/* Equivalent to: */
.featured.featured--large {
  font-size: 1.4rem;
}
```

## Nesting media queries

We can nest media queries, container queries and other `@-`rules too:

```css
div {
  @media (min-width: 600px) {
    display: flex;
  }
}
```

## Why nesting?

Nesting can help make our code more readable and maintainable. I find it particularly helpful to be able to nest media queries. But it can go too far. A common rule advocated by many developers is to avoid nesting more than three levels deep.

There could be some performance concerns too. Using a preprocessor, the selectors are already parsed and compiled to a “flat” syntax before your code is sent to the browser. If the browser needs to parse the nested selectors, it could involve a bit more work. When used sensibly, I can’t imagine the performance impact is all that huge though.

## Older browsers

CSS Nesting is still fairly new, so it’s possible it won’t be supported for a lot of users, who may be on older browsers. If you want to start using it, there is a [PostCSS polyfill](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting), which it would probably be wise to consider for now.
