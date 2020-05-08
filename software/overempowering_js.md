TITLE Overempowering Javascript
NAV Overempowering Javascript
TEMPLATE DEFAULT
DESC Maybe, if Javascript didn't have so much power over the browser, we wouldn't have so many problems.

Every now and then, I find out Javascript has been granted some privilege by the browser that just astonishes me. One of the most recent ones was [the history API](https://developer.mozilla.org/en-US/docs/Web/API/History). That's right, the browser lets Javascript manipulate your history.

This must be how those websites do it. You know, those websites from hell that flush your entire history with copies of the one page when you load them so your back button doesn't work.

Who in the hell decided Javascript should be able to do this?

And then the `rel="noopener"` affair. Apparently, links with `target="_blank"` give the opened page *access to the opening page's window object*. And this can be used to reload, redirect, or otherwise screw up the opening page.

The one I found out before that was that [Javascript can send arbitrary POST requests to other domains](https://stackoverflow.com/questions/58774463/csrf-exploit-stopped-working-without-me-fixing-it), just not include SameSite cookies or read the response.

And sure, some of these powers can be used for good in some situations. But one has to wonder, if browsers just didn't grant Javascript these powers, how many fewer headaches we would have from CSRF and XSS issues. Especially since [SameSite cookies are a relatively recent addition](https://en.wikipedia.org/wiki/HTTP_cookie#Same-site_cookie) to mitigate these very attacks.

I feel like I've lost all faith in the committees who make these decisions. Next I'm going to find out there's a JS API for editing the user's bookmarks, or deleting files on their local drive. You don't do security by giving strangers every power you can think of over your user's device, and building in an enigmatic web of restrictions on top of that.
