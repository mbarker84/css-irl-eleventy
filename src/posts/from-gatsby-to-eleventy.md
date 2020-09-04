---
title: 'From Gatsby to Eleventy: Choosing a Static Site Generator for a Personal Site'
date: '2020-07-15'
tags: ['post', 'gatsby', 'eleventy']
---

<figure>
  <img src="/from-gatsby-to-eleventy-01.jpg" alt="Screenshot of Cassie Evans’ personal site">
  <figcaption><em>Fig 1</em> Cassie Evans’ personal site is resplendent with playful touches</figcaption>
</figure>

There have been _so many_ great personal site redesigns recently. [Cassie’s](https://www.cassie.codes/), [Jason’s](https://www.jason.af/) and [Josh’s](https://joshwcomeau.com/) are among my favourites, but there are plenty more flying under the radar. What characterises many of them is a certain playfulness, a resurgence of whimsy and delight. You can feel the love and care that has gone into them, the fact that their creators have carved out their little corner of the web to call home. Perhaps the pandemic situation, coupled with the popularity of Animal Crossing has something to do with this?

[Sarah Drasner](https://sarahdrasnerdesign.com/) has written recently about [the case for “fussy” websites](https://css-tricks.com/in-defense-of-a-fussy-website/). [Max Bock](https://mxb.dev) has put together a collection of come of these exceptional creations under the guise of [The Whimsical Web](https://whimsical.club/) – websites that “spark joy” (complete with the most joyful of fonts, Lobster!). It feel like the perfect time to get creative on the web, and bring your personality to your personal site.

<figure>
  <img src="/from-gatsby-to-eleventy-02.jpg" alt="Screenshot of The Whimsical Web">
  <figcaption><em>Fig 2</em> The Whimsical Web – a showcase of whimsical websites</figcaption>
</figure>

All of this has inspired me to do a little redesign of my own. My personal site, which I have previously [written about](/building-a-dependency-free-site/), is a very simple HTML and CSS landing page. There’s no build process, and no JS. While it serves its purpose perfectly well, it doesn’t tell the full story of who I am. I’d like my personal site to have more personality, and become a bit of a playground.

## Eleventy vs. Gatsby

I hope to work on my personal site over the coming weeks. One of the priorities is to use a static site generator, to make it easy to keep content up-to-date. If you’re unfamiliar with static site generators (SSGs), [this Netlify post](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/) explains what they are.

This blog uses [Gatsby](https://www.gatsbyjs.org/), and I briefly considered using it for my personal site too.

### Gatsby

Gatsby has a lot to recommend it:

- Most notably, the documentation is fantastic, including well-written tutorials, making it relatively straightforward to get up-and-running with a simple site very quickly.
- There is a large community around it, which makes it easier to find solutions to common problems.
- Templating in JSX, with all the power of React at your fingertips, makes for a great developer experience.
- Gatsby handles bundling and code splitting out of the box, no configuration required, and there are plenty of plugins to handle things like image optimisation.
- Sites built with Gatsby feel [lightning-fast](https://www.freecodecamp.org/news/how-gatsby-is-so-blazing-fast-c99a6f2d405e/) due to the use of React and built-in optimisations.

On the other hand, it has some drawbacks:

- Everything requires a plugin, and I mean _everything_. You need a plugin for that. There’s a large plugin-authoring community, but it feels a step removed from the raw materials of the web. Getting your hands dirty in the HTML isn’t really an option, and I kind of miss that.
- All of Gatsby’s bells and whistles can feel like overkill for a very simple site.
- Even a site that requires no JS, or is completely server-side rendered, ships a bunch of client-side JS in order to feel “lightning fast”. There is an argument for only sending JS to the client when you actually need it, and for a simple static site it might be unnecessary.

### Eleventy

[Eleventy](https://www.11ty.dev) is another static site generator that has been getting a lot of attention recently. While it doesn’t have as large a user base as Gatsby, (nor the VC funding to go with it), it does have a growing community, which is helpful for getting started. Just by looking at the growing list of sponsors, you can see it’s built by and for people who care about the web.

With Eleventy you can choose from a range of templating languages. Nunjucks is my preference, but you can also use Liquid, Handlebars or others. I like being able to write real, organic HTML, while JSX feels one step removed. (Not that I’m saying JSX is bad, but writing HTML always feels a bit like coming “home”!)

I’ve been eyeing Eleventy for a while (and dabbled a little bit), and rebuilding my personal site gives me the perfect excuse to take it for a full test drive.

Eleventy is much more of a “roll-your-own” static site generator than Gatsby, and any add-ons need to be configured. It doesn’t replace your build pipeline. I love using [Parcel](https://parceljs.org/) for working on side projects, so I thought I’d try it out in combination with Eleventy.

### Eleventy-Parcel: A starter project

<figure>
  <img src="/from-gatsby-to-eleventy-03.jpg" alt="Screenshot of Eleventy-Parcel, a starter project">
</figure>

[Eleventy-Parcel](https://eleventy-parcel.netlify.app/) is the resulting starter project, which uses Parcel to compile assets. It’s a fairly minimal starter with a couple of simple templates and base styles. I’ll be using it as the base for my personal site redesign.

In the project, Parcel compiles Sass to CSS and handles module bundling and image optimisation, while Browsersync reloads the page whenever your template files or assets change. While it’s designed around my own preferences, if you take it for a spin and it works for you, let me know! I’d love to see what other people build with it.

### Learning Eleventy

One are where I would say Eleventy is a little lacking is the documentation. It feels slightly harder to navigate than Gatsby’s docs, in that you kind of need to have an idea of what you’re looking for. The [Getting Started](https://www.11ty.dev/docs/getting-started/) tutorial assumes a certain level of knowledge, and in that regard it’s not quite as beginner-friendly for someone who might not already be familiar with static site generators.

However, there are a plenty of tutorials around to help you get started:

- [Build your own Blog from Scratch using Eleventy](https://www.filamentgroup.com/lab/build-a-blog/) by the Filament Group
- [Learn Eleventy From Scratch](https://piccalil.li/course/learn-eleventy-from-scratch/) (paid course) – a deep dive that goes beyond Eleventy alone, from Andy Bell
- [Beginner's Guide to Eleventy](https://tatianamac.com/posts/beginner-eleventy-tutorial-parti/) by Tatiana Mac. This is great because it actually explains what a static site generator is, and the pros and cons.

### Starter projects

If you don’t fancy wading through documentation and just want to get up-and-running quickly, there are a bunch of starter projects (other than my own) that have been lovingly crafted with this in mind. The website has a [long list](https://www.11ty.dev/docs/starter/), and here are a couple of my recommendations:

- [Hylia](https://hylia.website/) by Andy Bell – a simple blog starter, utilising Netlify CMS for content
- [Supermaya](https://supermaya-demo.netlify.app/) by Mike Riethmuller – helps you add rich features, without a complicated build process

## Conclusion

I’m no expert at Eleventy, but if you fancy trying it out then you could do worse than check out some of the resources in this article. Using an SSG is a great choice for developing a personal site, and I hope that in the coming years we’ll see more and more developers leverage Eleventy, Gatsby, and other SSGs to carve out a personal creative niche on the web. Long may the whimsical website revolution continue!
