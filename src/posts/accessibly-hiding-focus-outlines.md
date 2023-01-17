---
title: 'Accessibly Hiding Focus Outlines'
date: '2020-08-09'
tags: ['post', 'javascript', 'accessibility']
---

**Update (January 2023): This article was written before `:focus-visible` was widely supported. Browsers have since implemented `:focus-visible` as the default for displaying the focus outline. I no longer recommend the solution detailed in this article.**

By default, browsers provide styling for elements when they receive focus. This varies from browser to browser, but is typically an outline around an element. In Chrome, the focus style manifests as a blue glowing outline. In Firefox it’s a thin dotted outline that inherits the element’s colour.

The focus ring (as it’s commonly known) should be regarded as a feature, not a bug. It’s especially useful if you’re navigating a website using a keyboard rather than a mouse: when tabbing through elements, the user can see exactly where they are on a webpage, and which element is currently in focus. [This article by Eric Bailey](https://css-tricks.com/focusing-on-focus-styles/) does a great job of explaining why focus styles are important. Unfortunately, its benefits are often poorly understood by clients and designers. Developers are frequently asked to remove the focus outline by others who believe it to be unintentional, or unsightly. Personally, I’ve fought this battle many time, and not always successfully.

## Styling with CSS

If you’re forced to hide the browser’s focus ring, the least you can do is provide an alternative focus style. We can use CSS to provide focus styles that are more in keeping with your website’s brand. We can style these using the `:focus` pseudo class, like so:

```css
input:focus {
  outline: 2px solid deeppink;
}
```

(Eric’s article also goes into additional options for styling, like `:focus-within`.) But that often relies on a designer providing focus styles that are _at least_ as accessible as the browser defaults (e.g. they provide a greater visible change than simply a change of colour, which people with colour blindness or other visual impairments may have trouble perceiving), and sometimes require a client to signoff on them. Sometimes there is an opportunity to back to the designer to request accessible focus styles, but other times you’re not in a position to delay the project.

## An accessible alternative with Javascript

Recently, my colleague [Carl Hughes](https://twitter.com/codekipple) pointed me to a solution from Spotify developer [José M. Perez](https://jmperezperez.com), which uses Javascript to hide the focus ring initially, then display it only when a user interacts with a key press, by appending a class to the document root:

```js
document.addEventListener('keyup', function (event) {
  /* if key is tab */
  if (event.which === 9) {
    document.documentElement.classList.remove('u-no-focus-outline')
    document.documentElement.classList.add('u-focus-outline')
  }
})
```

Then we can use CSS to hide the outline is the document has the “no focus” class.

```css
.u-no-focus-outline *:focus {
  outline: none;
}
```

Of course, you might not want to remove the focus ring on _every_ type of element, and you can style specific elements according to preference.

### Improving the accessibility

My colleague modified the code slightly so that the class is added with JS. That way the website will still be accessible if JS fails to load, as the focus styles will remain intact. Additionally, I made a couple of small changes: Switching the deprecated `event.which` property to `event.code`, and appending the class to the `<body>` tag instead of the document root (which is just a personal preference):

```js
document.body.classList.add('u-no-focus-outline')

document.addEventListener('keyup', function (event) {
  if (event.code === 9) {
    document.body.classList.remove('u-no-focus-outline')
    document.body.classList.add('u-focus-outline')
  }
})
```

This solution seems to be simple, elegant, and satisfies the client’s requests, while maintaining accessibility. I’m almost annoyed I never thought of it! It can be coupled with custom CSS styling for your focus states too, so that everyone gets a good experience that’s in keeping with the brand. There may be other issues I haven’t considered, so if you’ve come across any pitfalls with this method I’d love to hear about them. Otherwise, I can see no reason not to use it in production.

[Read the original blog post here.](https://jmperezperez.com/outline-focus-ring-a11y/)

## Future styling with `:focus-visible`

The `:focus-visible` [CSS pseudo class](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) is, in fact, designed to solve this very problem. We can use it to target only elements that are focused with a keyboard. Unfortunately, browser support is currently [very poor](https://caniuse.com/#search=focus-visible). As Eric’s article points out, there is a [polyfill](https://github.com/WICG/focus-visible), but I would personally favour the above solution over the extra development overhead that a polyfill adds.

Finally, I would like to point out that focus styles can be very useful in a number of ways that may not have been considered by a designer or client, even for mouse users, and removing them still might not be the best idea. From the article:

> Another point to consider is that focus styles can be desirable for mouse users. Their presence is a clear and unambiguous indication of interactivity, which is a great affordance for people with low vision conditions, cognitive concerns, and people who are less technologically adept.

Personally, I find it incredibly useful to have clear focus styles on form inputs, which makes is very obvious which field you’re currently filling in. So think twice before you remove those focus outlines – the browser adds them for a reason!

## Resources

- [:focus-visible and backwards compatibility](https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/) by Patrick H Lauke
- [Focusing on Focus Styles ](https://css-tricks.com/focusing-on-focus-styles/) by Eric Bailey
- [One of my favourite accessibility testing tools: The Tab Key](https://www.matuzo.at/blog/testing-with-tab/) by Manual Matuzovic
