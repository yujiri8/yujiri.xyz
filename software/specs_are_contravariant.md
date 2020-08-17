TITLE Specifications are contravariant
NAV Specifications are contravariant
TEMPLATE DEFAULT
DESC In specs, supporting more things is *bad*, and contravariance is the reason.

Covariance leaves hierarchies intact; contravariance inverts them. For example, integer is a subtype of number and so an integer can be used where a number is expected, but a mere number can't be used where an integer is expected. Thus an array is covariant because an array of integers can be used where an array of numbers is expected, while an array of mere numbers cannot be used where an array of integers is expected. Function arguments are contravariant because a function that takes a number can be used where a function that takes an integer is expected, but a function that only takes an integer *cannot* be used where a function that takes any number is expected.

This example was [given by the Rustonomicon](https://doc.rust-lang.org/nomicon/subtyping.html). I think it's a very good one. I'm writing this because while most devs readily understand these concepts applied to type systems, I think most devs fail to understand contravariance when it comes to *specifications*.

In the context of anything that has to be implemented or supported, supporting more things is *bad*, and contravariance is the reason.

When you add a feature to a standalone program, users get to use it. Hooray! There might be [other reasons to think twice about it](https://yujiri.xyz/software/features), but at least functionality is a positive.

But when you add a feature to a protocol or specification, what happens isn't that implementers get new functionality. What happens is that they all have to do extra work. And if they don't, incompatibility! Specifications are **contravariant**.

Do you think you're making your spec easier to use by [making everything case insensitive, allowing *optional* whitespace everywhere just because you can](https://tools.ietf.org/html/rfc7230#section-3.2), giving single and double quotes the same meaning, having multiple names for things, and [making some characters](https://daringfireball.net/projects/markdown/syntax#em) [equivalent to others](https://daringfireball.net/projects/markdown/syntax#list)? You're wrong. You're making it a bug-infested mess. Stop it. Get some help.

<!--Put mp4 when it's supported-->
