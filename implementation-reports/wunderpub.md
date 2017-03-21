# Wunderpub

Implementation Home Page URL: https://github.com/aaronpk/Wunderpub

Source code repo URL(s) (optional): https://github.com/aaronpk/Wunderpub
* [x] 100% open source implementation

Programming Language(s): Ruby

Developer(s): [Aaron Parecki](https://aaronparecki.com)

Answers are:
* [x] Confirmed via micropub.rocks
* [ ] Self-reported

## Discovery
* [ ] The client discovers the Micropub endpoint given the profile URL of a user (e.g. the sign-in form asks the user to enter their URL, which is used to find the Micropub endpoint)
** The endpoint and access token are hardcoded in a config file

## Authentication
* [x] The client sends the access token in the HTTP `Authorization` header.
* [ ] The client sends the access token in the post body for `x-www-form-urlencoded` requests.
* [ ] The client requests one or more `scope` values when obtaining user authorization.
 * n/a, the client assumes the user generated the scope with the appropriate value already

## Syntax
* [x] 100: Creates posts using `x-www-form-urlencoded` syntax.
* [x] 200: Creates posts using JSON syntax.
* [x] 101: Creates posts using `x-www-form-urlencoded` syntax with multiple values of the same property name (e.g. tags).
* [x] 201: Creates posts using JSON syntax with multiple values of the same property name (e.g. tags).
* [ ] 202: Creates posts with HTML content. (JSON)
* [x] 204: Creates posts using JSON syntax including a nested Microformats2 object.
* [ ] 300: Creates posts including a file by sending the request as `multipart/form-data` to the Micropub endpoint.

## Creating Posts
* [x] 104: Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request. (form-encoded)
* [x] 203: Allows creating posts with a photo referenced by URL rather than uploading the photo as a Multipart request. (JSON)
* [ ] 205: Allows creating posts with a photo including image alt text.
* [x] Recognizes HTTP 201 and 202 with a `Location` header as a successful response from the Micropub endpoint.
* [x] 105: Allows the user to specify one or more syndication endpoints from their list of endpoints discovered in the `q=config` or `q=syndicate-to` query.

## Media Endpoint
* [ ] Checks to see if the Micropub endpoint specifies a Media Endpoint, and uploads photos there instead.
* [ ] Uses multipart requests only as a fallback when there is no Media Endpoint specified.

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
 * [ ] Looks in the response for the Media Endpoint
 * [ ] Looks in the response for syndication targets
* [ ] Queries the Micropub endpoint with `q=syndicate-to`
* [ ] Queries the Micropub endpoint for a post's source content without specifying a list of properties
* [ ] Queries the Micropub endpoint for a post's source content looking only for specific properties

## Extensions

Please list any [Micropub extensions](https://indieweb.org/Micropub-extensions) that the client supports.

## Vocabularies

Please list all vocabularies and properties the client supports, if applicable.

* [h-entry](http://microformats.org/wiki/h-entry)
 * content
 * name
 * photo
 * category
 * mp-syndicate-to
 * ate/drank with a nested `h-food` object

## Other Notes

There is no UI for this app, it is a cron job that syncs data in the background.

When posting photos, Wunderlist already provides a URL that the photo is available at, so the app uses that photo URL as the value of the "photo" property, skipping the need to upload it to the user's Media endpoint as a separate step.
