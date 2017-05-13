# TodayPoster

Implementation Home Page URL: https://github.com/bryanluby/TodayPoster

Source code repo URL(s) (optional): https://github.com/bryanluby/TodayPoster
* [x] 100% open source implementation

Programming Language(s): Objective-C

Developer(s): [Bryan Luby](https://github.com/bryanluby)

Answers are:
* [x] Confirmed via micropub.rocks

## Discovery
* [ ] The client discovers the Micropub endpoint given the profile URL of a user (e.g. the sign-in form asks the user to enter their URL, which is used to find the Micropub endpoint)

## Authentication
* [x] The client sends the access token in the HTTP `Authorization` header.
* [ ] The client sends the access token in the post body for `x-www-form-urlencoded` requests.
* [ ] The client requests one or more `scope` values when obtaining user authorization.
 * create

## Syntax
* [x] 100: Creates posts using `x-www-form-urlencoded` syntax.
* [ ] 200: Creates posts using JSON syntax.
* [ ] 101: Creates posts using `x-www-form-urlencoded` syntax with multiple values of the same property name (e.g. tags).
* [ ] 201: Creates posts using JSON syntax with multiple values of the same property name (e.g. tags).
* [ ] 202: Creates posts with HTML content. (JSON)
* [ ] 204: Creates posts using JSON syntax including a nested Microformats2 object.
* [ ] 300: Creates posts including a file by sending the request as `multipart/form-data` to the Micropub endpoint.

## Creating Posts
* [ ] 104: Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request. (form-encoded)
* [ ] 203: Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request. (JSON)
* [ ] 205: Allows creating posts with a photo including image alt text.
* [ ] Recognizes HTTP 201 and 202 with a `Location` header as a successful response from the Micropub endpoint.
* [ ] 105: Allows the user to specify one or more syndication endpoints from their list of endpoints discovered in the `q=config` or `q=syndicate-to` query.

## Media Endpoint
* [ ] 700: Checks to see if the Micropub endpoint specifies a Media Endpoint, and uploads photos there instead.
* [ ] Uses multipart requests only as a fallback when there is no Media Endpoint specified.

## Updates
* [ ] 400: Supports replacing all values of a property (e.g. replacing the post content).
* [ ] 401: Supports adding a value to a property (e.g. adding a tag).
* [ ] 402: Supports removing a value from a property (e.g. removing a specific tag).
* [ ] 403: Supports removing a property.
* [ ] Recognizes HTTP 200, 201 and 204 as a successful response from the Micropub endpoint.

## Deletes
* [ ] 500: Sends deletion requests using `x-www-form-urlencoded` syntax.
* [ ] 500: Sends deletion requests using JSON syntax.
* [ ] 502: Sends undeletion requests using `x-www-form-urlencoded` syntax.
* [ ] 502: Sends undeletion requests using JSON syntax.

## Querying
* [ ] 600: Queries the Micropub endpoint with `q=config`
 * [ ] Looks in the response for the Media Endpoint
 * [ ] Looks in the response for syndication targets
* [ ] 601: Queries the Micropub endpoint with `q=syndicate-to`
* [ ] 602: Queries the Micropub endpoint for a post's source content without specifying a list of properties
* [ ] 603: Queries the Micropub endpoint for a post's source content looking only for specific properties

## Extensions

Please list any [Micropub extensions](https://indieweb.org/Micropub-extensions) that the client supports.

## Vocabularies

Please list all vocabularies and properties the client supports, if applicable.

## Other Notes

Please use this space to document anything else significant about your implementation.
