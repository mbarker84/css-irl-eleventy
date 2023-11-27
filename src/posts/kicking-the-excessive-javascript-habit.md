---
title: 'Kicking the Excessive JavaScript Habit'
date: '2023-11-27'
tags:
  [
    'post',
    'National Blog Posting Month',
    'javascript',
    'performance',
    'html',
    'opinion',
  ]
intro: 'Day 27 of National Blog Posting Month #NaBloPoMo'
---

The video of Ryan Townsend’s talk from [Performance Now()](https://perfnow.nl/), _The Unbearable Weight of Massive JavaScript_ is well worth a watch. Excessive JS, seemingly turbo-charged by JS frameworks, has long been a problem on the web, with bundle sizes showing no sign of decreasing.

https://www.youtube.com/watch?v=f5felHJiACE

As Ryan points out, all that JS is rarely in the service of users. Rather, architectural choices are made primarily for **developer experience**. It seems like few companies question whether they **need** a JS framework like React. Companies hire for React-and-Typescript, so developers learn those skills, and in turn they want to work with those frameworks because it’s what they know, so they push for those.

One slide in particular stayed with me:

> Trickle-down user experience

Yep, that’s it. We convince ourselves that by prioritising the developer experience that **we** want, we’ll be able to provide a better experience for users. The problem is, it’s just not working out that way. Our stacks are fragile, breakable. The slightest breeze and they come crashing down. Trickle-down user experience works pretty much just as well as trickle-down economics. What users want are fast, accessible, useable websites. We’re just not giving them that.

We’re also making things pretty complicated for ourselves, tying ourselves (and future developers) into an ecosystem of dependency spaghetti, and bending over backwards to re-implement things in JS that the browser gives us for free.

## You can count on web standards

It’s refreshing to see a renewed interest in web components in recent weeks — something I confess I still haven’t got around to learning properly. Rather than frameworks which come and go, and require regular love and attention in order to continue working, web standards are designed to be future-proof. And with new features like nesting and cascade layers, it’s becoming easier to write CSS at scale without requiring a build step.

I wouldn’t say there’s no place for JS frameworks, but they could definitely be used a lot less.

## HTML first...or is it?

Relatedly, this [HTML First](https://html-first.com/) manifesto(?) has been doing the rounds. On initial glance, I agree! HTML-first is what web standards people have been advocating for years, right?! And there’s some good ideas in there: Prefer “Vanilla” approaches over frameworks! Avoid build steps!

Where I’m not so sure I agree is on the idea that **everything** should go in the HTML. And some of the advice feels downright contradictory: the author advocates for libraries like [Tailwind](https://tailwindcss.com/) and [Alpine.js](https://alpinejs.dev/), which **do** require a build step, at least if you want to ship them in an efficient way, and I’m not sure that using HTML attributes in the way advocated in the example is more understandable. (Side note: Alpine.js bugs me because you end up littering your HTML with invalid attributes.) I’m not die-hard “separation-of-concerns-at-all-costs”, but I thinks there are benefits to separating CSS and JS from HTML on the whole. I’m not convinced that (as the author claims) “it will be easier for other developers to find and understand behaviour, navigate it, and make changes to it”.

The author proclaims that you should be able to right-click to view source and be able to understand the underlying code. Lots of people would agree, but again, I feel that’s a little contradictory when you’re peppering a web page with inline styles and JS. But to be honest, I don’t really care about being able to view source. I know that’s something of an unpopular opinion, but I’ve never found it particularly helpful. We have much better developer tools than 10 years ago, it’s never been easier to debug in the browser. As long as the HTML shipped to the user is valid and accessible, I’m not bothered what looks like underneath. So I understand where people are coming from when they lament the good old “view source” days, but I feel like to build a workflow around that risks once again prioritising developers over users.

I don’t want to dismiss everything in the article though. I love the idea of simplifying how we build for the web, and weaning ourselves of our excessive JavaScript habit. It’ll be interesting to see if some of these ideas catch on.
