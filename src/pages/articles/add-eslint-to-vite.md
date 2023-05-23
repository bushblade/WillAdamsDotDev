---
layout: '@layouts/MarkdownLayout.astro'
title: Add Eslint to a React Vite project
pubDate: 2023-04-04
description: Moving from Create React App to vite? You'll probably want to add some linting to help stop you screwing up.
author: 'Will Adams'
# image:
#   url: 'https://astro.build/assets/blog/astro-1-release-update/cover.jpeg'
#   alt: 'The Astro logo with the word One.'
tags: ['React', 'Vite', 'eslint']
draft: false
---

[Vite](https://vitejs.dev/) is an excellent build tool for React applications that offers
near-instantaneous startup times and a plugin system, with a much nicer
development experience than Create React App.

<aside> 
  <span>NOTE:</span> As of <a
  href="https://github.com/vitejs/vite/pull/12801" target="_blank">this PR</a> on 20th April
  2023 Vite comes with
  Eslint and rules for React included 'out-of-the-box'.
</aside>

## Coming from Create React App

If you're coming from Create React App, you may be used to having many
[eslint](https://eslint.org/)
plugins included out-of-the-box, like
[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks),
which helps enforce rules of React Hooks, utlimately keeping you on the right
path in the use of hooks.  
Since the new [React Docs](https://react.dev) have been released with zero
mention of [Create React App](https://create-react-app.dev/) Vite is becoming a
more popular option to get started, but out of the box it lacks some of the tooling
which CRA offered.

### Example:

![No errors](https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/f_webp/bushbladedotdev/eslint-no-error.png)
Here we are clearly breaking the [rules of hooks](https://legacy.reactjs.org/docs/hooks-rules.html), we are trying to use [useEffect](https://react.dev/reference/react/useEffect)
inside a functtion and returning a Promise that resolves with `'foo'`  
**You cannot and should not do this.**  
Fortunately, it's easy to add these plugins to Vite as well.

## Install eslint and necessary plugins

First, install eslint and any necessary plugins as development dependencies
using our package manager of choice ([pnpm for me](https://pnpm.io/)):

```bash
pnpm i -D eslint eslint-plugin-react eslint-plugin-react-hooks

```

## Create an eslint configuration file

Create an [eslint configuration file](https://eslint.org/docs/latest/use/configure/configuration-files), in the root of our
project. Here's an example configuration that extends the recommended eslint
rules and includes the necessary plugins:

<aside> 
  <span>NOTE:</span> You can use json, yaml or a JavaScript file for our eslint config.  
  <br/>
 Here we'll go with json.
</aside>

Name the file **.eslintrc.json**

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "plugins": ["react", "react-hooks"],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es2020": true
  },
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

This configuration extends the recommended eslint rules and adds the necessary
plugins for **React** and **React Hooks**. It also enables parsing of jsx syntax and
sets up the environment to include the browser and es2020.
This may be all you need and if you have a eslint plugin in our editor, you
should start now seeing output in our editor from the linter if you do
something you should not.

## Add eslint to Vite

Now that eslint is configured we can add a plugin for Vite so you can get the
linting to run at build time to check our code before you deploy.
The plugin also runs eslint with output into our browser console, so you really
have no excuse for ignoring the warnings!

install the **vite-plugin-eslint** plugin:

```bash
pnpm i -D vite-plugin-eslint
```

Then, add the following to our **vite.config.js** file:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
})
```

## Check it's all working

If we take a look back out our code from earlier, we should now see some
warnings and errors from the linter

![Eslint showing errors](https://res.cloudinary.com/bushblade/image/upload/c_scale,w_800/f_webp/bushbladedotdev/eslint-error-react-vite.png)

**Much better!** Adding eslint to our Vite React project and extending the necessary plugins,
ensures that our code adheres to best practices and coding standards.
Eslint is a powerful tool that can help you catch issues early in development,
saving you time and effort in the long run.
If you're starting out on your React journey and using Vite, I highly recommend
using Eslint to help you learn how to use hooks correctly.
