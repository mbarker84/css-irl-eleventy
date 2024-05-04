---
title: 'Shades of Grey with color-mix()'
date: '2024-05-04'
tags: ['post', 'css', 'color']
---

Greys. Who doesn’t love ’em? When it comes to building websites, it can be handy having a few shades of grey at your disposal, no matter your colour palette. We use them for borders and subtle dividers, shadows, and to indicate state changes without overwhelming the user with colour. Some designers feel that a website needs quite a few shades of grey in order to convey subtleties. I once worked on a project that literally had 50 shades of grey.

If your native language is American English, you might be a little vexed by my spelling of “grey” here. Sorry, not sorry. Happily, CSS named colours are very inclusive when it comes to greys. All flavours of grey come in US/UK variants — take your pick from these beauties:

- lightgrey/lightgray
- grey/gray
- darkgrey/darkgray (which is lighter than grey/gray!)
- lightslategrey/lightslategray
- slategrey/slategray
- darkslategrey/darkslategray
- dimgrey/dimgray
- whitesmoke (technically a grey)
- silver (also grey)

They’re probably not going to cut it for all your UI needs though. What we want is a nice selection of greys that complement our colour palette. We could of course use a colour picker and our favourite design tool (boring). Or we could create a palette of greys with the CSS `color-mix()` function (yaaaay!). Let’s go with the second option.

## A primer on color-mix()

The `color-mix()` function enables us to mix percentages of two colors and output the result. To use it, we need to specify three arguments: the colour interpolation method, and the two colours we want to mix. We can specify the proportions of each colour as percentages. If we omit these they’ll be mixed 50/50, or we can specify one of them and the other will be scaled so that they toal 100%.

```css
/* 50% red, 50% blue */
color-mix(in srgb, red, blue)

/* 60% red, 40% blue */
color-mix(in srgb, red 60%, blue)

/* 60% red, 40% blue */
color-mix(in srgb, red, blue 40%)
```

If we want to get into the particulars there’s a bit more to explore, especially when it comes to understanding how different colour interpolation methods operate. I wrote a [primer on `color-mix()`](https://developer.mozilla.org/en-US/blog/color-palettes-css-color-mix/) for MDN if you’re interested, and plenty of cleverer people have written extensively about the inner workings of various colour spaces, gamuts and interpolation methods. I recommend [Chris Lilley’s talk from CSS Day](https://www.youtube.com/watch?v=zkun6wAPc1s) if you want to get a handle on just how mind-bending colour can be. If ever there was a topic that’s ripe for melting your brain, it’s colour on the web. But assuming you just want to mix a couple of colours, `color-mix()` itself on the whole it’s pretty intuitive.

## What even is grey, anyway?

Let’s get back to grey (the lesser known Amy Winehouse album). We’re taught as children that grey comes from mixing black and white. That’s true in that it certainly gives us shades of grey, but when it comes to design, our choices of grey tend to be less black and white (LOL). We might want to use warmer or cooler grey tones, which mix in a little bit of colour, and yet we’ll still refer to the results as “grey” in our colour palette or design system.

## Simple greys with color-mix()

We can mix black and white with the `color-mix()` function to create various shades of grey, from light to dark. Here we’ll mix them in increments of 20%, from 20% black/80% white to 80% black/20% white, storing these as custom properties so that we can use them anywhere in our CSS. (The initial `--grey` variable, as we saw in the previous example, resolves to 50% black/50% white).

```css
:root {
  --grey: color-mix(in oklch, black, white);

  --grey-20: color-mix(in oklch, black 20%, white);
  --grey-40: color-mix(in oklch, black 40%, white);
  --grey-60: color-mix(in oklch, black 60%, white);
  --grey-80: color-mix(in oklch, black 80%, white);
}
```

We only need to include a percentage for one of our colours (black in this case), the second one will be implied.

Of course, if you really do want 50 shades of grey, go ahead and create as many variables as you like. Heck, even stick some `calc()` in there, I don’t mind.

```css
:root {
  --steps: 50;
  --increment: calc(100% / var(--steps));

  --grey-1: color-mix(in oklch, black var(--increment), white);
  --grey-2: color-mix(in oklch, black calc(var(--increment) * 2), white);
  --grey-3: color-mix(in oklch, black calc(var(--increment) * 3), white);
  /* etc. */
}
```

A side note on colour spaces (I’ll keep it brief, I promise): We’re using `oklch` here because colours in this space are **perceptually uniform**. That means that the percentage difference between the colours (well, greys) will be perceived by the viewer as being equal. If we compare the same five shades of grey in the `srgb` space we can see there’s a difference.

<p class="codepen" data-height="469" data-default-tab="result" data-slug-hash="OJGeZyd" data-user="michellebarker" data-token="e6972d83576c1a8e95e355797eb5ef80" style="height: 469px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/OJGeZyd/e6972d83576c1a8e95e355797eb5ef80">
  Shades of grey with color-mix()</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Lea Verou has a great article on [LCH colours in CSS](https://lea.verou.me/blog/2020/04/lch-colors-in-css-what-why-and-how/), including what perceptual uniformity actually means.

## Grey tones

Now let’s create some warmer and cooler grey tones by mixing another colour with our grey variables. Yes, that’s right, we can mix the colours that are output from `color-mix()`.

For our cooler greys, we’ll mix in a little bit of blue. We’re using the CSS named colour blue, which equates to `rgb(0 0 255)`, but feel free to use any blue or blue-ish colour in whatever colour space takes your fancy. We’re going to mix **the same** amount of colour into each of our grey shades, so let’s create a “mixer” custom property. That way, if we want to tinker with our blue tone we only have one place we need to do it.

```css
:root {
  --blue-mixer: blue 10%;
}
```

Then we’ll use `color-mix()` to mix this into our original set of greys, creating a new set of custom properties:

```css
:root {
  --blue-grey: color-mix(in oklch, var(--grey), var(--blue-mixer));

  --blue-grey-20: color-mix(in oklch, var(--grey-20), var(--blue-mixer));
  --blue-grey-40: color-mix(in oklch, var(--grey-40), var(--blue-mixer));
  --blue-grey-60: color-mix(in oklch, var(--grey-60), var(--blue-mixer));
  --blue-grey-80: color-mix(in oklch, var(--grey-80), var(--blue-mixer));
}
```

<figure>
  <img srcset="/shades-of-grey-01_1600.webp 1600w, /shades-of-grey-01_1200.webp 1200w, /shades-of-grey-01_800.webp 800w" sizes="(min-width: 1200px) 1200px, 90vw" src="/shades-of-grey-01_1200.webp" width="1600" height="800" alt="Two rows of 5 shades of grey. The ones on the bottom row have a slightly bluer tone.">
</figure>

Perhaps these are too blue for you? You can, of course tone down or dial up the blue by adjusting the percentage value in the `--blue-mixer` custom property.

We can do the same with a red hue to create some warm greys too. Check out the full demo below. Who said grey has to be boring?

<p class="codepen" data-height="451" data-default-tab="result" data-slug-hash="jORjxZq" data-user="michellebarker" data-token="ef7738c94227bab65d41070d2eba55a9" style="height: 451px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/jORjxZq/ef7738c94227bab65d41070d2eba55a9">
  Shades of grey with color-mix()</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
