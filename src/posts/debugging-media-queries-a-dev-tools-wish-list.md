---
title: 'Debugging Media Queries: A Dev Tools Wish List'
date: '2021-03-02'
tags: ['post', 'css', 'workflow']
---

The [Level 5 Media Queries specification](https://www.w3.org/TR/mediaqueries-5/) brings us the ability to detect a whole load of different user preferences from within our CSS file, and serve up styles accordingly. Current support for the various media queries within the specification is mixed, but there are some that already have widespread support and are safe to use right now. For instance, we can detect whether a user has their system preferences set to dark mode using the `prefers-color-scheme` media query:

```css
@media (prefers-color-scheme: dark) {
  /* Styles */
}
```

Or detect a preference for reduced motion — useful for making our sites more inclusive by restricting animations for users who suffer from motion sickness or vestibular disorders and change their system preferences accordingly.

```css
@media (prefers-reduced-motion: reduce) {
  /* Styles */
}
```

On a Mac you can enable reduced motion by going to _System Preferences > Accessibility_ and selecting the “Reduced motion” option.

Here’s a lesser-know media query I like a lot:

```css
@media (hover: hover) {
  /* Styles */
}
```

This detects the ability of the user’s primary pointing device to hover on the page. I’m using this in my current website redesign, to serve up slightly different styles for non-mouse users, or those browsing with touch-screen devices.

## Debugging media queries

With an increasing number of user preferences to detect, we don’t just have to consider that our website will look different at different screen sizes. It’s conceivable that how it look to the user might depend on a whole host of preferences.

Rather than having to test our sites by repeatedly switching our settings at a system level, it would be great if browser dev tools had the ability to toggle various user preferences on and off. Firefox recently added a dark mode toggle to their dev tools. You can find it under the ‘Rules’ panel in the inspector — try toggling light and dark mode on this site to see it in action!

<figure>
  <img src="/debugging-media-queries-a-dev-tools-wish-list-01.jpg" alt="Screenshot of the dark and light mode buttons within the Firefox inspector">
</figure>

I’d love to see a similar thing for the above features too, and even for [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) — which allow us to test for browser support within our CSS file, and provide fallback styles for browsers that don’t support the feature in question. It would certainly make it much easier to test all the possible appearances a website could have! The fact is, there are a whole lot of different ways people can browse the web, and there’s a good chance the way your site looks could vary widely. A solid starting point is to build with resilient, semantic HTML, and go from there.
