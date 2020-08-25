TITLE Didact, the user-respecting anti-CMS
NAV Didact, the user-respecting anti-CMS
TEMPLATE DEFAULT

**Didact** is a [CMS](https://en.wikipedia.org/wiki/Content_management_system) that isn't a CMS.

I abhor real CMSs that manage the server for you and take away all your flexibility. As a programmer, they insult me, and using something so bloated would be a betrayal of all my ideals about software. For my website, I rolled my own code as I needed it and was very happy to implement basically all the useful features of a CMS in barely 2000 lines of code. I'm now generalizing that code for other people to use and calling it Didact.

The main motivation for Didact was that I'd been discouraging people from using CMSs like Wordpress and telling them to go "the real way", but when non-technical people started listening to my advice, I realized I was asking them to go in way over their heads. I made [a guide on how to make a basic website](https://yujiri.xyz/software/website_guide), but there was one main obstacle I couldn't possibly expect them to tackle: comments.

Even for someone willing to pick up some technical knowledge, implementing all the reqired features of a comment system - writing an application server and database schema, email notifications, good frontend layout - just wasn't a reasonable assigment unless they were interested in becoming a programmer by trade. In the original version of the above guide, I half-heartedly mentioned that "my implementation's open-source and up for copying", but that still wasn't reasonable. That would still require learning enough programming to understand 2000 lines of code to customize it for their needs.

I came up with a plan: generalize my website's code to be easily customizable and not include stuff specific to yujiri.xyz like the [Spem](https://yujiri.xyz/spem/) dictionary and document it well enough that would only take a moderate level of ability to get started. It would promote understanding and customizing the internals without requiring significant ability to use it.

So here it is. Didact is the anti-CMS where you control the server and retain all the flexibility of the infinite possibilities of programming.

## Why's it called Didact?

Because that's my usecase, and the type of site it's geared toward in general. Most personal websites are blogs - a term that, at least to me, implies a chronological rather than hierarchical structure and a lack of editing past content. My site is different: it was never meant to be a timeline of my thoughts, but a database of everything I believe. So I went with a hierarchical, category-based structure where I constantly update old articles when my beliefs change or just to improve their presentation. I even delete my articles without hesitation if I decide I was wrong about the main idea they expressed, or even just that they weren't very profound.

Most of my content is philosphical too. I love being a didact and want to promote this kind of site.
