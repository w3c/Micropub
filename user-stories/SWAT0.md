# SWAT0

> 1. With his phone, benwerd takes a photo of aaronpk, tags him in the photo, and posts it to his site.
> 2. aaronpk gets a notification that he's been tagged in a photo.
> 3. barnabywalters, who is subscribed to benwerd, sees the photo in his reader UI.
> 4. barnabywalters posts a reply to the photo on his site.
> 5. aaronpk and benwerd receive notifications that barnaby has commented on the photo.

From http://indiewebcamp.com/SWAT0, an adaptation of http://www.w3.org/2005/Incubator/federatedsocialweb/wiki/SWAT0

# 1. Benwerd takes a photo of aaronpk

> 1 With his phone, benwerd takes a photo of aaronpk, tags him in the photo, and posts it to his site.

Benwerd takes a photo with his mobile phone, and uses the app's interface to indicate
aaronpk is in the photo. His Micropub client on his phone makes a POST request to his Micropub 
endpoint. In addition to the standard h=entry and photo properties, it also includes
a "category" property with a value of aaronpk's URL, which is the way to indicate tagging a person.
See http://indiewebcamp.com/person-tag for more details.

```
POST /micropub HTTP/1.1
Host: werd.io
Content-Type: multipart/form-data; boundary=AaB03x
Authorization: Bearer xx-micropub-access-token-xx

--AaB03x
Content-Disposition: form-data; name="h"

entry
--AaB03x
Content-Disposition: form-data; name="category"

http://aaronparecki.com/
--AaB03x
Content-Disposition: form-data; name="content"

Learning more about IndieAuth from @aaronpk. #iiw #indieweb
--AaB03x
Content-Disposition: form-data; name="photo"; filename="photo.jpg"
Content-Type: image/jpeg

... encoded contents of photo.jpg ...
--AaB03x--
```

The endpoint creates a URL with the photo, and responds with the URL:

```
HTTP/1.1 201 Created
Location: http://werd.io/2014/learning-more-about-indieauth-from-aaronpk-iiw-indieweb
```

This URL contains an h-entry with the photo as well as the person tag. A minimal version
of the markup may look like the following.

```
<div class="h-entry">
  <p class="e-content">Learning more about IndieAuth from @aaronpk. #iiw #indieweb</p>
  <img src="/file/53695f9abed7de6e7b486cf0/thumb.jpg" class="u-photo">

  <h2>People in this photo</h2>
  <ul>
    <li><a class="u-category h-card" href="http://aaronparecki.com/">Aaron Parecki</a></li>
  </ul>
</div>
```



# 2. Aaron gets a notification

> 2 aaronpk gets a notification that he's been tagged in a photo.

When benwerd's server creates the post, it also sends a webmention to Aaron's home page
since the post contains a link to his site.

```
POST /webmention HTTP/1.1
Host: aaronparecki.com
Content-type: application/x-www-form-urlencoded

source=http://werd.io/2014/learning-more-about-indieauth-from-aaronpk-iiw-indieweb
&target=http://aaronparecki.com/
```

Aaron's server verifies the Webmention, fetching Ben's URL in the process. When checking
for the link to the target URL as part of the verification process, his server 
notices the link is in the h-card object in the "category" list. This can be interpreted
as a person tag (http://indiewebcamp.com/person-tagging) and Aaron's server can 
treat it different from a generic mention of his home page accordingly.

Aaron's server recognizes Ben's post as a person tag and sends Aaron a push notification
with the sentence "Ben tagged you in a photo". (The notification mechanism between
Aaron's server and his phone is not part of the spec, and may be handled in any number
of ways from a specific native app to an SMS notification.)


# 3. Barnaby sees Ben's photo

> 3 barnabywalters, who is subscribed to benwerd, sees the photo in his reader UI.

Barnaby's reader app knows he is subscribed to benwerd, and so displays all of ben's 
posts in the reader UI. The reader can by default poll benwerd's website for new items,
but this could be enhanced with PubSubHubbub. PuSH is not a requirement for this user
story to be complete, although would provide a more realtime experience.

Barnaby's reader parses benwerd's website for new h-entry posts, the latest being the
h-entry of this photo. The reader sees the "u-photo" property and and displays the photo
on the page. 


# 4. Barnaby posts a reply

> 4 barnabywalters posts a reply to the photo on his site.

Barnaby's reader renders a comment box below the photo. When Barnaby types a reply and
hits "submit," his reader makes a Micropub request to his Micropub endpoint.

```
POST /micropub HTTP/1.1
Host: waterpigs.co.uk
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&in-reply-to=http://werd.io/2014/learning-more-about-indieauth-from-aaronpk-iiw-indieweb
&content=Looks+like+fun!
```

His website handles the Micropub request, creating a reply post on his website.


# 5. Aaron and Ben receive notifications

> 5 aaronpk and benwerd receive notifications that barnaby has commented on the photo. 

After Barnaby's Micropub endpoint creates the post, his website starts the Webmention
process for the post. 

It sends a Webmention to Ben's post because Ben's post is the `in-reply-to` URL. 

```
POST /webmention HTTP/1.1
Host: werd.io
Content-type: application/x-www-form-urlencoded

source=http://waterpigs.co.uk/notes/1
&target=http://werd.io/2014/learning-more-about-indieauth-from-aaronpk-iiw-indieweb
```

Ben's server receives the webmention request, verifies the link exists, and after
parsing Barnaby's reply URL, sees that it is an `in-reply-to` mention, meaning this
is considered a "comment". Ben's server sends a notification to Ben that says
"Barnaby commented on your photo."

Ben's server then stores this comment and renders it on the photo's permalink as a
comment (see http://indiewebcamp.com/comments-presentation). Ben's HTML now looks 
similar to the below.

```
<div class="h-entry">
  <p class="e-content">Learning more about IndieAuth from @aaronpk. #iiw #indieweb</p>
  <img src="/file/53695f9abed7de6e7b486cf0/thumb.jpg" class="u-photo">

  <h2>People in this photo</h2>
  <ul>
    <li><a class="u-category h-card" href="http://aaronparecki.com/">Aaron Parecki</a></li>
  </ul>

  <h2>Comments</h2>
  <ul>
    <li class="p-comment h-cite">
      <a href="" class="u-in-reply-to"></a>
      <a href="http://waterpigs.co.uk/" class="p-author h-card">Barnaby Walters</a>
      <span class="p-summary">Looks like fun!</span>
    </li>
  </ul>
</div>
```

Because this is an update to the contents of the URL, Ben's server re-sends the 
original Webmentions to indicate there was an update to the receiver.

```
POST /webmention HTTP/1.1
Host: aaronparecki.com
Content-type: application/x-www-form-urlencoded

source=http://werd.io/2014/learning-more-about-indieauth-from-aaronpk-iiw-indieweb
&target=http://aaronparecki.com/
```

Aaron's Webmention endpoint verifies the Webmention as normal, but recognizes that 
this source URL was already registered. Because of that, it then looks at the parsed
Microformats checking for what changed since the first Webmention was sent. It 
sees there is a new property, `comment`, containing an h-cite. It constructs the sentence
"Barnaby Walters commented on Ben Werd's photo of you" from the following information:

* Barnaby Walters: The `name` of the `author` of the first `comment`
* Ben Werd: The `author` of the main `h-entry`, as discovered by the authorship algorithm (root-level h-card not shown in this example HTML)
* you: Because the `url` property of the `category` `h-card` matches Aaron's home page URL

Aaron's server sends this notification to him.

