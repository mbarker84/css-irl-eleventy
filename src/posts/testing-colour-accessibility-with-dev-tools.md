---
title: 'Testing Colour Accessibility with Dev Tools'
date: '2023-02-07'
tags: ['post', 'quick tip', 'workflow', 'css', 'tooling']
---

I often use the [WebAIM colour contrast checker](https://webaim.org/resources/contrastchecker/) to check my colours against WCAG (Web Content Accessibility Guidelines) standards while building websites. Recently I noticed a handy feature in Firefox dev tools to make checking for sufficient colour contrast really easy.

<figure>
  <img src="/testing-color-accessibility-with-dev-tools-01.jpg" width="465" height="361" alt="Screenshot of the Firefox colour picker with accessibility informations">
</figure>

If you inspect an element’s CSS in the dev tools inspector you’ll notice any colours are accompanied by a little colour swatch. Clicking on this brings up a colour picker — handy for trying out different colour options in the browser. For the `color` property, this colour picker also shows the contrast ratio of the text colour compared to the colour beneath (either the element’s background colour, or the background colour of an element beneath). It turns out Chrome has a very similar feature too. That’s super useful for experimenting with accessible colour combinations, without even leaving your browser tab!

## Colour contrast simulator

Firefox has another useful feature for checking our colours are accessible: the colour contrast simulator. Found in the “Accessibility” tab in the dev tools panel, this feature simulates different colour vision deficiencies. [Check out the full write-up](https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/simulation/index.html).
