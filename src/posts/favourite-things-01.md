---
title: 'Favourite Things 1: GSAP ScrollTrigger, Eleventy, and more'
date: '2020-08-31'
tags: ['post', 'css', 'javascript', 'eleventy', 'gsap']
---

<figure>
  <img src="/favourite-things.svg" alt="A flat-colour line illustration of a bookmarked stack of folders">
</figure>

For a while I’ve been thinking about publishing a semi-regular round-up of all the things that have been interesting me in tech recently, partly with the aim of helping others discover new things. (Hey, that’s what this blog is for!) Kind of like a newsletter, without the newsletter part. Although maybe it’ll eventually become a newsletter too!

So here’s the first of what might become a regular update. If you enjoy this and would like to see more, let me know!

## GSAP ScrollTrigger plugin

I’ve long been a fan of [Greensock Animation Platform](https://greensock.com/) (GSAP) for web animation. Although I rarely have the opportunity to use it in my day-to-day work, it’s always an absolute joy when I do. It has a really straightforward and intuitive API for creating web animations ranging from the simple to the complex. I find it particularly useful for SVG animations, and the latest version seems to hail a vast improvement in both performance and ease-of-use.

I’d heard good things about the ScrollTrigger plugin, and seen some absolutely stunning demos that use it, like [this one](https://codepen.io/ste-vg/full/GRooLza) from [Steve Gardner](https://twitter.com/steeevg), which is quite simply mindblowing. [This lovely site](https://www.una-europa.eu/) built by [Louis Hoebregts](https://twitter.com/Mamboleoo) and the [Base Design](https://twitter.com/Base_Design) team is the one that finally prompted me to spend some time trying it out for myself.

<figure>
  <img src="/favourite-things-01.jpg" alt="Screenshot of Codepen demo with aeroplane wireframe in foreground">
  <figcaption>Steve Gardner’s awesome demo showcases the power of GSAP ScrollTrigger</figcaption>
</figure>

Last year I wrote [an article for 24ways](https://24ways.org/2019/beautiful-scrolling-experiences-without-libraries/) about using CSS scroll-snap and the Intersection Observer API to create scroll-based animations without the use of JS libraries. While the tips in the article are perfectly valid for relatively simple content and transitions, there comes a point in more complex sites where the power that a library gives you can be a massive boon to productivity. A few months ago I tried to build a reasonably complex interactive, animated scrolling page with vanilla JS, and it was definitely more of a headache than I anticipated. (The project was temporarily shelved for unrelated reasons, so I’ll spare you the link!) Had I known about the ScrollTrigger plugin back then, I definitely would’ve used it. Having since played around with it, the big difference is the ability to really _orchestrate_ animations – I feel more like a conductor than a developer!

There is a bit of a learning curve involved, particularly if you’re new to GSAP. But investing a bit of time in it is completely worth it. I can’t wait to start using ScrollTrigger in real projects.

## Eleventy

I’ve [previously written](/from-gatsby-to-eleventy/) a bit about getting started with static site generator [Eleventy](https://www.11ty.dev/), and how it differs from Gatsby, which currently powers this blog. After becoming frustrated with the process of implementing a few new features in Gatsby, which seemed unnecessarily difficult, I decided to no longer delay migrating this blog onto Eleventy. I’ve made a start, getting the necessary project scaffolding in place, and expect to migrate the content and make the switch in the next few weeks – hopefully unveiling some new features at the same time!

Although not 100% straightforward (as with any new technology, there is a process of learning and getting to grips with best practices before getting into a comfortable groove), it already feels more like familiar territory to me. I think part of that has something to do with being closer to the “raw materials” of the web, while Gatsby (due to being React-based) feels a couple of layers away from that. It also allows me to use Nunjucks for templating, which I use day-to-day anyway. But it’s also no doubt partly due to my unfamiliarity with Node and GraphQL, which are particularly advantageous for doing any advanced development with Gatsby. If you’re comfortable with those, then Gatsby may well be better suited to your needs. I should also add, this isn’t the whole reason why using Gatsby doesn’t sit right with me. In recent weeks, some former employees/contractors have revealed a toxic work culture, which leaves a bitter taste for those of us wanting to support the “good” companies. Eleventy, with its supportive community of people who care about the web, feels like the “good” company.

## ThreeJS

I’ve been snatching chunks of time here and there to try to learn [ThreeJS](https://threejs.org/). I’d love to be able to build 3D interactive scenes, and I have endless admiration for people like [Ilithya](https://www.ilithya.rocks/) who make incredible things. So far I’ve only really got to grips with the basics. Thinking mathematically in three dimensions doesn’t come easily to me, but I’m pretty impressed with what you can do with even a basic grasp. I feel I need to spend a longer period of concentrated learning time to get beyond this, so thinking it’ll be more of a long term goal. My proudest accomplishment so far is turning my Atomic Smash colleagues into bouncing balls 😅

<iframe height="411" style="width: 100%;" scrolling="no" title="ThreeJS Atomic Smash team" src="https://codepen.io/michellebarker/embed/oNxNKRE?height=411&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/oNxNKRE'>ThreeJS Atomic Smash team</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Article: My Tech-Savvy Privilege

Every so often an article comes along that sticks in my head in a way that I can’t ignore. Right now it’s [this insightful article](https://ohhelloana.blog/my-tech-savvy-privilege/) by [Ana Rodrigues](https://twitter.com/ohhelloana). Ana is a wonderful writer who writes with such empathy about technology. In this article she eloquently points out how far removed we are, in our technically proficient bubble, from a large proportion of the real people who use our products. We simply have no understanding of what a frustrating (and sometimes debilitating) experience we are creating for some people. I often think about this when I encounter a problem with a service and cannot find a support phone number. If I, as a technically adept person, am finding this difficult, imagine that difficulty multiplied for those less familiar with what we regard as digital conventions. Ana’s article also reminds me a little of one I wrote for the [Pastry Box Project](https://the-pastry-box-project.net/michelle-barker/2015-march-4) a few years ago, when I was thinking about these things. Sadly, it seems not much has changed, and in some ways we’ve put up even greater barriers.

## New CSS property: content-visibility

Want to improve your site’s performance with relatively little effort? The new CSS `content-visibility` property looks pretty exciting! It enables the browser to delay rendering an element until it’s needed, thus cutting load time and allowing faster interaction with on-screen content. [Una Kravets](https://twitter.com/una) and [Vladimir Levin](https://web.dev/authors/vladimirlevin/) break it down [in this article](https://web.dev/content-visibility/). It’s only supported in Chrome right now, but let’s face it, that’s a large enough proportion of users to make it worthwhile using already.
