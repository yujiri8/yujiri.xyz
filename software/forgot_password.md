TITLE Forgot Password Considered Harmful
NAV Forgot Password Considered Harmful
TEMPLATE DEFAULT
DESC The "forgot password" button on most websites is a gaping security hole. Please stop.

Does it bother anyone else that your email provider can hack all of your online accounts at any time with zero effort? Incase you haven't considered it before, let me explain how this is true.

Virtually every web service has a "forgot password" feature, where if you forget your password the only information required to retrieve it is your email address and access to your email account. That means your email provider could send requests to all of those web services hitting the forgot password button with your address and since your email provider can necessarily read your emails they would instantly have control of all of your accounts.

And of course not a single web service offers an account setting to encrypt this email... (Not even [Github](https://github.com), a website specifically for programmers and that *already allows you to set public keys on your account!*) That would make sense and allow people to actually protect their accounts.

Honestly the only reason to think your email provider doesn't already have all of your passwords is that doing this would reset it and they couldn't discover the original, so you'd at least find out next time you tried to log in. But not that it was them, only that someone had hacked you. It'd be indistinguishable from someone just cracking your email account.

If you're making a web service, this is why I regard you as a moron if you include a forgot password button without an account setting to either disable the button or provide a public key to encrypt the reset email with.