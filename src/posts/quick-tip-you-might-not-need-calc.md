---
title: 'Quick Tip: You Might Not Need Calc()'
date: '2022-05-16'
tags: ['post', 'css', 'quick tip']
---

Did you know, if you use CSS math functions like [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min), [`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max) and [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) and you’re calculating any one of the arguments, you don’t need `calc()`? I think it was [Ahmad Shadeed](https://twitter.com/shadeed9) who mentioned this on Twitter the other day, but I could be wrong.

So if you want to use `clamp()` for some fluid typography, say, with a `calc()` function for the middle value, instead of doing this:

```css
h1 {
  font-size: clamp(1.5rem, calc(1rem + 3vw), 4rem);
}
```

You can do this:

```css
h1 {
  font-size: clamp(1.5rem, 1rem + 3vw, 4rem);
}
```

It totally makes sense, because `min()`, `max()` and `clamp()` _already are_ math functions. But nonetheless, it’s something I wasn’t aware of before!

It works with custom properties too — check out [this demo](https://codepen.io/michellebarker/pen/qBxRXmg).

Incidentally, if you want to know more about fluid typography in CSS (including accessibility concerns), [this comprehensive guide](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) by [Adrian Bece](https://twitter.com/AdrianBeceDev) has you covered.
