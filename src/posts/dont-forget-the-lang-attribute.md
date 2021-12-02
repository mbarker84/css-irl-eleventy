---
title: 'Don’t Forget the “lang” Attribute'
date: '2021-12-02'
tags: ['post', 'html', 'accessibility']
---

An interesting notification from [@cyishere](https://twitter.com/cyishere) popped up in my Twitter feed the other day:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I use a Chrome extension Read Aloud to read the web pages for improving my English. The reading voice for most web pages is American accent, but when it reads <a href="https://twitter.com/CSSInRealLife?ref_src=twsrc%5Etfw">@CSSInRealLife</a>, it switches to British, which is very interesting.😁</p>&mdash; CY is here 👩🏻‍💻🚀🖖🏻 (@cyishere) <a href="https://twitter.com/cyishere/status/1465312612074147847?ref_src=twsrc%5Etfw">November 29, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I replied that I thought this was likely due to the page’s `lang` attribute, which on this site is `en-GB` — British English. The default for many frameworks is `en`, American English. While there might not be huge differences between the two, it can affect how certain words are pronounced to assistive technologies such as screenreaders. (You can [read more about the `lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) on MDN.) Of course, it would have a much bigger impact on web pages that are in a different language altogether, so you should always make sure you change it to the appropriate value!

The experience shared by [@cyishere](https://twitter.com/cyishere) serves an important reminder that people browse the web in all sorts of ways we might not be aware of when building our sites, and we should make sure we build with that flexibility in mind. While it’s easy to see this unknowability as a hindrance, I believe that it’s something to be embraced. In building for the web, we have the opportunity to deliver content to users in a way that suits them, and the web platform provides us with all sorts of features in HTML and CSS that help us do that. Starting with semantic HTML and layering on top with [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) is a solid strategy.

Speaking of the `lang` attribute reminded me of [Manuel Matuzović](https://twitter.com/mmatuzo)’s excellent article [analysing his HTML boilerplate](https://www.matuzo.at/blog/html-boilerplate/). It contains tons of useful information about many of the elements and attributes most of us don’t give much thought to day-to-day if, like Manuel, we recycle the same boilerplate from project to project. It’s well worth a read.
