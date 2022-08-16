---
title: 'Animated Grid Tracks with :has()'
date: '2022-04-05'
tags: ['post', 'css grid', 'css', 'layout']
---

<figure>
  <img src="/animated-grid-tracks-with-has-02.jpg" alt="Grid of four segments with brightly coloured backgrounds and cupcake photo in the first section">
  <figcaption>Screenshot from a Codepen demo. Hovering on a grid item expands the grid tracks.</figcaption>
</figure>

Somehow it’s already three months since I wrote about the CSS `:has()` pseudo-class [landing in Safari Technology preview](/has-has-landed-in-safari/). The latest Safari (proper) release has just shipped with support, and can be enabled with a flag in the next Chrome release.

Meanwhile, I’ve been playing around with some ideas on how we can use `:has()` for styling a gallery or product grid layout. One of the cool things about the selector is that it allows us to not only style a parent element based on any one of its children, but to also style that child’s siblings too. So, building a menu, we could apply some styles to other elements in the menu when one of the links is hovered:

```css
/* Style the list border when link is hovered */
ul:has(a:hover) {
  border: 2px solid whitesmoke;
}

/* Style any other links in the list when a link is hovered */
ul:has(a:hover) a:not(:hover) {
  opacity: 0.5;
}
```

<figure>
  <img src="/animated-grid-tracks-with-has-01.jpg" alt="Menu bar with item hovered">
  <figcaption>Menu bar in its original state, and with item hovered</figcaption>
</figure>

([See the demo](https://codepen.io/michellebarker/pen/GRyQZWZ))

That extends nicely to a grid design, and combined with animated grid tracks could make for some exciting layout possibilities. What if, when the user hovers on a grid item, we could change the size of our grid tracks?

The ability to animate grid tracks (`grid-template-rows` and `grid-template-columns`) is actually written into the [CSS Grid specification](https://www.w3.org/TR/css-grid-1/), and has been supported in Firefox since 2019. But, sad to say, no other browsers currently support grid track animation. [Chen Hui-Jing wrote about it](https://blog.bitsrc.io/animating-css-grid-rows-and-columns-4b3b0997d06a) at the time, and included a cool demo by Olivia Ng of an expanding menu bar:

<p class="codepen" data-height="573" data-default-tab="result" data-slug-hash="LvKdRP" data-user="oliviale" style="height: 573px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/oliviale/pen/LvKdRP">
  CSS Grid: In-flight Entertainment Screen</a> by Olivia Ng (<a href="https://codepen.io/oliviale">@oliviale</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

But perhaps one of the reasons why we didn’t see more people playing around with animated grid tracks at the time (aside from the limited browser support) was because one of the more obvious use cases is expanding a grid track when hovering on an item **within** the grid. Until `:has()` arrived, we didn’t have a way to style the grid based on the hover state of a child — we would have to use Javascript.

This demo combines animated grid tracks with the `:has()` selector. When you hover over a grid item, the item’s grid tracks expand to take up a greater proportion of the space, and the labels of the sibling items fade out. You’ll need to view it in Safari to see this in action — in other browsers you’ll still see a hover effect on the item you’re hovering, just not on the grid and the item’s siblings.

<p class="codepen" data-height="536" data-default-tab="result" data-slug-hash="vYpdEgQ" data-user="michellebarker" style="height: 536px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/vYpdEgQ">
  grid / :has + animated grid tracks (Safari only)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Polyfilling

Unfortunately, although `:has()` is supported in Safari, animated grid tracks are not. To get around this in the above demo, I’m using the [Greensock](https://greensock.com/) library to animate custom properties for the grid tracks. It’s not perfect — to be honest, I’ve gone for a minimal-code outcome — but hopefully illustrates what’s possible while we cross our fingers for wider support!

<aside>
<h3>Update</h3>
<p>Safari Technology Preview and Chrome Canary have now shipped support for animated grid tracks! Here’s a <a href="https://codepen.io/michellebarker/pen/vYRVbQX">revised demo</a>, with an improved fallback for browsers that don’t support <code>:has()</code>. (Detecting support for animated grid tracks is not easily possible.)</p>
</aside>
