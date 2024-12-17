---
title: 'A Handy Use For Cascade Layers'
date: '2022-08-23'
tags: ['post', 'css', 'layout']
layout: 'post-alt.njk'
headerColors: ['lightblue', 'royalblue']
textColor: 'var(--black)'
---

I was just preparing a demo for an [upcoming talk](https://smashingconf.com/freiburg-2022) and it suddenly occurred to me that cascade layers would be a perfect solution to a problem I was having.

<!--excerpt-->

For any element of live coding, I like to meticulously prepare my demos to prevent any moments of friction on the day. I wanted to apply a bunch of default styles to a grid of cards in [this container queries demo](https://codepen.io/michellebarker/pen/QWmPGqL), but I wanted those styles to appear at the bottom of the stylesheet, so that when it came to live coding the demo I could write all the relevant code at the top, and the audience could just focus on the layout styles I would be discussing. However, there were a few styles that consequently wouldn’t be applied, as they would have been overridden by those further down. For example, at the top of the CSS file I want to apply a container query that would result in a horizontal card layout:

```css
.grid__item-wrapper {
  container: card / inline-size;
}

@container card (inline-size > 24em) {
  .card {
    flex-direction: row;
  }

  .card img {
    width: 40%;
    flex: 1 1 auto;
  }
}
```

But further down in the stylesheet I was setting a flex direction of `column` on the card:

```css
.card {
  display: flex;
  flex-direction: column;
}
```

Container queries themselves don’t increase specificity. I could write the following, and the `body` would always be blue:

```css
@container layout (inline-size > 40em) {
  body {
    background: red;
  }
}

body {
  background: blue;
}
```

I could increase the specificity of the selector at the top of the file, but I didn’t like my chances of remembering to do that in the midst of a live coding session! [Cascade Layers]() are a perfect solution. We can specify the order of layers at the top of the file:

```css
@layer general, layout;
```

Then put our relevant styles inside them:

```css
@layer layout {
  /* Only the styles relevant to the demo go in this layer */
  .grid__item-wrapper {
    container: card / inline-size;
  }

  @container card (inline-size > 24em) {
    .card {
      flex-direction: row;
    }

    .card img {
      width: 40%;
      flex: 1 1 auto;
    }
  }
}

@layer general {
  /* CSS reset and general styles not relevant to the demo go here */
}
```

This means the styles in the `general` layer will be applied first, despite being below those in the `layout` layer.

<figure>
  <img src="/a-handy-use-for-cascade-layers.jpg" alt="Container queries demo of a grid of cards in Codepen showing the order in which layers are applied in the CSS panel">
</figure>

Here’s the full demo:

<p class="codepen" data-height="457.3125" data-default-tab="result" data-slug-hash="QWmPGqL" data-user="michellebarker" style="height: 457.3125px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/QWmPGqL">
  Container queries + cascade layers</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Browser support

I was surprised by how widespread [browser support](https://caniuse.com/?search=cascade%20layers) already is for Cascade Layers — over 87% of browsers worldwide now support them. But, needless to say, an application that relies on Cascade Layers would not fare well in browsers that don’t support them. Happily there’s a [PostCSS polyfill](https://www.oddbird.net/2022/06/21/cascade-layers-polyfill/) (which I haven’t tried out yet).

## Caveats

The one drawback to using Cascade Layers here is that it seems to result in the [container queries polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) no longer working. It’s not a big deal for me in this instance as I’ll be using Chrome, but running the demo in Firefox means you won’t see the container queries in action. I’ve filed [an issue](https://github.com/GoogleChromeLabs/container-query-polyfill/issues/46).

<aside>
<h3>Update</h3><p>The issue has been fixed and the polyfill is now working! 🎉</p>
</aside>

## Resources

Find out more about Cascade Layers but reading this [comprehensive guide](https://css-tricks.com/css-cascade-layers/) by [Miriam Suzanne](https://twitter.com/TerribleMia), or watch [Bramus’s video from CSS Day](https://www.youtube.com/watch?v=zEPXyqj7pEA).
