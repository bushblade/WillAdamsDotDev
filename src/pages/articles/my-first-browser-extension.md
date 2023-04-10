---
layout: '@layouts/MarkdownLayout.astro'
title: My First Browser Extension
pubDate: 2023-04-08
description: I made my first Chrome and FireFox extension to solve a problem for students of Brad Traversy in his courses.
author: 'Will Adams'
# image:
#   url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg'
#   alt: 'The Astro logo with the word One.'
tags: ['Chrome', 'FireFox']
draft: false
---

## The problem 😕

As someone who answers students' questions in [Brad Traversy's](https://www.traversymedia.com/) courses, I've
noticed that many of them were reporting having difficulty keeping track of which lesson
they're on in the side menu while using the course platform, as each time they
would click on a lesson the side menu would reset.  
Unfortunately, since the platform is provided by [Kajabi](https://kajabi.com/), we don't have access to their code to
modify the behavior.

## The solution 💡

To address this issue, I've developed a browser extension for Chrome and FireFox. This
extension is a simple yet effective add on that automatically scrolls the active
lesson to the center of the sidebar and highlights it in Traversy Media blue,
each time a lesson is selected.

As a newcomer to browser extension development, creating this tool was a great
learning experience for me. It was a simple introduction to the process of
developing browser extensions, and I found it to be an enjoyable and rewarding
process.

### Resources I used 📚

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
- [Chrome Developers Docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

## Super simple 💪

The code itself is only a few lines:

```javascript
function highlightAndScrollIntoViewActive() {
  const sideMenu = document.querySelector('.main-sidebar')

  const activeLink = sideMenu.querySelector('.product-outline-post.active')
  activeLink.style.outline = '3px solid #0060df'
  activeLink.style.padding = '6px'

  activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

highlightAndScrollIntoViewActive()
```

All it does is use the **_active_** class that Kajabi add to find the correct
element in the side bar, scroll it into view and add an outline to highlight
it.  
Any time a student clicks a lesson it's a link that takes them to a page for
that lesson, so the code runs again after the DOM is loaded (this is the default
for any extension).

## Get it if you're a student of Traversy Media 🚀

The **Scroll Active Lesson** extension is available for both Chrome and Firefox
browsers, and it's easy to use. You can install the extension [for
Chrome](https://chrome.google.com/webstore/detail/traversy-media-scroll-act/nmddkphngjlkifpobgpcbfbmfmfpimam)
from the Chrome Web Store and [for
Firefox](https://addons.mozilla.org/en-US/firefox/addon/traversy-scroll-active-lesson/)
from the Firefox Add-ons store.

This extension is designed to improve the student experience by making it easier
for them to keep track of their progress in the course. By automatically
scrolling the active lesson to the center of the sidebar and highlighting it,
students can save time and frustration and focus on learning.

If you want to learn more about the extension or contribute to its development,
the source code is available on
[Github](https://github.com/bushblade/TraversyMediaScrollActiveLesson). Feel
free to submit issues or pull requests if you encounter any problems or have any
suggestions.
