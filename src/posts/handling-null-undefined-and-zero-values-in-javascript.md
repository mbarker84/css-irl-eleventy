---
title: 'Handling Null, Undefined and Zero Values in JavaScript'
date: '2023-11-08'
tags: ['post', 'quick tip', 'National Blog Posting Month', 'javascript']
intro: 'Day 8 of National Blog Posting Month #NaBloPoMo'
---

In JS, it’s easy to get caught out when determining if a variable is null, undefined, or has a value of zero. I do a lot of data visualisation, and quite often I’ll need to filter out null values from an array of data.

```js
data.filter((value) => !!value)
```

The problem is, this is also going to filter out values of `0` too, because is tests whether the value is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy). (Other falsy values include empty strings, and `NaN`.)

A better way might for this particular case might be to filter out non-numerical values instead:

```js
data.filter((value) => typeof value === 'number')
```

Logical operators can be handy for providing default values. Using the `||` (**or**) operator, the `message` text will read “Unknown days since last post” if the `daysSinceLastPost` value doesn’t exist.

```js
const message = `${daysSinceLastPost || 'Unknown'} days since last post`
```

The issue here is that if `daysSinceLastPost` is `0`, the text will read “Unknown days since last post” too! Instead, we could use the `??` operator, otherwise known as the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

```js
const message = `${daysSinceLastPost ?? 'Unknown'} days since last post`
```

That way, `daysSinceLastPost` will be used, even if the value is `0`, while our fallback will be used if it is `null` or `undefined`.

Put even more simply: In the following example, `test1` will evaluate to `'Test 1'`, while `test2` will evaluate to`0`. Nice!

```js
const test1 = 0 || 'Test 1'
const test2 = 0 ?? 'Test 2'

console.log(test1) // 'Test 1'
console.log(test2) // 0
```
