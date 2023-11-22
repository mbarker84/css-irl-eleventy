---
title: 'Choosing a Green Web Host'
date: '2023-11-22'
tags: ['post', 'National Blog Posting Month', 'web sustainability']
intro: 'Day 22 of National Blog Posting Month #NaBloPoMo'
---

Earlier this month, Jeremy Keith posed the question: [“How green is my server?”](https://adactio.com/journal/20646). As Jeremy notes, it’s surprisingly hard to get that information! So how do you ensure that you’re hosting your website on a green server?

## What do we mean by “green”?

When we think of green web hosting, most of us might reasonably assume that a hosting company that claims to be green would source a high proportion of their electricity from renewable sources. But is that necessarily the case?

### Green energy

Unless the data centre is directly hooked up to a solar farm or wind turbine (unlikely), then then probably don’t get **all** of their electricity from renewables. Most large web hosts have data centres all over the world, and these are usually connected to the country’s national power grid. The proportion of electricity generation can vary country to country, and fluctuate depending on the weather and the time of day. Therefore, one of the things to look for is whether the company in question has a contract with a green electricity supplier, as [Amazon claims to](https://sustainability.aboutamazon.com/products-services/the-cloud?energyType=true#renewable-energy):

> We contract for renewable power from utility scale wind and solar projects that add clean energy to the grid.

Hosting companies generally don’t publish their electricity suppliers’ details on their websites, however, so investigating their claims is far from straightforward.

We should also be aware that some companies claiming to be entirely green or “100% renewable” might only be buying [carbon credits or offsets](https://en.wikipedia.org/wiki/Carbon_offsets_and_credits) rather than sourcing clean energy. These are likely to be far less effective, and in some cases could be actively harmful. When choosing a green web host it’s important to check whether they actually invest in renewable energy.

### Beyond renewable energy

Beyond green energy alone, data centres consume vast quantities of water in order to keep them cool. As noted in the [Washington Post](https://www.washingtonpost.com/climate-environment/2023/04/25/data-centers-drought-water-use/):

> Data centers rank among the top 10 water-consuming commercial industries in the United States.

This is a big concern, particularly in areas of drought.

There is also the [embodied carbon](https://circularecology.com/carbon-footprint-v-embodied-carbon.html) (CO2 emitted in producing materials) to consider when it comes to data centres and other web hosting infrastructure.

I’m not aware of many hosting companies that publish detailed sustainability information on anything beyond electricity use (if they even publish that).

## Renewable energy vs. energy efficiency

There’s much more we could examine when it comes to the energy efficiency of our site’s infrastructure. [Using a CDN](https://www.wholegraindigital.com/blog/how-using-a-cdn-is-better-for-people-and-the-planet/) (Content Delivery Network) **could** be a greener choice, as web pages can be served close to the the user, reducing data transfer. But with a more distributed network there could be a trade-off, as there may be less control over the carbon-intensity of the electricity.

Digital agency UsTwo published an interesting [case study](https://ustwo.com/blog/reducing-the-carbon-footprint-of-our-website/) on how they reduced their website’s carbon footprint by effectively building their own distributed hosting network — but of course, that’s beyond the means of many people!

Utilising serverless architecture could be a positive step too, but it as with so much else on the web, [it depends](https://dev.to/slsbytheodo/you-thought-serverless-was-green-here-is-how-to-really-make-it-sustainable-1m0p).

## How green is my website?

Running CSS { In Real Life } through [Website Carbon](https://www.websitecarbon.com) tells me that this website runs on clean energy. How can we be sure of that? My website is hosted with Netlify, which uses AWS infrastructure. Amazon helpfully provides a webpage detailing their [sustainability initiatives](https://sustainability.aboutamazon.com/products-services). We should remember that this is self-reported, and companies are inclined to put a positive spin on their environmental efforts for marketing purposes.

Although the energy infrastructure that powers my website appears to be relatively green, [Amazon is hardly what I would consider a “green” company](https://www.theverge.com/2022/8/1/23287351/amazon-climate-change-carbon-emissions-worse-2021), with a business that relies on unsustainable consumption, as well as ever-increasing demand for computing power and data infrastructure.

## Finding a green web Host

If you’re shopping for a green (or at least greener) web host, a good first port of call is the Green Web Foundation’s [Green Hosting Directory](https://www.thegreenwebfoundation.org/tools/directory/). Although there’s not a huge amount of information on each company (and individual companies’ websites can be frustratingly opaque), in order to be published in the directory companies need to provide proof of their green claims, so it’s a good baseline.

The team are currently working on a new and improved version of the directly that includes supporting evidence for providers.

## Learn more about greening the web

On Thursday 7th December I’ll be speaking alongside [Gerry McGovern](https://gerrymcgovern.com/) at [Smashing Meets Goes Green](https://smashingconf.com/meets-green) — a special, sustainability focused edition of the meetup!

<figure>
  <img src="/smashing-meets-goes-green.svg" width="800" height="600"  alt="Smashing Meet Goes Green">
</figure>

[Join us online](https://smashingconf.com/meets-green)
