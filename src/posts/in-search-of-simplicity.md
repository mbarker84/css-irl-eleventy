---
title: 'In Search of Simplicity'
date: '2020-02-17'
tags: ['post', 'workflow']
---

<figure>
  <img src="/in-search-of-simplicity.jpg" alt="A grayscale close-up of a circuitboard">
</figure>

During the past month or so at [Atomic Smash](https://www.atomicsmash.co.uk/) I’ve been working on building our new front end framework (recently christened ‘Snap’) – a repository that includes all the scripts, packages and starter files to enable anyone in the development team to get started on a new project quickly and painlessly. Uppermost in my mind is the elusive goal of simplicity, in a front end development landscape that is anything but.

I’ve [written before](/building-a-dependency-free-site) about my frustrations with what can sometimes be unnecessary complexity in this industry, and of the refreshing experience of building my small portfolio site in only HTML and CSS. But, as I acknowledged in the article, that approach is almost certainly lacking when it comes to building anything more than a very simple site. We need to embrace development tools, providing they are more help than hindrance.

## What does “simple” mean?

“Simple” is a relative term, and what is simple for one person may be much more difficult for others. The main goal of the framework is to enable developers on the team to build smarter, faster and more consistently. We want to deliver a great user experience by shipping performant, accessible code. To do this we need to minimise redundancy and emphasise modularity. The design team play a key part in this too – a modular approach focused on building components rather than pages can only be realised if that attitude is permeated throughout an organisation.

## Pragmatic simplicity

But simplicity of outcome is only one part of the equation. Simplicity of outcome often (necessarily) hides complexity behind the scenes. The framework should be simple for any developer on the team to pick up and start a project with. But I don’t want other developers to feel like they’re picking up a black box. I want team members to feel that they too have ownership over the framework and the projects we build with it. As a team we should aim to build consistently, so that a project can be picked up and worked on by anyone in the team, should the need arise. But the fact is, different people have different areas of expertise, or are at different stages of their development journey – not everyone is comfortable and proficient with the same technology. I could insist that everyone use vanilla Javascript, but some people may be happiest with jQuery, and to try to prevent people using a tool that helps them do their job well is setting them up for a frustrating experience. So the framework should be prescriptive, without being restrictive. It should allow for flexibility and pragmatism.

## Build tools and trade-offs

After some investigation we chose to use [Parcel](https://parceljs.org) as our build tool. Parcel purports to be a “zero-config” module bundler, and is indeed very simple to get started with – I’ve [written previously](/a-modern-front-end-workflow-part-2) about how to get a simple project up and running using it. But choosing a build tool comes with trade-offs: Parcel is not as well-established as Gulp and Webpack, for example, so if you run into problems there is less support out there. On the other hand, keeping things relatively simple will (hopefully) result in fewer problems. But is wasn’t long before I found myself digging through more complexity than I’d anticipated, despite my best intentions. Plugins for SVG sprite creation and templating language support, for example, all add to the dependency overhead that needs to be maintained.

For now I’m satisfied that we’ve arrived at _just_ simple enough in order to make using Parcel worthwhile – if we need any more complex configuration it might be time to think about another option.

## Atomic CSS

I have a love/hate relationship with [atomic CSS](https://css-tricks.com/growing-popularity-atomic-css/), which I’ll spare you the details of. ([Read this article](/a-year-of-utility-classes) if you want to know my feelings!) Overall I believe the benefits for our team outweigh the pain points, and that applied mindfully, it does speed up UI development. At Atomic Smash we’ve recently opted to use [Tailwind CSS](https://tailwindcss.com/), which I was already pretty familiar with. But one of my frustrations is that it feels like a tool by and for Javascript developers. All the configuration happens in Javascript, and the complexity it adds to the toolchain is largely omitted from the discussion.

For example, if you’re using Tailwind, it’s pretty much essential to use [PurgeCSS](https://purgecss.com/) in your build to remove unused CSS, otherwise you ship a big old ~800kb CSS file. But to use Purge effectively you need to do yet more configuration – such as making sure that dynamically-added selectors aren’t purged, for example. The simplicity of the UI-building process is somewhat offset by the added complexity of keeping this machine alive. I spent hours trying to debug Purge, which was removing too many styles, before my colleague [Dave](https://twitter.com/david_darke) found the answer down the online equivalent of the back of the sofa (a Stack Overflow answer): a missing `!` in a code comment (missing also from Purge’s documentation, I might add).

Before anyone tells me I just “don’t understand” the benefits of atomic CSS frameworks – I understand them just fine, I like using Tailwind, and I believe it’s the right tool for the right situation. Just don’t kid yourself that it’s “simpler” than writing plain old CSS/Sass, because it’s not. Value your CSS developers, people.

## Documentation and communication

I’d take easy-to-use, intuitive tools over well-documented ones any day, but in a world where there aren’t enough of the former, the best we can hope for is the latter. One of the things I love about using [Gatsby](https://www.gatsbyjs.org/) is its documentation, which makes it relatively easy to use even without prior knowledge of React, or static site generators.

Documentation is empowering, and taking the time to document our framework properly is a big priority for me, with the goal that any developer picking it up will be able to find out how to get started, learn about best practices and troubleshoot common errors. My hope is that this documentation will continue to grow organically, and others will contribute to it as they become more familiar with using it, as well as contributing to the framework itself.

But documentation isn’t a substitute for direct communication – whether face-to-face if you can do it in person, or over the airwaves if you’re remote. I’m half-convinced that the key to keeping things simple is to talk to each other, and that the value of our communication is greater than the value of our tools. It’s too bad that it’s considered such a “soft” skill.

<aside>My pal <a href="https://twitter.com/hankchizljaw">Andy</a> wrote an <a href="https://hankchizljaw.com/wrote/keeping-it-simple-with-css-that-scales/">excellent talk/article</a> that makes some great (often overlapping) points about CSS and simplicity. Go read it!</aside>
