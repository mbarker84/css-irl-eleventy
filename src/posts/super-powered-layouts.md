---
title: 'Super-powered layouts with CSS Variables + CSS Grid'
date: '2018-03-29'
source: 'Originally published on Codepen'
srcUrl: 'https://codepen.io/michellebarker/post/super-powered-layouts-with-css-variables-css-gr'
tags: ['post', 'css grid', 'custom properties', 'layout']
---

We’ve been using CSS Grid in production at [Mud](http://ournameismud.co.uk/) for a few months now and I absolutely love the flexibility it’s giving me when coding layout. For so long we've got along without a true layout solution for the web - hacking it with floats and flexbox was just how we did things. But now, I honestly cannot imagine life without Grid!

One thing that’s only come to my full attention more recently is [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (or Custom Properties). CSS Variables work a bit like variables in Sass and other preprocessors. The main difference is they’re compiled in the browser, unlike preprocessor variables, which are compiled into fixed CSS values before they hit the browser. CSS Variables are true dynamic variables that can be updated on the fly, either in your stylesheet or with JavaScript, which makes them super versatile. If you’re familiar with Javascript, I like to think of the difference between preprocessor variables and CSS Variables as similar to the difference between `const` and `let` - they both serve different purposes.

CSS Variables can have a whole host of useful applications (such as theming, for one). One way I’ve been looking at making use of CSS Variables recently is in layouts using CSS Grid where I need to redefine my `grid-template-rows` and `grid-template-columns` properties at different breakpoints. Here’s an example in the following pen, where I’ve used Sass variables to define my small and large column widths, which I’m passing into the `grid-template-rows` property. I’m doing the same with the `grid-gap` property, so that my gutters increase in size for each breakpoint:

<iframe height='345' scrolling='no' title='Updating Grid track sizes Sass only' src='//codepen.io/michellebarker/embed/JLprPb/?height=345&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/JLprPb/'>Updating Grid track sizes Sass only</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

As you can see, I basically have to write out the entire block of code again within the media query in order to pass in the second variable, as the variable is fixed once defined. (I could of course use a mixin, but the net effect is the same - a bigger chunk of code.)

With CSS Variables I can down on the amount of code, as I can simply update my variable inside the media query and the browser recalculates my grid. Ten lines of (Sass) code may not seem like a huge saving, but the code is so much more readable - instead of having to add media queries in several places to deal with our new variables I can just declare them at the beginning of the code for that component and not have to worry about making sure I’ve replaced every value where it’s being used:

<iframe height='338' scrolling='no' title='CSS Variables updating grid track sizes' src='//codepen.io/michellebarker/embed/XEVoqJ/?height=338&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/XEVoqJ/'>CSS Variables updating grid track sizes</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

One thing I’ve found with using CSS Grid is the syntax is quite verbose and it’s not always simple to see exactly what’s going on quickly and easily, especially with a complex grid. But using CSS Variables in this example I can set variables for the size and co-ordinates of Grid items and only write out the grid-column and grid-row properties once. This to me is a lot clearer than writing the full properties out every time, and very easy to see at a glance where we’re placing any grid item.

<iframe height='342' scrolling='no' title='CSS Variables for randomly generated Grid placement' src='//codepen.io/michellebarker/embed/zWEKQE/?height=342&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/zWEKQE/'>CSS Variables for randomly generated Grid placement</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Things get even more interesting when we add JavaScript into the mix! In the example above I’m using JavaScript to loop over the grid items and update the variables with a random value (within our grid parameters) each time the button is clicked. No added classes or extra CSS needed! (Please note, this is a work-in-progress proof-of-concept, don’t judge my JS ;) )

In the example below I’m using user inputs to dynamically change our grid items. All that's getting updated here are the three variables for the x and y coordinates and the size of the grid item.

<p data-height="336" data-theme-id="0" data-slug-hash="xWPyWj" data-default-tab="js,result" data-user="michellebarker" data-embed-version="2" data-pen-title="CSS Variables + CSS Grid experiment (in progress)" class="codepen">See the Pen <a href="https://codepen.io/michellebarker/pen/xWPyWj/">CSS Variables + CSS Grid experiment (in progress)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

So many possibilities!

### Browser support

At the moment CSS Variables are supported in 88% of browsers worldwide – Internet Explorer 11 and below being the obvious exception. That’s roughly the same as support for Grid Layout, which means it’s fairly simple to test for support using feature queries.

You can use an `@supports` declaration like this to test for support for CSS Variables:

```
	@supports(--css: variables) {
		.my-div {
			--size: 2;
			--posX: 3;
			grid-column: var('--posX') / span var('--size');
		}
	}
```

(See [this example pen](https://codepen.io/SitePoint/pen/zzBrWY) by SitePoint)

I hope this gives you a little taste of what's possible with CSS Variables!
