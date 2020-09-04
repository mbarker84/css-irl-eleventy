---
title: 'Progressive Web Apps: An Introduction'
date: '2018-06-29'
source: 'Originally published on ournameismud.co.uk'
srcUrl: 'https://ournameismud.co.uk/journal/progressive-web-apps-an-introduction'
tags: ['post', 'pwa']
---

If you’re in the business of building websites, you may have increasingly heard people talking about [Progressive Web Apps](http://developers.google.com/web/progressive-web-apps/) (PWAs). Developed by Google, PWAs have all the advantages of the web when it comes to user engagement, coupled with the speed and reliability users can expect from a native app.

## Why Progressive Web Apps?

The key selling points are:

### Performance

A PWA loads fast and responds quickly to user interaction without any janky animation.

### Reliability

PWAs are always able to deliver an experience to the user, even offline or in uncertain network conditions.

### Better user experience

PWAs should feels natural on the device, like a native app. They can even serve push notifications, add an icon to a user’s home screen and remove the browser chrome, all providing a more native-like experience.

Google is heavily invested in this technology, providing a whole host of resources, including free developer training, Lighthouse (a browser-based tool for testing your PWAs) and extensive documentation, including a PWA checklist.

## Offline first

Applications increasingly need to perform in shaky network conditions. When a browser is offline, a service worker allows you to serve a custom offline page, or assets from the cache, to ensure users still get a basic (if limited) experience. The Washington Post, for example, caches the top stories, enable the user to access these when offline.

## Do you need a PWA?

You might want to sit down and consider whether you absolutely need your site to be a PWA. Ask yourself these questions:

- Does the content update regularly?

- Are users likely to want to browse offline?

- Do they need real-time updates and push notifications?

- Are they likely to be using a browser that [supports service workers](https://jakearchibald.github.io/isserviceworkerready/)? (We’ll come back to this shortly.)

- If the answer is “yes” to all (or most of these), then a PWA may be worthwhile. (As a side note regarding point four, users of non-supporting browsers won’t have their experience hindered by the presence of a service worker (the browser will just ignore it) – but it’s worth taking into account before you spend considerable time and energy on a PWA.)

It’s worth mentioning though, that a PWA is not a quick fix for your performance problems. You’ll probably want to make sure you’ve already taken all other steps to optimise your site – that is to say, mobile-first responsive design, HTML5 standards, responsive and lazyloaded images, compressing and minifying assets, and inlining critical CSS. Once all criteria are satisfied, making your site a PWA has plenty of benefits.

## How do you build a PWA?

So how do you go about building a PWA? Well, that’s not quite so straightforward. I’m not going to go into technical details in this article, but I’ll list some resources at the end, so skip to there if you’re keen to get building!

PWAs rely on Javascript promises and the [Fetch API](https://developers.google.com/web/updates/2015/03/introduction-to-fetch), so you’ll probably want to get to grips with those. The other key technology for a PWA is service workers.

### Service workers

A service worker is a type of web worker that is installed client-side when your application loads, and runs in the background, separate from the main browser thread. The primary uses of service workers are to handle network requests and store content for offline use, and to handle push notifications. They are incredibly powerful, and therefore can only be used with the HTTPS protocol.

Smart use of caching with a service worker can make your site load super fast on when users make repeated visits.

### Web App Manifest

PWAs can provide an experience that feels (to the user) like using a native app, including adding an icon to the home screen (rather than the user having to navigate to the site through their browser). The web app manifest is a JSON file that tells the browser how to display your PWA. It’s where you can define the icon for users to add your app to their home screen. It’s currently supported in most mobile browsers (iOS, Chrome on Android), as well as MS Edge, but not yet supported in other desktop browsers.

## Resources

If you’re ready to get started building a PWA, here are some helpful resources:

- **[Your First Progressive Web App](https://developers.google.com/web/progressive-web-apps/)**<br/>Google’s step-by-step guide to building a PWA

- **[Getting Started with Progressive Web](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/)** Apps by Addy Osmani

- **[Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist)**

- **[Going Offline](https://abookapart.com/products/going-offline)** by Jeremy Keith (book)<br/>Widely recommended by leading figures in the industry as a comprehensive guide to taking your site offline.

**Coming soon:** I’ll share my experience of building a PWA with static site generator [Gatsby](https://www.gatsbyjs.org/)!
