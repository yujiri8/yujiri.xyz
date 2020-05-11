TITLE Spem: the philosopher's conlang
TEMPLATE DEFAULT
DESC A conlang designed to be elegant, semantically accurate, and free of built-in destructive ideas. Screw Esperanto.

Yes, I'm for real, I plan to invent a language and get the world speaking it. I don't care if you think I'm crazy or it's hopeless. So is anything else I might try to do to fix the world. (I just feel the need to say this cause so many people in real life have jeered at me for this even though [there are verifiable examples of somewhat successful conlangs](https://en.wikipedia.org/wiki/Esperanto).)

Quick links:

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

<br>

[Design insight: the tradeoffs of parts of speech](types)

[The phonetic mapping: each sound's ideographic profile as I perceive them](profiles)

[ASCII transliteration scheme](transliteration)

[Open question (please comment): variable dereferencing?](dereference)

[Other open questions (6)](rfc)

<br>

Here are the reasons why the world needs this so badly, and why Esperanto won't do.

1. **Philosophical accuracy.** This is by far the most important. The language a society speaks has an enormous impact on its culture, and quite a lot of harmful ideas in our society can be traced to English. (I *know* the same problems exist in many other languages. I've studied other languages. I'm just using English for the examples because the article is in English.)

    * **"Good" is the most diabolically destructive word anyone ever invented.** "Good" refers to many completely different concepts, such as morality, pleasure, skill, and others. (The related words "should" and "must" can also refer to probability.) The conflation of morality and pleasure doesn't just lend itself to utilitarianism and such but it allows people to write things like [this tvtropes turn-the-other-cheek propaganda piece](https://tvtropes.org/pmwiki/pmwiki.php/Main/PayEvilUntoEvil) and people can get behind the garbage. Making such wrong and destructive ideas sound appealing would be vastly harder if morality and pleasure weren't named the same thing.	

    * **Synonyms facilitate circular reasoning.** In a language where there are many ways to communicate the same meaning, it's easy to see a difference where there isn't one, and people can make statements of the form "X is right because X is right" and mask what they're doing by calling X two different things. Even honest people who were raised with bad ideas can do this unintentionally.

    * **No distinction between ability and permission.** Asking for permission is usually done with "can" in English, which is a clear gateway to [authoritarianism](/protagonism/anarchism).

    * **Commands.** Related to the above, I'll admit this point is arguable on grounds of speed but there's a strong case to be made that a language should not have commands. Commands as a language construct allow you to pressure someone to do something without saying why: maybe you think it's their duty, maybe you think it's in their interests, maybe you just want them to, but commands allow you to not distinguish, which insinuates that the distinction isn't important.

    * **"Redeem" being transitive.** To redeem yourself means to do noble things that balance out your past sins. Someone else's actions can't make you a better person. Thus this verb is meaningless at best when used non-reflexively. Yet, of the Christian family of religions, most if not all have a core belief that Jesus's death redeemed the human race by paying back Adam's debt. This idea is so obviously absurd someone would have to work hard to convince me that they were serious in a sane world. And yet billions of people believe that you can be redeemed by someone else's actions. If the word for redeem wasn't transitive, you wouldn't be able to even express this idea. Even if you tried you'd have a hard time getting it across: "Jesus's suffering caused that we redeemed" would be taken as, "Jesus's suffering led to us redeeming ourselves". Having a language facilitate such incoherent ideas can only be harmful.

    * **No distinction between causation and deduction.** The word *because* communicates both the causal relationship of events and logical deductions we make. "Because X happened, Y happened" and "Because X is true, Y is true". And I have definitely seen people abuse this confusion to create bizarre sophistry like a time I [argued with a materialist](/protagonism/metaphysics) and he argued that all of my arguments were [appeal to consequence fallacy](https://www.fallacyfiles.org/adconseq.html) because I was refuting his ideas by showing that they entailed absurd and untenable consequences.

    * **Emotion vocabulary is useless.** English has some 60 words that designate emotions or so, and most of them are poorly defined or conflate multiples. Therefore the English language breeds a culture of not understanding how people work. We need this vocabulary section to be devised by someone who really understands human emotions. And [obviously that's not me yet](/protagonism/emotions), but it will be eventually, and the same can't be said of most people.

	Esperanto doesn't address most of these problems.

2. **Ease of learning.** A language as massively complicated as English is ill-suited to becoming the universal language (I don't think I need to elaborate on why that would be great to have), and perhaps more important is the difficulty of children learning it. I think it's important to have a language that children can learn very quickly because a person's earliest years are when their development is easiest to affect, and so the sooner you can teach them to communicate meaningfully the better you can raise them.

	Of course, there's a case to be made that that's a *bad* thing if the parents are bad people, but the above points make Spem more conducive to goodness rather than just more efficient, so even bad people using a more philosophically accurate language is an improvement.

I know Spem won't be worth making unless it's close to perfect and that's part of why I'm going to publicize it even though it's not usable yet. I'll need advice and feedback to make this the best language it can be.

Oh, by the way, 'Spem' is a name I came up with a long time ago that meant "Supreme [Protagonists](/protagonism/)' Efficient Medium". Renaming it is on the table.

# General design philosophy

* **As much as possible, have a one-to-one mapping of concepts to lexical constructs.** This isn't just about ambiguity. I believe that if two sentences use the same concept, they should use the same grammar, so for example "You should do X" and "It's okay to do X" are both making statements about morality and so the sentence shouldn't need to be restructured. It should only need to switch out "should". All statements of morality should follow a unified grammar.

	For another example, our way of expressing causation won't be similar to how English does it with 'make'. English says "I made X do Y", but Spem says "I caused that X do Y". The latter grammar is more logically intuitive and more flexible - sometimes in English when the make-verb construction doesn't seem to cut it you end up saying something like "I made it so ..." which sounds a little awkward. The Spem construction works anywhere.

* **Speed is important, and so we should use our phenome thoroughly.** Probably most one-syllable words should be words, and most two-syllables. The most common words should be the shortest. Three-syllable words should be a rare exception.

	Speech is something we use all day every day. It should have a similar preference for speed and pragmatism as [Unix command names](/computing/commands) should (they do but not nearly as much as I think they should).

	Part of the reason I've been coming to appreciate the value of speed more lately is that if the language is slow people will be motivated to take shortcuts that fudge their meaning, which harms the value of philosophical accuracy. I certainly do that every day even in English (which is by far the fastest of the languages I know).

* **No homophones.** I want to completely eliminate homophones, even "multi-word homophones", where all the words are unique but two words in a row can sound the same as an unfortunate third word. Obviously this is inevitable on the whole and it's only a problem if the third word is one that can cause confusion, but I want to try hard to avoid those situations.

	I'm ambivalent about whispering. Whispering mostly if not entirely removes the distinction between voiced and voiceless consonants, so that would mean that to truly avoid homophones I'd have to also not have any words only distinguished by voicing? I'm not certain whether whispering makes it completely undiscernable, but it seems like something to avoid, except that it's such a hamper.

* **If the thing is similar, so is the representation.** I want to make related words have most of their sounds in common so it's obvious they're related even if you don't know the other word. This is somewhat difficult to uphold constantly, and upholding the reverse (if the representation is similar then so is the thing) is obviously unfeasible.

	All the interrogative pronouns, for instance, will share a starting letter or two. Words that are opposites should usually have the same structure and just switch one or more of the sounds for "opposite" sounds (for example *ee* versus *oo*).

* **Phonetic associations are not arbitrary.** I believe our mental associations with certain sounds - for example, how *l* is a "soft" sound and *ah* is a "wide" sound - are not completely arbitrary; they're based on a combination of what we physically do to the produce the sound and natural sounds that are similar. I believe these associations should be upheld in the language; giving sounds somewhat consistent profiles helps with the problems of vast vocabulary because it makes the vocabulary intuitive.

* **Beauty.** Spem should be beautiful. It should be aesthetically pleasing to speak. This will make us happier to use it and will make it more enticing to learn. (After all, phonetic appeal was one of the things to drew me to Japanese.) We should avoid having words that are likely to be used in sequence sound ugly together.

Obviously some of these goals will conflict in some cases. Prioritizing them will be hard and it won't be clear what the best decision is, but I tried to list them in order of descending importance.

# Broad concrete choices

* **No plural.** You won't change my mind about this. The difference between one and two is not special and does not deserve to be treated differently from the difference between two and three. Number is unspecified by default because surprisingly often it's not essential to the intended meaning of your statement; how many times have you had to write '(s)' after a word so it applies to both singular and plural? We'll have a word for many/several, and if it turns out to be needed sufficiently often, we'll have a one- or two-syllable word for "multiple", and the use of this or "one" before stuff won't sound unnatural because we'll be used to it being standard whenever the number actually matters.

* **No distinction between nouns and adjectives.** (I used to be pretty sure of this too, but I've been starting to have serious doubts about it recently.) Substantive adjectives or placeholder words are used quite often in English: "the poor", "the green one", et cetera. In Spem any adjective can be used this way by default and it won't need a noun like "one" in that second example. Note that while "the poor" works well, if you don't want to use "the" you need a noun like so: "poor people". You shouldn't have to specify "people".
	Basically there are "entity words" or descriptors in Spem that just pile together to describe an entity. The entity has whatever traits the descriptors specify, and all descriptors were created equal. <!--There are two meaningful differences: nouns are usually things that can't be mixed with other nouns in any obvious way, and nouns don't have opposites.-->

* **SVO word order (subject-verb-object), like in English.** SVO is the best word order because the verb is a different part of speech so it makes sense to use that as a natural divider between subject and object. Especially given the above policy, having the subject and object next to each other could cause serious problems.

	Japanese is a language that generally follows **SOV**, and that's part of why it needs particles like は (wa), が (ga), and を (o) to denote the subject and object of sentences (I know Japanese doesn't have subjects don't pile on me Japanese teachers I'm simplifying it so the 外人 don't get confused). These particles are all only one syllable but needing 1 or 2 of them in most complete sentences adds a *lot* of syllables at the end of the day.

* **No affixes.** Pretty much all words in Spem are standalone; things like tense and the -tion conversion are accomplished with separate words. Albeit the distinction is somewhat meaningless, but I think it helps clarity to write them with a space so that they can't be mistaken for a different word. Secondly, I think that in languages that use suffixes for type conversions and stuff, they usually end up needing exceptions for words where the regular pattern sounds too ugly to be used or is outright hard to pronounce. I think making them technically detached words helps avoid this (it affects how we accent the word intuitively).

## Adjectives before or after nouns?

Although I don't plan to grammatically distinguish the two I think we should still have a custom for it. If there's a custom then whether the custom is followed can be used to convey additional information, such as reversing the order being used to emphasize.

I've developed the de facto standard of adjectives-first, but I'm open to having my mind changed in the comments.