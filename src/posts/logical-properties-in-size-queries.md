---
title: 'Logical Properties in Size Queries'
date: '2024-09-11'
tags: ['post', 'css', 'layout']
related:
  [
    { title: 'Logical Border Radius', url: '/logical-border-radius' },
    {
      title: 'Logical Properties for Useful Shorthands',
      url: '/logical-properties-for-useful-shorthands',
    },
  ]
---

I came across a post from Elad Shechter lamenting [not being able to use logical properties in media queries](https://webwewant.fyi/wants/114/). As he correctly notes, the following won’t work:

```css
@media (max-inline-size: 1000px) {
  .main-content {
    max-inline-size: 800px;
    margin: 0 auto;
  }
}
```

Media queries now support a new range syntax. Instead of writing `min-width` or `max-width`, we can use the “greater than” or “less than” operators (`>` and `<`), or “greater than or equal to”/“less than or equal to” (`>=` and `<=`). So we could write the above example a different way:

```css
/* Styles are applied when the inline-size is less than or equal to 1000px */
@media (width <= 1000px) {
  .main-content {
    max-inline-size: 800px;
    margin: 0 auto;
  }
}
```

This feels more consistent with other programming languages, and lends itself well to more concise code when dealing with multiple size conditions:

```css
@media (min-width: 500px) and (max-width: 1000px) {...}

/* becomes: */
@media (500px <= width <= 1000px) {...}
```

It gives us a choice in terms of how to write it too. These two media conditions both mean that the styles should be applied when the width is greater than 500px. We can write it either way:

```css
@media (500px < width) {...}

@media (width > 500px) {...}
```

To me, this syntax feels better suited to [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), and you **can** use logical properties in container queries. These both work:

```css
@container (min-inline-size: 500px) {...}

/* becomes: */
@container (inline-size >= 500px) {...}
```

So why not in media queries? It seems like an oversight, but I’m also inclined to think that in the not too distant future we might not need media queries for querying size. We **could** just make the `:root` a container and query that instead:

```css
:root {
  container-type: inline-size;
}

@container (500px < inline-size < 1000px) {
  body {
    background: blue;
  }
}
```

Except...

**We can’t query the block-size (equivalent to the height in horizontal writing modes) with container queries.** The following won’t work:

```css
:root {
  container-type: block-size;
}

@container (block-size > 500px) {
  body {
    background: blue;
  }
}
```

Speaking personally, it’s very rare that I need to query the viewport height. CSS has viewport units of course, which are great for sizing things relative to, well, the viewport. But it’s not totally unheard of. So we may need size-based media queries for some time yet, and being able to use logical properties with them would certainly be useful!
