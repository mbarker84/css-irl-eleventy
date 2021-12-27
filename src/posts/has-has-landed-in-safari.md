---
title: ':has() Has Landed in Safari'
date: '2021-12-27'
tags: ['post', 'css']
---

Just a few days ago Safari gave us all an early Christmas present: the latest Safari Technology Preview release includes support for the `:has()` pseudo-class! Otherwise known as the “parent selector”, (but officially termed in the [the spec](https://drafts.csswg.org/selectors/#relational) ‘The Relational Pseudo-class’) it allows us to style an element based on its descendants. We can do things like (off the top of my head) style any sections that contain `img` elements:

```css
section:has(img) {
  background: lightgray;
}
```

But eagle-eyed CSS aficionados might spot that it opens up way more possibilities than that, as Bramus writes in [his blog post](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/). He’s also been experimenting with [form styling](https://twitter.com/bramus/status/1473429865932238848?s=20), including styling labels based on the validity of their inputs.

You could even style a whole form differently if it contains invalid inputs:

```css
form:has(input:invalid) {
  border: 2px solid red;
}
```

The parent selector is something the CSS world has been crying out for for some time, and I’m sure we’ll see lots more imaginative use cases come to light over the coming year.

It’s worth mentioning that you can test for support for `:has()` using feature queries with the `selector()` function, as detailed [in this CSS Tricks post](https://css-tricks.com/supports-selector/). Having never needed to use it before, this had completely passed me by, but it’s yet another cool CSS feature that’ll come in handy. Bramus uses it in his post to show or hide a warning message, depending on whether the browser supports `:has()`:

```css
@supports selector(:has(*)) {
  .info,
  .warning {
    display: none;
  }
}
```

On a side note, it’s great to see Safari leading the way on new CSS features like `:has()`, after years of lagging behind — no doubt spearheaded by Jen Simmons’ presence on the team.
