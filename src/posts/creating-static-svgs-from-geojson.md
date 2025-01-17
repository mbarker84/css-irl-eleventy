---
title: Creating Static SVGs from GeoJSON
date: '2025-01-17'
tags: ['post', 'workflow', 'javascript', 'data viz']
---

Recently I’ve been working with map data to create interactive visualisations. When working with maps it’s common to receive data as [GeoJSON](https://geojson.org/), a JSON format for encoding geographic features, which specifies the type of geometry and co-ordinates for the features we want to display on a map. Javascript mapping libraries such as [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) are designed to consume GeoJSON to render features on a canvas. I’m fairly accustomed to using GeoJSON in this way — for example, rendering geographic areas as different coloured polygons overlaid on a map to show varying values for different areas.

But for a recent project I decided to take a different approach. Mapbox GL is a great library that provides a lot of useful features out of the box, like zooming and panning. It’s also pretty hefty as far as libraries go, weighing in at [1.4MB un-minified](https://bundlephobia.com/package/mapbox-gl@3.9.3). This project did not require any advanced map functionality, however, and only required the map display to be centred on a particular area, with interactive features on hover.

In the interests of minimising the JS payload for users, it made sense to render the map as a static SVG, with only minimal JS needed for interactivity. That meant I needed to convert the GeoJSON data I had been provided with to a static SVG file. In case you find yourself in a similar position, I’m going to show you how to do this using [D3.js](https://d3js.org). There’s a pre-prepared [example on Codepen](https://codepen.io/michellebarker/pen/pvzKVzK), in case you want to skip straight to the code.

## Fetching the data

We’ll use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to fetch some hosted GeoJSON, which has the `.json` suffix. I’ve uploaded an example file to Codepen, which has a limit of 5MB for file assets. In a real project, the GeoJSON file might be much bigger.

We’ll use the `json()` response method to parse our response data, just like any other JSON response, then we’ll log it to the console. We should see our parsed data.

```js
const geojsonUrl = 'https://assets.codepen.io/85648/map-example.json'

fetch(geojsonUrl)
  .then((response) => response.json())
  .then((data) => console.log(data))
```

Depending on our geographic data, our GeoJSON could take different formats. In my case, the data I want to display is a `FeatureCollection`, consisting of several geographic areas. Alternatively you might have a single `Feature`, or geographic area, and that could consist of one or more polygons.

Here is an example of a very simple GeoJSON feature. The `geometry` type is `Point`, which means it pinpoints a specific location — useful if you’re adding a marker to a map, for instance. For drawing geographic areas, the `geometry` type will likely be `Polygon` or `MultiPolygon`.

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Example location"
  }
}
```

## Creating the SVG

Before rendering our data as an SVG path, we first need to create an empty SVG element. We _could_ do this in HTML:

```html
<svg width="600" height="400" viewBox="0 0 600 400"></svg>
```

However, since we’re going to be using D3 anyway, let’s create the SVG in Javascript, the D3 way. That makes it simple to set our SVG dimensions as variables, which we’ll use again shortly.

```js
const dimensions = {
  width: 600,
  height: 400,
}
```

It also means we can wait until _after_ the browser has successfully fetched our data and parsed the response before rendering the SVG — and gives us the option of showing a helpful error message to users in case our request fails.

We’ll use D3’s `select()` method to select an element to which to append our SVG. This could be the `<body>`, or any other element. In this case, we’ll use a `<div>` with an ID of `wrapper`.

We’ll append an SVG element, then set the width, height and viewBox attributes.

```js
fetch(geojsonUrl)
  .then((response) => response.json())
  .then((data) => {
    d3.select('#wrapper') // The element which to append our SVG to
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
  })
```

## Converting GeoJSON to an SVG path

Now we’re going to use D3’s [geographic path generator](https://d3js.org/d3-geo/path) to generate SVG path strings from our data. We’ll append a `path` element to the SVG and set the `d` attribute (the instructions for how to draw the line) from our data. The `geoPath()` function can render a path from a single feature or geometry, or from multiple features combined into a `FeatureCollection`. If we have a single feature we can create a path generator, and call it with data:

```js
const path = d3.geoPath()

d3.select('#wrapper')
  .append('svg')
  .attr('width', dimensions.width)
  .attr('height', dimensions.height)
  .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
  .append('path') // Append a 'path' element
  .attr('d', path(data)) // Draw the path from the data
```

If our data consists of a `FeatureCollection`, we might instead need to render multiple paths. We approach this slightly differently, by binding the dataset to our SVG, then appending a path for each of the features in the `FeatureCollection`.

```js
d3.select('#wrapper')
  .append('svg')
  .attr('width', dimensions.width)
  .attr('height', dimensions.height)
  .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
  .selectAll()
  .data(data.features) // Bind the features in the FeatureCollection
  .join('path')
  .attr('d', path) // We don’t need to call `path` with an argument, as we’ve already bound the data
```

This should create paths from our data. It also works if our data contains “MultiPolygons” — multidimensional arrays of polygons. Note, we could alternatively use only the `geometry` data from our features instead of the entire `Feature` object.

### Projection and scaling

Although inspecting the SVG element in the browser might show that we’ve rendered some SVG paths, it’s likely they’ll currently be invisible to the viewer. That’s because we haven’t yet scaled them to our SVG viewbox, so they may be rendered off-canvas. We need to tell D3 how to project our map elements onto the available space.

For this we’ll transform the [projection](https://d3js.org/d3-geo/projection), by calling [geoIdentity()](https://d3js.org/d3-geo/projection#geoIdentity), using the `fitSize()` method to scale it to our SVG bounding box. Our revised projection is passed in as an argument to `d3.geoPath()`, overriding the default projection.

```js
const projection = d3
  .geoIdentity()
  .fitSize([dimensions.width, dimensions.height], data)

const path = d3.geoPath(projection)
```

This assumes the top left SVG co-ordinates should be [0, 0] — otherwise you should use `fitExtent()` which allows us to specify all corners of the bounding box.

### Flipping the path

Now our paths should render visibly. But you might notice there’s one more issue: they are upside-down. Be careful because this might not be totally obvious with unfamiliar paths. But it was certainly noticeable with a map of the UK!

The reason for this is that standard spatial reference systems treat the _y_ axis as pointing upwards from 0, while in the SVG co-ordinate system the _y_ axis points downwards, with 0 at the top. Luckily D3 provides a method for reflecting our projection in the _y_ dimension.

```js
const projection = d3
  .geoIdentity()
  .reflectY(true) // Flip the paths in the y dimension
  .fitSize([dimensions.width, dimensions.height], data)

const path = d3.geoPath(projection)
```

## Result

Check out the Codepen demo below to see this in action. You can replace the `geojsonUrl` variable with your own GeoJSON data URL to create an SVG from your own data.

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="pvzKVzK" data-pen-title="GeoJSON to SVG" data-user="michellebarker" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/pvzKVzK">
  GeoJSON to SVG</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

Once I created this I was able to copy the resulting SVG code and save the static file for use in my codebase.

## Common issues drawing paths from GeoJSON

When working with GeoJSON polygon data (particularly with map libraries) I sometimes get an error along the lines of “Polygons and MultiPolygons should follow the right-hand rule”. This tends to occur in GeoJSON validators, or when using a library like Mapbox. (I didn’t have this issue with the above code.) This relates to the GeoJSON specification regarding how polygons are “drawn”. It states that “A linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e. exterior rings are counterclockwise, and holes are clockwise.”

There are a couple of ways to fix this:

1. In the browser, by uploading the file or pasting the code into the [mapster-right-hand-rule-fixer](https://mapstertech.github.io/mapster-right-hand-rule-fixer/) tool.
2. Using Mapbox’s [rewind](https://github.com/mapbox/geojson-rewind) package,

Both of these will output the polygons in the correct format.

## Server-side generation

After implementing this in the browser I got curious about generating SVGs from GeoJSON at build-time. This didn’t take too much work, and allows me to easily update the SVG if the data changes.

We need to do this slightly differently as there is no DOM, so we can’t select elements using D3. But we can still generate the paths easily, append them to an SVG element and write it to a file.

We can still use the `geoPath()` and `geoIdentity()` methods as previously. This time, however, we’ll map over the features and return a HTML string. In addition the the `d` attribute, I’m giving each path a unique ID based on its properties, which will be useful for interaction.

```js
const projection = geoIdentity()
  .reflectY(true)
  .fitSize([dimensions.width, dimensions.height], data)

const path = geoPath(projection)

const paths = data.features.map((d) => {
  return `<path id="${d.properties.name}" d="${path(d)}" />`
})
```

Then we just need to append those paths to the SVG element and write to a file using Node JS’s [writeFile()](https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options) method.

```js
const fileData = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${paths.join('')}</svg>`

writeFile('./src/map-svg.svg', fileData)
```

Here’s the full code:

```js
import { geoPath, geoIdentity } from 'd3'
import { writeFile } from 'node:fs/promises'

const geojsonUrl = 'https://assets.codepen.io/85648/map-example.json'

const dimensions = {
  width: 600,
  height: 300,
}

fetch(geojsonUrl)
  .then((response) => response.json())
  .then(async (data) => {
    try {
      console.log('✨Generating SVG')

      const { width, height } = dimensions
      const projection = geoIdentity()
        .reflectY(true) // SVG co-ordinate system is the opposite way up, so we need to flip it
        .fitSize([dimensions.width, dimensions.height], data) // Scale to fit our SVG dimensions

      const path = geoPath(projection)

      const paths = data.features.map((d) => {
        return `<path id="${d.properties.name}" d="${path(d)}" />`
      })

      const fileData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${paths.join('')}
      </svg>`

      await writeFile('./src/map-svg.svg', fileData)

      console.log('Done!')
    } catch (error) {
      console.error('Error writing file')
    }
  })
```

See the [Github gist with this code](https://gist.github.com/mbarker84/de0f5493a3d7b69f656682f9724b34d2)
