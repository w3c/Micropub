# Reading a user's recent posts

From https://www.w3.org/wiki/Socialwg/Social_API/User_stories#Reading_a_user.27s_recent_posts

> 1. Iris finds a comment by Sam on one of her photos funny. She'd like to read more posts by Sam.
> 2. Iris reads the latest notes by Sam. She also reviews his latest photos.

In order for Sam's comment to appear on Iris' photo, his server sent a [webmention](http://indiewebcamp.com/webmention) to her server, which parsed the [h-entry](http://indiewebcamp.com/h-entry) on Sam's site and [displayed it as a comment](http://indiewebcamp.com/comments-presentation) on her original post.

Iris sees Sam's comment on her website, and clicks his name which takes her to Sam's home page where she sees his notes and photos.

An alternate version of this could be Iris adds Sam's home page to her [reader](http://indiewebcamp.com/reader), which looks for an [h-feed](http://indiewebcamp.com/h-feed) on the home page, or linked from a rel=feed link. 
