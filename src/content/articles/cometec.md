---
title: 'Important: Scam Alert Involving Cometec and a Fork of ProShop'
pubDate: 2025-01-18
description: 'A detailed account of the Cometec scam targeting developers, involving malicious code and spoofed commits in a forked repository of the ProShop v2 project.'
author: 'Will Adams'
image:
  url: 'bushbladedotdev/scam-alert'
  alt: 'Scam Alert'
tags: ['MERN', 'javascript', 'Udemy']
draft: false
---

I want to address a recurring issue that has been brought to my attention over the past few months. Several developers have contacted me about scams orchestrated by a company called **Cometec** (https://cometec.io). These scams involve malicious code and fraudulent behavior, often targeting freelance developers on platforms like Upwork and Telegram. This post aims to clarify the situation, warn others, and provide transparency about my involvement (or lack thereof).

## Background 🕵️‍♂️

The project at the center of this scam is Cometec’s [NFT Marketplace](https://github.com/cometec/nft_marketplace) repository, which is a fork of the [ProShop v2](https://github.com/bradtraversy/proshop-v2) repository. For context:

- **ProShop v2** is the main project from Brad Traversy’s popular [MERN Ecommerce course](https://www.traversymedia.com/mern-stack-from-scratch).
- I contributed to this project as part of my work with Traversy Media.

While forking open-source projects is perfectly legitimate, Cometec has misused this functionality to include malicious code in their fork. Worse, they have edited commit metadata to make it appear as though I made these changes.

## The Issue ⚠️

- **Spoofed Commits**: Cometec’s fork includes commits falsely attributed to me. These commits were added long after my genuine contributions and contain malicious code designed to steal private credentials from developers' computers.
- **Developer Complaints**: Developers who cloned and ran Cometec’s repository have contacted me, assuming my involvement due to my name appearing in the commit history.
- **Reputation Impact**: This activity has caused confusion and concern, as it wrongfully associates me with Cometec’s fraudulent actions.

## Examples of the Scam 🛑

Below are examples of what developers have encountered, extracted from Telegram chats:

![Telegram Screenshot 1](https://res.cloudinary.com/bushblade/image/upload/v1737212716/bushbladedotdev/cometec01.webp)  
![Telegram Screenshot 2](https://res.cloudinary.com/bushblade/image/upload/v1737212716/bushbladedotdev/malicious-one-line-code.webp)

In these messages, developers have described:

- Finding **malicious code** hidden within the project.
- Being tricked into running code that compromised their systems.
- Having their **cryptocurrency wallets compromised** due to stolen private keys.

## Key Points to Note 📝

1. **I Have No Affiliation with Cometec**:

   - I did not create, modify, or endorse their fork.
   - My contributions to ProShop v2 are legitimate, but I am in no way connected to Cometec’s malicious actions.

2. **Commit Metadata Can Be Spoofed**:

   - Anyone with access to my publicly visible email address can spoof commits with my name and email. This does not mean they accessed my account.

3. **GitHub Is Aware**:
   - I have reported Cometec to GitHub, providing evidence of their actions. Unfortunately, their repository remains private, limiting my ability to investigate further.

## The Cryptocurrency Exploit Explained 🔐

Many of the developers affected by this scam were using Metamask, a popular cryptocurrency wallet. Here’s how Cometec’s malicious code likely operated:

1. **Compromised Wallets**: The code targeted Metamask wallets by accessing cached or decrypted private keys when the wallet was unlocked in the browser.
2. **Stolen Credentials**: Once the private keys were obtained, the scammers could sign transactions on the victim's behalf and steal their cryptocurrency.
3. **Malicious Scripts**: The malicious scripts might have connected to a command-and-control (C2) server, enabling further exploitation, such as installing additional malware or directly transferring wallet data.

Metamask wallets are used to store and transfer various cryptocurrencies like Ethereum, Tether, and USDC. These wallets rely on a seed phrase to generate private keys, which are critical to securing user funds.

## My Advice to Developers 🛠️

- **Do Not Trust Cometec**: Avoid working with them, and do not run any code from their repositories.
- **Secure Your Wallets**: If you use cryptocurrency wallets like Metamask, ensure they are locked when not in use and avoid running untrusted code in the same browser session.
- **Verify Commit Authenticity**: Check for verified commits (e.g., those signed with GPG) when working with open-source projects.

## Actions I Am Taking 🔒

- **Public Statement**: This post serves as an official statement to clarify my position and warn others.
- **Community Awareness**: I am sharing this issue on social media and development communities to spread awareness.
- **Enhanced Security**: Going forward, I will [sign all my commits with GPG ](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) to help verify their authenticity.

## How You Can Help 🤝

- If you’ve encountered similar issues with Cometec or have additional information, please report it to GitHub and share your experience.
- Share this post to help warn others about the scam.

## Conclusion ✅

Open-source projects thrive on trust and collaboration, but unfortunately, bad actors like Cometec exploit these values. I am committed to transparency and hope this post clears up any confusion. If you have any questions or concerns, feel free to reach out.

Stay vigilant and safe,  
**Will Adams**
