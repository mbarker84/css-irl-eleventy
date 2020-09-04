---
title: 'Aspect Ratio Cells with CSS Grid Layout'
date: '2018-05-27'
source: 'Originally published on Codepen'
srcUrl: 'https://codepen.io/michellebarker/post/building-an-aspect-ratio-css-grid-layout'
tags: ['post', 'css grid']
---

I found myself recently building a layout in CSS Grid that would have previously needed JavaScript in order to work. It’s a layout based on equal sized square grid cells, where grid items could span one or two cells on the row and/or column axis. In other words, the grid <em>cells</em> needed to maintain an aspect ratio (1:1 in this case), but the actual grid <em>items</em> did not necessarily, something like this:

![1:1 aspect ratio grid](https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/Grid%201.svg)

Chris Coyier explores aspect ratio with Grid in [a post here on CSS Tricks](https://css-tricks.com/aspect-ratios-grid-items/), and documented a solution very similar to the layout I was trying to build, using the relatively well-known [padding hack](https://css-tricks.com/aspect-ratio-boxes/). The downside is that the aspect ratio acts on the grid children, not on the parent grid container. If you don’t place items in grid track row (if you wanted an empty row, for example) the grid cells would collapse. In this illustration, the cells outlined in red would collapse to a height of zero (or whatever height we set on the `grid-template-rows` property):

![1:1 aspect ratio grid, with cells that would collapse highlighted in red](https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/Grid%202.svg)

My goal was to be able to define the aspect ratio on the grid cells themselves, so that they would always maintain this ratio even when empty. I wanted to see if, using [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (also known as custom properties), I could figure out a solution that might be work for me, allowing me to create grid cells of any aspect ratio I choose.

The solution I came up with might not work for everyone in all situations, as it’s dependent on knowing the width of either the outer container, and (as it’s based on using `calc()` to calculate the grid row height) this must be either a fixed value or viewport unit, it can’t be a percentage. I wouldn’t recommend creating aspect ratio boxes this way in general, as often with responsive design we don’t know the exact width of any given item. However, when working with Grid I generally find that I <em>do</em> know the width of the outer grid wrapper. (More on this later.)

First we need a few values:

- Wrapper width
- Grid gutter width
- Number of columns
- The aspect ratio we want to achieve for our grid cells

I’m going to save these values as variables, which will be useful when it comes to doing the calculations for the grid:

```
:root {
	// We just need to know these 3 values up front:
	--wrapper: 100vw; // e.g. Must be a viewport unit or fixed value, e.g. 100vw, or 1200px
	--gutter: 10px;
	--noOfColumns: 4;

	// And our aspect ratio:
	--ratioA: 1;
	--ratioB: 1;
}
```

We’re going to use `grid-template-columns` and `grid-auto-rows` to define our grid.

\*Side note: `grid-auto-rows` is a useful alternative to `grid-template-rows` for defining [implicitly created grid tracks](https://css-tricks.com/difference-explicit-implicit-grids/). It’s possible we don’t know how many rows there will be, but we want them all to be the same height.

This will look something like the following:

```
.grid {
	width: var(--wrapperWidth);
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: var(--rowHeight);
	grid-gap: var(--gutter);
}
```

The `--wrapperWidth` and `--gutter` values should be our known values. The `--rowHeight` value is the one we want to calculate. We can use our `--wrapperWidth` and `--gutter` variables to calculate the row height. For a grid with an aspect ratio of 1:1, the calculation is relatively simple:

```
:root {
	--wrapperWidth: 100vw;
	--gutter: 10px;
	--noOfColumns: 4;

	--rowHeight: calc((var(--wrapperWidth) - (3 * var(--gutter))) / 4); //  where 4 is the number of columns and 3 is the number of gutters
}
```

Then we can use the `--rowHeight` value in in our grid-auto-rows property:

```
.grid {
	width: var(--wrapperWidth);
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: var(--rowHeight);
	grid-gap: var(--gutter);
}
```

This will result in grid cells with a height the same as their width:

<iframe height='338' scrolling='no' title='Aspect ratio Grid boxes with CSS Variables' src='//codepen.io/michellebarker/embed/mLprKY/?height=338&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/mLprKY/'>Aspect ratio Grid boxes with CSS Variables</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Placing items

In this particular grid I can let CSS Grid’s auto placement algorithm do most of the work. Most of the grid items should span a single cell and follow the normal flow. The only items I want to place explicitly are the large grid items, which span two tracks in either direction:

```
.grid__item--lg {
	grid-column: span 2;
	grid-row: span 2;
}

.grid__item--right {
	/*
		the second large item needs to align to the right,
		so I’m specifying that it should end at the last grid line
	*/
	grid-column-end: 5;
}
```

If I want the rest of the items to fill in any spaces I can use `grid-auto-flow: dense;` on the grid container, otherwise any subsequent items will simply take the next place in the flow.

### Variables for columns

For this particular grid I know that I always want it to have four columns (and therefore 3 gutters between columns), so to keep the calculation simple I’ve hard coded these numbers in the `calc()` function. But if we want the grid adapt to different situations (e.g. we want to increase the number of columns visible on large screens) then we could use the `--noOfColumns` variable instead:

```
:root {
	--wrapper: 100vw;
	--gutter: 10px;
	--noOfColumns: 4;

	// Number of gutters is columns minus 1:
	--noOfGutters: calc(var(--noOfColumns) - 1);

	// Calculating the row height:
	--rowHeight: calc((var(--wrapperWidth) - (var(--noOfGutters) * var(--gutter))) / var(--noOfColumns));

	@media (min-width: 42em) {
		--noOfColumns: 6 // increasing the number of columns after the 42em breakpoint
	}
}

.grid {
	/*
		Don’t forget to use the variable here too:
	*/
	...
	grid-template-columns: repeat(var(--noOfColumns), 1fr);
	...
	}
```

### Dealing with Overflow

We might also want the cells to expand if the content overflows the grid cell. With Grid we can use `minmax()` to allow the grid cells to expand vertically to fit the content:

```
.grid {
	...
	grid-auto-rows: minmax(var(--rowHeight), auto); /* This tells the grid that
	the cells must be a minimum of our row height value, but should expand if
	the content is longer */
	...
}
```

If we want to force cells to maintain aspect ratio, even when there is overflow, we can just omit `minmax()` and use the calculated value instead.

### Changing the aspect ratio

What about if we want our grid cells to be a different aspect ratio, e.g. 16:9 or 4:3? This is where defining our number of columns, and our aspect ratio values comes in. It makes our row height calculation a bit more complex as we need to calculate variables from other variables, but you only need to write out that calculation once – if you update the values of any of the primary variables then the grid row height will be calculated automatically:

<iframe height='341' scrolling='no' title='Aspect ratio Grid boxes with CSS Variables - with variable ratios' src='//codepen.io/michellebarker/embed/wjjqex/?height=341&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/wjjqex/'>Aspect ratio Grid boxes with CSS Variables - with variable ratios</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If we wanted we could now have multiple grids on a page with different aspect ratios, only updating the two variables for each one.

### CSS Variables vs. preprocessor variables

We can acheive a very similar outcome using preprocessors like Sass instead of CSS Variables. There are advantages and disadvantages to either method. With Sass we can save the calculation as a function and call it when defining our grid. We could even have different aspect ratios for different grid rows, like in this example:

<p data-height="339" data-theme-id="0" data-slug-hash="VxdXRY" data-default-tab="css,result" data-user="michellebarker" data-embed-version="2" data-pen-title="Aspect ratio Grid boxes with Sass (with function)" class="codepen">See the Pen <a href="https://codepen.io/michellebarker/pen/VxdXRY/">Aspect ratio Grid boxes with Sass (with function)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

This example actually compiles to <em>fewer</em> lines of CSS than the equivalent example with CSS Variables.

On the other hand, with CSS Variables, if we wanted to create another grid with a different aspect ratio (or change our ratio at different breakpoints, all we need to do is update the variables, rather than writing out the whole `grid-auto-rows` property again:

```
.grid--1-1 {
	--ratioA: 1
	--ratioB: 1
}

.grid--16-9 {
	--ratioA: 16
	--ratioB: 9
}
```

I would caution against mixing preprocessor variables and CSS Variables, and in my opinion CSS Variables lend themselves very well to helping build flexible and maintainable layouts with CSS Grid, as [I’ve written previously](https://codepen.io/michellebarker/post/super-powered-layouts-with-css-variables-css-gr). Whichever method you choose is a matter of personal preference, and what works for you and your team!

### Making it responsive

As I wrote earlier, this method relies on knowing the outer width of our grid container in order to calculate the row height. Quite often you would probably want the grid to span the full viewport width up until a given breakpoint, possibly with a standard margin or padding either side. With CSS Variables we can adjust any of the values at different breakpoints, including the wrapper width. Here’s a working example, where I’m altering the wrapper width, number of columns and aspect ratio at larger breakpoints:

<iframe height='337' scrolling='no' title='Aspect ratio Grid boxes with CSS Variables - responsive' src='//codepen.io/michellebarker/embed/dexNXK/?height=337&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/dexNXK/'>Aspect ratio Grid boxes with CSS Variables - responsive</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

CSS Grid syntax with CSS Variables can look intimidating, but if you give it a chance and start playing around with the two of them, you might find it a helpful tool to build complex layouts!
