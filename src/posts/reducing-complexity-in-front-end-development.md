---
title: 'Reducing Complexity in Front End Development'
date: '2023-06-06'
tags:
  [
    'post',
    'css',
    'javascript',
    'opinion',
    'web sustainability',
    'workflow',
    'tooling',
  ]
---

One of my favourite sessions at [All Day Hey](https://heypresents.com/conferences/2023) conference last month was Jack Franklin’s talk [Abstractions, complexities and off-ramps](https://heypresents.com/talks/abstractions-complexities-and-off-ramps). As web applications grow larger, they inevitably fall prey to complexity, despite our best intentions. The prevalence of third-party libraries to solve everyday coding problems is both a blessing and a curse. It can be tempting to reach for an off-the-shelf solution to save time now, but what happens when that dependency is no longer maintained, or when developer needs change? Can you be sure you understand enough of the underlying code to fix any bugs created by pinning all-important functionality on an (often unpaid) open source maintainer?

We tend to `npm install` third-party dependencies unthinkingly. But these packages often rely on other dependencies themselves. A quick look in our Node modules folder quickly exposes the web of complexity within, which few of us can really fathom. A single point of failure can bring down the entire stack, like the well-worn “house of cards” metaphor.

Complexity isn’t the only issue, however. More dependencies often result in a bigger Javascript payload delivered to the user, with an accompanying negative impact on performance and [the environment](https://blog.webpagetest.org/posts/carbon-control/).

<figure>
  <img srcset="/reducing-complexity-01.jpg 1800w, /reducing-complexity-01_1200.jpg 1200w, /reducing-complexity-01_800.jpg 800w" sizes="(min-width: 1200px) 1200px, 90vw" src="/reducing-complexity-01_1200.jpg" width="1200" height="829" alt="Screenshot of Bundlephobia analysis of create-react-app, showing total bundle size and download time of 2.85 seconds on slow 3G">
  <figcaption>A <a href="https://bundlephobia.com">Bundlephobia</a> analysis of create-react-app shows a total package size of 492.5kB and 11 other dependencies.</figcaption>
</figure>

## Radical solutions

One of Jack’s more radical suggestions is to commit our Node modules to the repository. (You could almost hear the collective gasp of the developers on the room at this point in the talk.) But as he breaks down the reasoning, it makes more and more sense. Not only does this provide increased visibility of the size of our dependency tree (so we can’t fail to be aware of our application’s complexity), it means that we can skip the installation step. If something happens to a public package, we have our own copy **that we know works**.

I can certainly think of a few downsides of this approach, but just maybe the positives outweigh the negatives? Updating our packages would become more of a conscious task, giving us the opportunity to assess whether we still need them.

## Use the platform

Jack envisages a time when we can vastly simplify our JS stack — if not eradicating third-party dependencies completely, leaning on the web platform, and ensuring external dependencies are carefully considered and regularly evaluated. If this sounds like a distant dream, it’s worth remembering that just a few short years ago, this was in fact the case.

It’s only relatively recently that we’ve had all the world’s code virtually at our fingertips, and since then the web platform has become infinitely more capable. Just look at the plethora of new CSS features released in recent years that place more power in the hands of developers: container queries, `:has()`, colour functions, cascade layers and much more. We’re even on the cusp of getting native [view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/), something that was previously the preserve of JS frameworks.

Yes, we expect more for our web apps today that we did a few years ago. But many would argue that the increase in functionality hasn’t necessarily translated to a better user experience, as web pages became more bloated.

## When to evaluate third-party code

### New projects

Starting a new project always feels like a great opportunity to streamline and keep things clean, including our dependency tree. But over time, complexity inevitably creeps in if we’re not careful. So it’s worth carefully assessing dependencies as and when we feel we need them: whether they provide all the benefits we need, where they might fall short, how much time they will save us compared to writing our own, or whether they are too heavy-handed for our needs. Sometimes the answer is “yes, we still need them”! But it should be deliberate choice.

### Old projects

Legacy projects are harder, as they already likely come with a lot of baggage. Working out what is and isn’t needed can be headache.

When we encounter bugs with existing dependencies, we could treat it as an opportunity to consider whether that dependency is still necessary. I recently encountered a bug with modal dialogues on a web app I was working on. It turned out to be the result of the package I had been using to handle modal accessibility (because this stuff is hard!), which hadn’t been maintained in over a year. Rather than attempting to find a replacement, or code up a solution myself, it seems a great time to replace this with the native HTML `<dialog>` element, which is now well-supported.

This isn’t going to be natural conclusion for everybody: `<dialog>` only gained support in Safari in 2022, meaning there are likely to be a proportion of users stuck on legacy versions of that browser for whom this will not work. But there is a [polyfill](https://github.com/GoogleChrome/dialog-polyfill), which will likely be easier to remove once there is a satisfactory amount of support among your user base than a fully-featured library. The important thing is to evaluate on a case-by-case basis. (Read Scott O’Hara’s article [Use the dialog element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html) for more info.)

## New platform features

These are some other web platform features I’ve been able to replace old libraries with.

### :focus-visible

`:focus-visible` now has wide browser support, and support can be detected with CSS is order to provide a fallback, meaning that the polyfill I had previously used could be removed.

### Custom properties

I’m currently working on an old project that contains a lot of redundant code, and is also a huge pain to even get up and running. Not wanting to add complexity to what was already an unwieldy codebase, I elected to eschew a build step and style with vanilla CSS. Modern CSS features have made this way more viable than a few years ago, but custom properties especially are a life-saver. They effectively replace Sass variables, and can do so much more besides.

### scroll-behavior

Often when a user clicks an in-page link, we want the page to smoothly scroll to the appropriate point. This used to be the preserve of Javascript, but now we can do it easily in CSS with `scroll-behavior: smooth`.

```css
/* Only apply smooth scrolling when the user hasn't set their motion preference to "reduce" */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Offset the element scrolled to */
section {
  scroll-margin-top: 5rem;
}
```

We can also initiate smooth scrolling to a specified position [in JS](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo), without the need for a library:

```js
element.scrollTo({
  top: 200,
  left: 0,
  behavior: 'smooth',
})
```

### Intersection Observer

Animating elements as they scroll into view can add an elegant touch to a web page. Thanks to the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), we can detect when an element arrives or leaves the viewport without reaching for heavy JS libraries.

## Think before you `npm install`

This isn’t to say that **all** library features can easily be replaced. We’ll still likely be importing third-party code for some time. But instead of doing it automatically every time, let’s take the time to pause and consider whether we really need to.

[Watch Jack Franklin’s talk from All Day Hey→](https://heypresents.com/talks/abstractions-complexities-and-off-ramps)
