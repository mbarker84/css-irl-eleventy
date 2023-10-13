---
title: 'A Native “Visually Hidden” in CSS? Yes Please!'
date: '2023-03-01'
tags: ['note', 'post', 'css', 'workflow']
---

If you’ve been writing CSS for any length of time, the chances are you’ll have come across situations where you need to hide some text visually, but still have that text available to assistive technologies (such as screenreaders). [Icon buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/) and [skip links](https://css-tricks.com/how-to-create-a-skip-to-content-link/) are just two examples. (There are plenty more.) Simply using `display: none` hides text from assistive technologies, which is not useful to us in this scenario. So developers over the years have come up with clever ways to hide text visually, which usually manifest as a utility class that gets copied and pasted into every project, often called `.visually-hidden` or `.sr-only` — something like:

```css
.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  overflow: hidden !important;
  margin: -1px !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}
```

It’s so common that even popular CSS frameworks like [Tailwind](https://tailwindcss.com) come with built-in `.sr-only` classes.

But as Ben Myers points out in this excellent article on [why the web needs this as a native feature](https://benmyers.dev/blog/native-visually-hidden/), there are problems with this. One issue is that there are many variations on this snippet, which have been found to cause problems as browsers and have evolved over time. Ben argues that it’s about time this became a native feature, and I absolutely agree. In the article, Ben outlines some of the advantages and drawbacks to the various forms this might take, such as a value of the `display` property, a property all of its own, or a HTML attribute. I recommend giving it a read, and hopefully something will come out of it 🙂

[Read the article](https://benmyers.dev/blog/native-visually-hidden/)
