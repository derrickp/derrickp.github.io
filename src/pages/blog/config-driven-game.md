---
layout: "../../layouts/BlogPost.astro"
title: "Configuration during game development"
description: "A retrospective on 2 different configuration formats."
pubDate: "Jan 28 2023"
---

I've tried to make a game a few times. Previously it was [Under Farm](https://github.com/derrickp/under_farm). The current game I'm learning game development while making is [Goblin Hall](https://github.com/SpinningGoblin/goblin_hall) (will that be the actual game name? No idea.).

Both times I have tried to approach development by being able to configure aspects of the game separate from the game's source code. A configuration or data-centric approach. This is useful since you can tweak values for the game, like sprite locations or tile sizes, without needing to recompile your code every time you want to make a change.

The first game (Under Farm) I used [KDL](https://kdl.dev/) which could have gone better. I like the KDL syntax quite a bit, but the support for automatic deserialization in Rust (my language of choice right now) was a bit lacking in comparison to something like JSON. This is unsurprising, since JSON is quite a bit more popular, but it is worth noting. I ended up writing code to move from KDL Node and Values and push them into my configuration structs. This ended up being cumbersome, and while I could have wrote something to do it automatically, it wasn't really what I was trying to learn while working on the game. I eventually (almost inevitably) stopped putting as much into configuration as I could have. When every new value added becomes a chore, you end up not wanting to add anything and just deal with the `const` values in your code. Maybe I'll eventually go back and some better automatic serde support for KDL.

Flash forward a bit of time and I'm starting work on Goblin Hall. Starting out (fresh-ish, I kept sprites and copied some of the basic code) I decided to rethink my configuration approach. I've used [serde](https://crates.io/crates/serde) and [serde_json](https://crates.io/crates/serde_json) quite a lot in all of my various other side projects, so I decided to start there. And so far it's been a much better experience. Not having to write the deserialization boilerplate for my configuration structs has meant I usually try to think about how I can configure values from the start, instead of first reaching for constants in my code.

As of right now, I'll be continuing with the JSON approach as I build out my first mechanics in Goblin Hall and figure out the type of game I want to build.
