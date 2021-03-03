TITLE Separate communication and notification
NAV Separate communication and notification
DESC I'm imagining a new protocol. You would have a notification server just as you have an email server.

I have a problem with my digital life: too many places I have to check for notifications. Reddit, twitter, gmail, protonmail, discord, matrix, collapsitarian.io, and I think there used to be more. Checking each of them every day:

* Is a chore

* Makes it hard for me to fight addiction, cause I have to actually go onto all of these platforms all the time

* Leads to me having long response times, especially when I forget to check one for a couple days

Now, I think lots of others have this problem too. That suggests a general solution is called for.

> Why haven't you set up email notifications for all of these things?

Because then I can't have different settings about how my computer should alert me. Protonmail's interface sends me a desktop notification when I get a new email, but of course, it's for *every* new email. And filtering by sender isn't good enough: for example, I want "new reply to your tweet" and "someone liked a reply to your tweet" to be treated differently.

And sometimes a platform doesn't have notification customization settings (fucking twitter), or they're hard to find.

I think email is fundamentally incapable of perfectly solving this problem because email is free-form communication, not structured data, so it can't be categorized and filtered. Communication and notification are different things; I'm not sure the same protocol should provide both. I'm imagining a new protocol. You would have a notification server just as you have an email server. Here's a sketch of the UX:

I make an account on reddit. I give them my notification address and there are no other on-site settings related to notifications. I make a post titled "Question about X". When someone replies to me, reddit sends my notification server a JSON object like this:
```json
{"type": "reply", "user": "AnswerHaver689", "post": "Question about X", "link": "https://reddit.com/comments/sn85t74s58ow35"}
```
My notification server fetches this, adds `"source":"reddit.com"` (added by the notification server to prevent spoofing), and my notification client fetches it. In my client app, I could have settings like:

* For `reply` notifs from `reddit.com`, play a sound.

* For `new post` notifs from `reddit.com`, keep them in the inbox so I see them when I tab over to my notification app, but don't bother me. Unless it has `"community":"myFavSubWithLowTraffic"` - then play a sound.

* For `like` notifs from `twitter.com`, put them in a "twitter" folder so I only see them if I click on that folder.

* For `liked a reply to your tweet` notifs from `twitter.com`, ignore them.

And then *all these platforms stop having in-app notifications*. All notifications from everything are sent to my notification server so I can control them.

Benefits:

* you don't have to stumble through some cesspool interface to find the settings you want.

* platforms can't limit how you can customize your notifications. I will finally be free from "someone liked a reply to your tweet"!

* platforms don't have to do the work to offer customization settings. All they have to do is send a JSON object every time, not add a settings page to their app and inevitably do a half-assed job.

I don't see any downsides. While I know that [adding new software should never be done lightly](features), due to benefit #3 I think it's a good trade even without the other benefits.

And the implementation of the notification server itself is extremely simple. I might write a proof of concept. It should be doable in less than 500 lines. The client app is more complicated, but a good one should still be less than 2000.
