---
title: 'Relative Grid Items with CSS Variables'
date: '2018-09-13'
tags: ['post', 'css grid', 'custom properties', 'layout']
---

I was helping my colleague get started with a CSS Grid layout recently and he asked me if there was a way of offsetting grid items relative to one another, e.g “If column 1 ends at line _x_, make column 2 start at line _x + n_”. There isn’t exactly a way of doing this natively with Grid, you would need to explicitly position the items in this case. But it occurred to me that this could be a use case for CSS variables, or custom properties.

Previously I have compared the difference between CSS variables and Sass (or other preprocessor) variables as similar to the difference between `const` and `let` in JavaScript. CSS variables are more like `let` as they are dynamic, not static. But that analogy is a little misleading, as there is a crucial difference: With CSS variables there is no way of accessing a locally scoped variable outside of its scope.

An example:

```
.my-component {
	--bgColor: red;
}

/* This will not work, the variable is undefined */
.another-component {
	background-color: var(--bgColor);
}
```

Therefore, if we want to position the items on our grid layout relative to one another, we need to define those variables on the parent grid container so that they will be inherited by the children.

```
.grid {
	--start1: 1;
	--end1: 4;
	--start2: calc(var(--end1) + 2);
}

.grid__item:first-child {
	grid-column: var(--start1) / var(--end1);
}

.grid__item:nth-child(2) {
	grid-column: var(--start2) / 12;
}
```

The start line of the second `.grid__item` will always be two grid lines after the end line of the first item. If we have a second variant of our `grid` component where we want to change the position of the first `.grid__item` then the start of the second grid child will be updated accordingly:

```
.grid—2 {
	--end1: 6:
}
```

Here’s a demo of the concept in action:

<iframe height='365' scrolling='no' title='Relative columns with CSS variables' src='//codepen.io/michellebarker/embed/xajVqz/?height=352&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/xajVqz/'>Relative columns with CSS variables</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

One caveat here is that we need to watch that the position of our first grid item doesn’t cause the second item to be positioned beyond the total number of columns specified in our `grid-template-columns` property. In this particular case I’m hard-coding the item’s end line, so that’s not going to be an issue. But the first item could still push its start line over our column count, so that’s something to watch out for. Variables could be super powerful with `if` statements, but as yet we don’t have that capability in CSS!

We don’t need to stick to just two items either – in theory, we could have many items that are positioned relative to each other. Here’s a slightly more complex demo, where we’re placing items relative to one another on the column _and_ row axis:

<iframe height='365' scrolling='no' title='Relative grid items with CSS variables' src='//codepen.io/michellebarker/embed/PdaBvj/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/PdaBvj/'>Relative grid items with CSS variables</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

It’s possibly to do a similar thing with Sass variables, but the advantage with CSS variables is the reusability of our code for different variants of the same component. If we had multiple variants then we’d only need to update a few variables, rather than writing out the grid declaration all over again.

There are definitely some possibilities here, even though I haven’t worked on any real-world use cases yet where this approach would be preferable to manually placing items at different grid lines. I’d be interested to see if this method of placement works out for anyone, so if you try it out do let me know!
