---
title: 'Time to Ditch Analytics? Tracking Scripts and Web Sustainability'
date: '2024-03-17'
tags: ['post', 'web sustainability']
related:
  [
    {
      title: 'Talking About Web Sustainability on ShopTalk Show',
      url: '/talking-about-web-sustainability-on-shoptalk-show/',
    },
    {
      title: 'Design Patterns that Encourage Junk Data',
      url: '/design-patterns-that-encourage-junk-data/',
    },
    { title: 'Building a Greener Web', url: '/building-a-greener-web/' },
  ]
---

[This article on privacy-focussed web design](https://rootwebdesign.studio/articles/the-environmental-benefits-of-privacy-focussed-web-design/) by Paul Jardine and Becky Thorn of sustainably-minded web design agency [Root](https://rootwebdesign.studio/) raises some great points about the link between invasive tracking scripts and the carbon footprint of a website. I’ve often been frustrated by the negative performance impact of adding Google Analytics or Google Tag Manager to a site. Sites that were previously reasonably fast would subsequently perform poorly with regard to Google’s own [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals). It seems that many of the products Google actively encourage web authors to add to their sites are paradoxically the ones that have the worst impact on performance. (Don’t get me started on YouTube videos.)

Like so many other aspects of how we build websites, there is unsurprisingly a link to increased carbon emissions too. External scripts embedded in your website require power to download and parse. But there’s also the data they collect on users, which is transferred across the network and stored. The amount of data they collect goes far beyond what is useful to the end user, and is undoubtedly a contributor to the [huge proportion of “junk data”](https://css-irl.info/design-patterns-that-encourage-junk-data/) stored in datacentres worldwide.

The problem is, it’s just so easy to add Google Analytics to a website, with little or no regard for users’ privacy or the performance and sustainability implications. As the article notes:

> Google Analytics trackers are featured on 72.6% of the top 75,000 websites.

To a web manager, it free. Why would they consider an alternative? But as we all know, if something’s free, **you’re the product** — or rather, your users are.

I believe that if we care about restoring trust in the web, one of the steps we need to take is to stop productising users. After all, the current trajectory is one of ever-increasing [enshittification](https://pluralistic.net/2023/01/21/potemkin-ai/#hey-guys).

One way we can start is by having conversations with those responsible for managing the websites we build, and offering lightweight alternatives to Google Analytics for cases when data collection is absolutely necessary. (A few alternatives are listed in the article.) In many cases it may be possible to do away with client-side analytics entirely. I recently made the case for this at work while making improvements to the company website, and my manager admitted that they rarely look at the analytics. I’m willing to bet that’s a case for a lot of people.

Websites need to provide a clear and unambiguous way for users to opt out of unnecessary data collection to comply with [GDPR legislation](https://gdpr.eu/what-is-gdpr/). Analytics and tracking scripts account for the proliferation of cookie notices users are forced to interactive when they land on a site, resulting in the web feeling increasingly unusable at times. Removing tracking scripts may mean that you can remove unsightly cookie consent notices — and provide users with a better, faster experience, as well as a more sustainable one.

{% hotlink 'https://rootwebdesign.studio/articles/the-environmental-benefits-of-privacy-focussed-web-design/', 'Read the article by Root' %}
