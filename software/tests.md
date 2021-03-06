TITLE Change my mind: Tests are overrated
NAV Change my mind: Tests are overrated
DESC I think tests are not quite as important or useful as most people think they are. I hope this doesn't make me an outlaw.

![Tests are overrated - change my mind](tests_overrated.jpg)

There's seemingly a universal consensus that automated testing is the bees' knees and no one writes enough tests. In fact, the We Need More Tests culture appears so dominant and so dogmatic that I've been timid about even suggesting this in developer circles. I think tests are not as important or useful as most people think they are. I hope this doesn't make me an outlaw.

At my job, a lot of the tests we have basically boil down to writing a second copy of the code that does the same thing in a less elegant way to make sure it gets the same result. We have methods on our domain objects like:
```go
func (t *Thing) ChangeInfo(x int, y string) {
	thing.X = x
	thing.Y = y
}
```
And tests for these methods like:
```go
thing = NewThing(args)
thing.ChangeInfo(x, y)
assert thing.X == x
assert thing.Y == y
```
or a method like:
```go
func (t *Thing) ChangeInfo(x int, y string) {
	thing.X = x
	thing.Y = y
	thing.SyncNeeded = true
}
```
with a test like:
```go
thing1 = NewThing(args)
thing2 = NewThing(args)
thing1.SyncNeeded = false
thing2.SyncNeeded = true
thing1.ChangeInfo(x, y)
thing2.ChangeInfo(x, y)
assert thing1 == thing2
```
or:
```go
thing = NewThing(args)
err = thing.ChangeThreeAttrs(0, ptr, "hello")
assert err != nil
thing = NewThing(args)
err = thing.ChangeThreeAttrs(5, nil, "hello")
assert err != nil
thing = NewThing(args)
err = thing.ChangeThreeAttrs(5, ptr, "")
assert err != nil
thing = NewThing(args)
err = thing.ChangeThreeAttrs(5, ptr, "hello")
assert err == nil
```
where `ChangeThreeAttrs` is literally:
```go
func (t *Thing) ChangeThreeAttrs(
	intArg int,
	refArg OtherThing,
	strArg string,
) error {
	if intArg == 0 || refArg == nil || strArg == "" {
		return nil, err
	}
	t.IntAttr = intArg
	t.RefAttr = refArg
	t.strAttr = strArg
	return nil
}
```

And it seems like we spend more time writing the tests and upkeeping them when we make changes to the intended behavior than we do being glad we have them. In fact, after about two years working here, I can't remember ever being saved by the tests.

The domain logic tests in particular seem to be this way; the tests on our database abstraction layer are more meaningful (but still have yet to save us from anything in the time I've been working here and I've spent something like two dozens hours writing them).

[The part of the official Django tutorial dedicated to tests](https://docs.djangoproject.com/en/3.0/intro/tutorial05/) gives some more context for why I think tests are overrated. They have a section "When testing, more is better":

> It might seem that our tests are growing out of control. At this rate there will soon be more code in our tests than in our application, and the repetition is unaesthetic, compared to the elegant conciseness of the rest of our code.

(Yes, this is very much a concern of mine. [The Qutebrowser codebase](https://github.com/The-Compiler/qutebrowser) has 50k lines under `tests/` and 40k under `qutebrowser/`, counted by [cloc](https://github.com/AlDanial/cloc).)

> **It doesn’t matter.** Let them grow. For the most part, you can write a test once and then forget about it. It will continue performing its useful function as you continue to develop your program.

> Sometimes tests will need to be updated. Suppose that we amend our views so that only `Questions` with `Choices` are published. In that case, many of our existing tests will fail - *telling us exactly which tests need to be amended to bring them up to date*, so to that extent tests help look after themselves.

But as I've just argued, "for the most part, you can write a test once and then forget about it" is patently false. Tests require loads of maintainence. Am I the only one having this experience? Is it really so rare in enterprise development that business logic needs to change? And I haven't even mentioned the time spent running the tests and waiting for them to pass. That might consume something like 2 minutes per commit. It's not much, but it adds up to something worth mentioning.

> At worst, as you continue developing, you might find that you have some tests that are now redundant. Even that’s not a problem; in testing redundancy is a *good* thing.

No, come on. Redundancy is never a *good* thing. It can be less harmful in some cases than others, and it can be an inevitable consequence of being thorough enough to avoid bugs, but redundancy is always *bad*, by definition.

And what of the downside of inflated diffs that make code harder to review? I don't see anyone mentioning that.

And earlier in the Django article, they say:

> You might have created a brilliant piece of software, but you will find that many other developers will refuse to look at it because it lacks tests; without tests, they won’t trust it. Jacob Kaplan-Moss, one of Django’s original developers, says “Code without tests is broken by design.”

That quote is an excellent example of why I think the push for tests is going too far. That's the kind of comment you read about C++ and Java on [cat-v.org](http://cat-v.org) (a great website, but very cynical). Even this paragraph is outright admitting that the belief in tests drives developers to *refuse to look at* what might be *brilliant pieces of software*. If even the people trying to convince us to write more tests are putting it that way, that seems like good reason to suspect that they might be overzealous.

> That other developers want to see tests in your software before they take it seriously is yet another reason for you to start writing tests.

Pragmatically, maybe so, but that's not an argument for _why those developers are **right** to be dismissive_ (though to be fair, I'm not saying it was meant to be).

So, testing advocates: do you think it's possible that tests are *just a little bit* overrated?

Update: some time after writing this, I found the paper [Why Most Unit Testing is Waste](https://rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf) by James Coplien. It's a lot longer, but he makes excellent points.
