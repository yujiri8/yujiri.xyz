TITLE What's the case for data hiding?
NAV What's the case for data hiding?
DESC It seems like the goal of data hiding is not to prevent mistakes but to artificially limit what a coder can do.

In [object-oriented](oop) theory, you <a rel="nofollow" href="https://www.techopedia.com/definition/14738/data-hiding">hear</a> a lot of talk about "<a rel="nofollow" href="https://en.wikipedia.org/wiki/Information_hiding">data *hiding*</a>", how it's a good thing to "hide" implementation details inside a class or method and not expose them to the outside world.

Notice that nothing in a language without `public`/`private` keywords stops you from having loose coupling and marking attributes not meant for external use with a convention like a `_` prefix. The discussion isn't about the benefits of loose coupling (those are obvious), which is why Wikipedia's car manufacturer example is a false analogy. The concept of data hiding isn't just about *not* accessing implementation details from the outside, but *preventing* said access.

And why do people [claim](https://www.ruby-lang.org/en/documentation/ruby-from-other-languages/to-ruby-from-python/) Python doesn't offer that? The phrase "`_voluntary_` underscore `__convention__`" is a misrepresentation of how Python works - attributes starting with `__` are *actually* private:
```python
>>> class Secret:
...   def __init__(self):
...     self.__secret = True
...   def secret(self):
...     return self.__secret
...
>>> s = Secret()
>>> s.__secret
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Secret' object has no attribute '__secret'
>>> s.secret()
True
>>> s.__secret = False
>>> s.__secret
False
>>> s.secret()
True
>>> s.__dict__
{'_Secret__secret': True, '__secret': False}
```
I guess technically this isn't *enforced* because you can still access it from the outside by using that ridiculous notation. But no one would ever do that by accident, only if they're really bent on doing this and convinced it's a good idea.

Is that not enforced enough for you? It seems like the goal of data hiding, when it's defined to be more than what Python does, is not to prevent mistakes or make anything simpler, but to artificially limit what a hacker can do on the theory that if you don't see why someone would want to access an attribute from the outside, it *must* be true that no valid use case exists. Kind of the philosophy behind Windows if you ask me. It's a bad philosophy! You can't possibly anticipate all the legitimate use cases someone (or future you) might have for your code. Hacks are ugly and I have as much of a negative visceral reaction to them as the next coder, but sometimes, [practicality beats purity](https://www.python.org/dev/peps/pep-0020/), and so I don't understand why so many people are convinced that we should *artificially* hide data from *intentional* access.

Oh and then there's [this wisegeek article](https://www.wisegeek.com/what-is-data-hiding.htm) which is blatantly disingenuous. They claim an advantage of data hiding is "security against hackers", saying "If all internal data are public, a hacker can easily squeeze into the internal data and make any changes to manipulate the program maliciously. By hiding the data, it's much harder to crack the code, because the data will appear invisible to the objects and the hacker". Anyone who knows enough to be talking about data hiding certainly knows it's wrong to suggest that an attacker being able to [execute arbitrary code](https://en.wikipedia.org/wiki/Arbitrary_code_execution) in your process is a normal state of affairs and not a loss condition. What is it with these websites that publish articles on programming aimed at non-programmers and treat that as an excuse to spread blatant misinformation?

It seems very parallel to [the loss of the concept of consent](/protagonism/consent) - the idea is that the feature isn't sufficiently implemented until the user can't disable it. I'm not going to claim a moral equivalence, but I do think there's an ideological relationship between the two.

I don't raise this as a criticism in any of my language reviews or anything because I think it's small enough to basically be disregarded when arguing about how good a language is.
