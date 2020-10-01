TITLE Build systems are a scourge
NAV Build systems are a scourge
TEMPLATE DEFAULT
DESC "Build systems" shouldn't exist. A compiler should be able to compile the damn code.

The villagers cried as the warlord Cabal and his troops burned their homes.

Some of them were trying to quickly rebuild a small shelter to protect themselves from the bugs outside. It was such a simple piece of work, Cabal shouldn't need to know about it, they thought. But Cabal's troops found them and promptly knocked it down.

"No program is allowed to exist unless it was built by Cabal!" the warlord shouted. "Burn them all!"

---

"Build systems" shouldn't exist. A compiler should be able to compile the damn code.

There are three problems that need to be solved to build code: compiling the source, finding the source files, and installing the source files. The first is clearly a compiler's job. The last is clearly a package manager's job. The middle problem is small and does not call for a separate tool with its own config files.

Here's how it ought to work:

* Source files within a project reference each other by relative paths.

* Dependencies on other packages use a different syntax, like [how C include works](https://gcc.gnu.org/onlinedocs/cpp/Include-Syntax.html). The compiler searches for these in standard directories. Sandbox environments can be handled with something akin to `.git`.

But many languages do not handle dependencies so elegantly. The C ecosystem revolves around `make`, by which I mean the [different](https://www.wgdd.de/2007/11/gnu-make-vs-bsd-make-practical-problem.html) GNU, BSD, and Microsoft `make`s, each of which is basically a separate language, and `pkg-config`, because what did you think you could just import an installed package and use it?

And you can't get far without running into [the surreal mess called GNU autotools](https://en.wikipedia.org/wiki/GNU_Autotools#/media/File:Autoconf-automake-process.svg). Who doesn't like a bunch of 3000-line files with weird names involved in their build process? Who doesn't want to debug that?

And what's this CMake thing? Wait, it's *not* a dialect of `make`?

When I submitted my [patch to GTK to fix a GObject Introspection annotation](https://gitlab.gnome.org/GNOME/gtk/merge_requests/1012), I wanted to compile GTK after my change first, because I was terrified of how I'd feel if I submitted a patch that broke the build, as sure as I was that that was impossible. I spent about 12 hours trying to do so before giving up. The quest led me through installing Meson, Ninja, hunting down dependencies manually after each failed compilation informed me of another one, googling cryptic error messages and reading old mailing list archives, trying on an Ubuntu system after giving up on the FreeBSD one, and finally deciding I'd just submit the merge request and hope it worked (it did).

While GTK was the worst, *most* C projects I've worked with have given me huge trouble building them.

The [Javascript](https://yujiri.xyz/software/javascript) ecosystem has a similar situation drowned in `webpack`, `babel`, `rollup`, and several config files, but it's more defensible because those tools solve problems that aren't created by the Javascript interpreters (minifying and bundling to save bandwidth, package imports, polyfills...).

I think [Crystal](https://yujiri.xyz/software/crystal) is the best example I've seen. Imports work the way I prescribe above, and dependencies are named in `shard.yml` and installed in `lib/` in your project root. I've never had any problem building or installing Crystal packages. [Rust](https://yujiri.xyz/software/rust) is very similar. [Go](https://yujiri.xyz/software/go) is another language that handles building well; `go build` builds your project, end of story (third-party dependencies are actually imported by URL). [Python](https://yujiri.xyz/software/python) is okay, but filesystem path imports are stupidly difficult.

[Haskell](https://yujiri.xyz/software/haskell) and OCaml are even worse than C. With these ML family languages, it seems like the compiler was never meant to be directly usable. So people wrote a dozen different tools to wrap the compiler so you can actually use it. All of said tools introduce their own problems, so you still can't actually build anything with them, and the solution is always to install and use another tool on top of it.

With OCaml, `ocamlopt` is the native code compiler (`ocamlc` is a bytecode compiler and `ocaml` is an interpreter). `dune` is the "build system". `opam` is the "package manager". Then what are `ocamlfind` and `ocamlbuild`, you ask? I don't know, but they're involved in some tangled way. All the documentation is out of date and nothing they say works. I literally gave up on installing the [de-facto standard library Batteries](http://batteries.forge.ocamlcore.org).

The built-in `Str` module apparently requires explicit linking. If you're using `ocaml`, you can load it with `#load "str.cma";;`. *But that directive is invalid syntax* to `ocamlopt` and `ocamlc`, which want [command-line arguments instead](https://caml.inria.fr/pub/docs/manual-ocaml/libstr.html) - *different* ones.

---

This is madness. We shouldn't need this much complexity just to write some code. Compilers should Just Work, and there are successful examples to follow.
