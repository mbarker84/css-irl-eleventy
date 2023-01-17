---
title: 'Disentangling Frameworks'
date: '2023-01-17'
tags: ['post', 'workflow', 'opinion', 'css']
---

The other day I came across a pretty much textbook use case for container queries in the web app I was working on. We have this card component that displays a health summary for the section of the app the user is currently inspecting (which could be a wind turbine, a system within that turbine, or the entire wind farm). Generally we want to show that towards the top left of the screen, with some other information on the right. On certain pages however, the information on the right will be absent, so we want the health summary component to go full width. Easy enough, but we also want to style the component differently when it takes up the entire width by aligning the text to the left and giving it a more horizontal layout.

<figure>
  <img src="/disentangling-frameworks-01.svg" alt="UI layout with two widgets side-by-side">
  <figcaption>When we have two widgets to display, the left one should have centered text</figcaption>
</figure>

<figure>
  <img src="/disentangling-frameworks-02.svg" alt="UI layout with one wide widget, with a horizontal layout">
  <figcaption>When the right-hand widget is absent, we should left-align the text of the other one, and display is as two columns</figcaption>
</figure>

“Hooray!” I thought. I can use a [container query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries), and include the [polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill) to cover the ever-shrinking number of browsers that don’t yet support container queries. (Firefox is the only evergreen browser that doesn’t support them, at the time of writing). Here’s how we’d write those styles with a container query:

```css
.container {
  container: widget / inline-size;
}

@container widget (inline-size > 500px) {
  .component {
    /* Styles to be rendered when the component is wider than 500px */
  }
}
```

There’s just one problem: The codebase uses [Tailwind](https://tailwindcss.com/), a utility class CSS framework. To style an element with Tailwind, we append multiple classes (or “utilities”) to an element to handle individual CSS properties, rather than styling the element in our CSS file.

With Tailwind:

```html
<h1 class="text-5xl text-blue-700 p-4 mb-8">Hello world</h1>
```

As opposed to styling in regular CSS:

```css
h1 {
  font-size: 3rem;
  line-height: 1;
  color: rgb(29 78 216);
  padding: 1rem;
  margin-bottom: 2rem;
}
```

As frameworks go, Tailwind is perhaps the most divisive, with a lot of strong opinions batted back and forth on both sides. This isn’t a post arguing for or against Tailwind, so I’ll save my opinions for another time. But on the whole I take a pragmatic view: while I don’t elect to use it on my own personal projects, in my experience it has its advantages when working in a team.

What I like about though, it that in theory you can use as much or as little Tailwind as you need. Like, if you want to just use it to generate a bunch of utility classes for commonly used colours in your app you can. Everything else should just get stripped out at compile time, and you can happily write the rest of your CSS in a regular old CSS file.

## Yes, but...

So, why is this a problem when using container queries? Well, the polyfill doesn’t seem to work with a Tailwind project. This could be a a unique issue to do with my bundler as well as Tailwind itself in conjunction with the polyfill. I’m sure given the time I could more-or-less figure out **why** it doesn’t work — the polyfill is loading and doing **something**, it’s just not having any effect on the container-specific styles. If I remove Tailwind, the polyfill works as expected. In this case, the simplest solution, given the time constraints, was to scrap the container query and implement the desired styles a different way instead.

<aside><p>Tailwind has an official container query plugin for writing container queries as utility classes. When I tried this approach I had the same issue with the polyfill not working. However, my preference would be to write container queries in actual CSS!</p></aside>

## Un-Tailwinding

But really that’s neither here nor there. The point is that it made me pause and think about the repercussions of introducing dependencies into our projects. Suppose we want to stop using Tailwind one day?

Tailwind has some pretty strong opinions on how it wants you to write CSS. The documentation encourages developers, even when breaking out into a separate CSS file (something that the authors try to dissuade you from doing unless absolutely necessary), to use their `@apply` directive, meaning that all of your CSS is dependent on being compiled with Tailwind.

So if we decided we didn’t want to use Tailwind anymore, it would be pretty hard to extract and compile our Tailwind CSS into a manageable CSS file. Interestingly, someone has built a [tool to extract classes into regular CSS](https://tailwind-to-css.vercel.app/). But a large project would require **a lot** of manual copying and pasting, and refactoring, and it would be easy to mess up. My hunch is that the best option would be to refactor individual components gradually over time, until you have just regular CSS and can remove the dependency entirely.

## The platform always wins

My point is that when evaluating the use of a dependency that has such a large reach within a project, it’s wise to also consider what happens when that dependency is no longer useful to us, or when a new release contains significant breaking changes that it might necessitate a large refactor to keep our project up to date. This is true of JS dependencies as well as CSS frameworks.

Sometimes we can’t avoid a large dependency: many projects built with React or Vue or similar frameworks would be unfathomably complicated to manage without. But these frameworks have relatively quick release cycles, and require maintenance to keep up to date.

By comparison, web standards evolve comparatively slowly, but they evolve slowly for a reason: features that are added now need to be supported **forever**. They are not designed to become obsolete. So whenever possible, the safest, and most future-proof bet is to use the native features of the web platform.
