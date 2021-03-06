TITLE Django Review
NAV Review: Django

# How Django and I met

I met Django after my website underwent a long, gradual growth in complexity that made a framework seem like a good idea. When I first put the place up, it was just static HTML served by [Nginx](https://yujiri.xyz/software/nginx). With a small bit of CSS. The first time I wrote an application server, it was for comments. The pages themselves were still static HTML; I implemented the comments using plain AJAX with Nginx reverse proxying `/api/` paths to a Python [uWSGI](https://www.fullstackpython.com/uwsgi.html) server that used [`psycopg2`](https://www.psycopg.org) to connect to a Postgres DB. This was simple and I loved it that way. I didn't need a framework.

Then came [the conlang](https://yujiri.xyz/spem/) dictionary, for which I wrote a web search interface. That was a significant increase in complexity, and next along came email notifications, which required a bunch of new endpoints and a new table and all. It was around then I decided I'd look into a framework.

I spent a long time read about them; Django and Flask were all the rage, and I liked Flask's description more, except for what I'd heard about Django's database management. I wouldn't have to write manual SQL?!? I've always kind of disliked SQL (which is definitely not just because I suck at it), but the real critical point was the automatic migration. I'd already tasted the displeasure of writing SQL migrations and how it made me so much more reluctant to make schema changes that I thought were organizational improvements. A terrible incentive for an inexperienced dev who knew that experimentating was essential to developing more wisdom about architecture. Something that would not only ease the frustrations of SQL but allow me to change the schema easily, that would be the bomb.

So I gave Django a try. At first I was awed. I ran into a couple of obstacles setting it up, but once I did, I was awed by the free admin interface as well as the database abstraction. I used Django happily on my website for probably over a year. Later on, I discussed frameworks with someone over dev.to chat and he mentioned he'd migrated from Django to [FastAPI](https://fastapi.tiangolo.com) and [SQLAlchemy](https://sqlalchemy.org) because Django had "too much stuff". I told him that [I totally shared that feeling](https://yujiri.xyz/software/features), but that I still valued the database management too much to give it up; but he mentioned that SQLAlchemy with Alembic could achieve the same thing. At the time I was too busy to look into another major overhaul, but when I finished RTTP, I started to do so. As I write this, I'm in the process of switching to SQLAlchemy and FastAPI. So that's my story with Django.

<h1 class="good">ORM</h1>

Django's ORM provides several benefits:

1. You aren't tied to any specific database. You can switch from [SQLite](https://yujiri.xyz/software/sqlite) to Postgres without significantly changing your code. Though of course this isn't true if you specifically use features that aren't available on all of them, like Postgres's array fields, but there's no way around that.

2. More importantly, it gives you a Pythonic interface to your queries. You can do `User.objects.get(id = id)` and get the `User` object directly instead of `cursor.execute("SELECT * FROM users WHERE id = ?", (id,))` and then scanning the tuple result and using it as arguments to a `User` constructor.

	The value of this can't be overstated. At my job, I work on a complex web service with a [Go](https://yujiri.xyz/software/go) backend. We don't use a framework. It's wonderful to not have the feeling of such a giant weight, but the downside is that the upside is mostly moot because we've basically reinvented Django's ORM! We have a subpackage that provides our database abstraction layer which is specific to our application and consists of *almost 9000 lines of Go* - a good 1/4 of the server code. It gives us very similar functionality: our route handlers can do `UserRepo.FindByID(id)` and not have to worry about SQL implementation details.

	The other differences? Our SQL abstration package is specific to Postgres, and regularly requires changing several different files inside it when we do so much as rename a field. The situation is immesurably worse on every level.

3. And of course, the automatic migration I mentioned. When we change the schema at my job or back when I used psycopg2 directly, we have to write an SQL script to migrate the production database. With Django, run `./manage.py makemigrations` and then `./manage.py migrate` and for schema changes, you're done. Django will scan your code and database and detect how the schema has changed and auto-generate the SQL required to update the database.

	Obviously that doesn't work for *data* migrations. For example, if you start storing a field as an integer percentage instead of a float, there's no way for Django to handle that programmatically. But it still doesn't have to involve ugly SQL because you can write the migrations in Django's Python interface.

4. A single source of truth. You don't have to worry about bugs due to updating your schema and forgetting to change one of the places where it's accessed.

Django's ORM can't do everything you can do with SQL, but when it can't, you can still use manual SQL.

<h1 class="good">Powerful logging</h1>

Django's behavior on error is horrible without configuring it (it doesn't even log the exceptions to its log file unless it's running with `DEBUG = True`), but with some configuration, it can be really amazing. In debug mode, you get an error page with almost all the information you could ever want, from a traceback to full details on the request that caused it and a dump of all the active settings. And it's not hard to configure it to email this to you automatically!

<h2 class="good">Free admin interface</h2>

Out of the box, you can get an admin web panel where you can do CRUD on objects of your custom models. Damn.

Unfortunately, the admin interface isn't nearly as stonking as I thought at first. There's a lot of stuff a practical admin interface needs that it doesn't give you, like search. You can customize how your models show up in the admin interface through `admin.py`, but the way of doing this is, of course, Django-specific and requires reading a lot of documentation on it; one of the things that kept me from making these changes was that I wasn't certain I was staying with Django long-term and didn't want the work I put into my admin interface to be tied to it. (And that's the part that gives me [Renpy](https://yujiri.xyz/software/renpy) flashbacks.)

Also, there's no built-in widget for the admin interface for any sort of list or array fields. A Postgres array field of text values gets a text `<input>` split on commas. For all the other stuff they have built-in, like [`PositiveIntegerField`](https://docs.djangoproject.com/en/3.0/ref/models/fields/#positiveintegerfield), a proper widget for list fields should've been higher priority.

Still, it helped me a good bit before I had adequate facilities of my own (I used it to edit and delete comments before I could do that from the main website), and I'm sure there are use cases where it really is sufficient long-term.

<h1 class="bad">I think its philosophy is deeply misguided.</h1>

I didn't want to put the deep philosophy criticism before particulars, but in keeping with my traditions for software reviews, bigger points must always go first.

Django has too many jobs. It's a hulking mass of features and you can't easily use one of them without dealing with the others. Django is a uWSGI framework, a database abstraction layer and ORM, and a template system all in one. And an email abstraction system. Those are all completely different jobs. [Do one thing and do it well](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well).

I expect I'm going to take some flak for suggesting that [this isn't just personal preference or a matter of use case](https://yujiri.xyz/software/objectivism). But I believe it.

I **know** that there are frameworks like Flask which are more in line with what I'm arguing for and that it's a common opinion that Django vs Flask is a matter of use case. (I don't know Flask.) But I don't think this design decision really is a matter of use case, because there are separate pieces of software that do Django's other jobs, like SQLAlchemy and Jinja. I deeply think it better to use a stack with each job done by a dedicated program than a monolith that does all of them.

Kind of like how when I was [looking for a markdown processor](https://dev.to/yujiri8/the-quest-for-a-better-markdown-processor-31og) to switch to from [python-markdown2](https://github.com/trentm/python-markdown2), I wanted one that had a built-in slugify function for heading IDs, but then I came around to the opinion that that wasn't a markdown processor's job and it was preferable anyway to use [python-slugify](https://github.com/un33k/python-slugify).

I think there's also a perverse idea of packageification here. Django has this distinction between *projects* and *apps*, where a project can have multiple apps. The admin interface is a separate "app". There are also a bunch of middleware packages installed by default, including `django.middleware.security.SecurityMiddleware`, `django.contrib.sessions.middleware.SessionMiddleware`, and a few more. It's not obvious what these do or why you need them. In fact, the default Django `manage.py setup` result installs no less than 6 distinct apps besides your own!

I honestly think it's just very perverse. The built-in user account system, for example, I couldn't use because (at least as far as I could find) I couldn't modify the built-in `auth` app, so if I wanted any project-specific fields on the user model, I had to roll my own, which I did. I don't think frameworks should provide things like account systems because that's just too project-specific for cookie cutter solutions to really work.

Another downside of all the packages is that my database was bloated. With a basic guide-following setup, I ended up with *10* database tables that were not mine (6 belonging to the `auth` app). That's such an ugly feeling.

<h2 class="bad">No out-of-the-box support for HTTP verbs in route declarations</h2>

You declare all your endpoints in a centralized location, which I like, but you can't specify HTTP verbs there. If you want to use the same path with `GET` and `POST` having different functions, you have to actually declare a single route there and bind it to a handler that checks the verb and then defers it to the approrpiate *actual* handler. A very kludgy workaround for something so simple and that (I presume) is such a common use.

(Update: a dev.to commenter informed me that you can do this if you're using class-based views instead of function-based ones. I never used class-based views; they didn't make sense for my use case.)

<h2 class="bad"><code>HttpResponse</code> exceptions not leveraged as much as they could be</h2>

Every Django route handler has to return an `HttpResponse` or raise an exception. Of course, there are tons of times where you'd want an HTTP error to be treated *as* an exception - for example if you want to load an object, and if it doesn't exist, just return 404 without continuing. It sure would be nice if that happened by default.

Django has `Http404` for this (you can `raise Http404` instead of `return HttpResponse(status = 404)`), but no other codes. I'm not sure why they didn't make them all exception types so you could do `raise HttpResponse(status = 401)` or something.

<br>

---

<br>

So I'd say Django's very powerful and an invaluable improvement over going frameworkless, but probably not the best option in town. I can't say for sure since I'm not yet competent in any other frameworks. I'll update this paragraph when I see how FastAPI and SQLAlchemy goes.
