# shpub

Implementation Home Page URL: http://cweiske.de/shpub.htm

Source code repo URL(s) (optional):
* [x] 100% open source implementation

Programming Language(s): php

Developer(s): [Christian Weiske](https://cweiske.de/)

Answers are:
* [x] Confirmed via micropub.rocks
* [x] Self-reported

## Discovery
* [x] The client discovers the Micropub endpoint given the profile URL of a user (e.g. the sign-in form asks the user to enter their URL, which is used to find the Micropub endpoint)

## Authentication
* [x] The client sends the access token in the HTTP `Authorization` header.
* [ ] The client sends the access token in the post body for `x-www-form-urlencoded` requests.
* [x] The client requests one or more `scope` values when obtaining user authorization.
 * `post`

## Syntax
* [x] Creates posts using `x-www-form-urlencoded` syntax.
* [x] Creates posts using JSON syntax.
* [x] Creates posts using `x-www-form-urlencoded` syntax with multiple values of the same property name (e.g. tags).
* [x] Creates posts using JSON syntax with multiple values of the same property name (e.g. tags).
* [ ] Creates posts using JSON syntax including a nested Microformats2 object.
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
* [x] Supports replacing all values of a property (e.g. replacing the post content).
* [x] Supports adding a value to a property (e.g. adding a tag).
* [x] Supports removing a value from a property (e.g. removing a specific tag).
* [x] Supports removing a property.
* [x] Recognizes HTTP 200, 201 and 204 as a successful response from the Micropub endpoint.

## Deletes
* [x] Sends deletion requests using `x-www-form-urlencoded` syntax.
* [x] Sends deletion requests using JSON syntax.
* [x] Sends undeletion requests using `x-www-form-urlencoded` syntax.
* [x] Sends undeletion requests using JSON syntax.

## Querying
* [x] Queries the Micropub endpoint with `q=config`
 * [x] Looks in the response for the Media Endpoint
 * [] Looks in the response for syndication targets
* [x] Queries the Micropub endpoint with `q=syndicate-to`
* [ ] Queries the Micropub endpoint for a post's source content without specifying a list of properties
* [ ] Queries the Micropub endpoint for a post's source content looking only for specific properties

## Extensions

Every extension property is supported with the `-x` / `--xprop` command line parameter.

## Vocabularies

Any property is supported with the `-x` / `--xprop` command line parameter.

By default, h-entries are posted.

## Other Notes

The user may choose if he wants to use JSON or form encoding to post.

The user may choose to ignore the media endpoint for each request.
