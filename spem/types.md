TITLE Language design insight: the tradeoffs of parts of speech
NAV Insight: tradeoffs of parts of speech
TEMPLATE DEFAULT

I often wonder when working on Spem what part of speech a word should be. Most concepts could be any. For example, "run" could be an adjective in its base form meaning "running", and we could convey "run" with "be running". Likewise, "green" could've been a verb meaning "to be green", and we could get the adjective with "I used the one that greens", instead of "I used the green one".

Those are both *parameterless* words - neither one takes an object. The case is a little different for things that have parameters. For example, consider the words "surround" and "around".

They mean the same thing, but one is a verb and the other is a preposition. "Surround" is an alias for "be around", and "around" is an alias for "surrounding". So prepositions are essentially adjectives with parameters. That's a neat insight.

In English, there are some nouns or adjectives that take parameters. For example, family relation words. "Parent" is a noun despite  having a parameter; "parent of" is the preposition version. In Spem, all such words are implemented as prepositions; if you want to talk about a parent without specifying who of, you could say "parent of someone".

So the three main descriptive parts of speech have the following tradeoff:

* Verbs are slowed down when used subordinately, because they need "that/<spem>kel</spem>" ("that greens" is slower than "green").

* Adjectives are slowed down when used as the core of the sentence, because they need "is/<spem>ʌ</spem>".

* Prepositions are slowed down by the need for "is" when used as core, but they take parameters. When the parameter is *not* specified, but there's an entity after them, they need some kind of separator to avoid that entity being confused for the paramater of the preposition.

Therefore,

* If a word doesn't take a parameter, it should be an entity. Parameterless verbs or prepositions are senseless. (Perhaps with the sole exception of <spem>yɑr</spem>, which is parameterless but almost never used subordinately.)

* If a word takes a parameter, and is usually used as the core of a sentence, it should be a verb.

* If a word takes a parameter, and is usually used subordinately, it should be a preposition.

It's also interesting to note that in Japanese, relative clauses don't take a separator word and go before the noun they modify, meaning verbs don't pay a speed penalty when used subordinately. (And Japanese takes advantage of this by making almost all "adjectives" actually verbs.) I really did consider that for Spem but I decided against it on the grounds of intuition/clarity; the content of the relative clause should not come before the modified noun or any indication that it's a relative clause, because that's a recipe for [garden path sentences](https://en.wikipedia.org/wiki/Garden-path_sentence). But of course the question's still open. If you have thoughts, don't hesitate to post them because I'll absolutely change anything about Spem if I can be convinced it'd be better a different way, no matter how big an overhaul it'd require.

But, notably, that's what I do with adjectives. My de facto standard as of now is to put adjectives before nouns. My reasoning is that adjectives don't cause such confusion because they don't contain a secondary verb and are usually shorter. (The de facto standard with preposition phrases is to put them after, so they can't be mistaken for applying to more words than they're meant to.)
