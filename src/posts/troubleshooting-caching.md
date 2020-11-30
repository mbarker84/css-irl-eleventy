---
title: 'Troubleshooting Caching'
date: '2020-11-30'
tags: ['post', 'javascript', 'workflow']
---

While launching the [new version of this site](/launching-the-new-and-improved-css-irl/) recently, I came across a few issues with some browsers unexpectedly caching the old version – despite this being a total rebuild. It meant some users were still seeing the previous version of the site unless they manually cleared their cache. Clearly this is not a reasonable request to make of every user!

There are different reasons why files might be cached, and for the most part, caching is a good thing. Once downloaded, assets can be stored in a cache to avoid the browser repeatedly making requests and re-downloading the files. If you want to learn the ins and outs of caching, [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) are a great place to start. This article specifically tackles caching of the unwanted variety, as described above. I’ll share some steps I took to ensure browsers serve the latest files after deploying changes.

## Deploying unique files

If we deploy a file with a unique name, the browser will recognise it as a new file and serve it up. A commonly-used cache-busting technique is to append a unique identifier (or hash) to the names of our asset files (such as CSS and JS files). `style.css` becomes `style27850398694772.css`, for example.

The previous version of this site was built with [Gatsby](https://www.gatsbyjs.com/), which handled this out of the box. With [Eleventy](https://www.11ty.dev/), the static site generator I’m currently using, we need to do some work. Eleventy actually has a plugin for this, however, I’m using [Parcel](https://parceljs.org/) to build the asset files, so it’s not going to work for us here. In order to implement the file hashing, we can do the following:

1. Build the asset files.
2. Create a unique hash variable and write this to a data file. Ensure this is pulled into our Eleventy files as a variable.
3. Rename the asset files, appending the hash variable.

Let’s break that down:

### Build the asset files

I’m running Parcel’s `build` command to compile our CSS from Sass and bundle our JS modules, defined in the _package.json_:

```json
"prod:parcel": "build:*",
"build:css": "parcel build src/css/styles.scss",
"build:js": "parcel build src/js/index.js",
```

By default these will build to a `dist` directory, but you can change the output file if you need to with [Parcel’s build options](https://parceljs.org/cli).

Running Eleventy builds our template files to the same directory. I have a script defined in my _package.json_ for that too:

```json
"prod:eleventy": "npx @11ty/eleventy",
```

Without hashing the files, I can easily reference them by their path in my HTML:

```html
<link rel="stylesheet" href="/styles.css" />
```

### Create a unique hash

In order to create a file with a unique hash, we need to write some JS. I’ve created a file, _onBuild.js_, which I can run with the following script:

```json
"hash": "node onBuild.js"
```

In that file, we can use a timestamp to produce a unique hash – since it will be different every time:

```js
let hash = Date.now()
hash = hash.toString()
```

`Date.now()` outputs a number, but we want to write this to a JSON file, so I’m converting it to a string.

Then we can use the Node File System module to write that hash to a JSON file in our Eleventy _\_data_ directory:

```js
fs.writeFile('src/_data/version.json', hash, function (err) {
  if (err) return console.log(err)
  console.log(`${hash} > src/_data/version.json`)
})
```

Now we are free to use this variable in our Eleventy template files. I’m using [Nunjucks](https://mozilla.github.io/nunjucks/) as my templating language, so we can include it like this:

```handlebars
<link rel="stylesheet" href="styles{ { version } }.css" />
```

(We can apply it to our JS file in a similar way.)

### Rename the files

In the same _onBuild.js_ file, we’ll rename our compiled CSS and JS files, appending the hash:

```js
fs.rename('dist/styles.css', `dist/styles${hash}.css`, function (err) {
  if (err) return console.log(err)
  console.log(`dist/styles.css > dist/styles${hash}.css`)
})

fs.rename('dist/index.js', `dist/index${hash}.js`, function (err) {
  if (err) return console.log(err)
  console.log(`dist/index.js > dist/index${hash}.js`)
})
```

We need to run this script on build, but it’s dependent on the CSS and JS files already existing in the _dist_ directory (our build directory). I use the package `npm-run-all` to specify when to run scripts concurrently or sequentially. Back in our _package.json_, using the `run-s` command we can ensure the `hash` script runs _after_ the command that builds the CSS and JS files:

```json
"build": "run-s prod:parcel hash",
```

Lastly once the CSS and JS files are built and the hash variable created and appended to the file names, we can compile our Eleventy template files, safe in the knowledge that the hash variable will exist. So let’s append our Eleventy build command to the `build` script, so that the commands are run in sequence:

```json
"build": "run-s prod:parcel hash prod:eleventy",
```

### Removing the hash in dev mode

When I’m running Parcel in `watch` mode (i.e. while I’m developing my site), I don’t want to pull in the `hash` variable, as Parcel will only create the un-hashed files at that point. So additionally we can create a script file (which I’m calling _onStart.js_) to run when I run the `npm start` command:

```js
const fs = require('fs')

fs.writeFile('src/_data/version.json', '', function (err) {
  if (err) return console.log(err)
  console.log(`${''} > src/_data/version.json`)
})
```

This removes the hash variable in the _version.json_ data file, ensuring it will not be appended to the file names referenced in our Nunjucks files.

### Limitations

I’m currently only hashing the CSS and JS files, not other asset files such as images, which means they still run the risk of being cached. Dealing with images in this way would be more complex, and as they’re unlikely to change very often I decided not to take those extra steps in this case.

### Content-based versioning

It’s worth bearing in mind that if we’re using a timestamp, the files will be re-hashed on every build. Users will have to download new files, even if the file contents themselves haven’t changed. For content-based hashing we could instead use the [MD5](https://github.com/pvorb/node-md5) package. The step to implement content-based hashing are a bit more extensive than we’ll cover here, but my Eleventy starter project, [Eleventy-Parcel](https://eleventy-parcel.netlify.app/) has content-based versioning built in.

## Set cache-control HTTP headers

Additionally, we can prevent browsers caching our HTML pages by setting [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control). My site is hosted with [Netlify](https://www.netlify.com/), which means I can specify the headers in a _netlify.toml_ configuration file:

```toml
[[headers]]
  for = "/*"

  [headers.values]
    cache-control = '''
    max-age=0,
    no-cache,
    no-store,
    must-revalidate'''
```

By setting `max-age="0"`, we ensure that the browser considers the file stale, prompting it to revalidate with the server.

We can also set cache-control headers as HTML meta tags:

```html
<meta
  http-equiv="Cache-Control"
  content="no-store, no-store, must-revalidate"
/>
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

But this is considered inferior because the meta tags are only honoured by a _some_ browser caches, not proxy caches. I had to do a bit of digging to find out about the difference between using meta tags versus HTTP headers, but [this article](https://www.mnot.net/cache_docs/#META) explains it well.

## Service workers

Even after taking all of the above steps, I still had some problems with my site caching. It turned out, the answer was a service worker. Service workers are Javascript workers that run off the main thread, separate from your web application. They can handle all sorts of tasks, notably intercepting network requests and caching responses. Service workers are a pretty big topic themselves, so I’m not going to delve into the details here. But if you’re interested in further reading, I recommend checking out [Google’s official documentation](https://developers.google.com/web/fundamentals/primers/service-workers).

To see any service workers registered for your site in Chrome, open the developer tools panel and go to the ‘Application’ tab. In the ‘Application’ menu, you should see ‘Service workers’.

The interesting thing about my new site was that it _didn’t_ have a service worker – yet in my dev tools I was still seeing a service worker registered. Why? Because the old version of the site had a service worker, and it hadn’t been unregistered. You can unregister a service worker from the dev tools panel, but of course we can’t expect every user to do that! So we need to unregister the old service worker.

### Unregistering service workers

Service workers are registered in Javascript – and they can also be unregistered. To check for existing service workers and unregister any that exist, we can add the following to our main JS file:

```js
navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister().then((unregistered) => {
      console.log(
        unregistered == true ? 'unregistered' : 'failed to unregister'
      )
    })
  }
})
```

### Updating the service worker

Another option is to install a new service worker to update the old one. Google’s documentation has this to say about updating service workers:

> When the user navigates to your site, the browser tries to redownload the script file that defined the service worker in the background. If there is even a byte's difference in the service worker file compared to what it currently has, it considers it new.

So updating the service worker (or registering it anew) should effectively overwrite the old one. In my project, I created the file _service-worker.js_, and ensured this was built with Parcel by updating my `build.js` command:

```json
"build:js": "parcel build src/js/index.js src/js/service-worker.js"
```

First we need to register the new service worker in our main JS file. We first check that the browser supports service workers, then register the new service worker on load:

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      function (err) {
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}
```

When a user visits your site, the service worker will be installed. It then enters a “waiting” state – if there is an existing service worker, the new service worker will wait until the page is refreshed in order to take control.

In the service worker file itself (_service-worker.js_ in this project), we can specify callbacks to run when the service worker is installed and activated. On install, we can call `self.skipWaiting()` to instruct it to take control straight away:

```js
self.addEventListener('install', function () {
  self.skipWaiting()
})
```

Now, if we want to unregister any old service workers (including this one!), we can run a callback on the `activate` event:

```js
self.addEventListener('activate', function() {
	.then(() => {
	  self.registration.unregister()
	    .then(() => console.log('unregister'))
	})
	.catch((err) => console.log(err))
})
```

We probably want to do a bit more with our service worker than just remove an existing service worker, but that’s beyond the scope of this article.

### Clearing the cache with a service worker

This did the job of unregistering the problematic service worker, and initially it appeared to be enough. But it turned out that some users were still seeing the old version of the site until they performed a hard reload. The culprit turned out to be [gatsby-plugin-offline](https://www.gatsbyjs.com/plugins/gatsby-plugin-offline/), a plugin I had installed on my old Gatsby site. Even though I wasn’t using Gatsby anymore, when I opened the cache in the browser dev tools, I could still see several files related to that plugin in there.

In the end, I was able to resolve this by using my new service worker to clear the cache:

```js
self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.caches
  .keys()
  .then((keys) => {
    keys.forEach((key) => {
      console.log(key)
      self.caches.delete(key)
    })
  })
  .then(() => {
    self.registration.unregister()
    console.log('unregister')
  })
  .catch((err) => console.log(err))
```

Lastly, we can take the optional step of retrieving a list of any open tabs under the service worker’s control and forcing them to reload, rather than the user having to do it manually. `self.clients.matchAll()` retrieves a list of open browser tabs. Our service worker file now looks like this:

```js
self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.caches
  .keys()
  .then((keys) => {
    keys.forEach((key) => {
      console.log(key)
      self.caches.delete(key)
    })
  })
  .then(() => {
    self.registration.unregister()
    console.log('unregister')
  })
  .then(() => {
    self.clients.matchAll()
    console.log(self.clients)
  })
  .then((clients) => {
    clients.forEach((client) => client.navigate(client.url))
  })
  .catch((err) => console.log(err))
```

## Resources

I learnt a lot about caching and service workers during this process! Here are some of the resources that helped me:

- [Cache Control for Civilians](https://csswizardry.com/2019/03/cache-control-for-civilians/) by Harry Roberts
- [HTML Meta Tags and HTTP Headers](https://www.mnot.net/cache_docs/#META)
- [How to uninstall a service worker](https://love2dev.com/blog/how-to-uninstall-a-service-worker/)
- [The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle) by Jake Archibald
