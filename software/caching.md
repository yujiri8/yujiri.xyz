TITLE I hate caching
NAV I hate caching
DESC Caching has been the source of so much frustration for me. It has real benefits, but boy do I hate it.

Oh my god, I hate caching.

Despite [the objectivist attitude I usually have](objectivism), I'm not saying caching is evil or that you shouldn't use it, I just hate it.

The core drawback of caching is the same as one of the drawbacks of compiling: the possibility of the source being updated and not seeing the change due to having a cached copy / not recompiling. As I'm sure every software fella knows, this can be one of the most frustrating of types of problems to have, and it's not hard to see why; it's a class of problems that involves your efforts to debug not only failing but seeming to have no effect at all, [and a perceived deprivation of agency is primally frustrating](/protagonism/emotions).

Obviously, the performance benefits of caching can be enormous, and again I'm not saying it isn't worth it any particular case, just that I hate caching. I don't set full cache headers on the images on this site. Nginx sets `Last-Modified` and `ETag` automatically, which isn't quite as efficient since it still has to make the request, but it provides a lot of the benefit, and without all the miserable hours spent debugging bugs that are already fixed. Besides, both Firefox and Chromium usually cache them without re-requesting anyway. Fucking browsers.

It gets even worse with the complexity of modern web technologies like service workers. I've had a situation at my job where a test deployment was running in a jail to mirror the production setup. Changes *usually* took effect when I did shift-ctrl-R in Chromium or Firefox. But then I started using [es-dev-server](https://open-wc.org/developing/es-dev-server.html) for faster test cycles, run on the host, and I had this situation where on every other reload (*usually* every other; sometimes two in a row would work or not work), Chromium would load the cached version from back when that domain pointed to a jail hosting a full deployment. This was still happening when it had been weeks since I had served the normally deployed version from that domain and had been using it for es-dev-server only. I could've fixed it by clearing all browser history, but that's such an inconvenience since I didn't know of a way to clear all history for only one domain, only by type of history or time range. I never figured out exactly how this worked. Caching is just 2 damn complicated 4 me 2 understand.
