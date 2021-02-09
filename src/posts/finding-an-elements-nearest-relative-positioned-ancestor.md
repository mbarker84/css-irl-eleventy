---
title: 'Finding an Element’s Nearest Relative Positioned Ancestor'
date: '2021-02-09'
tags: ['post', 'debugging', 'css', 'js']
---

Have you ever been faced with a CSS positioning dilemma where an element with `position: absolute` isn’t being positioned as you’d expect? Setting absolute positioning on an element will position it in relation to its nearest ancestor that has its position set to `relative`.

<figure>
  <img src="/finding-an-elements-nearest-relative-positioned-ancestor-01.jpg" alt="Two examples showing position of a purple element when the parent has relative positioning versus when another ancestor has it">
</figure>

In the above image, the absolute-positioned element is positioned with the same CSS in both examples:

```css
.absolute {
  position: absolute;
  top: 100%;
  left: 0;
}
```

But it ends up in a different place in each example. This is because in the first example its parent (the pink element) has `position: relative`, whereas in the second it’s another ancestor that has relative positioning (the grey element).

<p class="codepen" data-height="461" data-theme-id="dark" data-default-tab="css,result" data-user="michellebarker" data-slug-hash="ZEBOZdj" style="height: 461px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Relative and absolute positioning">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/ZEBOZdj">
  Relative and absolute positioning</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

It’s worth noting that if no ancestor has relative positioning, an element with `position: absolute` will be placed in relation to the `<body>`.

In a relatively simple example like this one, a quick examination of the CSS makes it easy to determine which ancestor has relative positioning, and we can adjust our styles accordingly if they’re not having the desired effect. But sometimes, in more complex codebases (especially with a lot of nested elements), finding which ancestor of an element has relative positioning can be a little trickier. This most commonly happens to me when building complex headers with full-width dropdown submenus: I generally need to position them in relation to the entire header, but somewhere I’ve inadvertently set `position: relative` on some other element, which breaks the desired behaviour.

Trawling through all that code can be time-consuming, but happily there is an easier way to find the nearest positioned parent in Javascript — which we can do right in the browser console.

In Chrome and Firefox, if we open the Console tab in the developer tools, we can get the currently selected element by typing `$0`. Then we can use the `offsetParent` object property to find the closest ancestor to that element that has its position set to something other than the default (`static`). Try selecting an element and typing this into the console:

```js
$0.offsetParent
```

This won’t actually tell us if the element has _relative_ positioning. But we can use `getComputedStyle` to find out the value of the element’s `position` property:

```js
getComputedStyle($0.offsetParent).position
```

By typing `$_` into the console we can retrieve the most recently evaluated expression as a variable, which can make this quicker too:

```js
$0.offsetParent
```

shows us the element. Then:

```js
getComputedStyle($_).position
```

retrieves its position value.

If that element’s position is something other than `relative`, we can do the same thing again and keep going up the DOM tree until we find our relative-positioned ancestor. If we’re feeling particularly clever (I’m not), perhaps we could even write a function to recursively search through the DOM for us! There are a couple of caveats: `offsetParent` will return null if the element has its postion set to `fixed` or itself or its parent has `display: none`. [See MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) for details.
