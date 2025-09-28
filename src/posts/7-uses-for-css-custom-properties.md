---
title: '7 Uses for CSS Custom Properties'
date: '2019-12-09'
tags: ['post', 'css', 'custom properties']
---

[Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (also known as CSS variables) allow us to store property values for re-use in our stylesheets. If you’re relatively new to them, you might wonder when you might use them over and above preprocessor variables (if indeed you use a preprocessor). I’m using custom properties a lot in my workflow these days, and thought I would collate some of the use cases here.

<!--excerpt-->

This isn’t an in-depth guide to how custom properties work, so if you need a primer I recommend the following resources:

## Colour functions

Custom properties don’t _just_ represent entire property values – they can be used to store partial values too. A commonly cited use case is in CSS colour functions. [HSLA](https://tympanus.net/codrops/css_reference/hsla/) lends itself particularly well to custom properties, allowing us as developers an unprecedented level of control when it comes to mixing colours.

```css
.some-element {
  background-color: hsla(
    var(--h, 120),
    var(--s, 50),
    var(--l, 50),
    var(--a, 1)
  );
}

.some-element.darker {
  --l: 20;
}
```

We can also do some very cool things like calculate complementary colours. [This article](https://blog.logrocket.com/how-to-create-better-themes-with-css-variables-5a3744105c74/) I wrote last year is a much more in-depth guide to colour manipulation with custom properties, and [Sara Soueidan](https://www.sarasoueidan.com/blog/hex-rgb-to-hsl/) has a great article on the subject too.

## Shorthand properties

If you’re using a shorthand property such as `animation`, and you need to change one value for a different element, then writing out the whole property again can be error-prone and adds an extra burden of maintenance. Using custom properties we can adjust a single value in the shorthand property very easily:

```css
.some-element {
  animation: var(--animationName, pulse) var(--duration, 2000ms) ease-in-out
    infinite;
}

.some-element.faster {
  --duration: 500ms;
}

.some-element.shaking {
  --animationName: shake;
}
```

## Repeated values

Suppose we have an element that has a consistent value for its top padding, but the same value for all the other sides. Writing the following could be a bit tedious, especially if we want to adjust the padding values:

```css
.some-element {
  padding: 150px 20px 20px 20px;
}

@media (min-width: 50em) {
  .some-element {
    padding: 150px 60px 60px 60px;
  }
}
```

Using custom properties means we have just one place to adjust that padding. Even better, if it’s a standard value that’s used throughout the site then we could declare it in a variable partial, config file or our site’s [design tokens](https://css-tricks.com/what-are-design-tokens/).

```css
:root {
  --pad: 20px;
}

@media (min-width: 50em) {
  :root {
    --pad: 60px;
  }
}

.some-element {
  padding: 150px var(--pad) var(--pad) var(--pad);
}
```

## Complex calculations

Custom properties can be really handy for storing calculated values (from the `calc()` function), which themselves can even be calculated from other custom properties. One example is calculating complementary colours, as mentioned earlier. Another is when you want to calculate the inverse of a property. I wrote an article for CSS Tricks a little while ago on [calculating the reverse of an easing curve](https://css-tricks.com/reversing-an-easing-curve/) with custom properties.

I often use custom properties with `clip-path` if I need to calculate a path relative to another, or relative to known variables. The following code from a recent demo calculates the clip path points for two pseudo elements to give the appearance of an element being bisected.

```css
.element {
  --top: 20%;
  --bottom: 80%;
  --gap: 1rem;
  --offset: calc(var(--gap) / 2);
}

.element::before {
  clip-path: polygon(
    calc(var(--top) + var(--offset)) 0,
    100% 0,
    100% 100%,
    calc(var(--bottom) + var(--offset)) 100%
  );
}

.element::after {
  clip-path: polygon(
    calc(var(--top) - var(--offset)) 0,
    calc(var(--bottom) - var(--offset)) 100%,
    0 100%,
    0 0
  );
}
```

<iframe height="397" style="width: 100%;" scrolling="no" title="His Dark Materials TV series logo with CSS" src="https://codepen.io/michellebarker/embed/yLLGVMQ?height=397&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/yLLGVMQ'>His Dark Materials TV series logo with CSS</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Staggered animations

If we want to stagger animations for a number of child elements, we can elegantly set the `animation-delay` on each one by simply defining the custom property as the element’s index:

```css
.element {
  --delay: calc(var(--i, 0) * 500ms);
  animation: fadeIn 1000ms var(--delay, 0ms);
}

.element:nth-child(2) {
  --i: 2;
}

.element:nth-child(3) {
  --i: 3;
}
```

<p class="codepen" data-height="433" data-theme-id="default" data-default-tab="css,result" data-user="michellebarker" data-slug-hash="VwYYpqw" style="height: 433px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Staggered animation with custom properties">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/VwYYpqw">
  Staggered animation with custom properties</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Unfortunately we currently have to assign the variable explicitly, which could be a problem if we have an indeterminate number of children. [Splitting JS](https://splitting.js.org/) is a great Javascript library that takes care of that by assigning the element’s index as a variable, and is very useful for this kind of staggered animation. But it would be great not to have to use JS!

Adam Argyle has recently submitted [a proposal](https://github.com/w3c/csswg-drafts/issues/4559) for two new CSS functions, `sibling-count()` and `sibling-index()`, which would be a game-changer, making a whole lot of new things possible with CSS. They’re nowhere close to being adopted by any browsers at this point, but it would be an incredibly powerful addition, so one to keep an eye on.

## Responsive grids

I’ve written about it [on this blog before](https://css-irl.info/super-powered-layouts/), but custom properties can help make complex Grid layouts easier to manage. Suppose we have an 8-column grid, which we want to change to a 12-column grid at a specific breakpoint:

```css
:root {
  --noOfColumns: 8;
}

@media (min-width: 60em) {
  :root {
    --noOfColumns: 12;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--noOfColumns), 1fr);
}
```

We don’t need to write the entire property value whenever we want to update the number of columns – we could use custom properties. This is a relatively simple example, but it might be much more useful if we have a more complex grid. And the technique could apply to things like track size or item placement too.

## Vendor prefixes

Some properties (like `clip-path`) still require vendor prefixes in some browsers – although thankfully that number is going down. If you need to write a vendor prefix and then you want to change the property value, you need to make sure you change it on the prefixed property too. With custom properties we could instead write:

```css
.some-element {
  --clip: polygon(0 0, 100% 0, 50% 100%, 0 100%);

  -webkit-clip-path: var(--clip);
  clip-path: var(--clip);
}
```

Now we only have one place we need to change it.

## Conclusion

These are far from the only uses for custom properties, but they’re one that I typically find myself reaching for within my workflow, and can help make your code more efficient and maintainable. No doubt you’ll discover plenty more uses of your own!
