---
title: 'Quick Tip: Style Pseudo-elements with Javascript Using Custom Properties'
date: '2021-03-28'
tags: ['post', 'css', 'custom properties', 'javascript']
---

In Javascript we have a few ways of selecting elements, but we can’t directly target [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements). Something like this, for instance, won’t work, and will return `null`:

```js
document.querySelector('.my-element::after')
```

That can make it tricky to apply styles to pseudo-elements with JS. If we want to dynamically calculate the height of an element and apply it with JS, we can do it like so:

```js
const element = document.querySelector('.my-element')

element.style.height = someFunctionToCalculateHeight()
```

But how do we do this with a pseudo-element? Luckily, CSS custom properties can help.

We can instead assign a custom property for the height in our CSS:

```css
.my-element::after {
  height: var(--height, 0);
}
```

Here I’m providing a default (or fallback) value of 0 for the custom property. It’s a good idea to provide a default if we’re relying on the custom property being defined in JS (if we want it to be anything other than the property’s default value).

Then we can set the value in JS:

```js
const element = document.querySelector('.my-element')

element.style.setProperty('--height', someFunctionToCalculateHeight())
```

Here’s a simple demo (and yes, I know the JS in this example is unecessary as it could easily be achieved with CSS alone — it’s merely to illustrate the concept!):

<p class="codepen" data-height="405" data-theme-id="dark" data-default-tab="js,result" data-user="michellebarker" data-slug-hash="LYxZJZp" style="height: 405px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Style pseudo-element with custom property">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/LYxZJZp">
  Style pseudo-element with custom property</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
