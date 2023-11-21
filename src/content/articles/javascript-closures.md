---
title: 'Closures in JavaScript'
pubDate: 2023-08-16
description: 'Closures in JavaScript: A concise exploration of closures, their benefits, and a simple example to illustrate the concept. Boost your JS skills with this foundational knowledge!'
author: 'Will Adams'
image:
  url: 'https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/v1700571798/bushbladedotdev/javascript-closures.avif'
  alt: 'Closures in JavaScript'
  thumbnail: 'https://res.cloudinary.com/bushblade/image/upload/c_thumb,w_400,g_face/bushbladedotdev/javascript-closures.avif'
tags: ['javascript', 'fundamentals']
draft: false
---

Closures are a fundamental concept in JavaScript that often baffle newcomers. However, once grasped, they can become a powerful tool in a developer's toolkit. Let's dive in!

## What is a Closure? 🔍

In JavaScript, a closure is a function that has access to the outer (enclosing) function's variables — even after the outer function has finished executing. This phenomenon occurs because functions in JavaScript form closures. Essentially, closures give you access to an outer function’s scope from an inner function.

## Why use Closures? 🤔

1. **Data Privacy**: Closures can help keep variables private, creating encapsulation of a _private_ variable in JavaScript, which traditionally doesn’t support class-based privacy.
2. **Function Factories**: You can create multiple functions using a single function, with each one having its own environment.
3. **Event Listeners**: Closures are frequently used in event listeners and callbacks to preserve data state.

## Simple Example 🖥️

Let's say you want to create a function that generates functions to add a specific number:

```javascript
function createAdder(baseNumber) {
  return function (numberToAdd) {
    return baseNumber + numberToAdd
  }
}

const addFive = createAdder(5)
const addTen = createAdder(10)

console.log(addFive(3)) // 8
console.log(addTen(3)) // 13
```

In the example above:

1. `createAdder` returns a function.
2. The returned function can access the `baseNumber` variable of the `createAdder` function.
3. Even after we've run `createAdder`, the inner function still remembers `baseNumber`.

This behavior is possible because of closures. The inner function preserves the environment it was created in, allowing access to `baseNumber` even after `createAdder` has finished executing.

## Wrapping Up 🎁

Closures might seem complicated at first, but understanding them can elevate your JavaScript game. They provide a way to manage and maintain state in a language that’s heavily driven by callbacks and asynchronous operations.

Happy coding! 🚀
