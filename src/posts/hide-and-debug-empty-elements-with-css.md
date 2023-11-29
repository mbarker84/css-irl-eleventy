---
title: 'Hide and Debug Empty Elements with CSS'
date: '2023-11-29'
tags: ['post', 'quick tip', 'National Blog Posting Month', 'css', 'layout']
intro: 'Day 29 of National Blog Posting Month #NaBloPoMo'
---

A tiny tip today, but a good one: use the `:empty` pseudo-class to hide pesky empty elements (commonly found in user-generated content).

```css
p:empty {
  display: none;
}
```

This will hide paragraph elements that have **no children**, or contain **no text nodes**. Text nodes include whitespace, so a paragraph containing a whitespace character **won’t** be hidden in this case. On the other hand, if a content editor has pressed <kbd>Enter</kbd> a bunch of times, this’ll do a great job of hiding those extra generated paragraphs.

`:empty` is also pretty handy for debugging. We can add a red outline to any empty element and see what might be causing us layout issues:

```css
:empty {
	outline: 1px solid red:
}
```

Grid layout are one place this can be useful. Sometimes it’s hard to understand why an element is placed on a particular grid column or row. It’s worth remembering that it could be down to empty elements!

<p class="codepen" data-height="384" data-default-tab="css,result" data-slug-hash="qBgMmMb" data-user="michellebarker" style="height: 384px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/qBgMmMb">
  Grid with empty cells</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Be aware, elements that only have content determined by the CSS `content` property will still be considered empty. It’s not good practice to use CSS for most content anyway — always put important content in your HTML.
