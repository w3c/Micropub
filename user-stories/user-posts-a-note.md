# User Posts a Note

From https://www.w3.org/wiki/Socialwg/Social_API/User_stories#User_posts_a_note

> 1. Eric writes a short note to be shared with his followers.
> 2. After posting the note, he notices a spelling error. He edits the note and re-posts it.
> 3. Later, Eric decides that the information in the note is incorrect. He deletes the note.

## 1. Posting a note

Eric's client application makes a POST request to his Micropub endpoint:

```
POST /micropub HTTP/1.1
Host: eric.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

h=entry
&content=Helo+World
```

The endpoint responds with the location of the note that was just created:

```
HTTP/1.1 201 Created
Location: https://eric.me/entry/1
```

## 2. Updating a note

To update the note, the application references the note by its URL.

```
POST /micropub HTTP/1.1
Host: eric.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

mp-action=edit
&url=https://eric.me/entry/1
&update[properties][content]=Hello+World
```

The server acknowledges the successful update of the note:

```
HTTP/1.1 204 No Content
```

## 3. Deleting a note

To delete the note, the application references the note by its URL and indicates the action:

```
POST /micropub HTTP/1.1
Host: eric.me
Content-type: application/x-www-form-urlencoded
Authorization: Bearer xx-micropub-access-token-xx

mp-action=delete
&url=https://eric.me/entry/1
```

The server acknowledges the successful deletion of the note:

```
HTTP/1.1 204 No Content
```

