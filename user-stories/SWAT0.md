# SWAT0

> 1. With his phone, ben takes a photo of aaronpk, tags him in the photo, and posts it to his site.
> 2. aaronpk gets a notification that he's been tagged in a photo.
> 3. kylewm, who is subscribed to benwerd, sees the photo in his reader UI.
> 4. kylewm posts a reply to the photo on his site.
> 5. aaronpk and ben receive notifications that kylewm has commented on the photo.

From http://indiewebcamp.com/SWAT0, an adaptation of http://www.w3.org/2005/Incubator/federatedsocialweb/wiki/SWAT0

# 1. Ben takes a photo of aaronpk

> 1 With his phone, ben takes a photo of aaronpk, tags him in the photo, and posts it to his site.

Ben takes a photo with his mobile phone, and uses the app's interface to indicate
aaronpk is in the photo. His Micropub client on his phone makes a POST request to his Micropub 
endpoint. In addition to the standard h=entry and photo properties, it also includes
a "category" property with a value of aaronpk's URL, which is the way to indicate tagging a person.
See http://indiewebcamp.com/person-tag for more details.

```
POST /micropub HTTP/1.1
Host: ben.thatmustbe.me
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

Aaronpk doing intros at IndieWebCamp 2015.
--AaB03x
Content-Disposition: form-data; name="photo"; filename="photo.jpg"
Content-Type: image/jpeg

... encoded contents of photo.jpg ...
--AaB03x--
```

The endpoint creates a URL with the photo, and responds with the URL:

```
HTTP/1.1 201 Created
Location: https://ben.thatmustbe.me/photo/2015/7/12/9/
```

This URL contains an h-entry with the photo as well as the person tag. A minimal version
of the markup may look like the following.

```
<div class="h-entry">
  <p class="e-content">Aaronpk doing intros at IndieWebCamp 2015.</p>
  <img src="/upload/photo/1436743674955.jpg" class="u-photo">

  <ul>
    <li><a class="u-category h-card" href="http://aaronparecki.com/">aaronparecki.com</a></li>
  </ul>
</div>
```



# 2. Aaron gets a notification

> 2 aaronpk gets a notification that he's been tagged in a photo.

When ben's server creates the post, it also sends a webmention to Aaron's home page
since the post contains a link to his site.

```
POST /webmention HTTP/1.1
Host: aaronparecki.com
Content-type: application/x-www-form-urlencoded

source=https://ben.thatmustbe.me/photo/2015/7/12/9/
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


# 3. Kyle sees Ben's photo

> 3 kylewm, who is subscribed to ben, sees the photo in his reader UI.

Kyle's reader app knows he is subscribed to ben, and so displays all of ben's 
posts in the reader UI. The reader can by default poll ben's website for new items,
but this could be enhanced with PubSubHubbub. PuSH is not a requirement for this user
story to be complete, although would provide a more realtime experience.

Kyle's reader parses ben's website for new h-entry posts, the latest being the
h-entry of this photo. The reader sees the "u-photo" property and and displays the photo
on the page. 


# 4. Kyle posts a reply

> 4 kylewm posts a reply to the photo on his site.

Kyle's reader renders a comment box below the photo. When Kyle types a reply and
hits "submit," his reader makes a Micropub request to his Micropub endpoint.

```
POST /micropub HTTP/1.1
Host: kylewm.com
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&in-reply-to=https://ben.thatmustbe.me/photo/2015/7/12/9/
&content=Much+better+photo,+very+handsome,+not+so+sleepy+:)
```

His website handles the Micropub request, creating a reply post on his website.


# 5. Aaron and Ben receive notifications

> 5 aaronpk and ben receive notifications that kylewm has commented on the photo. 

After Kyle's Micropub endpoint creates the post, his website starts the Webmention
process for the post. 

It sends a Webmention to Ben's post because Ben's post is the `in-reply-to` URL. 

```
POST /webmention HTTP/1.1
Host: ben.thatmustbe.me
Content-type: application/x-www-form-urlencoded

source=https://kylewm.com/2015/07/much-better-photo-very-handsome-not-so-sleepy
&target=https://ben.thatmustbe.me/photo/2015/7/12/9/
```

Ben's server receives the webmention request, verifies the link exists, and after
parsing Kyle's reply URL, sees that it is an `in-reply-to` mention, meaning this
is considered a "comment". Ben's server sends a notification to Ben that says
"Kyle commented on your photo."

Ben's server then stores this comment and renders it on the photo's permalink as a
comment (see http://indiewebcamp.com/comments-presentation). Ben's HTML now looks 
similar to the below.

```
<div class="h-entry">
  <p class="e-content">Aaronpk doing intros at IndieWebCamp 2015.</p>
  <img src="/upload/photo/1436743674955.jpg" class="u-photo">

  <ul>
    <li><a class="u-category h-card" href="http://aaronparecki.com/">aaronparecki.com</a></li>
  </ul>

  <h2>Comments</h2>
  <ul>
    <li class="u-comment h-cite">
      <a href="http://kylewm.com/" class="p-author h-card">Kyle</a>
      <span class="p-content">Much better photo, very handsome, not so sleepy :)</span>
    </li>
  </ul>
</div>
```

Because this is an update to the contents of the URL, Ben's server re-sends the 
original Webmentions to indicate there was an update to the receiver. This practice
is now known as [salmention](http://indiewebcamp.com/salmention).

```
POST /webmention HTTP/1.1
Host: aaronparecki.com
Content-type: application/x-www-form-urlencoded

source=https://ben.thatmustbe.me/photo/2015/7/12/9/
&target=http://aaronparecki.com/
```

Aaron's Webmention endpoint verifies the Webmention as normal, but recognizes that 
this source URL was already registered. Because of that, it then looks at the parsed
Microformats checking for what changed since the first Webmention was sent. It 
sees there is a new property, `comment`, containing an h-cite. It constructs the sentence
"Kyle commented on Ben's photo of you" from the following information:

* Kyle: The `name` of the `author` of the first `comment`
* Ben: The `author` of the main `h-entry`, as discovered by the authorship algorithm (root-level h-card not shown in this example HTML)
* you: Because the `url` property of the `category` `h-card` matches Aaron's home page URL

Aaron's server sends this notification to him.

