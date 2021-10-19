---
title: 'Evaluating Clever CSS Solutions'
date: '2021-10-19'
tags: ['post', 'css', 'layout', 'opinion']
---

[Ahmad Shadeed](https://twitter.com/shadeed9) recently published an [article](https://www.ishadeed.com/article/conditional-border-radius/) where he dug into Facebook’s implementation of the `border-radius` property on their card components. He had noticed, upon inspecting Facebook’s CSS, that the value for `border-radius` seemed quite convoluted for what amounted to a value of `8px`:

```css
.card {
  border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999)));
}
```

After some investigation, Ahmad discovered that this line of CSS was, in fact, a “toggle” — where under some conditions (namely, when the card was less than the full width of the viewport), the toggle would be “flipped”, and the computed value evaluating to `0px`. ([Read the full article](https://www.ishadeed.com/article/conditional-border-radius/) for details of how this works.)

## Toggles in CSS

Toggles aren’t an entirely new idea in CSS. Ana Tudor may have been the first person to explore the idea of CSS toggles with her demos on [DRY State Switching](https://css-tricks.com/dry-state-switching-with-css-variables-fallbacks-and-invalid-values/), where she uses a single custom property with a value of `0` or `1` to toggle between valid and invalid computed values. Lea Verou discusses a similar idea in her article, _[The -​-var: ; hack to toggle multiple values with one custom property](https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/#more-3162)_, this time using whitespace to cause declarations to evaluate to invalid values in order to switch them “off”.

The examples discussed in these articles aren’t quite in the same realm as Facebook’s `border-radius` implementation, as they don’t involve conditionally changing properties based on the size or layout, but rather a switch flipped “on” or “off” under the developer’s chosen conditions (such as on every _nth_ child, or within a media query). But they do introduce the idea of toggling different properties based on a single value, and it’s not too much of a leap to see how toggles could be implemented in other ways.

The Facebook solution has more in common with Heydon Pickering’s [Flexbox Holy Albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) (also mentioned in Ahmad’s article as the inspiration behind the method), in the way that it uses an unusually large value (say, 9999) to force a value to evaluate to either 0 or something other than 0. In Facebook’s case the CSS `min()` function then picks the smallest value from a list that includes the calculated value, then the `max()` function picks the largest from a list including _that_ value. Got that? Me neither...

## How clever is too clever?

While undoubtedly clever, and super interesting to read about, I side with Robin Rendle in the [CSS Tricks newsletter](https://css-tricks.com/newsletter/272-jams/) when he says:

> I can’t help but feel that it’s a little _too_ smart.

I have to agree here. Tricks like this have their place, and Facebook (which can clearly afford to hire the best of the best CSS developers) might be one of them. But speaking personally, when forced to pick between a trick like this and an ever-so-slightly less optimal but far more readable solution (say, a media query), in 99% of cases I’d plump for the latter. There are some reasons for this: I work at an agency, and most of the code I write will need to be maintained long-term by several developers with various levels of CSS knowledge. Most of their work will involve fixing bugs and building new features at the client’s request, within a limited budget. If the client asks to change the border radius on the cards and they’re faced with this monstrosity? They don’t have time to do an afternoon’s worth of research to make what should be a simple change. But hey, if it’s your personal project and no-one else has to maintain that code, go right ahead. Whatever works for you.

Where I’m _hoping_ Robin is wrong is this part:

> if every little property becomes as complex as the launch codes for a nuclear arsenal then I can’t help but feel that we’re doing something wrong here, that maybe the language is headed in the wrong direction.

It feel like we’re in a weird interim period of CSS, where we have a lot of cool stuff we didn’t have before, but we don’t yet have _everything_ we need to implement solutions like this elegantly. **But** the CSS gods are listening to us! There are some CSS specifications currently in draft that hopefully in the not-too-distant future will revolutionise how we deal with conditional property values like this, and eliminate the need for hacks. [Read Stefan Judis’ article](https://www.stefanjudis.com/blog/conditional-border-radius-and-three-future-css-features/) on how the above code might look when refactored to use [container queries](https://drafts.csswg.org/css-contain-3/) or [when/else rules](https://tabatkins.github.io/specs/css-when-else/).

I thought I’d take a look at how we can apply container queries to a very handy yet verbose CSS Grid declaration. The following code gives us a responsive grid where the number of columns is determined by the amount of available space, based on a minimum item width which is _either_ 350px _or_ 100%, whichever is smaller (using the `min()` function — so at viewport sizes below 350px the cards will be stacked vertically):

```css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
}
```

This is a great snippet, but there is absolutely zero chance I’m going to remember how to write it every time. (I had to Google it just now.) But using container queries, the code feels less verbose and more intentional.

```css
@container (width > 350px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}
```

Container queries and when/else statements have little to no browser support right now (none at all in the case of the latter), but given the current pace of progress in CSS, and the incredible people working hard on this stuff, I’m willing to bet that it won’t be too long before writing CSS for these kind of cases gets a whole lot easier.
