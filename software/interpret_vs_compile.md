TITLE Interpreted languages versus compiled languges
NAV Interpreted languages versus compiled languges
TEMPLATE DEFAULT
DESC I've considered the opinion that interpreted languages should never have been invented.

I know some interpreted languages, some compiled languages, and some that can do both. But most languages can only do one. I know there are big benefits to both and I actually should have a bias toward interpretation as I was raised by [Python](https://yujiri.xyz/software/python) and still have a soft spot for it. But I've grown to appreciate compilation much more. In fact, I've considered the opinion that interpreted languages should never have been invented. So I'm gonna count the benefits.

### Interpretation

* Can use without the clunk of writing a file, saving it to disk, running it, editing it and running it again from the start when it doesn't work, and then removing it

* No danger of accidentally not rebuilding after a change and running the old binary. Much debugging time has been lost to that.

* Portability. The same code can run on any operating system that has the interpreter. With a compiled language, different platforms need different binaries.

I used to also think interpreters had the benefit of not needing a separate compile step before running. But that's not true. Most compilers have an option to build and then run (and not save the built executable) with one command, and even if they didn't, it would be trivial to write a shell function for it.

### Compilation

* Better performance

* No dependencies. A program in an interpreted language always needs the interpreter to run; if you can compile to native code and link statically, you can ship a binary without worrying about dependencies on the target machine.

	This applies even to proprietary software that never runs on a client machine. At my job, our production server doesn't have the dependencies of our application installed. We use [Go](https://yujiri.xyz/software/go), so we build the server program into a single executable with no dependencies (other than libc and libthr) and just copy it over to the development server. We've had to copy over supporting binaries a few times too for one-time stuff, and I think those experiences would've been a lot worse if the prod server had to also have all the dependencies installed to run them.

* Interoperability with other languages. This is the one that took me the longest to appreciate. Compiled languages have the option of compiling to a library that can be used by *other* languages, while interpreted languages don't.

	Now it's true, interoperability doesn't matter for application software. But it's misguided to dismiss that as an advantage here, because a language that can be used for both purposes is certainly better, *all other things the same*, than a language that can only write applications or libraries for itself. And it would be [a terrible cost](https://yujiri.xyz/software/kill_software) to have two languages in existence where one could cover both purposes. Even if the other language had advantages, they'd have to be massive for it to be worth having both.
