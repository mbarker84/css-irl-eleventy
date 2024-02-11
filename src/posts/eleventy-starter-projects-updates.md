---
title: 'Eleventy Starter Project Updates'
date: '2024-02-11'
tags: ['post', 'workflow', 'tooling']
---

<figure>
  <img srcset="/eleventy-starter_1600.webp 1600w, /eleventy-starter_1200.webp 1200w, /eleventy-starter_900.webp 900w, /eleventy-starter_600.webp 600w" sizes="(min-width: 1200px) 1200px, 90vw" src="/eleventy-starter_1200.webp" width="1600" height="900" alt="Eleventy Parcel v2.2.0 screenshot">
</figure>

This blog uses static site generator [Eleventy](https://www.11ty.dev/) (or 11ty. I have no idea which one is the “official” spelling, and the docs appear to delight in switching gratuitously between the two! Let’s go with “Eleventy” for now.) under the hood. I like Eleventy because it allows me to write blog posts in markdown and use [Nunjucks](https://mozilla.github.io/nunjucks/) for templates, which get built into HTML file on deployment and served as static files, so it’s nice and lightweight on the client side. I also have an [Eleventy starter project](https://github.com/mbarker84/eleventy-parcel) that’s been long-overdue for some maintenance. I recently made a few updates, so I thought I’d note them down here.

Out of the box, Eleventy doesn’t apply any kind of bundling or optimisation to your CSS and JS files — it’s up to you, the developer to bundle those if you wish. Now, perhaps you don’t **need** any kind of bundling of those files. It’s perfectly fine to serve up raw CSS and JS for a small project, and the Eleventy docs explain [how to do that](https://www.11ty.dev/docs/assets/). To be honest, we could probably get away with that for this blog: even in their unoptimised form, the CSS and JS files would likely be smaller that those of most websites. But I wanted my starter project to be scaleable. I’ve been using [Parcel](https://parceljs.org) to bundle CSS and JS files, but I knew I could make some improvements to streamline the build process.

## What’s changed?

### Sass variables to CSS

CSS custom properties are more versatile than Sass variables, as they can be changed in different contexts. Where possible, I prefer to use vanilla CSS features (when they’re well-supported). Eventually I’d like to remove reliance on Sass entirely, and this is the first step towards that.

### Fluid type and spacing with Utopia

I’ve added custom properties for fluid typography and spacing using [Utopia](https://utopia.fyi/), one of my favourite tools that I find indispensable for working with modern CSS. These variables can be configured at the beginning of a project, and allow you to use values for padding, margins and typography that scale with the viewport — or even the container.

### SVG sprite

Icons reference an SVG sprite as a separate file, rather than the sprite being inserted into the HTML of the page.

### Simplified build process

I’ve upgraded to the latest Eleventy version, and instead of spinning up Browsersync I’m using the Eleventy dev server to watch template files and reload. As [Stephanie notes](https://11ty.rocks/posts/new-features-upgrade-considerations-eleventy-version-2/#configuration-build-and-serve):

> ...the default server is much faster and lighter and doesn’t require loading any JS during watch and serve local dev.

Because I’m using Parcel to bundle CSS and JS files, I just needed to add the source files as watch targets for Eleventy (in _.eleventy.js_), so that any changes to those will trigger a reload too.

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/css/')
  eleventyConfig.addWatchTarget('./src/js/')
}
```

I’ve also simplified things by taking advantage of Eleventy’s `addPassthroughCopy`, which copies files or directories over to the deploy folder, instead of using Node to do this (as was the case in the previous version).

### Blocking bots with robots.txt

I’ve added a _robots.txt_ file that’s copied over to the output directory at build time. It has a few rules for blocking some known AI user agents so (theoretically) the site can’t be used to train AI large language and diffusion models.

## What’s stayed the same?

### Sass

The project still uses Sass, and Parcel makes it really easy to transform Sass to CSS with its transformer plugin. The main reason I’m still using Sass is for breakpoint variables (which aren’t possible with CSS) and nesting, which only became universally supported in vanilla CSS very recently. In a future iteration I’ll probably convert the whole project to vanilla CSS and do away with Sass entirely.

If you wanted to use the starter project with just vanilla CSS, you could swap out the Sass file for a CSS file (making sure to update the file path in _layout.njk_, and the source file in _package.json_).

### Cache-busting

CSS and JS filenames are hashed on build using a Node script. Someone has made an [Eleventy plugin](https://github.com/mightyplow/eleventy-plugin-cache-buster) for this which I guess I could implement instead, but my own code seems to work just fine, and it’s nice not to worry about an extra dependency.

## Issues

You now need to run two commands to run the project locally, in order to run the Eleventy dev server **and** have Parcel watch CSS and JS files. I changed this because I was having a repeated issue where Eleventy would not respond the <kbd>CTRL</kbd> + <kbd>C</kbd> in the terminal and would continue to run. I assumed it was something to do with running Parcel at the same time, but in fact it still happens when I run Eleventy about 50% of the time. No idea why, I suspect it might be something to do with my Node environment.

Anyway, that’s my only gripe. I’m pretty happy with my setup!
