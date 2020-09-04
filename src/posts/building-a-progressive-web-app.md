---
title: 'Building a Progressive Web App with Gatsby'
date: '2018-07-31'
source: 'Originally published on ournameismud.co.uk'
srcUrl: 'https://ournameismud.co.uk/journal/building-a-progressive-web-app-with-gatsby'
tags: ['post', 'workflow', 'gatsby', 'pwa']
---

​In my previous article, Progressive Web Apps: An Introduction, I wrote about the key technologies involved with building a PWA and how to get started with them. In this post I’m going to tell you about my experience of building a PWA with Gatsby, a static site generator.​

## What is Gatsby?

Several members of the development team at Mud have been getting pretty excited about <a href="http://www.gatsbyjs.org/" target="_blank">Gatsby</a> recently – in fact, our recently-published, football world-cup-themed site <a href="https://ontheplane.futbol/">On the Plane</a> was built with Gatsby. Unlike other static site generators, Gatsby uses React as it’s templating engine. Everything you build is rendered in React components, making it extremely fast. I wrote about getting started with Gatsby on my personal blog, <a href="http://css-irl.info/introduction-to-gatsby/" target="_blank">here</a>&nbsp;(also published on the Gatsby site).

You don’t need to know React to get a simple Gatsby site up and running, although it’s probably helpful if you want to take advantage of everything it has to offer. However, some intermediate-level JavaScript will get you surprisingly far!

One of the great things about Gatsby is it comes with an entire build setup already configured, which means, if you hate dealing with that stuff (like I do) you can concentrate on the fun stuff, like writing awesome code! Another great thing is the documentation, which is top-notch. After working through the on-site tutorial and building my own site, <a href="https://css-irl.info/">CSS {In Real Life}</a>, my next port of call was to make my site a Progressive Web App.

## Building a Progressive Web App

A <a href="https://www.gatsbyjs.org/features">comparison table</a> on the Gatsby site shows how its many features stack up compared to other static site generators, and eagle-eyed viewers will spot that it scores very highly in the Performance / PWA section. In fact, I was surprised about how simple the process was.</p>

<p>One thing to note is your site doesn’t have to be a PWA from the outset – it’s perfectly possible to build a regular site to begin with and convert it to a PWA at a later date.

### HTTPS

PWAs use service workers, extremely powerful web workers, to fetch and cache content, so before your site can become a PWA it must first use HTTPS. My site is hosted with Netlify, which allows very easy integration with Gatsby. Through Netlify it’s a simple step (just a click of a button) to verify your domain, provide a LetsEncrypt certificate and switch a site to HTTPS.

### Installing Gatsby plugins

Gatsby has a great ecosystem of plugins to automate all sorts of different tasks. We need to install a couple of these in order to provide offline functionality for our PWA:

<ul>
<li><strong><a href="http://www.gatsbyjs.org/packages/gatsby-plugin-manifest/#gatsby-plugin-manifest" target="_blank">Gatsby-plugin-manifest</a></strong> generates the web app manifest, aJSON file containing the instructions for how browsers should display the PWA.</li><li><strong><a href="http://www.gatsbyjs.org/packages/gatsby-plugin-offline" target="_blank">Gatsby-plugin-offline</a></strong> creates the service worker and loads it into the client.</li>
</ul>

Installing Gatsby plugins is a lot like installing node &nbsp;modules - you run <code>npm install [name of plugin]</code>, then add them as an array&nbsp;in your <code>gatsby-config.js</code> file, like in this example.

```
plugins: [`gatsby-plugin-manifest`, `gatsby-plugin-offline`];
```

For our PWA, <code>gatsby-plugin-offline</code> must be listed <em>after</em> <code>gatsby-plugin-manifest</code> in the array.

After installing plugins you need to stop and restart the development server (using command <code>gatsby develop</code>). The manifest JSON file will be generated, then you just need to add your own configuration options – your site title, background colour theme colour and icon – which will improve the visual experience for users and allow them to add your PWA to their home screen (in supporting browsers).

Ordinarily when building a PWA you need to provide multiple icon sizes to account for different displays. With the Gatsby plugin you can just provide one icon at the highest resolution (512px x 512px) and the rest will be generated for you.

### Lighthouse

After stopping and starting the development server again to allow the changes to take effect, you can then inspect your site in Chrome’s dev tools. We can check our service worker has activated by going to the Application tab. On the left of the Application view you should see the Manifest and Service Worker. Clicking on the service worker tab will show you whether or not the service worker is active.

To see how your site measures up you can use Google’s <a href="http://developers.google.com/web/tools/lighthouse/" target="_blank">Lighthouse</a> tool, which was developed for testing PWAs. This is available from the Audits panel in your dev tools, or as a Chrome extension. You can also run it from the command line by installing a node module. Lighthouse will run an audit of your site, testing for performance, PWA status, accessibility, best practices and SEO, and generate a report with recommendations for improvements. It’s not a necessary part of the process of building a PWA, but I always find it very useful.

### Customising the &lt;head&gt;

One thing you’ll also no doubt want to do to optimise your site (and something that Lighthouse will pick up on) is customise the information in the document <code>&lt;head&gt;</code> with your site’s metadata. In Gatsby you can’t edit the <code>&lt;head&gt;</code> directly, so the best way is to use the plugin <a href="https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/#gatsby-plugin-react-helmet">gatsby-plugin-react-helmet</a> to give you access to it. Follow the same steps to install the previous plugins. Then you can add the <code>&lt;Helmet&gt;</code> tag inside your <code>&lt;body&gt;</code> tag, which will render in the <code>&lt;head&gt;</code> when compiled:

```
<Helmet
	title="CSS {In Real Life}">
	<html lang="en-gb" />
	<meta name="description" content="CSS In Real Life is a blog covering CSS topics and useful snippets on the web’s most beautiful language. Published by Michelle Barker, front end developer at Mud and CSS superfan."/>
	<meta name="keywords" content="css, front end, web development, web design"/>
</Helmet>
```

Then you can run <code>gatsby build</code> and publish your site. Congratulations, you now have a Progressive Web App!
