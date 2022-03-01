---
title: 'Are My Third Parties Green?'
date: '2022-03-01'
tags: ['post', 'opinion', 'tooling', 'workflow', 'environment']
---

<figure>
  <img src="/are-my-third-parties-green.webp" alt="Screenshot of the website “Are My Third Parties Green?”" width="1800" height="988">
  <figcaption><a href="https://aremythirdpartiesgreen.com/">Fershad Irani’s tool</a> lets you check if your third-party scripts use green hosting.</figcaption>
</figure>

Recently I’ve been thinking quite a bit about third-party scripts and how much bloat they so often add to the average webpage — and, consequently, their impact on climate change via the additional carbon emissions generated, often for something the end user doesn’t really want or need. Third-party scripts can include ads, trackers, analytics, social media embeds, and probably some other stuff too. An analysis by [Marmelab](https://marmelab.com/) found that **up to 70% of the carbon footprint of media websites could be attributed to ads and stats** ([source](https://marmelab.com/blog/2022/01/17/media-websites-carbon-emissions.html)).

Often we as developers aren’t in a position to remove these things entirely, and the conversation around web monetisation is a complex one. But we should at least load them as responsibly as possible. (I wrote about [some strategies for optimising social media embeds](https://www.smashingmagazine.com/2022/02/reducing-web-carbon-footprint-optimizing-social-media-embeds/) for Smashing Magazine.)

One thing we might not consider, however, is whether the third parties themselves use green web hosting — that is, hosting that is powered by renewable energy. [Fershad Irani](https://twitter.com/fershad) has developed a useful tool that analyses the third-party scripts on your website: [Are My Third Parties Green?](https://aremythirdpartiesgreen.com/) checks whether they use a green web host (to the best of knowledge, via [The Green Web Foundation](https://www.thegreenwebfoundation.org/)’s dataset), as well as how much of your site’s overall size comes from third-party scripts, how effectively they’re cached, and their estimated carbon emissions.

Tools like this are great for shining a light on the environmental impact of our websites. Although measuring the carbon emissions of a website is far from an exact science, projects like this help raise awareness, and enable us to begin conversations and increasingly make informed choices.

[Visit the site →](https://aremythirdpartiesgreen.com/)
