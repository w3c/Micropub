# Responses

> 1. Alexa posts a short video which is distributed to the inbox streams of her followers.
> 2. Ben thinks it's a good video. He indicates to Alexa and others that he "likes" the video.
> 3. Charles posts a comment on the video. "This is hilarious!"
> 4. Denise indicates that she "likes" Charles's comment.
> 5. Edgar post a comment on the video: "This sucks! Boo!" He thinks better of the sentiment and deletes the comment.
> 6. Felicia indicates that she "likes" the video. She watches again and realizes that Alexa is making some pretty mean jokes about another friend. She indicates that she doesn't, actually, "like" the video.
> 7. Ginny shares the video with her own followers. "Check out this great video by my friend Alexa!"

From https://www.w3.org/wiki/Socialwg/Social_API/User_stories#Responses

This user story covers a lot of ground. The examples below combine Micropub, Microformats, 
PubSubHubbub, and Webmention. For the sake of simplicity and readability of this document,
I have left out the discovery portion of the specs. (For example, in order to send a Webmention,
the Webmention endpoint must first be discovered from the post URL.) Omitting the 
discovery step from this example should not affect the narrative.


## 1. Alexa posts a video

> 1. Alexa posts a short video... 

Alexa's client application makes a POST request to her Micropub endpoint to upload the video:

```
POST /micropub HTTP/1.1
Host: alexa.me
Content-Type: multipart/form-data; boundary=AaB03x
Authorization: Bearer xx-micropub-access-token-xx

--AaB03x
Content-Disposition: form-data; name="h"

entry
--AaB03x
Content-Disposition: form-data; name="video"; filename="video.mp4"
Content-Type: video/mp4

... encoded contents of video.mp4 ...
--AaB03x--
```

The endpoint creates a URL with the video, and responds with the URL:

```
HTTP/1.1 201 Created
Location: https://alexa.me/entry/100
```

Note that this URL actually corresponds to an HTML page of the h-entry that contains
the video, it is not the actual video file itself. The location of the video file can be 
found by parsing the URL for the h-entry microformat and looking for the "video" 
property.

> ...which is distributed to the inbox streams of her followers.

Alexa sends a PubSubHubbub ping to her hub indicating there is new content in her main feed.

```
POST / HTTP/1.1
Host: pubsubhubbub.superfeedr.com
Content-type: application/x-www-form-urlencoded

hub.mode=publish
&hub.url=https://alexa.me/
```

The hub is responsible for iterating through the list of subscribers and sending the
update to them. Each subscriber will receive a ping that contains the video update HTML
or a "thin ping" depending on how the subscriber is configured.

The subscribers will receive the ping from the PubSubHubbub hub, and parse it looking
for an h-entry post.


## 2. Ben likes the video

> 2. Ben thinks it's a good video. He indicates to Alexa and others that he "likes" the video.

Ben sees the video in his reader (which may be part of his website or could be a third-party
application), and the reader presents him with a "like" button. He taps the "like" button
which causes the reader to make a Micropub request to his website to create the "like" post.

```
POST /micropub HTTP/1.1
Host: ben.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&like-of=https://alexa.me/entry/100
```

The Micropub endpoint creates the "like" post and returns the URL.

```
HTTP/1.1 201 Created
Location: https://ben.me/entry/200
```

> ...indicates to Alexa...

Ben's server, after receiving the Micropub request and creating the post, then sends
a Webmention to Alexa's Webmention endpoint to notify her of the "like". 

```
POST /webmention HTTP/1.1
Host: alexa.me
Content-type: application/x-www-form-urlencoded

source=https://ben.me/entry/200
&target=https://alexa.me/entry/100
```

> ...and others...

(It's not clear from the story whether "others" refers to Alexa's followers, Ben's 
followers, or both.)

Ben's server publishes this "like" post to anyone following his feed, by sending a
PubSubHubbub ping to his hub.

```
POST / HTTP/1.1
Host: pubsubhubbub.superfeedr.com
Content-type: application/x-www-form-urlencoded

hub.mode=publish
&hub.url=https://ben.me/
```

Ben's followers will see his "like" post.

Separately, Alexa's server verifies and accepts the Webmention of the "like" and includes it on
the entry URL and on the entry when rendered in a list. Alexa's server pings the hub
again to notify subscribers that the post has changed (the post has a new like).

```
POST / HTTP/1.1
Host: pubsubhubbub.superfeedr.com
Content-type: application/x-www-form-urlencoded

hub.mode=publish
&hub.url=https://alexa.me/
```

TODO: If the post is no longer on the front page, Alexa's followers won't see Ben's "like" 
post from this ping. We may need to add some sort of mechanism for notifying
subscribers of updates to older posts. This may need to be an extension of PubSubHubbub,
or could be accomplished by describing the desired behavior of PubSubHubbub consumers.



## 3. Charles posts a comment

> 3. Charles posts a comment on the video. "This is hilarious!"

Charles comments from his reader, which makes a Micropub request to his website to
create the comment.

```
POST /micropub HTTP/1.1
Host: charles.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&in-reply-to=https://alexa.me/entry/100
&content=This+is+hilarious!
```

The Micropub endpoint creates the "reply" post and returns the URL.

```
HTTP/1.1 201 Created
Location: https://charles.me/entry/300
```

Charles' server then sends a Webmention to Alexa's server notifying her of the comment.

```
POST /webmention HTTP/1.1
Host: alexa.me
Content-type: application/x-www-form-urlencoded

source=https://charles.me/entry/300
&target=https://alexa.me/entry/100
```

Alexa's server verifies and accepts the Webmention of the "comment" and includes it on
the entry URL and on the entry when rendered in a list. Alexa's server pings the hub
again to notify subscribers that the post has changed (the post has a new comment).

```
POST / HTTP/1.1
Host: pubsubhubbub.superfeedr.com
Content-type: application/x-www-form-urlencoded

hub.mode=publish
&hub.url=https://alexa.me/
```


## 4. Denise likes a comment

> 4. Denise indicates that she "likes" Charles's comment.

Denise's reader has received the ping about Alexa's updated post, fetching the post
and parsing the h-entry and embedded likes and comments. Denise sees a "like" button 
next to Charles' comment and clicks it. This causes her reader to make a Micropub
request to her server, with the "like-of" URL set to the URL of Charles' comment.

```
POST /micropub HTTP/1.1
Host: denise.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&like-of=https://charles.me/entry/300
```

The Micropub endpoint creates the "like" post and returns the URL.

```
HTTP/1.1 201 Created
Location: https://denise.me/entry/400
```

Denise's server then sends a Webmention to Charles's server notifying him of the like.

```
POST /webmention HTTP/1.1
Host: denise.me
Content-type: application/x-www-form-urlencoded

source=https://denise.me/entry/400
&target=https://charles.me/entry/300
```

Charles' server verifies and accepts the Webmention of the like, and includes it when
rendering Charles' comment. Because this like was just added, Charles' server treats
this as an update to the post, so sends a Webmention for the comment again. This results 
in sending a Webmention to Alexa's server again, the same one that was sent when 
Charles originally posted his comment.

```
POST /webmention HTTP/1.1
Host: alexa.me
Content-type: application/x-www-form-urlencoded

source=https://charles.me/entry/300
&target=https://alexa.me/entry/100
```

Alexa's server verifies and accepts this webmention, parses the microformats on the page
and notices the addition of the new like. Alexa's server can now render Denise's "like"
of Charles' comment when displaying the post.


# 5. Deleting a comment

> 5. Edgar post a comment on the video: "This sucks! Boo!"...

Edgar comments from his reader, which makes a Micropub request to his website to
create the comment.

```
POST /micropub HTTP/1.1
Host: edgar.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&in-reply-to=https://alexa.me/entry/100
&content=This+sucks!+Boo!
```

The Micropub endpoint creates the "reply" post and returns the URL.

```
HTTP/1.1 201 Created
Location: https://edgar.me/entry/500
```

Edgar's server then sends a Webmention to Alexa's server notifying her of the comment.

```
POST /webmention HTTP/1.1
Host: alexa.me
Content-type: application/x-www-form-urlencoded

source=https://edgar.me/entry/500
&target=https://alexa.me/entry/100
```

Alexa's server verifies and accepts the Webmention of the "comment" and includes it on
the entry URL and on the entry when rendered in a list. Alexa's server pings the hub
again to notify subscribers that the post has changed (the post has a new comment).

```
POST / HTTP/1.1
Host: pubsubhubbub.superfeedr.com
Content-type: application/x-www-form-urlencoded

hub.mode=publish
&hub.url=https://alexa.me/
```

> ...He thinks better of the sentiment and deletes the comment.

Edgar clicks the "delete" button from his reader, which makes the Micropub request
to his server to delete the comment.

```
POST /micropub HTTP/1.1
Host: edgar.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

mp-action=delete
&url=https://edgar.me/entry/500
```

Edgar's server deletes the post, and will return `HTTP 410 Gone` when this URL is 
requested in the future. Edgar's server then sends a webmention for the deleted URL.

```
POST /webmention HTTP/1.1
Host: alexa.me
Content-type: application/x-www-form-urlencoded

source=https://edgar.me/entry/500
&target=https://alexa.me/entry/100
```

Alexa's server fetches `https://edgar.me/entry/500` while verifying the Webmention
and notices the `HTTP 410` status code indicating the comment was deleted. Alexa's 
server deletes the comment and sends the PubSubHubbub ping again.


# 6. Liking and deleting a like

> 6. Felicia indicates that she "likes" the video. She watches again and realizes that Alexa is making some pretty mean jokes about another friend. She indicates that she doesn't, actually, "like" the video.

This part is equivalent to #5 so I will not bother repeating it here. The same pattern 
of requests is made, except using "like-of" instead of "in-reply-to".


# 7. Sharing a post

> 7. Ginny shares the video with her own followers. "Check out this great video by my friend Alexa!"

Ginny, having seen Alexa's video in her reader, clicks the "share" button in her reader.
A "share" dialog appears, giving Ginny a place to enter text for her post, which is pre-filled
with the URL of Alexa's video. Ginny types her note and clicks "post" which causes her
reader to make a Micropub request to her site.

```
POST /micropub HTTP/1.1
Host: ginny.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&content=Check+out+this+great+video+by+my+friend+Alexa!+https://alexa.me/entry/100
```

Ginny's server creates the post, and renders it as a normal h-entry note that contains
a link to Alexa's video. There is no special markup added around the link since this
is not an explicit comment (in-reply-to).

Ginny's server sends a Webmention to Alexa's server to announce the link to her post.

```
POST /webmention HTTP/1.1
Host: alexa.me
Content-type: application/x-www-form-urlencoded

source=https://ginny.me/entry/600
&target=https://alexa.me/entry/100
```

