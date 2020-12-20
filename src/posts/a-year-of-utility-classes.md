---
title: 'A Year of Utility Classes'
date: '2019-01-28'
heroImage: 'a-year-of-utilities-01.svg'
tags: ['post', 'workflow', 'css', 'tailwind']
---

<figure>
  <img src="/a-year-of-utilities-01.svg" alt="Utility classes surrounding a shapeless <div>">
</figure>

Last year at [Mud](https://ournameismud.co.uk) we adopted a utility-first approach to CSS (also known as atomic CSS). Specifically we decided to use [TailwindCSS](https://tailwindcss.com), a utility class framework, which provides a bunch of classes you can apply to your projects to rapidly build a UI.

Sarah Dayan published a great article last year about the [benefits of utility-first CSS](https://frontstuff.io/in-defense-of-utility-first-css), and I recommend reading that to get a good overview of some advantages to the approach on the whole. In this article I’ll summarise what I’ve learnt from adopting atomic CSS in an agency context over the past year, and where it might or might not be appropriate to apply it.

## What are utility classes?

Utility classes are CSS class names that serve one particular purpose, and are named as such. Typically a class like `.bg-blue` would give you `background-color: blue`, for example. It’s not uncommon to use utility classes within CSS, but on the whole they tend to be used sparingly – at least with well-established methodologies such as BEM and ITCSS.

The thinking around the rise of utility class frameworks turns this on its head, and advocates developing with utility classes first, with classes that cover virtually any common style you might want to apply to an element. There are many utility class frameworks around ([Tachyons](https://tachyons.io/) is one example), but Tailwind in particular provides simple class names that walk the fine line between brevity and being sufficiently descriptive. It might take a little while to memorize them at first, but most of the class names are fairly intuitive, and I found that after having a window open with the documentation alongside my project for a couple of days, I hardly needed to refer to them at all. (There’s even a [plugin for VS Code](https://github.com/austenc/vscode-tailwind-docs) to access the docs, so you don’t even need to leave your editor! I haven’t used this, so can’t vouch for it.)

A string of classes like `block p-1 mb-1 text-white bg-blue hover:bg-red` would be the equivalent to the following:

```css
.some-element {
  display: block;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  color: #ffffff;
  background-color: #3490dc;
}

.some-element:hover {
  background-color: #e3342f;
}
```

That means that our specificity tree is virtually flat. You’re not really using the “cascading” part of CSS at all – with a few exceptions, as we’ll soon see.

## A word on frameworks

The words “CSS framework” can be quite misleading, and conjure up different things for different people. For many people those words immediately bring to mind Bootstrap, Foundation and other similar frameworks, which provide HTML components and CSS classes to help you build interfaces. You can end up with a lot of extra CSS, because the frameworks include everything you might need. You can also spend a lot of time overriding the framework’s out-of-the-box styles if you want something that feels more bespoke.

The way utility class frameworks are applied is quite different – although not without issues themselves, as we’ll see.

### Configuration

One attraction of a utility class framework is that it can make development faster once you’ve become accustomed to the syntax. You don’t need to jump back and forth constantly between you HTML and CSS files, and classes are quick and easy to write – even faster if you use an autocomplete plugin like Intellisense in your editor.

The downside is you need to put in some initial legwork in configuration. Tailwind comes with a config.js file, where you define all your variables: colours, typography, sizing (padding, margins, etc.) and much more. There is a default config, but the chances are you’ll need to customise it quite extensively, and it’ll really pay off to do this upfront. It can feel like you’re spending a lot of time setting up before you’ve written any code, but if you invest in this the next stage becomes a lot quicker and easier.

(If you’re trying out Tailwind for the first time, or you just want to use it for some rapid prototyping then don’t worry, it comes with a default config file, so you can skip this step.)

### Naming is hard

At Mud we previously used BEM for naming CSS classes. This worked reasonably well on the whole, when applied correctly, but was still prone to human error or (in some cases) misapplication. Often, when going back to an older project, you could see a different approach had been taken by two different people who had worked on it. Tailwind removes such inconsistencies by reducing the danger of anyone going off-piste with their class names.

Using Tailwind means worrying about naming things a lot less. A common problem is naming a component, say `.news-card` and then find yourself repurposing said component for a completely non-news-related thing. It’s nice not to have to think about naming things. But on the other hand, it’s likely you still have to name your component _something_, so as a selling point for Tailwind this only gets you so far. It has definitely impacted the way I think about naming though, and I’m much more considerate of reusability these days.

### Utility classes in action

The first thing you’re likely to notice about utility classes, is that because they’re single purpose, you have to use a lot of them. That means, effectively, putting a shortened version of all your CSS classes into your HTML. That can make selectors pretty long, cumbersome, and quite frankly, ugly. I don’t mind admitting that this was extremely off-putting the first time I tried it, and went against every fibre of my being that railed against putting styles in markup. However, after using Tailwind for a little while it soon felt intuitive, and there’s a lot to be said for being able to look at a block of HTML and see at a glance which styles are being applied.

This isn’t without its downsides. Seeing all your styles displayed as one long string within your HTML can make it more difficult to see when you’ve made an error – duplicate or conflicting selectors, typos and incorrect class names can all go unnoticed. Several times I’ve typed a class name that I thought was correct, only to end up scratching my head, figuring out why my styles weren’t being applied. (I believe there may be a VS Code extension in the works for Tailwind linting, but don’t hold me to that.)

When you have a super long selector string to contend with, Tailwind has another option up it’s sleeve. You can simply extract those classes into your CSS file, like so:

```css
.my-super-class-name {
  @apply bg-blue text-white font-bold uppercase px-2 py-1 mx-auto mb-1 border-1 w-200;
}
```

That’s pretty handy. But then, why not write regular CSS, since we’re writing in our CSS file? Plus Tailwind doesn’t have classes for _every_ possible CSS style, so you might need to write some regular CSS anyway. Suddenly we have three possible ways we might be applying styles:

1. Inline Tailwind classes
2. Tailwind-in-CSS
3. Regular old CSS

I’ve tied myself into specificity knots far worse with Tailwind than with regular CSS, despite the fact that Tailwind appears to be promoted as a solution for such conundrums.

Another place where I found Tailwind difficult to work with was with component variants. We would often need to build several variants of the same component – e.g. a section containing a heading, a block of text and an image, which might have a few possible layout combinations but would otherwise include all the same CSS. With BEM you might have something like this:

```html
<article class="media-object">
  <h2 class="media-object__heading"></h2>
  <figure class="media-object__figure">
    <img class="media-object__image" src="some-image.jpg" />
  </figure>
  <div class="media-object__text-block"><p>...</p></div>
</article>
```

Class names are descriptive, and making some style changes to all those component variants would usually mean simply updating your CSS in one place. Now imagine you’re using utlity class in your HTML and you want to change every component’s padding from `1rem` to `2rem`. You’d need to go into the HTML file for each one, find that utility class and update it (without accidentally updating it in the wrong place). It might be a good idea to extract the styles into a CSS file the moment you find yourself repeating selector strings, but this also throws up some issues as previously mentioned. (I recognise that this won’t be a problem for everyone – if you build your components in React for instance, using Tailwind with Styled Components, you’re likely going to have just the one file and account for your variant by passing in props.)

### Plugins

Because Tailwind is configured with Javascript, you can do things like writing functions and passing them into your config. The advantage is it gives you all the power of Javascript, and you can also write your own custom utilites as plugins.

With regular CSS you might have a handful of utility classes in a Sass partial that you can apply thoughout your project when the need arises (I’ve often done this with a few reusable typography styles, for example). If you try and apply these alongside Tailwind classes this can end up causing confusion where you might expect styles to be overridden and they aren’t. (Which styles override which depends on the order of your imports.) Having learnt this the hard way, I would recommend writing your own custom utilities as Tailwind plugins rather than writing them in Sass. You get the benefit of having these output alongside all of Tailwind’s regular utilities, as well as being able to access Tailwind’s state and breakpoint syntax (e.g. `hover:bg-green` would give you a hover state of `background-color: #38C172`.)

The downside is this can be more of a learning curve for people coming who are less familiar with Javascript. I’m not convinced yet that knowing Javascript should be a prerequisite for writing good HTML and CSS.

### Performance

Theoretically, utility classes are designed to be re-usable and therefore you _should_ end up shipping a smaller CSS file. A smaller file should equate to better performance. However, left untouched, the framework would generate all the classes you might ever need, and leave you will a whole load of unused CSS, unless you take steps to strip it out. The expectation however, is that you would realistically never ship the entire framework. The documentation details a number of ways to remove unnecessary CSS and reduce the overall file size.

One way that’s recommended in Tailwind’s documentation is using a tool like [Purge CSS](https://www.purgecss.com/) as part of your build process. In practice you need to be vigilant about which classes you’re removing, particularly if you have some classes that are being added with Javascript. The Purge whitelist is your friend here – it took me a little while to get this right, and on several occasions I ran into trouble getting it to play nicely with my critical CSS.

### Another thing...

It’s a little thing, but I really like the media query functions, which you can use in your CSS files. Writing `@screen md` is so much quicker and nicer than writing regular media queries, or even mixins.

### When NOT to use Tailwind

Some people advocate using utlities for absolutely _everything_ – and by that I mean creating new utilities whenever they don’t already exist in Tailwind. I absolutely do _not_ recommend this approach. I work a lot with CSS Grid, and attempting to configure a utitity class for every possible layout combination would be crazy, not to mention seriously limiting yourself when it comes to being able to fully utilise Grid’s power. There is a [Grid plugin](https://www.npmjs.com/package/tailwindcss-grid) for Tailwind, but even its documentation says:

> It's not really practical to expose all of the power of CSS Grid through utilities, but this plugin is a good example of using CSS Grid to replace a cell-only float or Flexbox grid.

There are plenty of other CSS properties that it’s just not practical to try and replicate with Tailwind, so you’re probably still going to need regular CSS in some shape or form.

## Conclusion

Tailwind isn’t the magic bullet to fix all of CSS’s supposed problems, nor does it excuse you as a developer from understanding the cascade. If you’re someone who appreciates CSS’s underlying principles you might find it feels counterintuitive at first, but it’s worth persevering before you decide whether it’s the right approach for you. While I wouldn’t choose to use it for every project, there are clear benefits. I believe adopting Tailwind at Mud was the right decision for the team, making out CSS more reusable, maintainable and performant.
