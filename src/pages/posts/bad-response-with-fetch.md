---
layout: '@layouts/MarkdownLayout.astro'
title: Handling bad responses with Fetch
pubDate: 2023-03-31
description: 'Write a small fetch library that handles bad responses'
author: 'Will Adams'
# image:
#   url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg'
#   alt: 'The Astro logo with the word One.'
tags: ['fetch', 'javascript']
draft: true
---

If you've ever worked with APIs or made HTTP requests in JavaScript, you're probably familiar with
the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). While fetch
is a great tool for making HTTP requests, it can sometimes be a bit cumbersome to work with,
especially when you need to handle errors or configure your requests with custom headers and
options.

In this blog post, we'll take a closer look at the default behavior of fetch, explain how to use the
[ ok response ](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) to check for
successful requests, and discuss how to handle bad responses that may include additional error
information in the response body.

## The Default Behavior of fetch

By default, fetch does not throw errors or reject promises on **4xx** and **5xx** HTTP status codes.
Instead, it resolves the promise with the Response object, regardless of whether the request was
successful or not. This means that you need to manually check the ok response property to determine
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

## Using the ok Response Property

The ok response property is a boolean that indicates whether the HTTP response was successful or
not. It returns true for HTTP status codes in the range **200-299**, and false for any other status
code.

### Here's an example of checking the ok response property for a POST request:

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
```

In this example, we're making a POST request to the JSONPlaceholder API to create a new post. We're
using the ok response property to check whether the response was successful or not. If the response
was not successful, we're throwing an error that will be caught by the catch block. Handling Bad
Responses with Additional Error Information

Many APIs will send back a JSON response along with a bad response that may contain more information
about what went wrong. For example, an API might return a 404 error with a JSON response that
includes an error message and a code.

To handle bad responses that include additional error information, you can parse the response body
as JSON and extract the error information from it.

### Here's an example:

```javascript
fetch('https://jsonplaceholder.typicode.com/notfound')
  .then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Network response was not ok')
      })
    }
    return response.json()
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
```

In this example, we're making a request to an invalid URL on the JSONPlaceholder API, which will
result in a 404 error. We're using the ok response property to check whether the response was
successful or not. If the response was not successful, we're parsing the response body as JSON and
extracting the message property from the error data. We're then throwing an error that will be
caught by the catch block.

By building a small library that encapsulates this error handling logic, you can make it easier to
work with APIs that return error information in the response body. Here's an example of a small
fetch wrapper library that handles bad responses:

```javascript
function handleResponse(response) {
  if (!response.ok) {
    return response.json().then((errorData) => {
      throw new Error(errorData.message || 'Network response was not ok')
    })
  }
  return response.json()
}

function fetchWithErrors(url, options) {
  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error))
}

fetchWithErrors('https://jsonplaceholder.typicode.com/notfound').then((data) =>
  console.log(data)
)
```

In this example, we've defined a handleResponse function that encapsulates the error handling logic
we discussed earlier. We've also defined a fetchWithErrors function that calls fetch with the
provided URL and options, and uses the handleResponse function to handle bad responses.

By using this fetchWithErrors function instead of fetch, we can handle bad responses with minimal
additional code. Conclusion

fetch is a powerful tool for making HTTP requests in JavaScript, but it can be a bit cumbersome to
work with when you need to handle errors or configure your requests with custom headers and options.
By understanding the default behavior of fetch and using the ok response property to check for
successful requests, you can make your code more resilient to errors.

Additionally, by building a small library that encapsulates error handling logic, you can make it
easier to work with APIs that return error information in the response body.
