TITLE There's No "Why" In Morality
NAV Conscience
DESC Morality can't be derived from logic. It has to come from conscience.

When people disagree with me about morality, they often ask, "*why* do you think that's a sin / duty?" This question shows a fundamental misunderstanding of morality. To illustrate I'll play devil's advocate: *why* is it wrong to steal? There are a few possible responses I've heard or can think of, but none of them actually answer the question.

* "It's wrong because it deprives other people of their property without their consent" (deontological answer). In that case, what's wrong with depriving others of their property without their consent? Who says that's evil?

	* This is where <a rel="nofollow" href="https://en.wikipedia.org/wiki/Argumentation_ethics">argumentation ethics</a> comes in for some philosophers; as <a rel="nofollow" href="https://www.zerothposition.com/2017/03/21/libertarianism-conquest/"> Nullus Maximus puts it</a> (he later extends this argument to cover property):

	  > The starting point for all of libertarian philosophy is self-ownership; each person has a right to exclusive control of one's physical body and full responsibility for actions committed with said control. Note that in order to argue against self-ownership, one must exercise exclusive control of one's physical body for the purpose of communication. This results in a performative contradiction because the content of the argument is at odds with the act of making the argument. By the laws of excluded middle and non-contradiction, self-ownership must be true because it must be either true or false, and any argument that self-ownership is false leads to a contradiction.

		This is a logical trainwreck. He assumes that *exercising* a power requires one to believe not only that one has one a *right* to do so, but that the right is unconditional and can never be outweighed even in *other* situations (he doesn't say that explicitly here but it's the center of his ideology). The latter statement is clearly absurd, but even the former is false on multiple accounts.

		A moral nihilist says, "There's no self-ownership but since you don't seem to have any interest in forcefully silencing me I'll go ahead and take the opportunity to say this". NM's argument does not answer this at all.

		It's also false because someone can do something without claiming it's moral. I could steal his friend's phone in order to text him and say, "I'm doing this to make this argument to you; my act of theft is not justified, but that doesn't impact the validity of the argument I'm about to make by taking advantage of the result of the theft".

		It's telling that you can actually trivially contrive a situation where his reasoning would entail that self-ownership is contradictory. Suppose I don't have a mouth or any other way to communicate, but have the ability to take control of someone else's without their consent in order to make an argument. According to his reasoning, I could not argue for self-ownership because I would have to violate it do so; self-ownership would have to be false because it must be either true or false, and any argument I could make that it were true would lead to a contradiction.

		His argument is equally fallacious when used to argue for his moral system against someone else's as it is when used to argue for the existence of morality in the first place; I can make an argument that [self-ownership exists but can be outweighed](virtues) [in some situations](consequentialism) and I can be perfectly consistent in doing so. But that's not relevant to this discussion.

* "It's wrong because it's selfish/cruel" (virtue ethics answer). In that case, what's wrong with being selfish or cruel?

	* You might argue: "Being selfish or cruel is morally evil". But that's circular. I asked what's wrong with it, and 'morally evil' is a direct synonym for 'wrong' in this case. You were able to make the first jump because selfish is a word that can be given a neutral definition and enriching yourself at the expense of others fits that definition. But you can't make the jump from selfish to evil because 'evil' doesn't have a non-normative definition, so you're forced to say "it's evil because I say so".

* "It's wrong because it causes suffering" (consequentialist answer). But what's wrong with causing suffering?

The point is that there *is no why*. Logic doesn't give us values. It only goes from one proposition to another that it entails, and *for facts* this is fine since we get facts to start with from sensory experience; but facts alone can never entail statements of morality. So to get our moral system started we have to get a foundation from conscience.

I'll describe how this process works. Conscience is [a built-in mental faculty](soul_anatomy) all people have that judges possible actions from the person's current situation. From these case-by-case judgements, there are two ways to derive a moral system:

* **Through instinct**. This is an automatic and subconscious process that we do with everything. From experience, our instinct forms a system of assocations that allows us to try to predict what our conscience would say for a situation we're not in. This is the same way people often have a sense of how a practical science experiment will go without consciously knowing the underlying principle. But, due to the inductive nature of this process, it's inherently imperfect.

* **Through reason**. We can use reason to extrapolate from experience what the underlying "rules" of morality must be. This is actually exactly the same as how science works: you get data points from a non-rational source (experiments or conscience), and then use reason to connect the dots and figure out how it works (this is still inductive and thus imperfect). This one requires conscious thought, but is more useful, since it allows us an understanding that we can't get through conscience or instinct alone, so that we can discuss our system with others and debate about it. Since morality must be consistent, pointing out an *internal* inconsistency in a rational person's extrapolated system forces them to reconsider it.

	Reason can also use hypotheticals as data points (and has to because no one has been in enough situations to derive a comprehensive moral system from experience alone), but hypotheticals are judged by instinct, since conscience can only speak on a situation you're actually in; so this is less reliable.


<nomd>
<pre style="border: 1px solid var(--weakcolor); background-color:var(--tintcolor); margin-bottom: 0">
getMoralSystem = do
    judgement &lt;- conscience
    pure $ inductiveReason judgement
</pre>
<div style="border: 1px solid var(--weakcolor); background-color:var(--tintcolor); border-top-width:0px">
How to derive a moral system in Haskell
</div>
</nomd>

Conscience itself, though, is infallible because every other source of moral judgements is flowing from it. Arguing that conscience is *not* infallible is like arguing that the source material for a work of fiction is not infallible on the canon of the story.

But, just like reason in its domain, the accuracy of conscience depends on having the correct inputs. Of course an infallibly wise person could be 'wrong' on a practical judgement if you lied to them about the facts of the case. Conscience, similarly, depends on being fully aware of how everyone involved will be affected by a given action. For example a newborn likely doesn't realize that the other people around them have feelings like they do, and so neither they nor their consciences are to blame if they act selfishly. Hypotheticals are even more so. Since you're not actually in the situation, your mind might fill in some details the statement of the scenario left out (such as assuming that a crime is motivated purely by sadism), and if you didn't realize you were doing this, you could get a bad reading from your instinct on what your conscience would say. I catch myself doing this all the time.

For the purposes of merit and blame though, conscience is infallible without any caveats, because of course you can't be at fault for doing what you had no way to know was wrong.

You might ask me at this point whether I believe that all people's consciences are in agreement. After all, if I didn't then universal morality <span class="note">the requirement that the correct moral system is the same for everyone</span> would be broken. My answer is an unhesitant yes. Everyone's conscience is infallible and operates according to the same underlying principles. I need to point out that there's an apparent inconsistency in such an objection: no one seems to deny that what is logical or rational is the same for everyone (provided they aren't misinformed), and we make that judgement using our own individual reasoning. Why does nobody think it's a problem that this means either everyone's reasoning is the same or universal rationality is broken?

But even besides what I've explained about needing the correct inputs and having to go through instinct for hypotheticals, it might seem that people can be wrong about morality while listening to their conscience. This is due to the further complication that most people aren't even talking about the same thing I am when they say "conscience" or even "morally good". We were all trained to observe certain rules as kids - don't hit people, don't steal, don't be mean, don't break the law (note that all of these rules are at least missing two exception clauses) - and told that these behaviors were what the word "good" *meant*. So now all of the morality-related vocabulary in most people's minds has been corrupted to refer to this preconceived system instead of the actual voice of conscience. When most people ask their "conscience" whether a given action is "good", they're really asking their instinct whether the action is in accord with the contradiction-riddled ideology they were raised with - because that's what they've been told these words mean. It's not easy to tell them the real definition of conscience either, because if you just say "it's the voice that tells you what's right and wrong", they think, "Oh, it's that thing I'm already using", but they haven't actually internalized what you were trying to convey. I don't think this article helps either; the only way to correct the misunderstanding is by calling attention to them experiencing a dissonance between the two.
