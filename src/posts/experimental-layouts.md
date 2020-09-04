---
title: 'Experimental Layouts with CSS Shapes and Clip-path'
date: '2018-08-14'
source: 'Originally published on Codepen'
srcUrl: 'https://codepen.io/michellebarker/post/experimental-layouts-with-css-shapes-and-clip-path'
tags: ['post', 'css shapes', 'clip-path']
---

​Recently there has been a proliferation of demos using the CSS property `shape-outside` to create interesting and unusual text and layout effects. ([Here’s one example](https://codepen.io/mandymichael/pen/xzyrGa) by Mandy Michael)

The `shape-outside` property (part of the [CSS Shapes module](https://www.w3.org/TR/css-shapes-1/) ) allows us to wrap text around the shape of an object. The object that you want the text to wrap around must have a width and height, and be floated to the left or right. Here is the simplest code we need in order to do this:

```
.shape {
	width: 200px;
	height: 200px;
	float: left;
	shape-outside: circle(50%);
}
```

This will wrap a paragraph of text around a circular area like so:

![Text wrapping around circular shape](https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/Screen%20Shot%202018-08-13%20at%2021.21.53.png)

Here the text will wrap around in a circular shape. You can create more complex shapes using polygon():

```
.shape {
	width: 200px;
	height: 350px;
	float: left;
	shape-outside: polygon(0 0, 50% 0%, 90% 50%, 50% 100%, 0 100%);
}
```

Here I’m “drawing” a polygon using pairs of x and y co-ordinates. Currently, while the text will wrap around the shape, the `.shape` object itself will still be a square. If we give it a background colour you can see what I mean:

![Text wrapping around a polygon](https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/Screen%20Shot%202018-08-13%20at%2021.32.40.png)

What if we want the shape to have a background colour _and_ for the text to wrap around it? If we want the object to be circular we can of course give it a `border-radius` of 50%. But what if we want it to follow the same path as the `shape-outside` property when we’re using a more complex shape? In that case we can use `clip-path`, and give it the same value as our `shape-outside` property. We can also use the `shape-margin` property to add a bit of distance between the shape and the content wrapping around it:

```
.shape {
	width: 200px;
	height: 350px;
	background-color: #EC407A;
	float: left;
	shape-outside: polygon(0 0, 50% 0%, 90% 50%, 50% 100%, 0 100%);
	clip-path: polygon(0 0, 50% 0%, 90% 50%, 50% 100%, 0 100%);
	shape-margin: 10px;
}
```

Here’s the full demo:

<iframe height='400' scrolling='no' title='Basic CSS Shapes with clip-path() example' src='//codepen.io/michellebarker/embed/WKWeqb/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/WKWeqb/'>Basic CSS Shapes with clip-path() example</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Inverting Shapes

Things get a little bit more complicated if we want to clip the background of the text instead. Now we need to invert the clip path – that is to say, we need to create a path of the shape that would be left over if you cut the original path out of a rectangle. This takes a little bit of maths, but we can create some interesting effects. Needless to say, the more complicated your polygon, the greater the difficulty in creating an “inverted” version! I find it helps to draw it out on paper and note down the co-ordinates for each point in the polygon.

Here’s a demo with an inverted clip-path:

<iframe height='400' scrolling='no' title='CSS Shapes and inverse clip-path' src='//codepen.io/michellebarker/embed/bjJGLe/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/bjJGLe/'>CSS Shapes and inverse clip-path</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Note, you can use a mixture of pixel units and percentages in a `clip-path` polygon. I’m using pixels for the horizontal dimensions as it needs to be a fixed width in order to correspond correctly to the shape path, but percentages for the vertical units in case I want to adjust the height later – that way I won’t need to recalculate all the vertical co-ordinates.

This gives the impression that the text is _inside_ the shape, but there are a few limitations:

1. We’re currently only clipping on one side, so our shape isn’t very interesting yet.

2. If we want to add a `box-shadow` to the shape it won’t be visible as it’s being clipped – unless the `box-shadow` has a value of `inset`. However, the shadow will be on the outer element, not the part clipped away from it.

I’m going to address both of those issues one by one.

## Shape-inside

A few years ago [Sara Soueidan](https://www.sarasoueidan.com/) wrote a great introduction to CSS Shapes, where she also showed how to [wrap text inside a shape](https://www.sarasoueidan.com/blog/css-shapes/) using the `shape-inside` property, which had very limited browser support at the time. Support for `shape-inside` has now been withdrawn (although is part of the Level 2 spec), which means you can’t really use it anywhere at the moment. Part of the reason for this is the withdrawal of support for CSS Regions, which would deal with any overflowing text content. However, we can create a similar effect with clever use of `shape-outside`. If I have two polygons floated to the left and right respectively then the text will fill the space in the middle of them:

```
.shape {
	float: left;
	width: 200px;
	height: 460px;
	shape-outside: polygon(0 0, 100px 0, 180px 50%, 100px 100%, 0 100%);
	shape-margin: 10px;
}

.shape2 {
	float: right;
	width: 200px;
	height: 460px;
	shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%, 100px 50%);
	shape-margin: 10px;
}
```

If I want to style the text background and clip it out in this case then I need to somehow work out the `clip-path` value for the space in between. I find the easiest way to do this is to think of the paths as part of the same rectangle. Then you can plot the co-ordinates for each point on the path.

Handily, you can use `calc()` inside a `clip-path()` fuction too, which can be useful if you’re not working with exact widths.

Here’s the demo:

<iframe height='400' scrolling='no' title='CSS Shapes and inverse clip-path replicating shape-inside' src='//codepen.io/michellebarker/embed/ajxzJg/?height=314&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/ajxzJg/'>CSS Shapes and inverse clip-path replicating shape-inside</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

As a side-note, Bennet Feeley’s tool [Clippy](https://bennettfeely.com/clippy/) is really useful for quickly getting clip-path co-ordinates.

## Creating a box-shadow effect

As I mentioned, adding a box-shadow to the clipped element will have no effect. But we can create a similar effect using pseudo-elements. Moving the `clip-path` to a pseudo-element (`::before`) means we can create another absolute-positioned clipped pseudo-element (`::after`) with the same co-ordinates and apply some effects to make it feel like the element is floating above the page:

<iframe height='400' scrolling='no' title='CSS Shapes and inverse clip-path and pseudo-element' src='//codepen.io/michellebarker/embed/pZBvKQ/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/pZBvKQ/'>CSS Shapes and inverse clip-path and pseudo-element</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Using SVG

We can also use images for the `shape-outside` value if the have a transparent background (SVG or PNG), which can allow us to produce some more interesting paths. To use an image you reference the URL in the `shape-outside` property value like this:

```
.shape {
	...
	shape-outside: url(shape.svg);
}
```

Here’s a simple demo:

<iframe height='400' scrolling='no' title='Shape wrapping around SVG' src='//codepen.io/michellebarker/embed/XBQMZQ/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/XBQMZQ/'>Shape wrapping around SVG</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

I was really excited about the possibility of using a combination of SVG and clip-path, but this isn’t quite so straightforward. The difficulty here come in if you want to use the same SVG path for your clip-path value. We can use SVG for clip-path by writing the SVG inline in the markup:

```
<div class="shape">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.8 250">
		<clipPath id="clip">
			<path d="M140 250H0V0h140s40 36 0 125 0 125 0 125z"/>
		</clipPath>
		<path d="M140 250H0V0h140s40 36 0 125 0 125 0 125z"/>
	</svg>
</div>
```

Then you reference the clipPath ID in your clip-path property value:

```
.container {
	clip-path: url(#clip);
}
```

However, this is going to clip the wrong part of the container! What I want to do here is clip the inverted part (the part that is wrapping around our shape).

My way of doing this is to draw the shape within a rectangle in Illustrator (or a similar vector graphics programme) so that you actually have two shapes – the original shape and its inverse.

![Original shape (left) and inverted shape (right)](https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/Screen%20Shot%202018-08-14%20at%2008.23.51.png)

Then you can include the clip shape within the SVG code, which will be positioned correctly within the SVG viewBox:

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 250" width="0" height="0">
	<clipPath id="clip">
		<path d="M140 0s40 36 0 125 0 125 0 125h810V0H140z"/>
	</clipPath>
</svg>
```

You may notice I’m including `width="0"` and `height="0"` – this will ensure the SVG doesn’t take up any space, as we only need to reference the `clipPath`, we don’t want it to be visible on the page.

In this demo I’m referencing an external SVG for the `shape-outside` property _and_ the inline SVG for the `clip-path` property:

<iframe height='400' scrolling='no' title='Shape wrapping around SVG with clip-path' src='//codepen.io/michellebarker/embed/pZBPym/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/pZBPym/'>Shape wrapping around SVG with clip-path</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Simulating shape-inside with SVG

Things get even more complicated if we want to clip _both_ sides of the container and have the text wrap on the left _and_ the right. In the demo below I’m using the same technique as the previous one, but I’m floating elements to both the left and the right. Each shape needs to be no more than 50% width, otherwise they’ll wrap below. So when I’m cutting the SVG out in Illustrator I split the original shape in half and create two SVG shapes (for the `shape-outside` property).

![Left and right shapes, and their viewboxes](https://s3-us-west-2.amazonaws.com/s.cdpn.io/85648/clip-illustration.png)

For each shape the `viewBox` is exactly half of the total container width, but the `path` only takes up a portion of that. This demo shows the end result, as well as utilising some of the other techniques detailed earlier in this post.

Be warned, as I’m using fixed sizes it only works on screen of 960px wide and above!

<iframe height='400' scrolling='no' title='Simulating shape-inside with SVG and clip-path' src='//codepen.io/michellebarker/embed/djLxvb/?height=265&theme-id=0&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/djLxvb/'>Simulating shape-inside with SVG and clip-path</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If you want to know more about SVG, Sara Soueidan has lots of great article on [her blog](https://www.sarasoueidan.com/tags/svg/), where she covers things like the `viewBox` attribute and SVG co-ordinate systems in great detail.

## Browser support and other thoughts

Browser support for CSS Shapes is around 80%, with the notable exception of Edge. Firefox’s implementation is currently behind a flag, although it should be fully implemented in the next update. Therefore a progressive enhancement approach is wise to bear in mind.

One thing I don’t see mentioned a lot is the UX view of Shapes. Wrapping the left edge of your text around complex shapes isn’t great for readability, and while it’s exciting to see some interesting, artistic layouts, for content that’s crucial to the user it’s important to use Shapes with the utmost caution.

I think that another reason this isn’t more widely used (aside from browser support) is that it can be a bit tricky to control responsively. In the last example I’m relying heavily on fixed sizes on the x and y axis to get the effect I want. If you have a text of indeterminate length the effect of wrapping text inside a shape is likely not going to work very well at different breakpoints, so for dynamic content it’s not generally a good option. That said, there’s definitely a place for experimentation when it comes to layouts, and it would be great to see a new age of web creativity flourish.
