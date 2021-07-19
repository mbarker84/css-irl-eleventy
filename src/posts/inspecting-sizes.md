---
title: 'Inspecting Sizes'
date: '2021-07-10'
tags: ['post', 'css', 'workflow', 'tooling']
---

I don’t know about you, but I’ve often had a designer, looking over a site I’m developing, say something like “Can you move that five pixels to the left?”. The problem is, most of the time I’m not using pixels. It’s frustrating that despite rem or em units generally being a [better choice for the web](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/), design tools tend to favour pixels. It means that designers and developers are often speaking different languages when it comes to sizes.

Browser developer tools could step in to fill the gap here, and in some ways they already are. Currently, inspecting a colour value in Firefox or Chrome allows you to toggle between RGB, HSL and hex values by holding down the shift key on click. It would be great to see a similar thing for size values too. Being able to toggle between pixels, ems and rems (or even percentages) in the browser would be so useful!

## Toggling font size

We can actually do this right now with fonts in Firefox dev tools, [as Razvan pointed out to me on Twitter](https://twitter.com/razvancaliman/status/1410904510999011330?s=20). The Fonts panel has a bunch of controls for inspecting fonts (and is especially useful for variable fonts), and one of those is being able to switch units for the font size. Selecting from the dropdown automatically recalculates the value in the corresponding units, which include rems, ems, pixels, percentages and vieport units.

<figure>
  <img src="/inspecting-sizes-01.jpg" alt="Screenshot of a website with the Fonts panel in Firefox dev tools open">
  <figcaption>The fonts panel in Firefox. Use the sliders to adjust the font size, and the dropdown to select the units.</figcaption>
</figure>

Speaking personally, font size is probably where I need this most frequently, so it’s great we have it already. Chrome appears to have its own font editing tool in the works, but it doesn’t seem to be available yet — other than this tantalising glimpse from Addy Osmani, I haven’t seen anything more about it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The new Font Editor Experiment in DevTools is great. Tweak typography dynamically with sliders (font size, line-height, spacing &amp; weight)<br><br>Thx <a href="https://twitter.com/EdgeDevTools?ref_src=twsrc%5Etfw">@EdgeDevTools</a> for bringing it to Chromium &amp; <a href="https://twitter.com/ChromeDevTools?ref_src=twsrc%5Etfw">@ChromeDevTools</a> <a href="https://t.co/Ukko2yQlHh">pic.twitter.com/Ukko2yQlHh</a></p>&mdash; Addy Osmani (@addyosmani) <a href="https://twitter.com/addyosmani/status/1340755991743238146?ref_src=twsrc%5Etfw">December 20, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Still, it looks pretty interesting, and it’s great to see browser dev tools getting better and better at solving the needs of developers.

## Update!

The Dev Tools Tips website has a little write up on how to [enable the font inspector in Chrome](https://devtoolstips.org/tips/en/convert-font-units/). It’s an experiemental feature, so you need to enable it in the dev tools settings.
