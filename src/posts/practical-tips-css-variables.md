---
title: 'Practical Tips for Working with CSS Variables'
date: '2018-06-01'
source: 'Originally published on Codepen'
srcUrl: 'https://codepen.io/michellebarker/post/practical-tips-for-working-with-css-variables'
tags: ['post', 'custom properties']
---

I’ve been playing around with [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (or custom properties) quite a lot recently and thought I’d share a few tips as I develop a practical strategy for integrating them into my workflow.

## Types of variables

When working with CSS Variables often find it helps to think of them as two different types:

### Primary variables

These are the variable that you might want to update in your CSS - in different selectors, within media queries or when targeting with `:hover` or `:focus`, for example, or change with JavaScript. They generally contain a single value:

```
:root {
	--wrapper: 900px;
	--gutter: 10px;
}
```

### Secondary variables

These are variables that are calculated from other variables. For example, in this demo on aspect ratio grid cells the `--rowHeight` variable is calculated from several primary variables. It is applied to a property but never updated manually - only recalculated as a result of updating the primary variables.

It can be useful to prefix secondary variables, like in this example, so that you and other people working with your code know that they shouldn’t be changed manually:

```
:root {
	--wrapper: 900px;
	--gutter: 10px;

	/*
		the s- prefix denotes a secondary variable
	*/
	--s-rh: calc((var(--wrapper) - (3 * var(--gutter))) / 4);
}
```

The only exception would of course be if you need to change how the value is calculated - but theoretically once set it should be permanent. This could help discourage developers who are unfamiliar with the code from tinkering with it unless necessary.

## Scoping

In many of my demos I’m declaring the variables [in `:root`](https://developer.mozilla.org/en-US/docs/Web/CSS/:root), which represents the `<html>` element:

```
:root {
	---bgColor: red;
}
```

However, this isn’t strictly necessary and, in fact, isn’t really good practice either. Many of the reasons for avoiding setting global variables in Javascript also apply to CSS. If you then wanted to use a variable for `background-color` called `--bgColor` in different components you could run into all sorts of problems with scoping. It’s a better idea to declare the variables in a selector, e.g. if you’re working in components:

```
.my-component {
	---bgColor: red;
}

.some-other-component {
	---bgColor: blue;
}
```

In the snippet above, `--bgColor` is scoped to each component, so you can use a variable with the same name without fear of it affecting anything outside of that component.

## Setting defaults

With CSS Variables you can set a [fallback value](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (or multiple values). This means in some situations you only need to declare your variables at the point they need to change. In this demo the variable `--bgColor` for the box is only declared after the breakpoint – up until that point it takes on the default value:

<iframe height='331' scrolling='no' title='CSS Variable default values' src='//codepen.io/michellebarker/embed/PaqMpy/?height=331&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/PaqMpy/'>CSS Variable default values</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In this second example you can see that the `h1` and `p` selectors have different default values for their `color` property, but both take on the variable when hovered:

<iframe height='333' scrolling='no' title='CSS Variable with defaults' src='//codepen.io/michellebarker/embed/PaPmwr/?height=333&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/PaPmwr/'>CSS Variable with defaults</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Using CSS Variables with preprocessor variables

One of the drawbacks of CSS Variables is they don’t work in media queries or selector names – e.g. `:nth-child(var(--n))` would not work. So it’s likely you’re still going to want to use preprocessor variables to some degree.

I would caution against mixing the two unless you fully understand their different characteristics. Sass variables are compiled before your code hits the browser, whereas CSS variables don’t take on their computed value until they hit the browser. That means that in the example below the width value for `.box1` (using Sass variables) will work, but `.box2` will throw an error because the value for `--halfWidth` is passed to the browser as a string:

```
$width: 600px;
$halfWidth: $width / 2;

:root {
	--halfWidth: $width / 2;
}

.box1 {
	width: $halfWidth;
}

.box2 {
	width: var(--halfWidth); // this isn’t valid
}
```

You can, however, use `calc()`, as in previous examples. See the result in the demo here:

<iframe height='328' scrolling='no' title='Preprocessor variable with CSS Variables' src='//codepen.io/michellebarker/embed/aKvWyK/?height=328&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/aKvWyK/'>Preprocessor variable with CSS Variables</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

If you inspect the element in Chrome and go to the Computed Styles tab you can see that the width value for `.box2` is not computed. At [Mud](http://ournameismud.co.uk) we use a lot of Sass functions, for example to calculate rems from pixels for sizing. I found this was an issue when I attempted to pass a Sass function into a CSS variable, e.g. `--width: rem(600px)`. There are PostCSS plugins that can convert pixels to rems and achieve the desired result, but I’d need to experiment a bit more with these before I feel confident recommending them for use with CSS Variables.

Nevertheless, there are some scenarios where using preprocessor variables in the same block of code as CSS Variables makes sense, such as in media queries, as mentioned previously.

In this demo I’m using Sass variables for the fallback values in the CSS variable, as well as the media query to provide a handy visual breakpoint helper:

<iframe height='332' scrolling='no' title='Visualising breakpoints with CSS Variables' src='//codepen.io/michellebarker/embed/pKJMJM/?height=332&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/pKJMJM/'>Visualising breakpoints with CSS Variables</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
