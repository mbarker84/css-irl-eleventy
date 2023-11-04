---
title: 'Code Gardening'
date: '2023-11-04'
tags: ['post', 'National Blog Posting Month', 'opinion', 'workflow']
intro: 'Day 4 of National Blog Posting Month #NaBloPoMo'
---

<figure>
  <img src="/code-gardening-01_900.webp" srcset="/code-gardening-01_1600.webp 1600w, /code-gardening-01_1200.webp 1200w, /code-gardening-01_900.webp 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="Vector illustration of a green plant sprouting against a deep purple background">
</figure>

In my spare time I do a bit of voluntary development work for an activist network. What I like about this kind of work (aside from helping a good cause) is that I get to experience an entirely different codebase, architecture and working process than I do in my paid employment.

I have a fair bit of front end development experience working with web agencies on a variety of projects, which gives me a good insight into different teams’ and individuals’ development processes, how to work within those, and when to introduce new processes or tools to help unify disparate ways of working. I’ve become pretty adept at refactoring, as well as knowing when to leave less-than-perfect code well alone. I built a lot of sites with the knowledge that they need to be maintained by people other than myself, with different skillsets.

In my current role at Ada Mode I mainly (but not exclusively) work on a single codebase for a software product in a small team, where I am a primary front end architect, decision maker, developer and maintainer. This requires some different skills and considerations. I’m partly coding for my future self, and with the knowledge that the project is a living codebase, one that will continually be maintained and reworked as the software is adapted, by people with a similar skillset to mine. I can spend time refactoring code that no longer serves its purpose, with less concern for client budgets, because I know that it’s time well spent to make the software more stable and maintainable.

## Planting seeds, pulling up weeds

Working on a volunteer project is different again. In some respects it’s similar to agency work, in that I work with a team of varying skillsets. But the team is dispersed, and everyone’s time is stretched. If you raise a ticket, it might be a year before anyone picks it up. Complete a task, and it could be months before anyone gets around to merging it into production. Lots of tasks get started and then put on hold, as people’s other commitments pull their time away. In the meantime, other bugs creep in, and tickets pile up. Much like a gardener, you can keep tending the plants and pulling up weeds, but the work is never “done”.

It’s a sprawling project, in a constant state of flux. It’s been built and added to over the years by a lot of people all doing the best they can, not always specialising in the area they’re working on. That can make for some chaotic and unwieldy code.

Some might see this as frustrating (and it can be), but it’s not all bad. Doing this kind of work is a great way to level up and learn new skills. I recently spent some time getting to grips with static site generator [Hugo](https://gohugo.io/). Have an idea for a feature of improvement? Try it out. You don’t need to wait for permission. And every pull request is an opportunity for improvement.

## A bit less broken

When I’m working on this kind of project it’s had to resist the urge to refactor everything. But that would easily spiral out of control, and no work would ever get deployed. A bit like a firefighter stopping to sweep up the debris while the fire rages out of control. Instead, I’ll settle for leaving things a bit less broken.

In my work on the front end, I’m forever spotting accessibility issues, no doubt baked in years ago. While working on a feature or bug fix, I’ll spend a few extra minutes restructuring the [heading levels](https://www.w3.org/WAI/tutorials/page-structure/headings/) for a page, refactoring a particular piece of UI into a reusable component, or adding focus styles to a button. It’s not the kind of work that’s going to win awards, but perhaps it’ll mean that someone will be able to access the information who couldn’t before, or that next time another developer picks up the project it’ll be just a little bit easier to work with. I’ve no idea who came up with the term “code gardening”, but that’s exactly what it is.

## Embrace the chaos

This is by no means the only type of project that can benefit from code gardening. But it’s perhaps one where its impact is most obvious. And like a gardener, the only real option is to embrace the chaos, throw aside perfectionist tendencies, and work with the nature of the project, not against it. And be kind to the other gardeners working alongside you, because they all care.
