---
title: 'Creating Generative SVG Characters'
date: '2021-05-08'
tags: ['post', 'svg', 'javascript']
---

<figure>
  <img src="/creating-generative-svg-characters.jpg" alt="A grid of six multicoloured SVG people">
</figure>

I came across [George Francis’](https://twitter.com/georgedoescode) work recently, and am completely in love with his generative SVG characters — especially the googly eyes! What I particularly love about these is that they underline how generative art doesn’t have to be serious — it can be playful, whimsical and fun.

George also has a [brand new website](https://georgefrancis.dev), which includes some exceptionally well-written tutorials on how you can get started with generative SVG art. Reading [this one on generative SVG blob characters](https://georgefrancis.dev/writing/generative-svg-blob-characters/), it struck me as an ideal approach for a little generative project I had in mind.

## The project

Recently I helped my 5-year-old son with a craft project to create some character cards. He’s not particularly keen on drawing, so getting him engaged in creative activities requires a bit of thought. We had a selection of coloured card (a palette of five or six colours). I drew shapes (circles, squares or triangles), and he would cut them out and stick them on a background, for the head and body of each character. Then he would draw on the eyes, mouth and limbs with a felt-tip pen.

The premise was simple, and lends itself perfectly to generative art. Take some fixed parameters (a limited colour palette, a fixed background size, a small set of shapes), and add in a few random elements — in this case the cutting, sticking and drawing skills of a 5-year-old! It resulted in a lovely set of artworks, which I thought would be really fun to try and produce generatively.

## The generative version

Until I ready George’s tutorial, I had the vague idea that I would use SVG to create the generative characters. George’s art inspired me to get started, and the tutorial provided loads of useful tips that made the process _so_ much easier than if I’d attempted it on my own.

### SVG.js

[SVG.js](https://svgjs.com) is a useful JS library for creating and positioning SVG elements, such as circles, rectangles, lines and polygons. It saves tons of time compared to creating an element and appending it to the DOM manually. I’ll definitely be reaching for this again in the future.

### A handy random function

George’s `random()` function is super handy as it allows you to specify whether you want an integer or a floating point value:

```js
function random(min, max, float = false) {
  const val = Math.random() * (max - min) + min

  if (float) {
    return val
  }

  return Math.floor(val)
}
```

I ended up using this all over the place to generate randomised properties of the characters.

### Drawing the polygon

The heads and bodies of the characters are (vaguely) circular. To get the _x_ and _y_ path co-ordinates we can use some trigonometric functions (`Math.cos()` and `Math.sin()`) to plot these. Using George’s code, here’s how we would plot a regular polygon with 16 points:

```js
const size = 300
const xPosition = 100
const yPosition = 100
const numPoints = 16

// step used to place each point at equal distances
const angleStep = (Math.PI * 2) / numPoints

// keep track of our points
const points = []

for (let i = 1; i <= numPoints; i++) {
  // x & y coordinates of the current point
  const x = xPosition + Math.cos(i * angleStep) * size
  const y = xPosition + Math.sin(i * angleStep) * size

  // push the point to the points array
  points.push({ x, y })
}
```

Try changing the variables in the following demo to change the polygon’s position, size and number of points.

<p class="codepen" data-height="383" data-theme-id="dark" data-default-tab="js,result" data-user="michellebarker" data-slug-hash="MWpYRLd" style="height: 383px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="SVG polygon">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/MWpYRLd">
  SVG polygon</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

In the tutorial, George use the `random()` function to add an element of variation to the polygon points, resulting in irregular shapes.

### Instantiating with a class

I use [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) a lot in my JS at work to create reusable component behaviours that can be instantiated at will. But not so much in my creative coding projects. Creating a class, as George does in this tutorial, is a great approach here. We can just instantiate it anywhere we want to add one of our generative characters.

## Adaptations

While George’s code provided a great foundation to work with, I ended up making a few adaptations for my needs.

### Colours

In my code, instead of fully randomising the colours, I wanted to have a limited palette from which to choose — just like having a selection of coloured card. So rather than generating colours randomly, I used a function to shuffle the array of colours and pick the first three. This ensures we get three different colour, rather than using the same colour twice within each character.

### Shapes

George uses a `spline()` function to draw a smooth line the polygon shapes. This is great for creating the “blob” shapes that George uses, but for my characters I wanted to keep the jagged edges reminiscent of the real-life cut-out figures, so I didn’t end up using this function.

I also mixed up the shapes a bit to better reflect the real-life variations, by adding a trapezium shape into the mix — so each character will have a body shape based on either a regular polygon or a trapezium.

Here’s the full demo:

<p class="codepen" data-height="439" data-theme-id="dark" data-default-tab="result" data-user="michellebarker" data-slug-hash="ZEeYPbK" style="height: 439px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Generative SVG paper people">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/ZEeYPbK">
  Generative SVG paper people</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Of course, you can read the [full article](https://georgefrancis.dev/writing/generative-svg-blob-characters/), which I thoroughly recommend if you want to get started with your own generative SVG project.
