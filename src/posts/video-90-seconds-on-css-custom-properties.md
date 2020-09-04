---
title: 'Video: 90 Seconds on CSS Custom Properties'
date: '2020-04-22'
tags: ['post', 'css', 'custom properties']
---

Last year I spoke at [Future Sync](https://futuresync.co.uk/) conference, and this year the organisers asked me if I could provide a short recorded introduction to a CSS topic. I put together a 90-second video on CSS custom properties, one of my favourite (relatively) recent CSS features, and thought I’d share it with you here.

There’s also a transcript below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/3QcXFk6JQf8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Transcript

CSS Custom Properties enable you to store values for reuse in your stylesheets.

If you’re familiar with other programming languages, or with CSS preprocessors, it’s likely you’ll have come across variables. CSS Custom Properties are also known as CSS variables, and they have some similarities.

As an example, we can define a colour value variable, which we’ll call `primaryColor`, on the `root` element:

```css
:root {
  --primaryColor: #f542d7;
}
```

This makes it a global variable, which we can use anywhere in our stylesheet, in place of a property value.

```css
.some-element {
  background-color: var(--primaryColor);
}
```

Alternatively, we could define the custom property on a selector, scoping it to the selector and its descendents.

```css
.some-element {
  --primaryColor: #f542d7;
  background-color: var(--primaryColor);
}
```

When we use a custom property, we can also set a default value. That way, if the custom property is not defined at the point we use it, it will fall back to the default.

```css
.some-element {
  background-color: var(--primaryColor, #6942f5);
}
```

Custom properties can be updated with CSS or Javascript, making them truly dynamic variables.

We can even use them to calculate values of other custom properties, and that lends them to some very cool creative possibilities.

One example is a staggered animation effect.

First, we assign each element a custom property that corresponds to the element’s index:

```css
.some-element:nth-child(2) {
  --i: 2;
}

.some-element:nth-child(3) {
  --i: 3;
}
```

Then we use that variable to calculate another custom property, which we’ll call `delay`:

```css
.some-element {
  --delay: calc(var(--i, 1) * 400ms);
}
```

Now we can use that custom property in place of the `animation-delay` value in the shorthand property:

```css
.some-element {
  --delay: calc(var(--i, 1) * 400ms);
  animation: fadeIn 1000ms var(--delay) forwards;
}
```

That makes our code much more succinct and maintainable, and we don’t have to adjust the values in lots of different places if we want to make a change.

Try it yourself with this Codepen demo:

<iframe height="395" style="width: 100%;" scrolling="no" title="Staggered animation with custom properties" src="https://codepen.io/michellebarker/embed/BaoyZWY?height=395&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/michellebarker/pen/BaoyZWY'>Staggered animation with custom properties</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Or check out [this article](/7-uses-for-css-custom-properties) for some other ideas of where they might come in useful.
