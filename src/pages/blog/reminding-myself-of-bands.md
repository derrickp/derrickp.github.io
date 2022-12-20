---
layout: "../../layouts/BlogPost.astro"
title: "Reminding myself of bands I've listened to"
description: "How I've reminded myself of what I might want to listen to again."
pubDate: "Dec 20 2022"
---

Over the course of 2022 I've apparently listened to 700+ different artists. I found this statistic using the console app I made - [krustens](https://crates.io/crates/krustens). It's probably not a perfect count, as the app interprets data from files downloaded from Apple and Spotify, but I think it's close enough for my purposes.

Now, not all of those 700+ artists are going to be ones that I listened to more than even a single song from, maybe when the "radio" takes over after an album ends, or they might be ones that I listened to a couple of times and decided I didn't want to listen to them anymore. So if I'm going to try to remember artists to go back to, it's probably not these ones that are worth seeing.

So how can I both remember artists, but not the ones I don't care about? I decided to try to solve this by adding 2 different commands to `krustens`.

The first command I added is fairly straightforward. Tell me the artists that I listened to on a specific day. You give it a day in the format `YYYY-MM-DD` (e.g. `2022-10-31`) and it will return the artists you listened to on that day, and how many times you listened to them. This helps me remember the artists I listened to, but only partially solves the problem of the filtering, as some of the artists I might have only listened to once because it's a single day.

The second command is a bit more involved. It's `random artists` which lets `krustens` suggest some random artists to me based on a number of criteria. 2 of the criteria, year and month, are fairly straightforward. I want artists suggested that I listened to in that year and month combined (if only year is given, then anytime in that year). But the last one to filter on is "Minimum number of listens". This tells `krustens` to filter for artists I've listened to at least that many times. I usually use values like 5 or 10, so that I can find artists where I listened to maybe a whole album, or at least a few songs a few times. Using this, and by requesting to get at least 5-10 artists suggested I will usually find a few artists each month that I've listened to, but maybe forgot about or didn't go back to, for whatever reason.

Some of these are ones I might try again and find that no, I didn't need to listen to them again. But other times I'll find artists and albums that I end up listening to quite a bit more and get reminded that I do quite enjoy them.

Eventually I'd love to add more to `krustens` to maybe help remind me of some automatically, or marking artists as ones I want to keep seeing. Maybe even adding some exports to an Apple Music or Spotify playlist. I can do these things inside of Apple Music or Spotify itself, by adding to a playlist or my library, but it is always fun to take a little dive through my streaming history and do something local instead.

If you use Spotify or Apple music and want to dig through your history, I would definitely recommend downloading your data from them and looking through what you get. And if you want, download `krustens` (through `cargo`) and try it out! I'm looking at adding binaries for different systems soon.

If you're interested in `krustens` I'll be doing some posts in the future about how it all works.
