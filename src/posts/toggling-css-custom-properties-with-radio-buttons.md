---
title: 'Toggling CSS Custom Properties with Radio Buttons'
date: '2021-05-04'
tags: ['post', 'custom properties', 'css', 'javascript']
---

As part of a [recent article published on Codrops](https://tympanus.net/codrops/2021/05/04/dynamic-css-masks-with-custom-properties-and-gsap/), I made some demos that allowed the user to toggle between three different values for a clip path using radio buttons. As with so many things these days, I found myself reaching for custom properties! Let&rsquo;s take a look at why custom properties are great for this.

## Common approaches

Let&rsquo;s look at one way we could approach this _without_ custom properties. We could use Javascript to detect when a user interacts with a radio button and append a class to the `<figure>` accordingly:

```js
const clippedElement = document.querySelector('.clipped-element')
const controls = document.querySelector('.controls')

let currentClass = 'circle'

const onChange = (e) => {
  if (!e.target.value || !e.target.checked) return

  if (clippedElement.classList.contains(currentClass)) {
    clippedElement.classList.replace(currentClass, e.target.value)
  } else {
    clippedElement.classList.add(e.target.value)
  }

  currentClass = e.target.value
}

controls.addEventListener('change', onChange)
```

Then it&rsquo;s a matter of defining our clip-path values for each class within our CSS:

```css
.clipped-element {
  -webkit-clip-path: circle(25% at 70%);
  clip-path: circle(25% at 50%);
}

.clipped-element.polygon {
  -webkit-clip-path: polygon(50% 0%...);
  clip-path: polygon(50% 0%...);
}

.clipped-element.svg {
  -webkit-clip-path: path('M202.2...');
  clip-path: path('M202.2...');
}
```

I&rsquo;ve shortened the values of the last two here for brevity and readability, but [this demo](https://codepen.io/michellebarker/pen/mdRZjdR) has the full code.

Another option is to set the `style` attribute in JS, but I prefer the CSS way, as it feels cleaner to me. `clip-path` requires a prefix in some browsers, so setting this in CSS seems more maintainable — but it&rsquo;s a matter of personal preference.

While there&rsquo;s nothing _wrong_ with these approaches, let&rsquo;s see what the alternative looks like with custom properties.

## Toggling the custom property

In our HTML we have three radio buttons with values of _circle_, _polygon_ and _svg_ respectively:

```html
<form class="controls">
  <fieldset>
    <legend>Switch clip path values</legend>
    <div>
      <input type="radio" name="shape" id="r_circle" value="circle" checked />
      <label for="r_circle">Circle</label>
    </div>
    <div>
      <input type="radio" name="shape" id="r_polygon" value="polygon" />
      <label for="r_polygon">Polygon</label>
    </div>
    <div>
      <input type="radio" name="shape" id="r_svg" value="svg" />
      <label for="r_svg">SVG path</label>
    </div>
  </fieldset>
</form>

<div class="clipped-element"></div>
```

We can assign a custom property for each value in CSS (again, the SVG path and polygon values are truncated here for brevity):

```css
.clipped-element {
  --circle: circle(25% at 50%);
  --polygon: polygon(50% 0%...);
  --svg: path('M202.2...');
}
```

Additionally, we can assign a custom property of `--clip` a value for our clip path. That means that every time we change the `--clip` value, both the prefixed property value _and_ the regular property value will be updated. (I&rsquo;ve written about this in a previous article, [7 Uses For Custom Properties](/7-uses-for-css-custom-properties/).)

We&rsquo;ll give it an initial value corresponding to our first radio button option, using the `--circle` custom property:

```css
.clipped-element {
  --circle: circle(25% at 70%);
  --polygon: polygon(50% 0%...);
  --svg: path('M202.2...');

  --clip: var(--circle);
  -webkit-clip-path: var(--clip);
  clip-path: var(--clip);
}
```

Then, in our `onChange` event handler, we update the value of `--clip` with the custom property corresponding to the selected radio input. We can use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to do this:

```js
const onChange = (e) => {
  if (!e.target.value || !e.target.checked) return

  clippedElement.style.setProperty('--clip', `var(--${e.target.value})`)
}
```

We achieve the same result, and both our CSS and JS code is much more concise.

The full demo:

<p class="codepen" data-height="453" data-theme-id="dark" data-default-tab="result" data-user="michellebarker" data-slug-hash="bGgXyYp" style="height: 453px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Clip path toggle with custom properties">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/bGgXyYp">
  Clip path toggle with custom properties</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Incidentally, CSS Tricks has recently published a [complete guide to custom properties](https://css-tricks.com/a-complete-guide-to-custom-properties/), featuring some great tips and examples of ways to use them.
