---
title: 'Messing About with CSS Gradients'
date: '2023-11-03'
tags: ['post', 'National Blog Posting Month', 'css']
intro: 'Day 3 of National Blog Posting Month #NaBloPoMo'
---

<figure>
  <img src="/messing-about-with-css-gradients-01_900.webp" srcset="/messing-about-with-css-gradients-01_1600.webp 1600w, /messing-about-with-css-gradients-01_1200.webp 1200w, /messing-about-with-css-gradients-01_900.webp 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="A lattice pattern in orange, red and teal">
</figure>

I’m not a person who creates CSS “art” (as in drawings), but I do like messing about with CSS gradients and seeing what comes up. I think the first time I became aware that you could create some pretty cool effects with CSS gradients was Lea Verou’s [CSS3 Patterns Gallery](https://projects.verou.me/css3patterns/).

Gradients are applied with the `background-image` property, or can be combined with other properties in the `background` shorthand:

```css
div {
  background-image: linear-gradient(to right, orange, red);
}
```

Layering multiple gradients that include transparency can produce some pretty cool (and surprising effects), as I described in [an earlier post](/building-the-zig-zag-gradient-lab/) (and accompanying talk). Playing around with gradients in conjunction with CSS background properties (`background-position`, `background-size`, `background-repeat`) is a great way to get to grips with those properties too.

Sometimes I enjoy spending 20 minutes layering up a few gradients in Codpen, just to scratch a creative itch. Today I made this demo, as I has the idea to create a sort of slightly 3D woven effect:

<p class="codepen" data-height="426" data-default-tab="result" data-slug-hash="bGzwBWE" data-user="michellebarker" style="height: 426px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/bGzwBWE">
  Lattice gradient</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

What I love while messing about with various colours and properties is that I often end up with happy accidents that actually add to the image.

## Custom properties

Custom properties are super useful when working with CSS gradients, as there is a lot of repetition involved. Sometimes tweaking a custom property value can produce wildly different effects. Adjusting the angles of the gradients in the above example gives us something completely different (but still quite cool!).

<figure>
  <img src="/messing-about-with-css-gradients-02_900.webp" srcset="/messing-about-with-css-gradients-02_1600.webp 1600w, /messing-about-with-css-gradients-02_1200.webp 1200w, /messing-about-with-css-gradients-02_900.webp 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="A pattern of overlapping triangles in orange, red and teal">
</figure>

Custom properties are also animatable in certain browsers (not Firefox yet!) with `@property`, like in this demo.

<p class="codepen" data-height="424" data-default-tab="result" data-slug-hash="XWpVOmb" data-user="michellebarker" style="height: 424px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/XWpVOmb">
  Rockin rainbows (Chromium only)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Gradient pixel art

A lot of CSS art is actually made with gradients. You can make pixel art by layering up a bunch of gradients and adjusting the `background-position` values. Here’s a pixel art maker I built a while back. Draw on the canvas and you can see the generated CSS.

<figure>
  <img src="/messing-about-with-css-gradients-03_900.webp" srcset="/messing-about-with-css-gradients-03_1600.webp 1600w, /messing-about-with-css-gradients-03_1200.webp 1200w, /messing-about-with-css-gradients-03_900.webp 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="Screenshot of the pixel art generator">
</figure>

[Try the demo](https://codepen.io/michellebarker/pen/WNKbQOO)
