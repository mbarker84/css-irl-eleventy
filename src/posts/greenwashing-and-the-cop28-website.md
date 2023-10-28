---
title: 'Greenwashing and the COP28 Website'
date: '2023-10-10'
tags: ['post', 'web sustainability', 'web performance']
---

**Update (28th October 2023): Since this post was published the COP28 website has undergone some changes. Many of the images are now better optimised, and the low-carbon toggle actually prevents them from loading. Much more could be done to optimise the site, however, and many of the points still stand.**

A member of the [Sustainable Web Design Community Group](https://www.w3.org/community/sustyweb/) recently highlighted some sustainability issues with the [COP28 website](https://www.cop28.com) that warrant a closer look.

<figure>
  <img src="/greenwashing-and-the-cop28-website_900.webp" srcset="/greenwashing-and-the-cop28-website_1600.webp 1600w, /greenwashing-and-the-cop28-website_1200.webp 1200w, /greenwashing-and-the-cop28-website_900.webp 900w, /greenwashing-and-the-cop28-website_600.webp 600w" sizes="(max-width: 1080px) 90vw, 930px" alt="Screenshot of the COP28 website">
  <figcaption>The COP28 website</figcaption>
</figure>

The COP28 climate summit, due to take place in the United Arab Emirates this year is somewhat controversial for a number of reasons: the fossil fuel wealth upon which much of the country is built, the [man chosen to lead the conference](https://www.theguardian.com/environment/2023/oct/07/meet-the-oil-man-tasked-with-saving-the-planet-cop28) (who happens to be head of the UAE’s national oil company), and the UAE’s [questionable record on human rights](https://www.amnesty.org/en/location/middle-east-and-north-africa/united-arab-emirates/report-united-arab-emirates/), including imprisoning peaceful protesters.

By hosting the summit, the UAE has been accused of attempting to greenwash its reputation. We can also see some greenwashing of a different kind taking place on the summit’s [website](https://www.cop28.com). Let’s take a look at how green the site really is.

## Page weight

Inspecting the network panel in dev tools, we can see the initial data transfer of the site on a desktop computer is 7.1MB for the homepage. Scrolling down to the bottom of the page, a total of 12.9MB is transferred. That’s far higher than the [2.5MB average](https://httparchive.org/reports/page-weight?start=2017_04_15&end=latest&view=list) (which is still too high in most cases). The three worst offenders are images, JavaScript and fonts.

### Images

Images account for the greatest proportion of data transfer — over 11MB of the total. Many of those individual images are approaching 2MB in size. Although some are lazyloaded, they could be far better optimised. In one case, an 8000px wide image is being displayed as a small thumbnail. The hero images are loaded as background images in CSS, which means they can’t be made properly responsive and will always load the large file, regardless of the final display size. Using [`srcset`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) and properly sizing images could reduce the bulk of the data transfer for the site.

Several of the homepage images could benefit from being converted to [WebP](https://developers.google.com/speed/webp#:~:text=WebP%20is%20a%20modern%20image,that%20make%20the%20web%20faster.). WebP images are smaller in size that JPG and PNG images, without any loss of quality. (Fershad Irani tests the power consumption of the various image formats in his article [Power consumption of JPEG, WebP, and AVIF](https://fershad.com/writing/power-consumption-jpeg-webp-and-avif/).) But several of the larger images on the site are PNGs.

### JavaScript

The total JS transfer size for the homepage is nearly 500kB, which seems high for a relatively simple page. The great thing is the homepage (and much of the site) works perfectly well with JS disabled! So why do we need it at all? Some JS is necessary for the mobile menu to function correctly. Other than that, it appears to be responsible for the hero carousel, the “live” countdown, and the pop-out video player. I’ll wager the JS bundle could be significantly reduced, and removing (or simplifying) those features doesn’t worsen the user experience.

Google Tag Manager scripts also add to the JS payload. Removing them is always a performance win, but good luck arguing that with your marketing department. They should probably be behind a cookie banner here though.

### Fonts

The page loads four variants of the same font, all as TTF files, which are usually much larger than the well-supported WOFF2 format, and could easily be converted. There’s a much smaller font file in addition, which I would guess is maybe a font subset. Considering a variable font could save on bytes downloaded for the end user.

## A fake low-carbon toggle

The site features a prominent toggle at the top of the page, inviting users to switch to the “low carbon” version. Great! Some awareness of digital sustainability, featured prominently on a popular, wide-reaching site! Not so fast...there are some significant problems here.

### 1. The low carbon toggle does absolutely nothing

In fact, worse than nothing. It doesn’t prevent images being downloaded. It doesn’t switch the site to dark mode, or prevent autoplaying animations (e.g. the hero carousel), or reduce resources transferred in other way. All it does is overlay an extra element with a background gradient on top of the large images on the site to give the **appearance** that those images being prevented from loading. The user’s preference is stored in local storage, meaning it would be possible to check the user’s preference on a return visit and only load certain JS modules if they’ve requested the full experience, for instance. But that’s not what’s happening here. It simply gives the user the impression that they (and the website owners) are considering the planet, without actually changing anything. A classic example of greenwashing.

### 2. Low carbon should be the default

It makes far more sense for an environmental perspective for low carbon to be the default. But the time the user sees they can choose the “low carbon” option, it’s already too late, the full version has downloaded. It would be even better to remove the high carbon alternative and ensure the site as a whole is low-carbon by design. A toggle feels like a sticking-plaster solution, even if it were **actually** effective.

### 3. Problematic language

If we want people to make low carbon choices, we should avoid giving the impression that we are taking something away, or that they’re somehow getting a lesser experience. The toggle label when low carbon mode is toggled on, “Switch back to full experience”, makes it sound like users are missing out on something by switching on low carbon mode, when in fact (if done right) they could be gaining a better, faster experience. This is something Asim Hussain touches upon in [his talk at Smashing Conf Freiburg](https://youtu.be/Djrgi2dqWgA?si=7ywUeIPffloQ_f-c).

## Summary

There’s a lot more to unpick when it comes to the sustainability of any website, and we’ve only touch upon a few aspects here. [Fershad Irani](https://fershad.com) has analysed the last two COP summit websites on his blog, and will no doubt be able to go into a lot more detail on this one.

When a website is visited by hundreds of thousands (or even millions) of users, the carbon savings that could be made by optimising the site, or making it genuinely low-carbon from the outset could be significant. Failing to prioritise this on the global stage, while not the most problematic aspect of the summit, feels like a missed opportunity.
