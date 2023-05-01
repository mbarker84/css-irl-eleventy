---
title: 'Useful Resources for Improving Your Site’s Performance (and Reducing Carbon Emissions)'
date: '2023-05-01'
tags: ['post', 'javascript', 'web performance', 'environment', 'workflow']
---

There are lots of areas where better web performance and reducing carbon emissions overlap: faster websites are often less carbon-intensive ones. They transfer less data, cache efficiently, and make fewer requests, all of which reduce energy consumption.

I’ve been consolidating a bunch of resources for an upcoming talk on Building a Greener Web. Here are a few resources you might find useful for building faster (and greener) websites.

## Reducing the Site-Speed Impact of Third-Party Tags

An article by web performance consultant [Andy Davies](https://andydavies.me/) on the performance impact of third party scripts and tags, and what we can do to mitigate them. I’ve used many of the tips in the article, with very successful results.

[Read the article](https://andydavies.me/blog/2020/10/02/reducing-the-site-speed-impact-of-third-party-tags/)

## How To Convert Variable TTF Font Files to WOFF2

Variable fonts can be great for performance. They enable us to load multiple weights and styles of a particular font from a single font file. Unfortunately a lot of them are only available as TTF files, which tend to be significantly larger than WOFF2, despite WOFF2 being well-supported. [Henry DesRoches](https://henry.codes/) details how to use Google’s [WOFF2 converter](https://github.com/google/woff2.git) library to convert variable fonts from TTF to WOFF2.

[Read the article](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/)

## Cache Control for Civilians

If, like me, your knowledge of caching is pretty minimal, you could do worse than check out this article on cache-control headers by [Harry Roberts](https://csswizardry.com/). You’ll soon know your `no-cache` from your `must-revalidate`.

[Read the article](https://csswizardry.com/2019/03/cache-control-for-civilians/)
