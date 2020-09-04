---
title: 'Wrapping Up 2018'
date: '2018-12-27'
tags: ['post', 'workflow', 'inspiration']
---

The past few days I’ve been reading a lot of people’s end-of-year reviews, where they share their personal and professional accomplishments, and their hopes and goals for the year ahead. I wasn’t going to do one of these, but reading all the others got me feeling inspired, so here we are!

This being (primarily) a CSS blog, I’m going to keep most of this based around CSS, or at least front end development. But it’s been an interesting year of accomplishments for me personally too, so forgive me if I occasionally deviate into the personal. So let’s kick things off...

## What’s new in 2018

### CSS {In Real Life} was born!

One of my personal goals for 2018 was to do more writing. Writing about web technologies is something I used to do quite a bit of a few years ago while working as a designer and event producer. Switching to front end development full time at [Mud](https://ournameismud.co.uk/) in 2016, during a time of huge upheaval in my personal life, meant writing was put on the backburner for a while. It’s something I really missed. I had (and still have) so many ideas for things I wanted to write about, I decided 2018 was the year to make it happen.

CSS Grid has interested me for quite a long time – ever since attending [Rachel Andrew](https://rachelandrew.co.uk/)’s workshop in 2015. (Before that I was geeking out about [other kinds of grids too](https://www.smashingmagazine.com/2015/07/smarter-grids-with-sass-and-susy/).) Earlier this year I became interested in CSS variables and how they could be used in combination with Grid to help manage complex layouts, as a result of a project I worked on at Mud. I wrote up a _really_ quick article (I wrote most of it on the 20-minute train journey home), built a shaky proof-of-concept, and published it as a [blog post on Codepen](https://codepen.io/michellebarker/post/super-powered-layouts-with-css-variables-css-gr). That post ended up being more popular than I could have imagined, and was widely shared (over 22,000 views at last count!). That gave me a massive boost, encouraging me to start this blog and keep writing regularly.

### Super-powered layouts

2018 was the year of CSS Grid, CSS variables and super-powered layouts – at least for me. It was the year we really started to see Grid being used in production, and widely talked and written about. [Jen Simmons](http://jensimmons.com/) is one of the main people leading the way on this. This year she launched a YouTube channel, [Layout Land](https://www.youtube.com/channel/UC7TizprGknbDalbHplROtag), and heralded the dawning of a new era of web layout by coining the term _Intrinsic Web Design_ to describe the next evolutionary step forward, beyond responsive design. This episode of the [Big Web Show](http://www.zeldman.com/2018/05/02/transcript-intrinsic-web-design-with-jen-simmons-the-big-web-show/) is well worth a listen to get fully up to speed on what all this means for web layout.

### Gatsby

[Gatsby](https://www.gatsbyjs.org/) is a static site generator built with React – it’s what powers this blog, in fact. A couple of colleagues at Mud were playing around with it early this year and decided to give it a whirl. I’ve written [a post](https://css-irl.info/introduction-to-gatsby/) about it, so I won’t go into it all here, but basically it’s very fast, relatively easy for newcomers to get to grips with (you don’t even need previous knowledge of React – thanks to the excellent docs), and a bit of a gamechanger in the static site gen world.

It seems like other static site generators are emerging and/or upping their game this year. Although I can recommend Gatsby, I haven’t used others, so don’t have much of a reference point. I’d love to hear of any you can recommend and why!

### Firefox

I switched to Firefox as my default browser around October this year. The dev tools are fantastic and getting better all the time. There are now inspectors for CSS Grid (one of the major selling points for me!), accessibility, animation and more. MDN docs are the go-to for almost every developer I know, so to me it makes sense to support Mozilla. Not to mention being able to reclaim a little bit of my soul from Google, by no longer using Chrome.

With the recent news that Microsoft Edge will use the Chromium rendering engine in future, there’s all the more reason to support a truly independent browser and resist a monopoly. Jeremy Keith urges us all to [get behind Firefox](https://adactio.com/journal/14608).

### Tailwind

Earlier this year the Mud team decided to adopt utility-first CSS – specifically the framework [Tailwind](https://tailwindcss.com). After six months or so of using it, I can definitely see the benefits, and on the whole it was the right approach for us to adopt as a team. That’s not to say I’m an advocate for a utility-first approach in every situation, and there are certain drawbacks to counteract the positives. I’ll share my thoughts in a post in the next few weeks. In the meantime, here’s a [great article by Sarah Dayan](https://frontstuff.io/in-defense-of-utility-first-css) that breaks down why utility-first CSS is worth considering.

### Personal achievements in 2018

It’s been an exciting year for me personally. I spoke at four events, and published 20 articles, including two articles for [CSS Tricks](https://css-tricks.com/) – a major life goal! In November the writing took a bit of a dip as I spent the month learning React. (I took Wes Bos’s [React for Beginners](https://reactforbeginners.com/) course, which I thoroughly recommend.) In December I started a new job at [Ordoo](https://ordoo.co.uk/). I’m really excited to have the chance to work on a product and have a lot of creative input, as well as putting my new found React knowledge into practice!

### What’s not so great in 2018

Of course, it’s hard to talk about 2018 without thinking about the massive political shitstorm (there really is no other word for it) going on on both sides of the Atlantic. I don’t have much to say here that hasn’t already been said, and by far more articulate people than me. As much as I love working on the web, it can feel like what we’re doing is insignificant compared to the terrible, terrible things in this world. But on the other hand, it makes me feel like creativity, conversation and learning for learning’s sake are more important now than ever.

## Looking ahead to 2019

Now we’re onto the good part! These are the new CSS specifications that I’m really excited about – hopefully coming to a browser near you in 2019!

### Aspect ratio

We’ll soon be able to define aspect ratio on an image (or indeed on anything!) in CSS! No more padding hacks! This is part of the [Intrinsic and Extrinsic Sizing Module Level 4](https://drafts.csswg.org/css-sizing-4/#ratios), and is still in rough draft. Is it too much to hope it’ll land in 2019? Maybe. But I’ll stay hopeful!

### Subgrid

Subgrid (where the children inherit the grid of the parent container) is the main new feature in the [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/) spec. It’s probably one of the most-requested features in Grid, and is going to make Grid an even more practical choice for layouts. Rachel Andrew has an excellent [breakdown of what it means](https://www.smashingmagazine.com/2018/07/css-grid-2/). The spec is in Working Draft, but we shouldn’t have too long to wait!

### Environment variables

In a nutshell, CSS environment variables are like global variables. Ire Aderinokun summarises them nicely in [this article](https://bitsofco.de/css-environment-variables/). [The spec](https://drafts.csswg.org/css-env-1/) is in Editor’s Draft and will probably change – but some browsers are already supporting it, meaning you can play around if you’re curious.

## Goals for this blog

In 2019 I want to keep consistently writing on this blog, hopefully publishing fortnightly at a minimum. One of the things I had always intended to do with this blog is to share shorter and more frequent posts and code snippets from the projects I’m working on in everyday life. That didn’t end up happening, as every time I started writing an article I ended up going down a rabbit hole and writing several hundred more words than I planned to!

Blogging was always meant to be an enjoyable thing for me, so I don’t want to stress about it if life sometimes gets in the way. Hopefully I’ll keep writing and people will keep reading :)

I do want to make some improvements: Adding pagination, tagging and search functionality all feel pretty vital as the number of posts grows. So look out for some enhancements over the next few months.

I also want to start adding some better illustrations into my blog posts. I studied illustration for my degree, and used to do quite a bit of freelance illustration work, which has been put aside for a while. I’d like to weave that into my posts somehow!

## Personal goals

I’m not one for setting big, ambitious goals that I then feel under pressure to complete over the course of a year. But these are some things I’d like to do _at some point_ in 2019:

### Get better at public speaking

I spoke at four events this year, but I still don’t feel I’m great at it. The feedback I’ve had has been positive, but it doesn’t come naturally to me, and I still get nervous. Doing it has been a great confidence boost at times, and a good way to meet people.

### Do more drawing

This one doesn’t need much explaining, but it’s something I want to make time for without having the pressure of a deadline.

### Spend more time with my family and less time stressing

I’ve worked really hard in 2018, and while I certainly won’t be resting on my laurels, I want to give myself a bit of a break in 2019 to be healthy, and spend less time in front of the screen.

Happy New Year, and best wishes for a successful 2019 – whatever that looks like to you!
