---
layout: "../../layouts/BlogPost.astro"
title: "Exploring my Spotify data"
description: "Taking a look at different pieces of data you can get out of Spotify's data export."
pubDate: "Feb 03 2020"
---

**Note from Derrick in December 2022** - I'll be writing another post about something similar in the near future which uses the Krustens terminal app I wrote. But read on for what I was thinking in 2020!

---

Did you know that you can export a bunch of data out of Spotify? Buried inside of Privacy Settings inside your Account page at the very bottom you can ask Spotify to give you a consolidated download copy of your data. It takes a bit of time for them to gather it (for me it was usually 3-5 days), and they only give you about a year of your streaming history (I really wish they'd give me _everything_). Apparently you can contact them for your entire history, but I have not done that yet as I have not felt like it. But, even with only a year's worth of data it can be really interesting to dig through.

## The data

Most of the data is contained inside of various JSON files, and thankfully they all seem to have a fairly simple schema.

### Account data
I didn't find a ton of the account data to be that interesting, but some interesting bits can be found in `Identity.json` such as if you are a `tasteMaker` or not (I am not) and in `Userdata.json` you can find out when your account was created (2015 for me apparently).

### Music/List/Library data

Now we get to the fun bits.

There's a file called `SearchQueries.json` that details where and what you were searching, in addition to what artist you clicked on from the search. For instance I typed "in this" and then have an artist URI in there for "In This Moment", which makes sense. I haven't dug through this file too much yet, but it might be fairly interesting to see where I search the most (I assume Android), and how many characters I use before clicking an artist (and how often I mistype something).

There's a `Follow.json` file, which shows, I think, how many artists and users you follow, and lists the names of the artists as well. Mine is fairly small, as I don't really "follow" that many people in Spotify.

There's a `Playlist.json` file that gives me the full playlist of any ones that I created (super handy) as well as shows some other playlists I've followed (I think?) and one for "Liked from Radio" which I assume is just a Spotify created one. I don't use Playlists all that often other than a couple workout ones and one _massive_ one entitled "Let's Drive!". One interesting thing here, they also tell you if it's from a local file or not, for anyone that uses local files inside of Spotify.

`YourLibrary.json` lists out all of the artists/songs/albums you've added to your Library, which definitely makes me realize I should use this a bit more, as I almost never think about my Library, but could be an interesting way to keep a record of a bunch of artists I want to check out a bit more, and things like that. This also has a section for "shows", "episodes" and "bannedTracks". The banned tracks one was empty for me, but I feel like I should use it more, cause some bands I just don't want to come up.

And finally, the file that I spent the most time reading through, `StreamingHistory0.json`. Specifically for me I wanted to know how many times I listened to all of the different albums.

## Diving through the streaming history

The JSON of the streaming history has a fairly simple structure.

```javascript
{
  "endTime" : "2019-01-02 06:15",
  "artistName" : "Goblinsmoker",
  "trackName" : "Toad King",
  "msPlayed" : 15131
}
```

All that makes sense, when the stream ended, the artist, track and how long you played it for.  For me, when I was digging through the history I focused on songs that I had listened to for more than a minute, I figured if I only listened for 20s, then do I really care? So of the 8000+ songs in my streaming history, there were ~6300 that I had listened to for more than a minute.

Something I wish was in there was the album that the track was listened to on, and since I wanted that album I had to go somewhere else to get it. I probably _could_ have tried to get it out of the Library file I got, but didn't think about that. I also probably could have queried Spotify through an API, but where's the fun in that?! Embrace other things! So to [Musicbrainz](https://musicbrainz.org/) I go! Specifically their JSON API, which might not be as full-featured as their XML API but seemed to work fine.

To help with this I wrote 2 very thin wrappers around their JSON endpoints. They work, but probably have bugs. I also only coded bits around the exact parts of the API I actually wanted to use, so probably not helpful for everyone. But hopefully if anyone uses them, they aren't terrible. [Ruby](https://github.com/derrickp/musicz) and [Kotlin](https://github.com/derrickp/musikt).

One thing I found was that it was definitely easier to query the "recording" entities instead of the artist and then get the recordings through that. It felt a little more like going to the source. Almost across the board I was able to always find a recording with a score of 100 (best match possible) by passing in `artistname` and `title` as the query. Some caveats though
1. If the artist name had `&` in it, I needed to replace it with `and`
2. Some of the songs from Spotify had things like `2015 remaster` in it, and I needed to remove that to get any results
3. For some reason if the song title had `'s` or other similar ones and I needed to strip these out. Probably something I am missing.
4. Sometimes, it just broke on titles not quite being right, like `Through the Wall of Light Pt. II` vs `Through the Wall of Light Pt.II`
5. I originally used `artist` instead of `artistname` but found that for some `artist` didn't have the full name in the system

Overall it all worked great, other than getting throttled when I wasn't careful, so I made sure to slow it all down.

There were a few artists that weren't found, and others where it wouldn't find the album, but I worked around that by just recording an `Unknown Album` for those, and if it appeared as a top listen tried to fix manually. Not too many of those though. Things fell apart a bit for songs that appear on tons of albums (like Iron Maiden songs) and I would mark all of the recordings that came back, this wasn't too big an issue for me, but your mileage may vary. Probably something I could also fix with some manual intervention or digging through after. Because I kept all the high-scoring (in terms of relevance) albums, I never lost data, but just reported more albums than I actually listened to. But for me, none of them appeared in my top 10 at all.

A small amount of fun stats!
1. Devin Townsend's Empath was 1/3 of my listens for the year
2. Slipknot's We Are Not Your Kind was 1/6.
3. I should have mentioned Andrew W.K. in my previous blog as I listened to his newest one quite a bit and love it.
4. I listened to the new Baroness album a lot (400+ times), and I like it, but I wish the mixing was better. That's what kept it out of my top of the year lists.
5. I probably didn't listen to TOOL's Fear Inoculum enough (only 66 times)

Here's my top 10 for listens:

1. Devin Townsend, Empath, 2033
2. Slipknot, We Are Not Your Kind, 1081
3. Whitechapel, The Valley, 801
4. Opeth, In Cauda Venenum, 664
5. Andrew W.K., You’re Not Alone, 637
6. Zeal & Ardor, Stranger Fruit, 584
7. Behemoth, The Satanist, 460
8. Ghost, Prequelle, 448
9. Baroness, Gold & Grey, 448
10. Rivers of Nihil, Where Owls Know My Name, 392

I apparently listened to Ghost a lot, but I just don't think it stayed with me enough at the end of the year to toss it on my top lists. But I still really liked the album.

If you want to see the terrible, terrible code I wrote to get all this info, you can find it [here](https://github.com/derrickp/spotikt).

For my next steps, I think I'm going to get the areas where the artist's are from out of Musicbrainz and start putting them on a map for myself (I love maps), and try to hook up something that will get closer to near-live data out of Spotify.
