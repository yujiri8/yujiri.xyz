TITLE Forgot Password Considered Harmful
NAV Forgot Password Considered Harmful
DESC The "forgot password" button on most websites is a gaping security hole. Please stop.

The "forgot password" buttons on every web service mean that if someone gains access to your email account, they also get access to every other account you have.

It also means that your email provider can hack all your other accounts at any time, since they already have access to your email.

This is a horrendous violation of common sense. We're always advised to "use different passwords on everything", but how much does that matter if you have one account that invalidates all your other security mechanisms?

This wouldn't bother me so much if it was something we could choose not to do. But the problem is that *none of us have any choice*, because no web services offer a setting to either disable password reset or encrypt the emails. Not even [Github](https://github.com), a website specifically for programmers and that *already allows you to set public keys on your account!*

I'm setting a good example with this website by offering users to disable password reset. This is *basic* security practice. Having password reset without a feature like this is worse than storing passwords in plain text. Even bloggers who write great stuff about security go on to make web services that effectively accept your email password as an alternative to the one you set, and there's nothing you can do about it.

I've noticed it getting even worse in the years since I first wrote this. Many websites, if you log in under certain circumstances such as from a new IP address, refuse to let you in without going through an email or phone verification process. This is a disturbing trend: not only does your email account work as a master key to everything whether you want it or not, but you often need the email account *even if you have the actual password*.

Your email provider should not be your fucking custodial guardian. Follow my example and *allow* your users to be secure.
