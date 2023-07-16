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
Additionally the video player is currently limited to a maximum width of **1356px**,
meaning for those students on larger monitors, the video looks oddly small.  
Unfortunately, since the platform is provided by [Kajabi](https://kajabi.com/), we don't have access to their code to
modify the behavior.

### Before extension:

![Before Extension](https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/f_webp/bushbladedotdev/extension-before.webp)

## The solution 💡

To address this issue, I've developed a browser extension for Chrome and FireFox. This
extension is a simple yet effective add on that automatically scrolls the active
lesson to the center of the sidebar and highlights it in Traversy Media blue,
each time a lesson is selected.  
It also targets the video container (Ironically with the class name
`kjb-video-responsive` 🤷) and maximises it to the available space in the
viewport while limiting the max size so all the video is always visible and
preserving the aspect ratio.

As a newcomer to browser extension development, creating this tool was a great
learning experience for me. It was a simple introduction to the process of
developing browser extensions, and I found it to be an enjoyable and rewarding
process.

### After extension:

![Before Extension](https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/f_webp/bushbladedotdev/extension-after.webp)

### Resources I used 📚

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
- [Chrome Developers Docs](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

## Super simple 💪

The code itself to implement this part of the extension is only 28 lines:

```javascript
const videoWrapper = document.querySelector('.kjb-video-responsive')

function highlightAndScrollIntoViewActive() {
  const sideMenu = document.querySelector('.main-sidebar')

  /** @type HTMLLinkElement */
  const activeLink = sideMenu.querySelector('.product-outline-post.active')
  activeLink.style.outline = '3px solid #0060df'
  activeLink.style.padding = '6px'

  activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function maximiseVideo() {
  const searchForm = document.querySelectorAll('form[role=search]')[1]
  videoWrapper.style.maxWidth = '100%'
  videoWrapper.style.paddingBottom = '0'
  videoWrapper.style.aspectRatio = '5/4'
  videoWrapper.style.height = 'auto'
  videoWrapper.style.maxHeight = `calc(100vh - ${
    searchForm.getBoundingClientRect().height
  }px)`
  videoWrapper.style.width = '100%'
  searchForm.scrollIntoView(true)
}

maximiseVideo()

// NOTE: Ensure scroll animation runs after video resized
window.requestAnimationFrame(highlightAndScrollIntoViewActive)
```

All it does is use the **_active_** class that Kajabi add to find the correct
element in the side bar, scroll it into view and add an outline to highlight
it.  
Any time a student clicks a lesson it's a link that takes them to a page for
that lesson, so the code runs again after the DOM is loaded (this is the default
for any extension).

For maximising the video size I noted that Kajabi were using the old trick of
`height: 0;` and `padding-bottom: 56%;` to preserve the aspect ratio, but
also limiting the `max-width` to 1356px. Using newer css features like [CSS
Aspect Ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
helped to fix this along with calculating the max height to account for the
search bar they position above the video.

## Update: Persisting Video Speed

In addition to the original features, I have also updated the extension to persist the video speed for users. This means that the video speed will be saved to local storage and will be restored the next time the user watches a lesson.

This was a tricky problem to solve because the video speed settings are dynamically inserted into the DOM after the video is loaded. To solve this, I used the [MutationObserver API](<(https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)>) to watch for changes to the DOM and then take action when the speed setting buttons were ready.

### Here is the code to persist the video speed:

```javascript
/** @param {number} indx */
function speedSettingClickEvent(indx) {
  return function () {
    localStorage.setItem('playback-speed', `${indx}`)
  }
}

/** @param {NodeListOf<HTMLInputElement>} speedSettingCheckBoxes*/
function addSpeedSettingsEventListeners(speedSettingCheckBoxes) {
  // add event listeners
  speedSettingCheckBoxes.forEach((checkBox, indx) => {
    checkBox.addEventListener('click', speedSettingClickEvent(indx))
  })
}

/** @param {NodeListOf<HTMLInputElement>} speedSettingCheckBoxes*/
function restoreSpeed(speedSettingCheckBoxes) {
  const storedSpeed = localStorage.getItem('playback-speed')
  if (storedSpeed) {
    speedSettingCheckBoxes[storedSpeed].click()
  }
}

// NOTE: video settings are dynamically inserted into DOM after wista loads the
// video.

// only set the speed once
let canSetSpeed = true
let settingsOpened = false

/** @param {Array<MutationRecord>} mutationList*/
function mutationCallback(mutationList) {
  mutationList.forEach(() => {
    // need to open and close the settings to apply
    /** @type {HTMLButtonElement} */
    const settingsButton = document.querySelector(
      'button[aria-label="Show settings menu"]'
    )

    if (settingsButton && !settingsOpened) {
      // open settings
      settingsButton.click()
      settingsOpened = true
    }

    /** @type {NodeListOf<HTMLInputElement>} */
    const speedSettingCheckBoxes =
      document.querySelectorAll('input[name=Speed]')

    // check that the speed settings are there and we can set speed
    if (
      speedSettingCheckBoxes &&
      canSetSpeed &&
      speedSettingCheckBoxes.length === 7
    ) {
      addSpeedSettingsEventListeners(speedSettingCheckBoxes)
      restoreSpeed(speedSettingCheckBoxes)
      canSetSpeed = false
      // close settings
      if (settingsOpened) settingsButton.click()
    }
  })
}

const observerOptions = {
  childList: true,
  subtree: true,
}

const mutationObserver = new MutationObserver(mutationCallback)

mutationObserver.observe(videoWrapper, observerOptions)
```

This code uses the [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to watch for changes to the DOM. When the speed setting buttons are inserted into the DOM, the mutationCallback function is called. This function then adds event listeners to the speed setting buttons to set the users chosen speen in local storage and restores the previously saved video speed.

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
