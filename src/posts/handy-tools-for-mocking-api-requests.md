---
title: 'Handy Tools For Mocking API Requests'
date: '2022-10-25'
tags: ['post', 'js', 'tooling', 'workflow']
---

In the course of my work I sometimes find myself needing to mock API requests — often when I’m prototyping, or testing a concept for an article. There are a couple of useful (free) tools I reach for on these occasions.

## n:point

<figure>
  <img src="/handy-tools-for-mocking-api-requests-01_900.jpg" srcset="/handy-tools-for-mocking-api-requests-01_1600.jpg 1600w, /handy-tools-for-mocking-api-requests-01_900.jpg 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="Screenshot of n:point website">
</figure>

[n:point](https://www.npoint.io/) provides lightweight, publicly accessible API endpoints for your JSON data. It’s super easy to use: simply give it some JSON and it sets up an endpoint in seconds. No messing about with access tokens, it’s ideal if you just want to fetch some data. You can also define and lock the JSON schema. I’m using n:point for a [Codrops article](https://tympanus.net/codrops/2022/03/29/building-an-interactive-sparkline-graph-with-d3/) on creating an interactive line graph based on timeseries data.

## Mockeroo

<figure>
  <img src="/handy-tools-for-mocking-api-requests-02_900.jpg" srcset="/handy-tools-for-mocking-api-requests-02_1600.jpg 1600w, /handy-tools-for-mocking-api-requests-02_900.jpg 900w" sizes="(max-width: 1080px) 90vw, 930px" alt="Screenshot of Mockeroo website">
</figure>

If you need to actually generate some data, [Mockeroo](https://mockaroo.com) is a tool that enables you to do just that. You can add rows of different types and Mockeroo will generate random data. There are configuration options, including setting ranges (for numbers and dates, for example), and including null values. If you’re happy writing Ruby, you can also include formulas and you can download the data in different formats.

I’ve only used Mockeroo for generating JSON, but you can also create API endpoints. It’s not as quick as n:point to set up, but looks useful if you need to mock any more complex API requests.
