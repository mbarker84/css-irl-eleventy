---
title: 'Exciting Times for Browsers (and CSS)'
date: '2022-03-31'
tags: ['post', 'css', 'javascript', 'browsers']
---

Last month I wrote about some of the exciting [new CSS features](https://www.smashingmagazine.com/2022/03/new-css-features-2022/) you can expect to see coming to a browser near you in 2022 for Smashing Magazine. It’s certainly an exciting time to be working on the web right now, with browser support for new features moving along at lightning-fast pace! This month saw Safari drop a [new release](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/) that includes support for a _tonne_ of new stuff, including `:has()` (A.K.A. the “parent selector”), `accent-color`, and [Cascade Layers](https://css-tricks.com/css-cascade-layers/) (all of which are covered in my Smashing article), as well as some additional gems:

## Trigonometric functions

I almost missed this line when skim-reading the Safari release announcement, but yep, Webkit has delivered support for CSS [trigonometric functions](https://www.w3.org/TR/css-values-4/#trig-funcs)! I’m unbelievably excited about the possibilities this will open up for creative CSS, some of which are covered in a [series on trigonometry in CSS and JS](https://tympanus.net/codrops/2021/06/01/trigonometry-in-css-and-javascript-introduction-to-trigonometry/) that I wrote for Codrops last year.

## New viewport units

Viewport units (`vh`, `vw`, `vmin` and `max`) are wonderful, except when they’re not. Have you ever used `vh` only to find that it doesn’t work as expected on mobile? That’s because, quite often, the viewport height isn’t fixed, and changes when the user scrolls and the device menu bar moves out of view. The [new viewport units](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths) are a solution to that problem, allowing us to specify largest, smallest or dynamic viewport units. Webkit also added support for logical property-style viewport units (`vi`, `vb`, and the dynamic variations), allowing us to specify the viewport unit in the inline or block dimension, as opposed to width and height.

## :focus-visible

This release brings Safari up to date with other browsers in supporting the `:focus-visible` pseudo-class, which is super handy for providing accessible focus styles, reducing the need for polyfills. [This CSS Tricks post](https://css-tricks.com/almanac/selectors/f/focus-visible/) explains what’s so useful about it.

## Cool font stuff

I have to admit, this one was **completely** off my radar: [`font-palette`](https://www.w3.org/TR/css-fonts-4/#font-palette-prop) and [`@font-palette-values`](https://www.w3.org/TR/css-fonts-4/#font-palette-values) provide a way for developers to reference a pre-coloured font, and to define a font’s custom colour palette. I have yet to dig into this, but it looks like a pretty exciting step for web typography!

## scroll-behavior

[`scroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) allows us to specify the way in which users are scrolled to an element in a webpage when triggered by an action (say, by clicking on an in-page anchor link). Previously the page would jump to the specified point, but instead we can instruct it to scroll smoothly. Most browsers have supported this feature for a while now, but Safari has been holding out on us. Now we have can smoothly scroll everywhere — both with `scroll-behavior: smooth` property, and in JS with the `scrollTo` option:

```js
window.scrollTo({
  top: 1000,
  left: 0,
  behavior: 'smooth',
})
```

## HTML and Javascript

In addition to some pretty awesome CSS features, we’ve also got some HTML and JS goodies. Just a few that stand out are:

### Lazyloading images

The `loading="lazy"` attribute on the `<img>` element allows image loading to be deferred until scrolled into view, and is a great performance win. Again, Safari has lagged behind other browsers on this up until now.

### \<dialog\> element

The `<dialog>` enables us to create a modal with all the accessibility stuff baked right in, rather than having to faff about with workarounds. Hooray! [Una](https://twitter.com/una) has a beautiful demo right [here](https://codepen.io/una/pen/dyJRwvG).

### Array.prototype.at()

This cheeky little [array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) lets us pass in a negative integer, to select an item from the **end** of the array. Say goodbye to the days of doing `someArray[someArray.length - 1]`.

## Interop 2022

This month also saw a joint announcement from all the major browser engines, which have [committed to working together](https://webkit.org/blog/12288/working-together-on-interop-2022/) to implement major new CSS features interoperably — meaning they are implemented in the same way in every browser. The list of priority features includes some highly desirable stuff, such as container queries, and should hopefully mean CSS feature development continues to gather pace! [Visit the dashboard](https://wpt.fyi/interop-2022) to see how browsers are doing.

It’s pretty incredible to see Safari shoot way up the rankings for many of these features, and signals a clear commitment by the team to push things forward in a browser that has previously been widely accused of holding CSS back. Long may it continue!

Not to be outdone, Nicole Sullivan confirmed [via Twitter](https://twitter.com/stubbornella/status/1508690609917206532?s=20&t=g0t1SpE0LVi2qr0gUtJ3HQ) that the Chrome team is working hard at all implementing pretty much all of the most commonly-requested features too. It’s an exciting time for CSS for sure.
