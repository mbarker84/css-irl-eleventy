---
title: 'Don’t Forget the “lang” Attribute'
date: '2021-12-02'
tags: ['post', 'html', 'accessibility']
---

An interesting notification from [@cyishere](https://twitter.com/cyishere) popped up in my Twitter feed the other day:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I use a Chrome extension Read Aloud to read the web pages for improving my English. The reading voice for most web pages is American accent, but when it reads <a href="https://twitter.com/CSSInRealLife?ref_src=twsrc%5Etfw">@CSSInRealLife</a>, it switches to British, which is very interesting.😁</p>&mdash; CY is here 👩🏻‍💻🚀🖖🏻 (@cyishere) <a href="https://twitter.com/cyishere/status/1465312612074147847?ref_src=twsrc%5Etfw">November 29, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I replied that I thought this was likely due to the page’s `lang` attribute, which on this site is `en-GB` — British English. The default for many frameworks is `en`, (general English) or `en-US` (American English). While there might not be huge differences between those and British English, it can affect how certain words are pronounced to assistive technologies such as screenreaders. Of course, it would have a much bigger impact on web pages that are in a different language altogether, so you should always make sure you change it to the appropriate value!

### Update

[Kitty Giraudel](https://twitter.com/KittyGiraudel) mentioned that it might be best to use `en` rather than localised English (such as `en-GB` or `en-US`), as it allows people using screenreaders to pick the locale that they’re used to. ([Link to tweet](https://twitter.com/KittyGiraudel/status/1466684618309001219?s=20).) The only source I can find for this is the comments section of a 2015 by Adrian Roselli ([On Use of the Lang Attribute](https://adrianroselli.com/2015/01/on-use-of-lang-attribute.html)). It sounds like a good call, but I’m not sure there’s a consensus. It seems not to affect spellchecking, as the browser’s settings override it. When I view [this demo](https://codepen.io/michellebarker/pen/XWebGmO) in Chrome the word “color” (American English spelling) is underlined as being incorrectly spelled, but in Firefox it’s the British English spelling, “colour”.

You can [read more about the `lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) on MDN.

The experience shared by [@cyishere](https://twitter.com/cyishere) serves an important reminder that people browse the web in all sorts of ways we might not be aware of when building our sites, and we should make sure we build with that flexibility in mind. While it’s easy to see this unknowability as a hindrance, I believe that it’s something to be embraced. In building for the web, we have the opportunity to deliver content to users in a way that suits them, and the web platform provides us with all sorts of features in HTML and CSS that help us do that. Starting with semantic HTML and layering on top with [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) is a solid strategy.

Speaking of the `lang` attribute reminded me of [Manuel Matuzović](https://twitter.com/mmatuzo)’s excellent article [analysing his HTML boilerplate](https://www.matuzo.at/blog/html-boilerplate/). It contains tons of useful information about many of the elements and attributes most of us don’t give much thought to day-to-day if, like Manuel, we recycle the same boilerplate from project to project. It’s well worth a read.

<aside>This article was updated on <time>2nd December 2021</time>. Special thanks to <a href="https://twitter.com/KittyGiraudel">Kitty Giraude</a>, <a href="https://twitter.com/fantasai">Fantasai</a> and <a href="https://twitter.com/hdv">Hidde de Vries</a> for adding to the discussion and pointing some things out to me! <a href="https://twitter.com/CSSInRealLife/status/1466344822000828418?s=20"></a>Read the thread</a></aside>
