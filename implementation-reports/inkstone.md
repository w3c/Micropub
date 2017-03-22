# InkStone

Implementation Home Page URL: https://inklings.io/inkstone

Source code repo URL(s) (optional): https://github.io/dissolve/inkstone
* [x] 100% open source implementation

Programming Language(s): javascript, php

Developer(s): [Ben Roberts](https://ben.thatmustbe.mee)

Answers are:
* [x] Confirmed via micropub.rocks
* [ ] Self-reported

## Discovery
* [x] The client discovers the Micropub endpoint given the profile URL of a user (e.g. the sign-in form asks the user to enter their URL, which is used to find the Micropub endpoint)

## Authentication
* [x] The client sends the access token in the HTTP `Authorization` header.
* [x] The client sends the access token in the post body for `x-www-form-urlencoded` requests.
* [x] The client requests one or more `scope` values when obtaining user authorization.
 * create (though customizable after first login / requires relogin)

## Syntax
* [x] 100: Creates posts using `x-www-form-urlencoded` syntax.
* [x] 200: Creates posts using JSON syntax.
* [x] 101: Creates posts using `x-www-form-urlencoded` syntax with multiple values of the same property name (e.g. tags).
* [x] 201: Creates posts using JSON syntax with multiple values of the same property name (e.g. tags).
* [x] 202: Creates posts with HTML content. (JSON)
* [ ] 204: Creates posts using JSON syntax including a nested Microformats2 object.
* [ ] 300: Creates posts including a file by sending the request as `multipart/form-data` to the Micropub endpoint.

## Creating Posts
* [x] 104: Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request. (form-encoded)
* [x] 203: Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request. (JSON)
* [x] 205: Allows creating posts with a photo including image alt text.
* [x] Recognizes HTTP 201 and 202 with a `Location` header as a successful response from the Micropub endpoint.
* [x] 105: Allows the user to specify one or more syndication endpoints from their list of endpoints discovered in the `q=config` or `q=syndicate-to` query.

## Media Endpoint
* [x] 700: Checks to see if the Micropub endpoint specifies a Media Endpoint, and uploads photos there instead.
* [ ] Uses multipart requests only as a fallback when there is no Media Endpoint specified.

## Updates
* [x] 400: Supports replacing all values of a property (e.g. replacing the post content).
* [x] 401: Supports adding a value to a property (e.g. adding a tag).
* [x] 402: Supports removing a value from a property (e.g. removing a specific tag).
* [x] 403: Supports removing a property.
* [x] Recognizes HTTP 200, 201 and 204 as a successful response from the Micropub endpoint.

## Deletes
* [x] 500: Sends deletion requests using `x-www-form-urlencoded` syntax.
* [x] 500: Sends deletion requests using JSON syntax.
* [x] 502: Sends undeletion requests using `x-www-form-urlencoded` syntax.
* [x] 502: Sends undeletion requests using JSON syntax.

## Querying
* [x] 600: Queries the Micropub endpoint with `q=config`
 * [x] Looks in the response for the Media Endpoint
 * [x] Looks in the response for syndication targets
* [x] 601: Queries the Micropub endpoint with `q=syndicate-to`
* [x] 602: Queries the Micropub endpoint for a post's source content without specifying a list of properties
* [x] 603: Queries the Micropub endpoint for a post's source content looking only for specific properties

## Extensions

Please list any [Micropub extensions](https://indieweb.org/Micropub-extensions) that the client supports.

Can configure input fields in settings once logged in, so user can add support for Post Status, and Visibility on their own.

## Vocabularies

h-entry by default , configurable to any other vocabulary

## Other Notes

For handling of results, this implementation uses Request.ok which is true for all HTTP 2XX


