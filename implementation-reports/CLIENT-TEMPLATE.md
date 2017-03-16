This file is a template implementation report for Micropub clients. Copy this file to a new `.md` file and change the name to your project name (lowercase with hyphens between words). Fill out the information based on the details of your implementation. It's okay to not check all the boxes, we are more interested in knowing how much of the spec is implemented than getting everyone to tick every box. When you are finished, submit a pull request or link to your file in a [new issue](https://github.com/w3c/micropub/issues).

For items that have a number next to the checkbox, the number corresponds with the test number on [micropub.rocks](https://micropub.rocks/). You can use that tool to check whether you support the feature properly. To mark a statement as true, add an `x` between the brackets, e.g. `[x]`. If the statement does not apply to your implementation, use `[na]` and add a sentence explaining why it does not apply.

Any items in the list below with double square brackets, (e.g. `[[ ]]`) will need to be self-reported, as there is no automated test that will check those off. Any items with single square brackets will be checked off for you as you progress through the tests on https://micropub.rocks. When a specific test corresponds with a checkbox, the test number is noted in the list. Some items such as authentication will be checked off from multiple tests.

Please remove this top section before submitting your report.

# Implementation Name (Replace this header)

Implementation Home Page URL: 

Source code repo URL(s) (optional):
* [ ] 100% open source implementation

Programming Language(s): 

Developer(s): [Name](https://you.example.com)

Answers are:
* [ ] Confirmed via micropub.rocks
* [ ] Self-reported

## Discovery
* [ ] The client discovers the Micropub endpoint given the profile URL of a user (e.g. the sign-in form asks the user to enter their URL, which is used to find the Micropub endpoint)

## Authentication
* [ ] The client sends the access token in the HTTP `Authorization` header.
* [ ] The client sends the access token in the post body for `x-www-form-urlencoded` requests.
* [ ] The client requests one or more `scope` values when obtaining user authorization.
 * (list scopes requested here)

## Syntax
* [ ] 100: Creates posts using `x-www-form-urlencoded` syntax.
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
* [[ ]] Uses multipart requests only as a fallback when there is no Media Endpoint specified.

## Updates
* [ ] 400: Supports replacing all values of a property (e.g. replacing the post content).
* [ ] 401: Supports adding a value to a property (e.g. adding a tag).
* [ ] 402: Supports removing a value from a property (e.g. removing a specific tag).
* [ ] 403: Supports removing a property.
* [[ ]] Recognizes HTTP 200, 201 and 204 as a successful response from the Micropub endpoint.

## Deletes
* [ ] 500: Sends deletion requests using `x-www-form-urlencoded` syntax.
* [ ] 500: Sends deletion requests using JSON syntax.
* [ ] 502: Sends undeletion requests using `x-www-form-urlencoded` syntax.
* [ ] 502: Sends undeletion requests using JSON syntax.

## Querying
* [ ] 600: Queries the Micropub endpoint with `q=config`
 * [[ ]] Looks in the response for the Media Endpoint
 * [[ ]] Looks in the response for syndication targets
* [ ] 601: Queries the Micropub endpoint with `q=syndicate-to`
* [ ] 602: Queries the Micropub endpoint for a post's source content without specifying a list of properties
* [ ] 603: Queries the Micropub endpoint for a post's source content looking only for specific properties

## Extensions

Please list any [Micropub extensions](https://indieweb.org/Micropub-extensions) that the client supports.

## Vocabularies

Please list all vocabularies and properties the client supports, if applicable.

## Other Notes

Please use this space to document anything else significant about your implementation.

