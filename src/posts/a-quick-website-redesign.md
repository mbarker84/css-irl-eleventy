---
title: 'A Quick Website Redesign'
date: '2023-01-25'
tags: ['post', 'workflow', 'tooling', 'inspiration']
---

In my [2023 review](/2022-in-review/) I mentioned that I wanted to give this site a revamp. This week I carved out some time to do just that. So, here it is: Welcome to the new and improved CSS { IRL }!

## Design improvements

I felt like the previous UI was becoming a bit muddled as I added new features on an ad-hoc basis, without sitting down and committing to a plan. Also, I was just sick of looking at it! So this design is a bit more stripped back visually, without too many unnecessary flourishes, while still keeping some nice little touches, like [animated underlines](/animating-underlines/) on hover. Other improvements include a better mobile experience (via the expanding/collapsing tag menu), and the ability to filter by category of post (currently “articles”, “notes” or “quick tips”, which I might add to over time).

If I had any sense I’d do a few visual mockups in Figma or something before jumping straight into the code. But I’m an impatient developer, at least when it comes to my personal projects, and this is probably a masterclass in how **not** to do a redesign. All the planning went on very much in my head, supplemented by short, handwritten to-do list. Analogue, baby!

But regardless, I’m pretty happy with the result. The layout has less visual clutter, and a lot more breathing space. Looking at it makes me feel calm. Hopefully I can resist the temptation to add complexity over time.

## The technical stuff

There has been quite a bit of refactoring behind the scenes, but still plenty more to do. I’ve cleaned up and stripped out a lot of old CSS, and leaned even more into custom properties. But I’ve also been lazy with some of my naming conventions and CSS architecture (sshhh, don’t tell anyone 🤫), in the interest of avoiding delaying deployment. I’ve learnt from experience that waiting for perfection means waiting a looooong time, and have long been fighting my perfectionist urges in order to put **something** out into the world!

I’m still considering rebuilding with [Astro](https://astro.build/), but that’s a bigger job, plus the current tooling works just fine for now. I’m content to just deploy the redesign for now, and at least tick one thing off my to-do list!

## Future feature inspiration

During the redesign process I started thinking about some of the things I’d like to add to the site over time. As I mentioned in a previous post, the recent Twitter debacle has underlined the importance (to me, at least) of having somewhere you can call “home” on the web, where **you** own your content, not some tech wanker.

### Personalisation

I love the idea adding more personalisation, and have been enjoying these articles by [Sophie Koonin](https://localghost.dev//blog/everything-should-have-an-api-adventures-in-trying-to-automate-stuff/) and [Robb Knight](https://rknight.me/automating-my-now-page/) on automating a “now” page. Perhaps I’ll get around to doing that sometime.

I’m also inspired by [Ana Rodrigues’s blog](https://ohhelloana.blog), where nearly post has a “now” section. In fact, Ana’s whole blog feels incredibly intimate and personal, even down to her writing style, which I love. The challenge will be incorporating personal touches without adding the aforementioned clutter.

### Webmentions

[Andy Bell](https://andy-bell.co.uk) recently wrote about how he implemented an [expandable webmentions](https://andy-bell.co.uk/improving-likes-on-my-site/) section on his site, which is super cool — and also reminded me that I should get webmentions on here. If you’re not too familiar with webmentions, [this article I came across](https://daily-dev-tips.com/posts/goodbye-comments-welcome-webmentions/) seems like a good explainer.

### Projects

One of the next features I’d like to add is a “projects” section, to share some of my work that isn’t exclusively blog posts. Look out for that soon perhaps. In the meantime, enjoy the new site!
