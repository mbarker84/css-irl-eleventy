---
title: 'Positioning Text Along a Path with CSS'
date: '2020-03-18'
tags: ['post', 'css', 'motion path', 'custom properties']
---

I’ve been playing around with [CSS Motion Path](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path) a lot over the past couple of months, and having a lot of fun creating demos, some of which you can find in [this Codepen collection](https://codepen.io/collection/XOOoWv). But the “Motion Path” name is a little misleading, as it doesn’t only relate to movement. In fact, although the specification still goes by the name “Motion Path”, the property used to define the path was changed from `motion-path` to `offset-path`. It’s easy to see why: an element can be placed anywhere along the path, with _or without_ motion – its position (or `offset-distance` value) doesn’t have to be animated.

In the following demo (a version of a [@beesandbombs](https://twitter.com/beesandbombs) GIF), the circles’ scale and opacity is animated, but their position is in fact stationary, despite the illusion of movement. However, they’re each positioned along a circular path using `offset-path` and `offset-distance`.

<iframe height="441" style="width: 100%;" scrolling="no" title="Offset-path animated circles with Houdini and Splitting JS" src="https://codepen.io/michellebarker/embed/dyPeqQx?height=441&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/dyPeqQx'>Offset-path animated circles with Houdini and Splitting JS</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

(There’s also a `conic-gradient` mask, animated with [CSS Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini) – you’ll need to view it in Chrome to see the effect.)

This ability to position stationary elements along a path lends itself well to text. I created some demos last year where I used CSS custom properties to position text around a circle, using transforms. This example uses [Splitting.js](https://splitting.js.org/) (my favourite JS library!) to set the custom properties. (More on this later.)

<iframe height="440" style="width: 100%;" scrolling="no" title="Text in a circle with CSS variables + Splitting.js and fluid type" src="https://codepen.io/michellebarker/embed/NmgYBY?height=440&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/NmgYBY'>Text in a circle with CSS variables  + Splitting.js and fluid type</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

It works great with dynamic content – you can change the text and the position of each character will be re-calculated so the text fits the circumference perfectly. But there is a downside: the text isn’t selectable, because it uses absolute positioning and transforms.

## Motion Path to the rescue

If we instead use `offset-path`, calculating the `offset-distance` value for each character using custom properties, we can achieve the same effect, with fully selectable text! Nice!

<iframe height="409" style="width: 100%;" scrolling="no" title="Text in a circle with offset-path" src="https://codepen.io/michellebarker/embed/oNXyJxv?height=409&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/oNXyJxv'>Text in a circle with offset-path</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Unfortunately, at the time of writing, the only supported `offset-path` value is a `path()` function. This doesn’t make it easy to build responsively, as the path doesn’t scale. But there are options, such as using media queries to specify different path values for different breakpoints. Alternatively we could use transforms to scale the whole thing down on smaller screens. But none of these options is ideal. If we could use an SVG path URL (as the specification states), then this would allow much more fine-grained control.

### A word on path creation

My preferred way to determine the `offset-path` value is to draw the path in Illustrator and save it as an SVG, before cleaning it up with an optimisation tool and copying the resulting path’s `d` attribute value. If you simply draw a circle, Illustrator saves this as a `<circle>` element rather than a path. One way to prevent this is by first drawing the circle, then using the scissor tool in Illustrator to cut the circle’s path at the desired location. It will then be saved as a `<path>` rather than a `<circle>` element.

Of course, we’re not limited to circles. We can use any path we choose.

## Yes, we can animate text too

Animation is where these techniques really shine. We can animate the `offset-distance` to move the string of text along the path. One of my favourite techniques is to use `animation-delay` with values calculated from custom properties. Splitting.js assigns each character a custom property corresponding to its index. Passing that into a `calc` function results in a more organic motion, similar to the effects of easing. You can see the difference in the two animations below. The second animation implements an `animation-delay` on each character, calculated using custom properties:

```css
.char {
  --delay: calc(var(--char-index) * 30ms);
}
```

<iframe height="409" style="width: 100%;" scrolling="no" title="Comparing offset-path animation with/without delay" src="https://codepen.io/michellebarker/embed/abOKPyg?height=409&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/abOKPyg'>Comparing offset-path animation with/without delay</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

There’s a lot of fun to be had with this. The following demo uses the techniques described here to create a rollercoaster effect:

<iframe height="451" style="width: 100%;" scrolling="no" title="Typo-coaster" src="https://codepen.io/michellebarker/embed/XWJyydY?height=451&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/XWJyydY'>Typo-coaster</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We can get even weirder and add some 3D transforms to our animation:

<iframe height="435" style="width: 100%;" scrolling="no" title="Splitting and motion path" src="https://codepen.io/michellebarker/embed/VwYOvJG?height=435&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/VwYOvJG'>Splitting and motion path</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

I hope you enjoy playing with Motion Path as much as I have!
