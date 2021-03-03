TITLE Incomplete list of formats, standards, and technologies that should die
NAV Incomplete list of formats, standards, and technologies that should die
DESC Some software is just making the world a worse place by its mere existence. Let's stop using it.

## "Document" formats

Compared to HTML files, document formats have basically no advantages. The biggest disadvantage is that you need specific applications to read them. You can't open a PDF in a text editor; you need a "PDF viewer". And while most browsers can render PDFs natively, *they shouldn't have to*, because HTML exists. That browsers have to [implement PDF support](https://github.com/mozilla/pdf.js) <span class="note">It's over 100k lines of code. How many thousands of hours do you think were put into it?</span> as well as HTML [adds to the complexity and bugginess](features) of browsers (as well as the difficulty of new browsers [entering the market](/protagonism/market)).

Making matters worse, document formats besides PDF have compatibility issues. Unix operating systems don't usually come with viewers for them preinstalled. [PDFs are not the worst](https://www.xpdfreader.com) but stuff like .xlsx or .ppt tends to require installing something absurdly heavyweight like [libreoffice](https://www.libreoffice.org).

Honestly, half of the time I see PDFs used on the web, there's no real reason it couldn't have been a plaintext file, let alone an HTML file.

## "Smart" quotes and unicode dashes

While almost everything supports UTF-8 these days, it's not everything, and even if it were, why would you want to use a character that can't be directly typed on your keyboard? They're unnecessary, a chore to type, and risk incompatibility. Smart quotes have even been the cause of a failure in an enterprise app I develop.

## XML, in any application other than HTML and SVG

The only reason I qualify it that way is because instituting an alternative to HTML is completely unfeasable for the foreseeable future; even just to coexist it would have to get support in all major browsers. The idea of SVG (vector graphics in a human-readable format!) is glorious honestly; my only gripe with it is that it's implemented in XML. I dream of standardizing a non-XML version of SVG, but without that, I consider SVG one of the few justifiable uses of XML.

JSON should replace XML in most cases. For web applications, JSON's inherent affinity with Javascript is essential, and support for it is also in the stdlib of most other languages.

(Also, I know that HTML isn't technically XML, but pretty much all the same things apply to it.)

Flaws of XML:

* The central attribute/child dichotomy is very inelegant, rarely if ever a useful distinction.

* Tag names are always written twice, lowering productivity and increasing typo rate when handwritten and increasing data size.

* Five unique escape sequences that must be memorized instead of using the versatile backslash like everything else in the universe.

* <a rel="nofollow" href="https://en.wikipedia.org/wiki/CDATA#CDATA_sections_in_XML"><code>CDATA</code></a> - unnecessary redundancy, since anything you can do with it you can do without it.

* The root element of an XML tree must have a name, although the name is arbitrary.

## PHP

I still feel a bit uncertain putting a language I've never personally used in this pile. I won't say that everyone should stop using C++ and Java despite all the negative things I've heard about them (although with the information I have it's very probably true that they should). I have a bit more concrete information about PHP. After hearing many other devs speak offhandedly of its horrors, I took to Google to find out what it was all about, and I read [PHP: a fractal of bad design](https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/). If everything that guy says is true, even minus all the ones he notes are fixed in more recent versions, that anyone would voluntarily use PHP just boggles my mind. (There's also [phpsadness.com](http://phpsadness.com).)

I didn't want to make a big judgement off hearsay from the critics alone, so I made a [dev.to post](https://dev.to/yujiri8/php-devs-why-do-you-use-php-4ge6) addressed to PHP devs. The responses I got made me a lot more sure. Not a single PHP defender raised a single point that was even about the design of the language. They all said things like "I use PHP because with PHP I can make websites" or "Well PHP isn't as bad as PHP used to be". One response was so revealing it was slightly comical, so I'll paste it here:

> I do accept that PHP lacks some features that other languages have but that doesn't mean PHP is a bad language. PHP lets you write your code in the way you want which can be an advantage or a disadvantage according to one's knowledge of software architecture. The other reason that I use PHP is the reason that deploying it is very easy thanks to many hostings supporting PHP.

When someone interprets any criticism (I linked the Eevee article), even criticism mostly about confusingness, as "it lacks features", it tells me that they have [a very bad way of thinking about software](features).

The one relevant point I've heard raised is that it apparently [has optional call-time type hints](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration). That's something, but seems to be the only meaningful comparison where PHP doesn't have the losing side versus any other dynamic language.

So that's why despite not knowing PHP, I'm reasonably confident saying it's awful and we should abandon it.
