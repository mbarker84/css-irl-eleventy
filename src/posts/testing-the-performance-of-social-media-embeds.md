---
title: 'Testing the Performance of Social Media Embeds'
date: '2023-12-04'
tags: ['post', 'performance', 'web sustainability', 'javascript']
---

I’ve been writing and speaking about web sustainability quite a bit this past year. One thing I’ve done periodically for my talks is to test the data transfer size of various social media embeds — they’re pretty bad!

I first tested some YouTube embeds a couple of years ago while attempting to improve the site performance of a client at the agency I worked for. At the time, embedding a YouTube video on a webpage caused ~600kb of JavaScript to be downloaded. Eek! It gets worse though. In May this year, embedding that same video resulted in more than 800kb of JS. Pretty disappointing that it had actually increased, and by a not-insignificant amount. Conducting the same test today results in downloading over 1.2MB of JS 😳 That’s pretty eye-watering. Peeking into the Network tab, 785kb seems to be a single base JS file.

## What’s up with the cache?

These tests were all conducted with a fresh, uncached page. There seems to be some decent caching going on, as Chrome reports only 75kB of JS transferred on a return visit, as well as when visiting a page with a different embed. On Firefox however, the same page with the same embed reports 2.9MB of JS transferred! What is going on?! Are dev tools inaccurate, or are different browsers downloading resources differently?

After a bit of Googling, I discovered that Firefox introduced a feature called [RCWN](https://slides.com/valentingosu/race-cache-with-network-2017) (Race Cache With Network) some time ago. This led me to this fascinating article by Simon Hearne, [When Network is Faster Than Cache](https://simonhearne.com/2020/network-faster-than-cache/). It turns out that sometimes retrieving a resource from the cache can take longer than fetching it from the network! In Firefox’s case, files are being requested from both the cache and the network, and the fastest one wins. On my home broadband connection, the network seems to beat the cache nearly every time, which (I assume) is why we’re seeing those files transferred each time. On slower connections this probably wouldn’t be the case.

It’s reassuring to know that users on poor connections would have those files served from the cache. But Simon’s article makes the point that cache retrieval can be slow, and becomes slower the more resources are requested from the cache, which particularly for those with low-powered devices and connections.

> There is an assumption that cached assets are retrieved instantly and at zero cost. What we have discovered here is that there is in fact a cost to retrieving assets from cache based on the number of cached assets (not file size) and the user's devices.

Additionally, I’m not sure that hitting the network every time (in Firefox’s case) is more sustainable?! Google’s [explanatory article](https://web.dev/articles/offline-cookbook#cache-and-network-race) on cache strategies notes that it can be ideal for small assets. It also notes:

> However, going to the network when the user has the content on their device can be a waste of data, so bear that in mind.

Hmm. Surprisingly enough (or not at all surprisingly), the best route to good performance and a more sustainable website is to keep your pages as lightweight as possible, and avoid your users having to download all that data in the first place. In that case, it’s all the more disappointing to see Google increase the amount of JS shipped with the YouTube embed, perhaps in the mistaken believe that the cache will save the day.

I’m not a performance expert, so I might be missing a crucial piece of the puzzle. I’d love to hear from folks who have some more insight into this!

If you’d like to test the performance of a few different types of social media embed (including YouTube videos), I’ve made [a lightweight website](https://social-media-embed-test.netlify.app) to do just that.
