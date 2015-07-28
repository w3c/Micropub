# User Posts a File

From https://www.w3.org/wiki/Socialwg/Social_API/User_stories#User_posts_a_file

> 1. Maria uploads a photo of her car and shares it with her friends.
> 2. Maria decides that the picture is too big and crops it to just show the car. She uploads a new version to replace the original.
> 3. Maria realizes the photo includes her license plate number, which she would rather not share for privacy reasons. She deletes the photo.

Micropub handles file uploads using the HTTP multipart/form-data content type. The 
examples below are meant to be a representation of the data over the wire. In practice,
creators and consumers don't ever actually see this level of detail, since almost
every language and environment handles multipart encoding and decoding at a relatively
low level.

For example, PHP's cURL library builds the multipart request by default when passing
and array of key/value properties to the `CURLOPT_POSTFIELDS` property. Similarly,
multipart requests are decoded automatically, making the standard string properties 
available in the `$_POST` variable as normal, while the files are automatically
downloaded to a temp folder and referencable with the `$_FILES` variable.


## 1. Posting a photo

Maria's client application makes a POST request to her Micropub endpoint:

```
POST /micropub HTTP/1.1
Host: maria.me
Content-Type: multipart/form-data; boundary=AaB03x
Authorization: Bearer xx-micropub-access-token-xx

--AaB03x
Content-Disposition: form-data; name="h"

entry
--AaB03x
Content-Disposition: form-data; name="photo"; filename="car.jpg"
Content-Type: image/jpeg

... encoded contents of car.jpg ...
--AaB03x--
```

The endpoint creates a URL with the photo, and responds with the URL:

```
HTTP/1.1 201 Created
Location: https://maria.me/entry/1
```

Note that this URL actually corresponds to an HTML page of the h-entry that contains
the photo, it is not the actual JPG file itself. The location of the JPG file can be 
found by parsing the URL for the h-entry microformat and looking for the "photo" 
property.


## 2. Updating a photo

To replace the photo, the application references the original entry by its URL.

```
POST /micropub HTTP/1.1
Host: maria.me
Content-Type: multipart/form-data; boundary=AaB03x
Authorization: Bearer xx-micropub-access-token-xx

--AaB03x
Content-Disposition: form-data; name="mp-action"

edit
--AaB03x
Content-Disposition: form-data; name="url"

https://maria.me/entry/1
--AaB03x
Content-Disposition: form-data; name="update[properties][photo]"; filename="car-cropped.jpg"
Content-Type: image/jpeg

... encoded contents of car-cropped.jpg ...
--AaB03x--
```

The server acknowledges the successful update of the photo:

```
HTTP/1.1 204 No Content
```


## 3. Deleting a photo

To delete the photo, the application references the URL and indicates the action:

```
POST /micropub HTTP/1.1
Host: maria.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

mp-action=delete
&delete-of=https://maria.me/entry/1
```

The server acknowledges the successful deletion:

```
HTTP/1.1 204 No Content
```

