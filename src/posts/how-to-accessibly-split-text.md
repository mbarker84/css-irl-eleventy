---
title: 'How to Accessibly Split Text'
date: '2019-08-27'
tags: ['post', 'html', 'typography', 'javascript']
---

I recently published an article on [animating variable fonts](/variable-font-animation-with-css-and-splitting-js) with the help of the Javascript library [Splitting.js](https://splitting.js.org). A few people asked about the accessibility implications of this, so in this article we’ll take a look at why splitting a string of text can be problematic from an accessibility point of view, and what we can do to make sure that split text is accessible to everyone.

## Splitting.js recap

Let’s say you have a word, a heading, a paragraph or a sentence and you want to change the style on a per-letter basis. The way that _Splitting.js_ works is it wraps each character (including whitespace characters) in a `<span>` tag and adding various attributes that allow you to more easily target and manipulate each one. It also wraps each word in its own span, so you can target them individually too. There are many creative possibilities!

The following Codepen demo contains an example of _Splitting.js_ in action, using custom properties in CSS to calculate a colour value for each letter. In this article I’ll describe the techniques I used to make it accessible.

<iframe height="369" style="width: 100%;" scrolling="no" title="Splitting JS accessible text with ARIA attributes" src="//codepen.io/michellebarker/embed/qBWrzLL/?height=369&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/qBWrzLL/'>Splitting JS accessible text with ARIA attributes</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Why is splitting text an accessibility concern?

Some people who are blind, partially-sighted, or find reading on the web difficult or problematic for different reasons might use screen reader software to assist them in navigating and exploring a website. Screen readers announce the content of the webpage aurally to a user. To better understand the experience of a person using a screen reader, I recommend watching [How A Screen Reader User Accesses The Web](https://www.smashingmagazine.com/2019/02/accessibility-webinar/), an accessibility webinar from Smashing Magazine.

This is one reason why semantic HTML is especially important: not everyone accesses our webpages visually, so using the right HTML elements for the right purpose makes navigating the page and finding relevant content much easier.

We might want to split a string of text for presentation purposes, but changing the markup within (for example) a heading can affect how screenreaders interpret the text and read it back to the user. Consider the following markup – a simple `<h1>` heading tag:

```html
<h1>Oh hello there</h1>
```

Now let’s look at the same heading split into `span`s:

```html
<h1>
  <span>O</span>
  <span>h</span>
  <span> </span>
  <span>H</span>
  <span>e</span>
  <span>l</span>
  <span>l</span>
  <span>o</span>
  <span></span>
  <span>T</span>
  <span>h</span>
  <span>e</span>
  <span>r</span>
  <span>e</span>
</h1>
```

With each character wrapped in an individual tag, some screenreaders will not interpret each word, but instead announce each letter individually. This would not be a very helpful experience for someone navigating the page using a screenreader!

This behaviour is not consistent between screenreaders. I initially tested this with VoiceOver on Safari, which has no problems reading the text as intended. Others, however, omit the word breaks and read the content as a single long word.

## Making it accessible with WAI-ARIA

Luckily, these accessibility concerns _don’t_ mean that we can’t use cool libraries like Splitting.js. We just need to go to a tiny bit more effort to ensure our text is accessible to everyone.

[WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) provides us with attributes for defining how elements should be presented to assistive technologies. While it is designed to help make websites more accessible, it is not a substitute for semantic HTML. It should be used when semantic HTML alone is not enough.

### aria-label

In the case of our example heading, we can provide an accessible text label for screen readers with the `aria-label` attribute:

```html
<h1 aria-label="Oh hello there">
  <span>O</span>
  <span>h</span>
  <span> </span>
  <span>H</span>
  <span>e</span>
  <span>l</span>
  <span>l</span>
  <span>o</span>
  <span></span>
  <span>T</span>
  <span>h</span>
  <span>e</span>
  <span>r</span>
  <span>e</span>
</h1>
```

Using `aria-label` alone can cause some screen readers to read out the text to read out both the text label _and_ the content. This is far from ideal – we don’t want screen reader users to have to listen to the text being spelt out for them after hearing the label. so we need to hide the element’s inner content from screen readers, which we can do using `aria-hidden`.

### aria-hidden

`aria-hidden` hides the element from the accessibility tree, so a screen reader will ignore it. We can’t hide the element itself, as then it won’t be read at all – but we can hide its children. So we have a choice here: we could add `aria-hidden` to each `<span>` in our heading:

```html
<h1 aria-label="Oh hello there">
  <span aria-hidden="true">O</span>
  <span aria-hidden="true">h</span>
  <span aria-hidden="true"> </span>
  <span aria-hidden="true">H</span>
  <span aria-hidden="true">e</span>
  <span aria-hidden="true">l</span>
  ...
</h1>
```

Or, if this feels a little tedious, we might choose to group all the children inside another span, and add `aria-hidden` to that instead:

```html
<h1 aria-label="Oh hello there">
  <span aria-hidden="true">
    <span>O</span>
    <span>h</span>
    <span> </span>
    <span>H</span>
    <span>e</span>
    <span>l</span>
    <span>l</span>
    <span>o</span>
    <span></span>
    <span>T</span>
    <span>h</span>
    <span>e</span>
    <span>r</span>
    <span>e</span>
  </span>
</h1>
```

### Using Javascript to add ARIA attributes

If we’re using _Spitting.js_ to create those child elements, we can add `aria-hidden="true"` to each word by using a `forEach` loop. As I mentioned earlier, _Splitting_ splits a sentence into words and wraps each one in a `<span>`, as well as wrapping each character. `Splitting()` returns an array of target elements, so we firstly need to loop over each one, then loop over each word within the split element. Then we can check if the element has an `aria-label` attribute, and if it does we add `aria-hidden`:

```js
/* Loop through all split elements */
Splitting().forEach((s) => {
  /* Loop through words */
  s.words.forEach((word) => {
    /* If the parent element includes `aria-label`, set `aria-hidden="true"` */
    if (word.parentElement.getAttribute('aria-label')) {
      word.setAttribute('aria-hidden', true)
    }
  })
})
```

This will result in an HTML structure something like this:

```html
<h1 aria-label="Oh hello there">
  <span aria-hidden="true">
    <span>O</span>
    <span>h</span>
  </span>
  <span> </span>
  <span aria-hidden="true">
    <span>H</span>
    <span>e</span>
    <span>l</span>
    <span>l</span>
    <span>o</span>
  </span>
  <span></span>
  <span aria-hidden="true">
    <span>T</span>
    <span>h</span>
    <span>e</span>
    <span>r</span>
    <span>e</span>
  </span>
</h1>
```

The user only hears the contents of the `aria-label` attribute, not the text inside the element itself. That takes care of our accessibility concerns and means we can split the text content of the element safely, knowing that it will be accessible to all.

It would be great if _Splitting.js_ could do this by default, although there are a lot of different considerations to take into account for different types of text. There is currently an [open Github issue](https://github.com/shshaw/Splitting/issues/19) for adding accessibility features.

_Thanks to [Andy Bell](https://andy-bell.design/) for signposting this accessibility solution in my twitter feed after I published the original post!_
