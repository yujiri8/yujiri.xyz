TITLE Nginx Review
NAV Review: Nginx
DESC Nginx is a web server that does its job very well, with no massive shortcomings.

# How Nginx and I met

[Nginx](https://nginx.org/en/) is a FOSS web server. I don't remember the first time I heard of it, but it's one of the two most common (the other being [Apache](https://httpd.apache.org/)) and it was the one I ended up using for this site when I first set it up. I've been using it here and at my job for a couple years.

<h1 class="good">Simple configuration</h1>

Nginx's configuration is done mostly from a single file, and a simple setup can be 30 lines or less. All the basics work out of the box: When serving static files, it handles 304 perfectly, setting the `last-modified` and `etag` headers by default so 304 works in every browser. It handles directory redirects (making `/dir` redirect to `/dir/` which returns `/dir/index.html`) with two concise directives that are enabled by default.

For a simple site without dynamic content, a base install of Nginx with less than five settings customized is literally all you need to get all the features you'd expect. And the best part is how clean the configuration file stays - generally, if your application doesn't necessitate you thinking about a feature, you don't have to look at it it in your `nginx.conf`. It's either on by default or there's just one line enabling it.

<h1 class="good">Never inadequate for complex setups</h1>

While being excellent at simple setups, it can also do everything I can think of that doesn't belong in an application server (and some things that arguably do), and most of them with just a single directive or two. Their page I linked above lists features at great length, so I won't list everything again here.

Nginx supports `include` directives that let you modularize and put different virtual servers in different files, which is great if you have a complex setup or want to have a testing subdomain you can mess with safely and turn on or off by commenting a single line (like I do). I store a redirect map in its own file that I include, which lets me return 301s for the old URL whenever I change an article's
filename by just adding one line, which doesn't even have to clutter the "real" configuration. (Although category redirects do. I'm not sure if there's a way to handle those with a `map`. But they're still only one line each with the `rewrite` directive.)

A pet feature of mine is the tailored response to HTTP being sent to the HTTPS port. I was surprised to find it, but it's pretty nice for how obscure it is.

<h1 class="good">Extremely flexible logging</h1>

Nginx logs every request by default, and you can configure what information it logs about them to an incredible extent. I have my Nginx on this server logging the request data in JSON so I don't have to do manual string parsing (albeit this requires a bit of a hack).

<h2 class="bad">Difficult or impossible to serve a filename that would get redirected if requested directly</h2>

The `index`, `error_page` and `try_files` directives reprocess the rest of the logic, and as far as I can find, there's no way to get the other behavior. (If there is a way, please let me know in the comments.) This is the *only* thing I've come across where it seems like Nginx can't do it despite it being a pretty simple task. I ran into it in 2020/1/16 when I stripped the frivolous `.html` from all my articles; I needed to have the old URLs 301 to the new ones. What I wanted to do was have the output dir mirror the source dir, so the filenames on disk still had the `.html`, but have Nginx redirect requests to `*.html` to the short version, even though the long version was the canonical filename. The problem I couldn't get around was that `try_files` and the other directives would restart request processing, so if a request came to `/software/nginx.html`, it would get redirected to `/software/nginx`, but then when `try_files` tried to serve `/software/nginx.html`, *that* would get rewritten to `/software/nginx`.

After several hours of frustration I gave up and had my template script strip the extensions. My opinion of Nginx went down a lot that day.

The reason I couldn't use `if ( $request_uri` ... `)` in place of `location` (`$request_uri` is always the *original* request URI, not the one Nginx is currently processing after internal redirects) is because `$request_uri` includes the query string. There's no `$request_path`... although `$uri` captures only the path segment, it has another difference from `$request_uri`, which is that it is, like `location` and unlike `$request_uri`, not fixed to the original. This fact made `$uri` useless for solving this problem.

<h2 class="bad">Feature bloat</h2>

I love that Nginx does every facet of its job adequately, but [its feature set](https://nginx.org/en/docs/) is *massive*, and a lot of them either seem redundant or don't belong in a web server.

Looking at the list of <a href="https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if">features of the <code>if</code> directive</a>, a lot of those seem questionable to me. If the web server is reading the file system to determine whether a file is a symbolic link, isn't that a sign that we should just be using a CGI script or something? What's next, an Nginx directive to respond to a request for a directory with a random file inside the directory?

[Wait, are you serious?](https://nginx.org/en/docs/http/ngx_http_random_index_module.html)

Some other things Nginx does that totally don't belong in a web server (albeit most of these modules aren't compiled in by default, they are part of [the Nginx repo](https://github.com/nginx/nginx)):

* [Transform images](https://nginx.org/en/docs/http/ngx_http_image_filter_module.html)... no, this isn't a joke.
* [Return empty GIFs](https://nginx.org/en/docs/http/ngx_http_empty_gif_module.html)... for some reason...
* [Concatenate prefixes and suffixes to the response body](https://nginx.org/en/docs/http/ngx_http_addition_module.html). Okay, I actually would've jumped on this feature a while back when I was first looking to abstract out a template for my articles, but I was naive back then. Page templating is great... but just adding prefixes and suffixes doesn't cut it. It's a nice thought, but this feature is way too inflexible to be useful enough to justify adding it. This is what CGI is for.

There are several different ways to do redirects - the `return` directive (with its status code and URL parameters), and the `rewrite` directive with its host of variants determined by a keyword at the end. These two directives accomplish a lot of the same things, yet neither one can fully replace the other; `return` can't accomplish "silent" redirects (which return a different URL as if the client requested it directly) and `rewrite` can't do 307 or 308 redirects, only 301 and 302. I'm not sure what the best way is off the top of my head, but I'm skeptical that there isn't a better way to design this.

<h3 class="bad">Ugly syntax</h2>

Everything requires semicolons and braces in the configuration file, instead of relying on indentation and using backslashes to continue lines (which is better since that's much rarer).

<br>

---

<br>

Verdict: if you need a web server and haven't settled yet, absolutely check out Nginx! It's easy to use and almost certainly handles your use case.
