---
title: 'Web Sustainability Resources'
date: '2022-11-14'
tags: ['post', 'web sustainability', 'html', 'css']
---

While there’s plenty to occupy the web community this week in the form of Twitter imploding, something far more important is also going on right now: the COP27 climate summit, taking place in Sharm El-Sheikh, where world leaders gather to hammer out agreements to (hopefully) limit catastrophic climate change.

There’s a lot of debate this year about corporate greenwashing, climate justice, and the ethics of holding the summit in a country where the government is known for human rights abuses and clamping down hard on peaceful protest, with many activists are boycotting the summit altogether. But regardless of the outcomes, we web developers should be aware of the ecological impact of our profession, and start examining our work through the lens of sustainability. So it seems timely to share a few resources that have crossed my radar this week.

## COP27 homepage sustainability review

Last year, [Fershad](https://twitter.com/fershad) analysed the climate impact of [the COP26 homepage](https://fershad.com/writing/cop26-a-quick-sustainability-check/). This year he’s taken [a look at the COP27 site](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/), albeit with a different slant — and showcasing some tools to help measure a website’s carbon footprint. Fershad’s contains lots of useful tips for making any website more sustainable.

[Read Fershad’s analysis →](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/)

## Digital = Physical

[This thoughtful article](https://medium.com/microsoft-design/digital-physical-4df9eceb63b2) by Jon Friedman and Rachel Romano from the Microsoft Design team does a great job of bringing home the physical impacts of our digital lifestyles (which we in wealthy countries are largely sheltered from), and really emphasises the importance of intersectionality. Microsoft’s [Green Design Principles](https://wxcteam.microsoft.com/download/Microsoft-Green-Design-Principles.pdf) (referenced in the article) are worth reading too.

[Read the article](https://medium.com/microsoft-design/digital-physical-4df9eceb63b2)

## Making WordPress Sustainable

WordPress sites account for around 40% of the web, by some estimations. Members of the WordPress community have recently launched a Slack channel focused on sustainability. [Hannah Smith](https://twitter.com/hanopcan) explains how sustainability means much more than web performance gains, and invites members of the community to contribute to the discussion.

[Read Hannah’s article and get involved →](https://make.wordpress.org/project/2022/11/01/sustainability-channel-what-should-we-do/)

## Incremental Font Transfer

Webfonts can be responsible for a large amount of data transfer on a website. I learnt this week (via the [ClimateAction.Tech](https://climateaction.tech/) Slack group) that some font foundries don’t allow subsetting, which is one step we as developers can take to minimise the size of the font file. ([Here’s a list](https://subsetting.xyz/) of foundries and details of whether they permit subsetting, if you need a quick reference.)

Through the ensuing discussing I also learnt about the [Incremental Font Transfer specification](https://www.w3.org/TR/IFT/). The spec proposes a new method of loading fonts incrementally, where portions of the font are loaded through multiple requests as and when needed. The specification is in working draft currently, but it’ll be great to see it progress into something we can use to improve the performance **and** the carbon footprint of our websites.

[Read the spec →](https://www.w3.org/TR/IFT/)

## Astro

I finally got around to playing around with [Astro](https://astro.build/), the hot new static site generator on the block, and I have to say, I’m pretty blown away. It’s a tool I’ve had my eye on for a while, but it’s only recently that it’s matured to a level where it’s (to me) worth the time investment.

In addition to being super-fast, lightweight and no-JS by default, it’s also really simple to get started with, with virtually no config required. I was able to get a simple site up and running within 20 minutes. All in all, it seems like a great tool for building more sustainable websites. I’ll definitely be using it for some side projects in the near future.

[Explore Astro →](https://astro.build/)

## Wholegrain Digital Declutter

This pleasingly-designed site by Wholegrain Digital offers a bunch of tips for decluttering your digital life, and reducing your carbon footprint in the process.

[Visit the site →](https://www.wholegraindigital.com/digitaldeclutter/)

## Thinking about HTML and CSS for saving data

As [Šime pointed out](https://twitter.com/simevidas/status/1590704384454758400), while the `<picture>` element enables us to serve up the most appropriate image depending on device size or resolution, we don’t have a way to tell the browser to serve a different image depending on bandwidth, or a user’s data preferences. It got me thinking about the `prefers-reduced-data` media query.

There are tons of reasons why a user might want to set their device preferences to data-saving mode. This media query would enable developers to say, conditionally load a webfont. Or we could turn off animations in our CSS when a user wants to save data, or set a darker colour scheme, as a kind of “eco-mode”. Arguably we need it now more than ever, but unfortunately no browser yet supports it.

This media query could also help us serve up appropriate images and media. The `<picture>` element allows for serving images depending on media conditions other than size — the following demo displays a darker image using the `prefers-color-scheme` media query.

<p class="codepen" data-height="518" data-default-tab="result" data-slug-hash="LYrLvWQ" data-user="michellebarker" style="height: 518px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/LYrLvWQ">
  Untitled</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

In theory, we could use `prefers-reduced-data` similarly, to serve a lower-resolution image to users who prefer it. Or perhaps serve a black-and-white, or halftone image?

```html
<picture>
  <source srcset="low-res-image.webp" media="(prefers-reduced-data: reduce)" />
  <img src="high-res-image.webp" alt="" width="1600" height="1068" />
</picture>
```

Perhaps it’s time for us to start asking browser vendors to start prioritising this?

[Read the spec →](https://w3c.github.io/csswg-drafts/mediaqueries-5/#prefers-reduced-data)
