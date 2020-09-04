---
title: 'Using Pseudo-elements with CSS Grid'
date: '2018-04-19'
source: 'Originally published on Codepen'
srcUrl: 'https://codepen.io/michellebarker/post/using-pseudo-elements-with-css-grid'
tags: ['post', 'css grid', 'layout']
---

This week I’ve had a couple of scenarios where I’ve needed to build a hero section with a full-width image, a large heading and a translucent sidebar overlaying the image – where the sidebar bleeds to the edge of the viewport but (crucially) the _content_ of the sidebar aligns to what I like to call the “wrapper” grid columns – i.e. the columns of the grid where we actually want to place our content. (I have a whole other post almost written on this!)

This seems to be a fairly common occurrence with the designs that are coming my way these days, and it seems like a prime case for using pseudo-elements (`::before` or `::after`) as child items of the grid.

The markup for my grid looks like this:

```
<div class="grid">
	<div class="grid__fig">
	</div>
	<div class="grid__heading">
		<h1>CSS Layout News</h1>
	</div>
	<div class="grid__btn">
		<a href="#0">Subscribe</a>
	</div>
	<aside class="grid__sidebar">
		<ul class="sidebar__list">
			<li class="sidebar__item">...</li>
			<li class="sidebar__item">...</li>
			<li class="sidebar__item">...</li>
		</ul>
	</aside>
</div>
```

The `div` with a class of `.grid` is, unsurprisingly, our parent grid container, which we need to give the property attribute `display: grid`.

```
.grid {
	@media (min-width: 800px) {
		display: grid;
		grid-template-columns: [start] minmax(20px, 1fr) [wrapper-start] repeat(8, var(--col)) [sidebar-start] repeat(4, var(--col)) [wrapper-end] minmax(20px, 1fr) [end];
		grid-template-rows: minmax(3em, 1fr) auto minmax(auto, 1fr);
		grid-gap: var(--gutter);
		min-height: 100vh;
	}
}
```

Here I’m using CSS Variables to make the code more flexible and maintainable – if you need a primer [I wrote a bit about them here](http://codepen.io/michellebarker/post/super-powered-layouts-with-css-variables-css-gr). I’m also naming my grid lines to make it easy to place my items.

We have three direct children of the grid container: The background image (`.grid__fig`), the heading and the sidebar, which can all be placed on the grid. The grid line `wrapper-end` is where I want the _content_ of the sidebar to end, but the sidebar background needs to end at the the very edge of the viewport – the `end` grid line. Rather than placing the sidebar like this:

```
.grid__sidebar {
	grid-column: sidebar-start / end;
}
```

I can place it where I want the _content_ to go:

```
.grid__sidebar {
	grid-column: span 3 / wrapper-end;
}
```

(Rather than adding another named grid line, which might make the `grid-template-columns` property start to get a bit long-winded and confusing – particularly if we have even more items we want to place – I’m just using `span 3` to indicate I want it to always span 3 columns, and `wrapper-end` as the line where I want it to end. It’s really useful to be able to switch the syntax around this way.)

Now I just need to create a pseudo-element for the sidebar background and place it on the grid. In order to act as a grid child item it needs to be a pseudo-element of the _grid container_, not of a grid child:

```
.grid::after {
	content: '';
	display: block;
	grid-column: sidebar-start / end;
	grid-row: 1 / 4;
	background-color: rgba(#f405ed, 0.5);
}
```

The sidebar background is now in front of the sidebar content, so we just need to tweak the `z-index` a little:

```
.grid__sidebar {
	grid-column: span 3 / wrapper-end;
	...
	z-index: 1;
}
```

Here’s the end result (a homage to the magnificent [CSS Layout News](http://csslayout.news/)!):

<p data-height="339" data-theme-id="0" data-slug-hash="VxYzyW" data-default-tab="css,result" data-user="michellebarker" data-embed-version="2" data-pen-title="CSS Grid – CSS Layout News example" class="codepen">See the Pen <a href="https://codepen.io/michellebarker/pen/VxYzyW/">CSS Grid – CSS Layout News example</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

###Resources

As always, there are super smart people who have written about this stuff in-depth:

- [Faux Grid Tracks](http://alistapart.com/article/faux-grid-tracks) by Eric Meyer
- [Styling Empty Cells with Generated Content](http://www.smashingmagazine.com/2018/02/generated-content-grid-layout/) by Rachel Andrew
