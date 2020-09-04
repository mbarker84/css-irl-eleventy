---
title: 'CSS Grid: More Flexibility with Minmax()'
date: '2018-04-29'
source: 'Originally published on Codepen'
srcUrl: 'https://codepen.io/michellebarker/post/css-grid-more-flexibility-with-minmax'
tags: ['post', 'css grid', 'layout']
---

One of the things that can put people off trying out CSS Grid is there’s so much choice when it comes to defining your grid layout and placing your content, so it can be hard to know until you’ve been using it a while which is going to to be the best option for a particular layout. It’s only recently that I got around to fully appreciating the power of [`minmax()`](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax) and how it can be such a huge helper when coding many of the layouts I’m required to build, so I’d like to share one way in which it’s been beneficial to me.

`minmax()` is a function that can be used in your `grid-template-columns` or `grid-template-rows` property to size your grid tracks. It takes (you guessed it) a minimum value and a maximum value, which can be a length (pixels, ems, etc.), a percentage, a flexible `fr` unit or a keyword. [Here’s a good article explaining it in depth](http://bitsofco.de/how-the-minmax-function-works/). Jen Simmons also discusses `minmax()` and the future of layout in [an episode of her Layout Land](https://www.youtube.com/watch?v=mVQiNpqXov8) channel.

There are lots of ways that `minmax()` can be useful, but I want to demonstrate one way in particular. A lot of common layouts feature a “wrapper” grid that needs to fill the viewport (with some padding) up to a certain breakpoint (say, 1200px) and then grow no bigger. Content needs to occasionally bleed to the edge of the viewport, but in most cases align to this wrapper.

In terms of building a grid, what we need is:

- 12 equal-width columns that take up a percentage of the available space, up to a maximum value (1200px (minus any gutters) divided by 12 (the number of columns)).
- One flexible “padding” column either side with a minimum value of 20px, which after our arbitrary breakpoint will expand to fill the remaining space.

Up until recently the way I’ve been coding these layouts is to set a breakpoint of just slightly over the wrapper width (plus padding columns) at which I change the values in my layout:

```
.grid {
	display: grid;
	grid-template-columns: 20px repeat(12, 1fr) 20px;

	@media (min-width: 1200px) {
		grid-template-columns: 1fr repeat(12, $col) 1fr;
	}
}
```

Before the breakpoint our layout consists on 12 flexible columns (using the `fr` unit) and two fixed “padding” columns. At a min-width breakpoint of 1200px I’m redefining the layout to have 12 fixed-width columns and two flexible padding columns. I could make this code more maintainable with CSS Variables ([as I’ve written elsewhere](https://codepen.io/michellebarker/post/super-powered-layouts-with-css-variables-css-gr)), but in fact I’m not using CSS Grid to it’s full potential.

This also has some drawbacks: If I update any of my values, I need to make sure I adjust everything else accordingly. Plus if any of my calculations are slightly off, I get some undesirable effects happening around the breakpoint, where my grid columns actually take up more space than is available.

So now I realise that I’ve been creating unnecessary work for myself, what can I do about it?

By using `minmax()` smartly, I can actually do away with the media query altogether. I’ve tried to use `minmax()` to do a similar thing in the past, but without fully understanding that when I need my central columns (“tracks” in grid terminology) to be flexible, my outer columns need to be fixed, and vice versa. The key with a layout like this is to be explicit with when you want columns to be flexible and others to be fixed.

###Example 1

<iframe height='332' scrolling='no' title='minmax() - Example 1' src='//codepen.io/michellebarker/embed/YLNxPQ/?height=332&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/YLNxPQ/'>minmax() - Example 1</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This first example our columns grow flexibly (using the `fr` unit) but aren’t constrained by a maximum width, so they keep growing, no matter how wide the viewport gets. All of our columns are equal width, including the two padding columns:

```
.grid {
	display: grid;
	grid-template-columns: repeat(14, 1fr);
	grid-gap: 10px;
}
```

###Example 2

<iframe height='336' scrolling='no' title='minmax() - Example 2' src='//codepen.io/michellebarker/embed/GdrvJy/?height=336&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/GdrvJy/'>minmax() - Example 2</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Here I’m introducing `minmax()` to size our central grid tracks. By setting minimum of `auto` I can ensure the columns are wide enough for the content – empty columns will collapse ahead of ones that have content in:

```
.grid {
	display: grid;
	grid-template-columns: 1fr repeat(12, minmax(auto, $col)) 1fr;
	grid-gap: 10px;
}
```

####Auto vs. Zero

One thing to note is there is a difference between setting a min value of `auto` and a min value of `0`. In the following demo, while it may not be obvious at large viewport sizes, if you resize your browser you’ll see in the first of the two grids all of the columns collapse at the same rate, while in the second grid the first column remains wide enough to fit the content.

<p data-height="340" data-theme-id="0" data-slug-hash="deNjdY" data-default-tab="html,result" data-user="michellebarker" data-embed-version="2" data-pen-title="CSS Grid minmax()" class="codepen">See the Pen <a href="https://codepen.io/michellebarker/pen/deNjdY/">CSS Grid minmax()</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Back to Example 2, if you resize the window you can see our padding tracks collapse to nothing. We want to maintain a minimum width for these columns so we need `minmax()` here too.

###Example 3

This is the layout we want:

<iframe height='336' scrolling='no' title='minmax() - Example 3' src='//codepen.io/michellebarker/embed/OZWjME/?height=336&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/OZWjME/'>minmax() - Example 3</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Here we’re specifying a minimum value of 20px for our padding columns and allowing them to grow (using the flexible `fr` unit) when space allows. At the same time we’re doing the opposite with our central columns, specifying that we want them to be flexible right up until they reach our calculated `$col` value, and then grow no larger.

```
.grid {
	display: grid;
	grid-template-columns: minmax(20px, 1fr) repeat(12, minmax(auto, $col)) minmax(20px, 1fr);
}
```

When I realised this was a much simpler way of coding the layouts I’ve been building I definitely had a “d’oh” moment! But CSS Grid is so new and different to anything we’ve had in CSS before, and offers so much choice for constructing layout, that it really takes a lot of people using it in the real world to fully understand what is possible. I hope I can help make it simpler for others to use CSS Grid today!
