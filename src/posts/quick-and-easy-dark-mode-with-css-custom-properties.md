---
title: 'Quick and Easy Dark Mode with CSS Custom Properties'
date: '2020-02-03'
tags: ['post', 'css', 'custom properties']
---

<figure>
  <img src="/quick-and-easy-dark-mode-with-css-custom-properties.svg" alt="Sun and moon illustration">
</figure>

Adding “dark mode” support to a website or app is becoming increasingly popular among developers, many of whom favour this setting themselves. Giving users a dark theme option can be beneficial for accessibility, as some people experience headaches or visual difficulties from excessively bright screens, or have trouble reading for long periods on a light background.

## Media queries

Thanks to the [level 5 Media Queries specification](https://drafts.csswg.org/mediaqueries-5/), implementing dark mode styles in your code for users who prefer it is relatively straightforward. By using the `prefers-colour-scheme` media query we can specify how our website should look for users who have selected a dark colour scheme preference in their system settings:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles go here! */
}
```

Alternatively we could go the other way and implement dark mode styles as the default, then override them for users who have specifically selected a light colour scheme, or who have no preference.

```css
@media (prefers-color-scheme: light) {
  /* Light styles */
}

@media (prefers-color-scheme: no-preference) {
  /* Styles */
}
```

Obviously you still have to go to the trouble of actually writing your CSS styles!

I decided to implement dark mode on this website recently and, thanks to CSS custom properties, I was able to do this pretty quickly and painlessly.

## Swapping SCSS variables for custom properties

The first step to implementing dark mode was to refactor my code to use custom properties for any colours, instead of Sass variables. Funnily enough, this was the most difficult part, as it requires renaming the variables - the reasons will soon become clear! Refactoring the primary or brand colour is fairly simple:

```scss
$primary: deeppink;
```

Becomes:

```css
:root {
  --primary: deeppink;
}
```

But others required a bit more thought. One such variable is `$bg-light`, which defined the colour of the light background of the site. To implement dark mode we need to be able to swap the background colour for a darker one, using the same variable name - it no longer makes sense to call it `--bgLight` when the colour it represents is not light!

I have three main background colours, so I settled on the following:

```css
:root {
  --primary: deepPink;
  --headerBg: #1d1d26;
  --textColor: #0e0f0f;
  --textColorInverse: #fcfdff;
  --bg: #fcfdff;
  --bgTint: #dfeded;
  --bgGrey: #e6e8e8;
  --white: #fcfdff;
}
```

This maximises the reusability of the variables, while still making it obvious what they represent.

## Re-defining the variables for dark mode

After that, all I needed to do is redefine the variables for the dark colour scheme. Some variables, such as the header background and the `--primary` colour, don’t need to change at all, and the rest of the colour palette is fairly limited. So I only had a few custom properties that needed to be updated for the dark theme:

```css
:root {
  --primary: deepPink;
  --headerBg: #1d1d26;
  --textColor: #0e0f0f;
  --textColorInverse: #fcfdff;
  --bg: #fcfdff;
  --bgTint: #dfeded;
  --bgGrey: #e6e8e8;
  --white: #fcfdff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #161618;
    --bgTint: #27272c;
    --textColor: #dbd7db;
    --bgGrey: #27272c;
    --textColorInverse: #0e0f0f;
  }
}
```

That’s literally all the code that’s needed to implement the dark theme! To test the theme I can go into my system settings and change my colour preferences to “dark”. On a Mac they are located under _System Preferences > General > Appearance_.

## Next steps

Right now, users of the website will get the dark theme of they’ve set their system preferences to “dark”, but they won’t be able to change it – at least without going back into their system settings, which is highly impractical. That isn’t ideal, as some users might prefer dark mode overall, but prefer the light colour scheme of a particular website. Clearly giving users a choice is preferable.

[Andy Bell](https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/) wrote a great article on how to add a toggle that allows the user to select their preferred colour scheme, using localStorage to store their preference. It’s something that I’d like to implement pretty soon.
