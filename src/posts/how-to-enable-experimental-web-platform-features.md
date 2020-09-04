---
title: 'How to Enable Experimental Web Platform Features in Chrome and Firefox'
date: '2019-06-21'
tags: ['post', 'css', 'browsers']
---

<figure>
  <img src="how-to-enable-experimental-features.jpg" alt="Chrome and Firefox logos">
</figure>

Want to experiment with the latest bleeding-edge web technologies? One way is to download a nightly (or developer) version of the browser. Both Chrome and Firefox have versions of their browsers where they launch experimental or non-standardised features – Chrome Canary and Firefox Nightly respectively. This allows for experimentation and getting feedback before rolling out full support. From time to time, you may need to enable experimental features yourself. This article will show you how to do that in Chrome and Firefox.

## What are experimental features?

Browsers sometimes hide new features behind flags – meaning they’re not turned on by default for the majority of users. One example is the CSS Grid Layout Level 1 specification, which (when it was first implemented) was behind a flag in Firefox and Chrome. If we look for this in [caniuse.com](https://caniuse.com/#search=grid), we can see that this feature literally has a little flag in earlier versions of these browsers, to denote that it was experimental feature.

<figure>
  <img src="how-to-enable-experimental-features-05.png" alt="Screenshot from caniuse.com showing Grid implementation state in different browsers">
</figure>

While behind a flag, the browser’s implementation of a particular feature may be buggy, and subject to change, but you can still try it out. In fact, if it’s a feature you’re keen to use, the earlier you try it out the better – and if you can give feedback then it’s even more valuable.

Right now, one experimental feature you can try out is subgrid – part of the CSS Grid Level 2 specification. It’s only available in Firefox Nightly, and you’ll need to enable it.

## How to turn on experimental features

### Firefox

1. In your browser, go to the URL [about:config](about:config). This is the “hidden” settings area for your browser, and enables us to do much more than just enable the CSS features we want to work with - there are many other settings too. But be careful, you could break your browser’s functionality if you don’t know what you’re doing!
2. If you haven’t visited this URL before, you’ll get a warning that looks like this:
   <figure>
     <img src="how-to-enable-experimental-features-02.png" alt="Firefox screenshot">
   </figure>
    Click “Accept the risks”.
3. Use the search bar to search for the name of the feature you want to enable. For example, if we search for `subgrid` we’ll find the following:

   <figure>
     <img src="how-to-enable-experimental-features-03.png" alt="Firefox screenshot">
   </figure>

   The ‘Value’ column on the right determines whether the feature is switched on. Double-click the item to switch the value from ‘false’ to ‘true’. The feature is now enabled.

### Chrome

1. Go to the URL [chrome://flags](https://chrome://flags). Chrome’s UI is a little more user friendly than Firefox’s here, and it’s quite interesting to read about all the different features that you can enable or disable.
2. Search for the feature. Searching for CSS here (at the time of writing) only yields one result (CSS fragment identifiers). All features have a dropdown from which you can select the options _enabled_, _disabled_ or _default_.
    <figure>
      <img src="how-to-enable-experimental-features-04.png" alt="Chrome screenshot">
    </figure>
   The language is somewhat confusing, as it’s not clear whether a ‘Default’ features is enabled or disabled!
3. Switch to the desired setting.
