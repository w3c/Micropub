# Quill

Implementation Home Page URL: https://quill.p3k.io/

Source code repo URL(s) (optional): https://github.com/aaronpk/Quill
* [x] 100% open source implementation

Programming Language(s): PHP, Javascript

Developer(s): [Aaron Parecki](https://aaronparecki.com)

## Discovery
* [x] The client discovers the Micropub endpoint given the profile URL of a user (e.g. the sign-in form asks the user to enter their URL, which is used to find the Micropub endpoint)

## Authentication
* [x] The client sends the access token in the HTTP `Authorization` header.
* [x] The client sends the access token in the post body for `x-www-form-urlencoded` requests.
* [x] The client requests one or more `scope` values when obtaining user authorization.
 * `create`

## Syntax
* [x] Creates posts using `x-www-form-urlencoded` syntax.
* [x] Creates posts using JSON syntax.
* [x] Creates posts using `x-www-form-urlencoded` syntax with multiple values of the same property name (e.g. tags).
* [x] Creates posts using JSON syntax with multiple values of the same property name (e.g. tags).
* [x] Creates posts using JSON syntax including a nested Microformats2 object.
* [x] Creates posts including a file by sending the request as `multipart/form-data` to the Micropub endpoint.

## Creating Posts
* [x] Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request.
* [ ] Allows creating posts with a photo including image alt text.
* [x] Recognizes HTTP 201 and 202 with a `Location` header as a successful response from the Micropub endpoint.
* [x] Allows the user to specify one or more syndication endpoints from their list of endpoints discovered in the `q=config` or `q=syndicate-to` query.

## Media Endpoint
* [x] Checks to see if the Micropub endpoint specifies a Media Endpoint, and uploads photos there instead.
* [x] Uses multipart requests only as a fallback when there is no Media Endpoint specified.

## Updates
* [ ] Supports replacing all values of a property (e.g. replacing the post content).
* [ ] Supports adding a value to a property (e.g. adding a tag).
* [ ] Supports removing a value from a property (e.g. removing a specific tag).
* [ ] Supports removing a property.
* [ ] Recognizes HTTP 200, 201 and 204 as a successful response from the Micropub endpoint.

## Deletes
* [ ] Sends deletion requests using `x-www-form-urlencoded` syntax.
* [ ] Sends deletion requests using JSON syntax.
* [ ] Sends undeletion requests using `x-www-form-urlencoded` syntax.
* [ ] Sends undeletion requests using JSON syntax.

## Querying
* [x] Queries the Micropub endpoint with `q=config`
 * [x] Looks in the response for the Media Endpoint
 * [x] Looks in the response for syndication targets
* [x] Queries the Micropub endpoint with `q=syndicate-to`
* [ ] Queries the Micropub endpoint for a post's source content without specifying a list of properties
* [ ] Queries the Micropub endpoint for a post's source content looking only for specific properties

## Extensions

Please list any [Micropub extensions](https://indieweb.org/Micropub-extensions) that the client supports.

* `mp-slug`
* `post-status`

## Vocabularies

Please list all vocabularies and properties the client supports, if applicable.

* Notes, Articles, Bookmarks, Likes, Reposts (http://microformats.org/h-entry)
 * content
 * content[html]
 * name
 * photo
 * category
 * in-reply-to
 * location (as a `geo://` URI, and as plaintext)
 * post-status (published, draft)
 * mp-syndicate-to
 * mp-slug
 * bookmark-of
 * like-of
 * repost-of
* Events (http://microformats.org/h-event)
 * name
 * start
 * end
 * location (plaintext)
 * category
* Itinerary 
 * h-entry with an `itinerary` property containing one or more `h-leg` objects
* Reviews (http://microformats.org/h-review)
 * h-product
 * rating
 * content
 * summary

