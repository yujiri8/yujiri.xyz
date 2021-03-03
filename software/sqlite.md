TITLE SQLite Review
NAV Review: SQLite
DESC SQLite is a lightweight database, but interprets "lightweight" to mean "leave out very important functionality".

# How SQLite and I met

My first experience with any RDBMS was Postgres, which I used (and still use) in my job. When I first added comments to my website, I naturally used Postgres because that was what I knew. Postgres worked fine for quite some time, but then I heard about SQLite.

I read several articles from different people comparing RDBMSes, and consistently the verdict was that SQLite was super simple and lightweight and better for small projects that didn't need "the most advanced features". The <a href="https://docs.python.org/3.7/library/sqlite3.html">Python `sqlite3` library</a> is also standard so I could get away from the annoyances of [psycopg2](https://pypi.org/project/psycopg2) and the mildly uncomfortable feeling of a third-party dependency, even if it's a reputable one.

I was astonished by the superior simplicity of setting up SQLite; there is no setup. You just tell it what file to use. I was thrilled to discard Postgres's conceptions of users I wasn't using and different databases in the same cluster. I soon found out that SQLite has a very limited type ontology (which I'll talk more about below), but I figured that was an acceptable price; it wouldn't be so bad to store my timestamps as Unix timestamps and aside from that I wasn't using any of Postgres's fancy stuff (if you could consider timestamps to be "fancy"...). So I wrote a little script to move all my data from Postgres to SQLite.

I was happy with it for a while. But a few weeks later I had a rapidly cascading discovery of inadequacy after inadequacy in SQLite. I was horrified and in a couple days I moved back to Postgres. Users are an acceptable cost. Storing the database in a monolithic tree of directories on disk instead of each database contained in a file was an acceptable cost. I haven't looked back. Now it's time for me to explain what I found so terribly inadequate, after my one major point of praise.

<h1 class="good">Self-contained</h1>

SQLite really is simpler. Besides being a much smaller dependency than Postgres and probably any other RDBMS, I love how the database stays in a single file, so it's completely isolated and *you know where it is*. It's so much easier and simpler to move the database file to a different directory at your whim, switch out the dataset an application's using, or do backups. With Postgres, the database lives in a cluster which you can't easily inspect on the filesystem and if you have multiple databases they'll all share the cluster.

<h1 class="bad">No type enforcing by default</h1>

[SQLite doesn't enforce column data types](https://www.sqlite.org/datatype3.html). This nearly defeats the point of having them and when I say "by default", I don't mean there's an option to enable it because there isn't as far as I could find on the web, I mean that you can get around it by adding <a href="https://www.sqlitetutorial.net/sqlite-check-constraint/">`CHECK` constraints</a> on every column in every table. As you can see from those docs constraints are verbose and tedious to write.

<h1 class="bad">Even foreign key enforcement is "off by default"!</h1>

[https://www.sqlite.org/quirks.html](https://www.sqlite.org/quirks.html)

There's a pragma to enable it, but [SQLite pragmas](https://www.sqlite.org/pragma.html) are hardly the most elegant feature to lock basic functionality behind, and even worse, this doesn't stay set as a configuration. You have to do it every time you connect to the database. Yes, I tested that.

<h2 class="bad">No <code>ALTER COLUMN</code></h2>

[SQLite does not support ALTER COLUMN operations](https://stackoverflow.com/a/4007086), so there are a lot of simple changes for which you have to recreate the table and transfer over all the data.

<h2 class="bad">No time data types</h2>

SQLite does not support any timestamp data types. If you want to store a timestamp you'll probably end up storing it as a Unix timestamp, which besides meaning that language bindings like the Python `sqlite3` library will have to return it as an int instead of the language's native timestamp datatype, and besides opening the door to even more errors caused by weak typing, is not ideal if you're ever going to use the `sqlite3` command-line tool to interface with the DB (which is certainly the most convenient interface for quick manual stuff), because timestamps won't be human-readable.

<!--rowid: https://www.sqlite.org/withoutrowid.html-->
---

The consensus around seems to be that SQLite is great software and a really good choice for things that don't particularly need client/server model or obscure advanced features. My impression is that it's a poor choice for almost everything where you would want an SQL database in the first place. I would still recommend it for learning SQL (which people have mentioned), throwaway applications, or extremely small-scale stuff. But Postgres's setup really isn't that bad. It's 3 additional commands to get it set up as a service on FreeBSD.

Also, I find it funny that on the SQLite project's own [Appropriate Uses For SQLite](https://www.sqlite.org/whentouse.html) page, they say "SQLite does not compete with client/server databases. SQLite competes with `fopen()`." That's a *very* slanted comparison. While SQLite's use case does differ in non-vertical ways from Postgres or other RDBMSs (and note that if anything I unfairly counted that in SQLite's favor), it's still way more similar to them than it is to anything that is not an RDBMS. I think them saying this is a bit like me writing a programming language like [Python](https://yujiri.xyz/software/python) but with [manual error-handling](https://yujiri.xyz/software/go#error-handling-is-verbose-tedious-and-mistake-prone) (a surprisingly good analogy for not enforcing type correctness and foreign keys) and no generators or context managers and saying, "It doesn't compete with Python, it competes with assembly".

Okay, Firefox depends on SQLite, and I guess that's a pretty good example of a valid use case. Needing Postgres running as a service to run Firefox would be unreasonable, and SQLite seems like an excellent solution to that problem. But in general I would not recommend SQLite if your project doesn't require its self-contained model.
