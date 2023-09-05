---
title: Handling bad responses with Fetch
pubDate: 2023-03-31
description: 'How to handle bad responses that include a JSON response and write a small library for the Fetch API'
author: 'Will Adams'
# image:
#   url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg'
#   alt: 'The Astro logo with the word One.'
tags: ['fetch', 'javascript']
draft: false
---

If you've ever worked with APIs or made HTTP requests in JavaScript, you're probably familiar with the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). While fetch is a great tool for making HTTP requests, it can sometimes be a bit cumbersome to work with, especially when you need to handle errors or configure your requests with custom headers and options.

In this post, we'll take a closer look at the default behavior of fetch, explain how to use the [ok response](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) to check for successful requests, and discuss how to handle bad responses that may include additional error information in the response body. We'll also introduce a small library that wraps fetch and simplifies error handling, enabling easier access to any additional error information that may be included in the response.

## The Default Behavior of fetch

By default, fetch does not throw errors or reject promises on **4xx** and **5xx** HTTP status codes.
Instead, it resolves the promise with the Response object, regardless of whether the request was
successful or not. This means that you need to manually check the [ok response](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) property to determine
whether the request was successful or not.

### Here's an example:

```javascript
fetch('https://run.mocky.io/v3/7d8c436e-d1dc-4857-b0ac-7e3e8047aef8')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Something went horribly wrong 💩')
    }
    return response.json()
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
```

In this example, we're making a request to a mock API (provided by
[Mocky](https://designer.mocky.io/)) that sends back a bad response. We're using the ok response
property to check whether the response was successful or not. If the response was not successful,
we're throwing an error that will be caught by the catch block.

### Why this isn't the best solution

While checking the `ok` property is an effective way to identify unsuccessful requests, this method has a significant limitation: it doesn't allow you to access potentially useful error information included in the response body. Many APIs will send back a JSON response along with a bad response that may contain more information about what went wrong. For example, an API might return a 400 error with a JSON response that includes an error message saying what went wrong and why.

If you run the above example and use your developer tools to inspect the
response from the API you will see that the response also included some JSON:-

![JSON was sent with the bad response](https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/f_webp/bushbladedotdev/bad-response-01.png)

But we didn't get that response in our code and so were not able to do
anything meaningful with it. We see our thrown error message logged to the
console, but in our code we have no access to the JSON that the server also
sent.  
To get that JSON response in our code we can add in an additional check to see
if the response included some JSON.

### Check if the bad response includes some JSON:

```javascript
fetch('https://run.mocky.io/v3/7d8c436e-d1dc-4857-b0ac-7e3e8047aef8')
  .then((response) => {
    if (!response.ok) {
      // check if there was JSON
      const contentType = response.headers.get('Content-Type')
      if (contentType && contentType.includes('application/json')) {
        // return a rejected Promise that includes the JSON
        return response.json().then((json) => Promise.reject(json))
      }
      // no JSON, just throw an error
      throw new Error('Something went horribly wrong 💩')
    }
    return response.json()
  })
  .then((data) => console.log(data))
  .catch((error) => {
    console.error('Here we caught the rejection with a JSON response', error)
  })
```

### Now in our catch we get the bad response and the JSON payload:-

![JSON was sent with the bad response](https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/f_webp/bushbladedotdev/bad-response-02.png)

### Build a library to wrap Fetch

This is much better. But what if we want to make other HTTP requests too?
We can make ourselves a [small library](https://github.com/bushblade/fetch-library) that wraps Fetch with the above logic and exposes a set of
methods for making **POST**, **PUT**, **DELETE** and **GET** requests which then
becomes as simple as:-

```javascript
// create an instance of the library
const api = http('https://run.mocky.io/v3/7d8c436e-d1dc-4857-b0ac-7e3e8047aef8')

api
  .get('/posts')
  .then(({ data }) => {
    console.log('✅ Got a good response:-\n', data)
  })
  .catch(({ error, data }) => {
    console.error('❌ Got a bad response:-\n', error, data)
  })
```

This will likely be familiar to use if you have ever used a library such as [Axios](https://axios-http.com/docs/intro)
So is a pretty neat solution if you don't need all the features of a Axios, but
do need a little more than Fetch offers _"out of the box"_.
