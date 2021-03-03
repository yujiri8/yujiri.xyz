TITLE Spem: the philosopher's conlang
DESC A conlang designed to be elegant, semantically accurate, and free of built-in destructive ideas. Screw Esperanto.

Yes, I'm for real, I plan to invent a language and get the world speaking it. I don't care if you think I'm crazy or it's hopeless. So is anything else I might try to do to fix the world. (I just feel the need to say this cause so many people in real life have jeered at me for this even though [there are verifiable examples of somewhat successful conlangs](https://en.wikipedia.org/wiki/Esperanto).)

[The phenome and alphabet](alphabet)

[Dictionary search](search)

[Verb objects](objects)

[Multiple predicates](multiple_predicates)

[Demonstratives](demonstratives)

[The Tense System](tense)

[Should](should)

[Linking clauses](linking)

[Questions](questions)

[Quantifier-type compounds](quantifiers)

[Default identifiers](defaults)

[Degree modifiers](degree_modifiers)

<br>

[Design insight: the tradeoffs of parts of speech](types)

[The phonetic mapping: each sound's ideographic profile as I perceive them](profiles)

[ASCII transliteration scheme](transliteration)

[Open question (please comment): variable dereferencing?](dereference)

[Other open questions (4)](rfc)

<br>

Here are the reasons why the world needs this so badly, and why Esperanto won't do.

1. **Philosophical accuracy.** The language a society speaks has an enormous impact on its culture, and quite a lot of prevalent harmful ideas can be traced to our language suggesting them:

    * **"Good" is the most diabolically destructive word ever invented.** "Good" refers to many completely different concepts, such as morality, pleasure, skill, and others. (The related words "should" and "must" can also refer to probability.) The conflation of morality and pleasure doesn't just encourage utilitarianism, it allows people to write things like [this tvtropes turn-the-other-cheek propaganda piece](https://tvtropes.org/pmwiki/pmwiki.php/Main/PayEvilUntoEvil) and people can get behind the garbage. Making such wrong and destructive ideas sound appealing would be much harder if morality and pleasure weren't named the same thing.

    * **Synonyms facilitate circular reasoning.** When there are many ways to communicate the same thing, it's easy to see a difference where there isn't one, and people can make statements of the form "X is right because X is right" and mask what they're doing by calling X two different things. Even honest people who were raised with bad ideas can do this unintentionally.

    * **No distinction between ability and permission.** Asking for permission is usually done with "can" in English, which is a blatant road to [authoritarianism](/protagonism/anarchism).

    * **Commands.** I'll admit this point is arguable but there's a strong argument that we shouldn't have commands. Commands as a language construct allow you to pressure someone to do something without saying why: maybe you think it's their duty, maybe you think it's in their interests, maybe you just want them to, but commands allow you to not distinguish, which insinuates that the distinction isn't important.

    * **"Redeem" being transitive.** To redeem yourself means to do noble things that balance out your past sins. Someone else's actions can't make you a better person, so this verb is meaningless when used non-reflexively.

		Yet, of the Christian family of religions, most if not all have a core belief that Jesus's death redeemed the human race by paying back Adam's debt. It's so incoherent that you'd have to work hard to convince me it was serious in a sane world. And yet billions of people believe you can be redeemed by someone else's actions. If the word for redeem wasn't transitive, you wouldn't be able to even express this idea. Even if you tried you'd have a hard time getting it across: "Jesus's suffering caused that we redeemed" would be taken as, "Jesus's suffering led to us redeeming ourselves".

    * **No distinction between causation and deduction.** The word *because* communicates both the causal relationship of events and logical deductions. "Because X happened, Y happened" and "Because X is true, Y is true". And I have definitely seen people abuse this confusion to create bizarre sophistry like a time I [argued with a materialist](/protagonism/metaphysics) and he argued that all of my arguments were [appeal to consequence fallacy](https://www.fallacyfiles.org/adconseq.html) because I was refuting his ideas by showing that they entailed absurd and untenable consequences.

    * **Emotion vocabulary is useless.** English has several dozen words that designate emotions, and most of them are poorly defined or conflate multiples, which breeds a culture of not understanding how people work. We need this vocabulary section to be devised by someone who really understands human emotions. And [obviously that's not me yet](/protagonism/emotions), but it will be eventually, and the same can't be said of most people.

	Esperanto doesn't address most of these problems.

2. **Ease of learning.** A language as complex as English is ill-suited to becoming the universal language (I don't think I need to elaborate on why that would be great to have), and perhaps more important is the difficulty of children learning it. If children learned to communicate faster, they could learn other things and mature faster. A person incapable of sophisticated communcation is also [much less likely to be treated as a person](/protagonism/children).

I know Spem won't be worth making unless it's close to perfect and that's part of why I'm publicizing it even though it's not usable yet. I'll need advice and feedback to make this the best language it can be.

By the way, 'Spem' is a name I came up with a long time ago that meant "Supreme [Protagonists](/protagonism/)' Efficient Medium". Renaming it is on the table.

# General design philosophy

* **As much as possible, have a one-to-one mapping of concepts to lexical constructs.** If two sentences use the same concept, they should use the same grammar; for example "You should do X" and "It's okay to do X" are both making statements about morality and so the sentence shouldn't need to be restructured. It should only need to switch out "should".

	For another example, Spem's way of expressing causation is not similar to how English does it with 'make'. English says "I made X do Y", but Spem says "I caused that X do Y". The latter grammar is more logically intuitive and more flexible - sometimes in English when the make-verb construction doesn't seem to cut it you end up saying something like "I made it so ..." which sounds a little awkward. The Spem construction works anywhere.

* **Speed is important, and so we should use our phenome thoroughly.** Probably most one-syllable words should be words, and most two-syllables. The most common words should be the shortest. Three-syllable words should be a rare exception.

	Speech is something we use all day every day. It should have a similar preference for speed and pragmatism as [Unix command names](/software/commands) should (they do but not nearly as much as I think they should).

	Part of the reason I've been coming to appreciate the value of speed more lately is that if the language is slow then people will be motivated to take shortcuts that fudge their meaning, which harms the value of philosophical accuracy. I certainly do that every day even in English (which is by far the fastest of the languages I know).

* **No homophones.** Of course there'll be no homophones, but I also want to minimize "multi-word homophones", where all the words are unique but two words in a row can sound the same as an unfortunate third word.

	I'm ambivalent about whispering. Whispering mostly if not entirely removes the distinction between voiced and voiceless consonants, so that would mean that to truly avoid homophones I'd have to also not have any words only distinguished by voicing? I'm not certain whether whispering makes it completely undiscernable, but it seems like something to avoid, except that it's such a hamper.

* **If the thing is similar, so is the representation.** I want to make related words have most of their sounds in common so it's obvious they're related even if you don't know the other word. This is difficult to uphold constantly, and it's obviously unfeasible to uphold the reverse (if the representation is similar then so is the thing).

	All the interrogative pronouns, for instance, share a starting letter or two. Words that are opposites usually have the same structure and just switch one or more of the sounds for "opposite" sounds (for example *ee* versus *oo*).

* **Phonetic associations are not arbitrary.** Our associations with certain sounds - for example, how *l* is a "soft" sound and *ah* is a "wide" sound - are not completely arbitrary; they're based on a combination of what we physically do to the produce the sound and natural sounds that are similar. I believe these associations should be upheld in the language; giving sounds consistent profiles makes the vocabulary intuitive.

* **Beauty.** Spem should be beautiful. This will make it not only enjoyable to use, but more enticing to learn. (After all, phonetic appeal was one of the things to drew me to Japanese.) We should avoid having words that are likely to be used in sequence sound ugly together.

Obviously these goals clash often and it's not always clear how to prioritizing them, but I tried to list them in order of descending importance.

# Broad concrete choices

* **No plural.** You won't change my mind about this. The difference between one and two is not special and does not deserve to be treated differently from the difference between two and three. Number is unspecified by default because surprisingly often it's not essential to the intended meaning of your statement; how many times have you had to write '(s)' after a word so it applies to both singular and plural? We'll have a word for many/several, and if it turns out to be needed sufficiently often, we'll have a one- or two-syllable word for "multiple", and the use of this or "one" before stuff won't sound unnatural because we'll be used to it being standard whenever the number actually matters.

* **No distinction between nouns and adjectives.** (I used to be pretty sure of this too, but I've been starting to have serious doubts about it recently.) Substantive adjectives or placeholder words are used quite often in English: "the poor", "the green one", et cetera. In Spem any adjective can be used this way by default and it won't need a noun like "one" in that second example. Note that while "the poor" works well, if you don't want to use "the" you need a noun like so: "poor people". You shouldn't have to specify "people".

	Basically there are "entity words" or descriptors in Spem that just pile together to describe an entity. The entity has whatever traits the descriptors specify, and all descriptors were created equal. <!--There are two meaningful differences: nouns are usually things that can't be mixed with other nouns in any obvious way, and nouns don't have opposites.-->

* **SVO word order (subject-verb-object), like in English.** SVO is the best word order because the verb is a different part of speech so it makes sense to use that as a natural divider between subject and object. Especially given the above policy, having the subject and object next to each other could cause serious problems.

	Japanese is a language that generally follows **SOV**, and that's part of why it needs particles like は (wa), が (ga), and を (o) to denote the subject and object of sentences (I know Japanese doesn't have subjects don't pile on me Japanese teachers I'm simplifying it so the 外人 don't get confused). These particles are all one syllable but needing 1 or 2 of them in most complete sentences adds a *lot* of syllables at the end of the day.

* **No affixes.** Pretty much all words in Spem are standalone; things like tense and the -tion conversion are accomplished with separate words. The distinction is somewhat meaningless, but I think it helps clarity to write them with a space so that they can't be mistaken for a different word. Secondly, in languages that use suffixes for type conversions and stuff, they usually end up needing exceptions for words where the regular pattern sounds too ugly to be used or is hard to pronounce. I think making them technically detached words helps avoid this (it affects how we accent the word intuitively).

## Adjectives before or after nouns?

Although I don't plan to grammatically distinguish the two I think we should still have a custom for it. If there's a custom then whether the custom is followed can be used to convey additional information, such as reversing the order being used to emphasize.

I've developed the de facto standard of adjectives-first, but I'm open to having my mind changed in the comments.
