---
title: 'How I Solved My Font Rendering Problem'
date: '2024-02-13'
tags: ['post', 'css', 'typography']
related:
  [
    {
      title: 'Variable Font Animation with CSS and Splitting JS',
      url: '/variable-font-animation-with-css-and-splitting-js',
    },
    {
      title: 'A Reason to Self-Host Fonts',
      url: '/a-reason-to-self-host-fonts',
    },
  ]
---

Since I redesigned this website last year, an issue with the heading font has been bugging me. I’d noticed that, unlike in other browsers, in Safari on iOS the headings rendered poorly, slightly blurry, as if they’d been faux-bolded. Googling the problem was coming up with nothing, but I’m using a variable font, so I figured perhaps that had something to do with it not being a super-common issue.

<figure>
  <img src="/font-rendering_900.webp" width="1600" height="900" srcset="/font-rendering_1600.webp 1600w, /font-rendering_1200.webp 1200w, /font-rendering_900.webp 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="Comparing two screenshots of heading and body font rendering. In the one on the left, the headings look oddly chunky and distorted.">
  <figcaption>Font rendering in iOS: Before and after fixing.</figcaption>
</figure>

I’m happy to say, I’ve figured it out and finally implemented a fix. It involved learning a thing or two about `@font-face`.

The `@font-face` at rule is where we specify a font for use in our CSS. Most of the time I don’t give it too much thought. I specify a few things:

1. The font family (How you want to refer to it in the CSS `font-family` property. Usually the name of the font, but it can be anything you want.)
2. The `src` URL and font format. These days I tend to just go with WOFF2, as it’s well supported. Old browsers can fall back to a system font with no harm to the user.
3. `font-display`. This determines what happens during the period before the font has downloaded. I go with `font-display: swap`, which according to MDN, “gives the font face an extremely small block period and an infinite swap period.” In practice that means that during the font block period (before the font is downloaded) a fallback font will be used after a very short delay (up to 100ms [according to the spec](https://drafts.csswg.org/css-fonts/#font-display-desc)), which will then be swapped for the specified font once it’s downloaded.

```css
@font-face {
  font-family: 'Urbanist';
  src: url('../fonts/urbanist.woff2') format('woff2');
  font-display: swap;
}
```

There are a number of other properties that can be specified in the `@font-face` rule, not all of them necessary in all cases. But with variable fonts we need at least couple of things in order for our fonts to render reliably.

If our font variation is on the **weight** axis, we should set a range for the `font-weight` property. A range of 100 to 800 permits us to use any weight in that range (assuming they’re available in our font file).

```css
@font-face {
  font-family: 'Urbanist';
  src: url('../fonts/urbanist.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 800;
}
```

Secondly, it’s recommended that we set `'woff2-variations'` as the font format. In practice the font rendered fine with just the `font-weight` addition above, and [MDN states that this isn’t strictly necessary](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide). But what the hell, it’s a recommendation, so let’s add it. Now the `@font-face` declaration looks like this:

```css
@font-face {
  font-family: 'Urbanist';
  src: url('../fonts/urbanist.woff2') format('woff2-variations');
  font-display: swap;
  font-weight: 100 800;
}
```

And now my fonts look beautiful everywhere!
