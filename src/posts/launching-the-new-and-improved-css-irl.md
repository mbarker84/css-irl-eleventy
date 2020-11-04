---
title: 'Launching the New and Improved CSS { In Real Life }'
date: '2020-11-04'
tags: ['post', 'workflow', 'eleventy']
---

After a few months of on-and-off work, this week I’m pleased to finally launch the new and improved version of this site! It’s not a major redesign, and if you’re just reading articles you might notice very little difference. But there are a few new features I hope users might enjoy. No doubt there are a few bugs to fix too! Please be patient while I iron those out over the coming weeks. :wink:

## New features

### Re-vamped homepage

The old homepage always felt a little bland. The new version gives more prominence to the latest article, and features a selection of popular topic tags, to make searching for an article a little easier. You can still click through to the “tags” page (via the [all topics](/tags) link) for a full list of the topics covered.

### Blogroll

Adding a [blogroll](/blogroll) to a site is becoming increasingly popular among the web dev community, as personal blogs are experiencing a resurgence. It’s a great way to find content without overly relying on Twitter or other social networks. [This is a list of some of the people I’m inspired by](/blogroll), whose blogs I read regularly. (I’m sure I’ve probably missed a few!) I’ll keep adding to this section over time.

### About page

The [About](/about) page was always fairly minimal, mainly because I hate writing about myself! But, almost three years into this blog, I decided I wanted to tell the story of how it came to be, and why I continue to write about web development. It’s not a page I expect to be frequently visited, but it’s always there, and easy to find.

### Fly out menu

With the number of page growing, the addition of a fly-out menu means I don’t need to worry about fitting an increasing number of links into the header. This is a way of keeping them neatly on-hand, and it’s keyboard-accessible of course.

## Behind the scenes

### Eleventy

The main driving force behind the “new” release is a move from static site generator [Gatsby](https://www.gatsbyjs.com/) to [Eleventy](https://www.11ty.dev/). I’ve written before about my [motivations for the change](https://css-irl.info/from-gatsby-to-eleventy/), and for the most part it’s been fairly painless – aside from a few minor sticking points, which are inevitable during the learning process. I have plans for the future of this site, which I feel more confident pressing ahead with now, with Eleventy as part of the toolkit.

Moving to Eleventy has also been an opportunity to refactor and remove dead code, as it was getting a little messy. Although I was able to copy over _some_ of the CSS, I decided to move from [CSS Modules](https://github.com/css-modules/css-modules) to a more traditional Sass architecture. I don’t hate CSS Modules, but overall I feel happier using BEM and regular Sass.

### Parcel

I’m using [Parcel](https://parceljs.org/) for module bundling and compiling assets. I’ve been using Parcel for the best part of a year, and I’m pretty happy with it as an alternative to Webpack. I wrote a [guide to getting started with Parcel](https://css-irl.info/a-modern-front-end-workflow-part-2/) earlier this year, and the site itself is based on my [Eleventy-Parcel](https://eleventy-parcel.netlify.app/) starter project. If you have a complex site and need more configuration options then Parcel might not be for you (it’s famously “zero-config”). But for my needs right now, it works just fine.

## Future goals

There are a few new features that I didn’t get around to adding for this release, but I’d like to add in the not-too-distant future.

### Dark mode toggle

While the site currently has dark mode support (through the `prefers-colour-scheme` media query, [chronicled here](/quick-and-easy-dark-mode-with-css-custom-properties/)), it’s better for the user to be able to control this and switch back to light mode if they wish, without having to change their system settings. I’m aiming to add this pretty soon.

### Related content

I’d like to display related articles at the end of blog posts, help users more easily access information on similar topics to the one they’re reading about.

### Recommended resources

In addition to the blogroll, I’m planning to add other recommended resources, such as podcasts, books, videos or courses. This blog is all about sharing and helping people to learn about web development. Sharing resources from others is part of that.

What are the features you’d like to see on CSS { IRL }? I’d love to hear your feedback!
