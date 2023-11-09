---
title: 'NaN or Not a Number?'
date: '2023-11-09'
tags: ['post', 'National Blog Posting Month', 'javascript']
intro: 'Day 9 of National Blog Posting Month #NaBloPoMo'
---

Following yesterday’s post on [handling null, undefined and zero values in JS](/handling-null-undefined-and-zero-values-in-javascript/), I was asked on [Mastodon](https://mastodon.social/@noleli/111376820699911290):

> I’m curious why `isNaN()` doesn’t work in your case. Thanks!

`isNan()` is a global function, which determines if a value evaluates to `NaN` or not. But what **is** `NaN`?

## NaN

`NaN` (not to be confused with your grandma) in JavaScript stands for [Not A Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN). It’s relatively common for `NaN` to appear in JS code as a result of an impossible math operation, which can occur when passing a value of the wrong type into a function. For example:

```js
console.log(1 / undefined) // NaN
console.log(1 / 'abc') // NaN
```

`NaN` is a mathematical expression (rather than something that comes from JavaScript), and so, confusingly can also be thought of as a number! We can see that it **is** actually a type of number:

```js
const value = 1 / 'abc'

console.log(value) // NaN
console.log(typeof value) // 'number'
```

## isNaN()

We can use `isNaN()` to test whether a value evaluates to `NaN`. But it can be surprising. `'1'`, `'abc'`, `''` (an empty string), `null` and `'002'` are all clearly **not** numbers. But if we pass them into `isNaN()`, only two of them evaluate true:

```js
console.log(isNaN('1')) // false
console.log(isNaN('')) // false
console.log(isNaN('abc')) // true
console.log(isNaN(null)) // false
console.log(isNaN(undefined)) // true
console.log(isNaN('002')) // false
```

`isNan()` attempts first to convert the value to a number. `null` or an empty string are coerced to `0`, for instance, meaning they can be parsed as numbers. Of these examples, only `'abc'` and `undefined` cannot be parsed as a numbers.

On the other hand, we can use the more robust `Number.isNaN()`, which does not first attempt to convert the value to a number:

```js
console.log(Number.isNaN('1')) // false
console.log(Number.isNaN('')) // false
console.log(Number.isNaN('abc')) // false
console.log(Number.isNaN(null)) // false
console.log(Number.isNaN(undefined)) // false
console.log(Number.isNaN('002')) // false
```

In this case, all of the expressions evaluate false.

## Filtering data

Going back to yesterday’s example of filtering an array to remove `null` or `undefined` values, we can see that `isNaN()` (or `Number.isNaN()`) won’t cut it.

```js
const data = [100, 52, null, 12, 71, '', undefined]

data.filter((value) => !isNaN(value))
// Results in [100, 52, null, 12, 71, '']
```

```js
data.filter((value) => !Number.isNaN(value))
// Results in [100, 52, null, 12, 71, '', undefined]
```

These filter functions don’t determine whether a value is a number, only whether a value is **not** Not A Number (`NaN`)! Therefore non-number values won’t all be filtered out.

To truly ensure that our filtered data only includes numbers, we can check if the type of each value is `'number'`:

```js
data.filter((value) => typeof value === 'number')
```

However, as we’ve seen above, `NaN` is a type of number! So `NaN` values won’t be filtered out here.

```js
const value = 1 / 'abc'
const data = [100, 52, null, 12, 71, '', undefined, value]

data.filter((value) => typeof value === 'number')
// Results in: [100, 52, 12, 71, NaN]
```

To make our function even more robust, let’s use `isNaN()` to cover those too:

```js
data.filter((value) => {
  return typeof value === 'number' && !isNaN(value)
})
// Results in: [100, 52, 12, 71] ☺️
```
