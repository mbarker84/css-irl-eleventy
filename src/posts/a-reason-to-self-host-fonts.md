---
title: 'A Reason to Self-Host Fonts'
date: '2022-03-08'
tags: ['post', 'tooling', 'css', 'typography', 'performance']
---

The other day I noticed a strange thing had happened with the title font on my personal site. Where once the glyphs were clearly defined by glowing outlines, suddenly the outlines were all over the place, bisecting the glyphs in odd ways.

<!--excerpt-->

<figure>
  <img src="/a-reason-to-self-host-fonts-01.jpg" alt="Screenshot of title font with weird outlines">
  <figcaption>After: Font rendering after the change</figcaption>
</figure>

<figure>
  <img src="/a-reason-to-self-host-fonts-02.jpg" alt="Screenshot of title font with normal outlines">
  <figcaption>Before: How the font should look</figcaption>
</figure>

My immediate assumption was that it was a browser compatibility issue. After all, I was using the non-standard CSS property `text-stroke`.

```css
h1 {
  -webkit-text-stroke: 2px var(--accent);
  text-stroke: 2px var(--accent);
}
```

Although `text-stroke` is currently well-supported, it comes with [a warning](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke) that there could be inconsistencies between browser implementations, and behaviour might change in the future. I assumed that Firefox had changed its implementation. But a subsequent check revealed the bug was occurring in **all** browsers.

Christian Sonne suggested [on Twitter](https://twitter.com/ChristianSonne/status/1495160895403696132?s=20&t=wgdWLtXNWnV8wkDpNvqE9w) that is could be the font itself that changed and, sure enough, that turned out to be the case. On my personal site I was using Google Fonts via the embed code rather than self-hosting. That means that, yep, Google could change the font at any time and I wouldn’t know about it — something I hadn’t considered before! As Killian Valkhof replied [on Twitter](https://twitter.com/kilianvalkhof/status/1495302493374451712?s=20&t=wgdWLtXNWnV8wkDpNvqE9w):

> Did you switch to/have a variable font? This is common for those, so the strokes can more easily morphed.
> Still, I’d expect browser to union/rasterize those before adding strokes. Hopefully soon!

Sure enough, Google appear to be upgrading a lot of their fonts to variable fonts, so that explanation would make sense.

## Should you self-host fonts?

There are many performance arguments for and against self-hosting fonts versus using a third-party CDN. [This article](https://www.tunetheweb.com/blog/should-you-self-host-google-fonts/) by [Barry Pollard](https://twitter.com/tunetheweb) lays out many of the pros and cons for both approaches. [Sia Karamelagos](https://sia.codes/) published an excellent article on [Making Google Fonts Faster in 2022](https://sia.codes/posts/making-google-fonts-faster/), but she recommends self-hosting for full control. The fact that the host can change the font overnight without you knowing is one more argument in favour of self-hosting!

I would imagine bugs like this are pretty rare, and yes, no doubt partly down to using a non-standard CSS property in my case. But it’s definitely persuaded me to host my own fonts where possible from now on.

## Webfont generators

Font Squirrel has a [webfont generator](https://www.fontsquirrel.com/tools/webfont-generator) tool that includes font subsetting, to help generate as small a file as possible.

From Sia’s article I discovered [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts), which makes it even easier to switch your Google fonts to a self-hosted version. Be sure to [read the article](https://sia.codes/posts/making-google-fonts-faster/) for hints and tips to further optimise your fonts using the tool.
