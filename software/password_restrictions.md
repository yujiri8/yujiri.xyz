TITLE Stop with the arbitrary restrictions on passwords
NAV Stop with the arbitrary restrictions on passwords
DESC Lumping arbitrary restrictions on your users' passwords doesn't make them stronger.

Today I went through the process of setting up online access to the second of two bank accounts and linking them together. I just encountered more horrid practices in security policy than I ever thought I'd see in one day.

* A maximum password length of 32 characters. Why should it have a max length at all? Although I saw 32 today, it's actually not the worst I've seen in the past: Paypal's caps them at fucking 20. Such asinine limits on password strength make it difficult to use [a secure, memorable passphrase](https://xkcd.com/936/).

* The password not only must contain a number, but *can't contain spaces*. Why? Why arbitrarily limit the range of characters I use?

* I'm *required* to add *six* security questions, all of which have similar restrictions on what the answers can be. Even if six of them provide a reasonable level of entropy (because I generally treat these as just extra password fields and give them answers that don't pertain to the question), forcing me to add an alternative way of getting in can only make my account *less* secure, and there's no real chance of me forgetting my password because I keep them all in a text file (which is now bloated by 6 extra lines).

* Disabling pasting. If I can't paste into the password field, I'm strongly disincentivized to use a long password. This is especially bad for passwords that use the "pure random data from /dev/random" approach I used for some passwords in the past.

Managers, can I get your attention for one sentence? **Lumping arbitrary restrictions on your users' passwords doesn't make them stronger.**

Another thing I ran into that's just an interface issue is not checking that the password and confirm password fields match until submit is clicked. Come on, we have event listeners and web components' render templates now that make it trivial to have an indication appear whenever the content's unequal.
