---
title: 'Accessible Toggles'
date: '2021-11-01'
tags: ['post', 'accessibility', 'html', 'javascript']
---

I recently received some great advice from [Scott O’Hara](https://www.scottohara.me/) on improving the accessibility of a [demo](https://codepen.io/michellebarker/pen/bGrNjgB) featuring a reduced-motion toggle (for [this article](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/)). The demo sets the play-state of the animation depending on the user’s motion preferences (using the `prefers-reduced-motion` media query). Users could also click the button to toggle motion on and off, which also changes the text of the button to “Turn on motion” or “Turn on motion”. Here’s the original version:

<p class="codepen" data-height="529" data-default-tab="result" data-slug-hash="JjyNXQZ" data-user="michellebarker" style="height: 529px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/JjyNXQZ">
  Reduced-motion toggle</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Scott pointed out that some screenreaders wouldn’t announce the change to the button text when the button is clicked.

> I have one suggestion though, per the accessibility of the toggle control. Changing the accessible name of the button will not be consistently announced by screen readers. NVDA and JAWS in particular do not announce the name change - I made a fork of your pen to demonstrate an alternative way to code the toggle control.

Let’s walk through the code and add Scott’s suggested improvements with a simpler version of the demo, so we can understand what is going on more clearly from an accessibility point of view. For the purpose of this article we’ll just focus on a button that plays or pauses the animation when clicked, without concerning ourselves with the additional complexity of the original, which includes checking the user’s system-level motion preferences and `localStorage`. (If you’re interested you can always go back and explore the [final demo](https://codepen.io/michellebarker/pen/bGrNjgB) and accompanying article.)

This is the demo we’ll use as a starting point:

<p class="codepen" data-height="461" data-default-tab="result" data-slug-hash="rNzmLGv" data-user="michellebarker" style="height: 461px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/rNzmLGv">
  Reduced-motion toggle (basic)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Here’s the button in our HTML:

```html
<button data-toggle hidden>Turn off motion</button>
```

It includes the `hidden` attribute, as without JS the button doesn’t do anything, and we wouldn’t want to confuse users who don’t have JS enabled, or for whom JS fails to load. So we’ll hide it initially, then remove this attribute with JS.

In our JS code, we first set a variable for whether the animation should currently be paused, with an initial value of `false` (as the animation will be playing to begin with). We’ll display our button by removing the `hidden` attribute.

When the button is clicked, we’ll toggle the `shouldPauseAnimation` variable. Then we’ll set a custom property (to change the play state of the animation in CSS), and update the button text:

```js
const toggle = document.querySelector('[data-toggle]')

let shouldPauseAnimation = false

// The button is hidden initially, as it won't work without JS. We need to make it visible
toggle.hidden = false

toggle.addEventListener('click', () => {
  shouldPauseAnimation = !shouldPauseAnimation

  if (shouldPauseAnimation) {
    // Pause animation
    toggle.innerText = 'Turn on motion'
    document.body.style.setProperty('--playState', 'paused')
  } else {
    // Play animation
    toggle.innerText = 'Turn off motion'
    document.body.style.setProperty('--playState', 'running')
  }
})
```

This toggles the custom property used in the CSS like so, with its original default value:

```css
.circle {
  animation-play-state: var(--playState, running);
}
```

We now have a working motion toggle (hooray!). Unfortunately, as Scott explained, some screenreaders won’t announce the updated button text on click. Let’s add Scott’s improvements.

First, we’ll update the button’s HTML, so the text that informs the user of the current “on/off” state is inside a `<span>` with the `aria-hidden` attribute:

```html
<button data-toggle hidden>
  Toggle motion
  <span aria-hidden="true" data-btn-text>: Off</span>
</button>
```

To a screenreader, the button will now simply say “Toggle motion”, with no indication of the state. We’ll give the button a role of `switch`, and add the `aria-checked` attribute with a value of `true`, to indicate an “on” state:

```html
<button data-toggle hidden role="switch" aria-checked="true">
	Toggle motion
	<span aria-hidden="true" data-btn-text>: On</span></span>
</button>
```

In our JS code, we’ll update both the text inside the `<span>`, and the `aria-checked` attribute (in addition to toggling the `--playState` custom property:

```js
const toggle = document.querySelector('[data-toggle]')
const buttonText = document.querySelector('[data-btn-text]')

let shouldPauseAnimation = false

toggle.hidden = false

toggle.addEventListener('click', () => {
  shouldPauseAnimation = !shouldPauseAnimation

  if (shouldPauseAnimation) {
    // Pause animation
    buttonText.innerText = ': Off'
    toggle.setAttribute('aria-checked', 'false')
    document.body.style.setProperty('--playState', 'paused')
  } else {
    // Play animation
    buttonText.innerText = ': On'
    toggle.setAttribute('aria-checked', 'true')
    document.body.style.setProperty('--playState', 'running')
  }
})
```

The result is a more accessible demo:

<p class="codepen" data-height="455" data-default-tab="result" data-slug-hash="oNeGYEz" data-user="michellebarker" style="height: 455px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/oNeGYEz">
  Toggle switch for motion (basic) with accessibility improvements</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

The same principles could be applied to many different types of toggles, such as a dark/light mode toggle.

[Read more about the `aria-switch` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role).
