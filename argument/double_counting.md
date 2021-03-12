TITLE Double-counting
NAV Double-counting

Double-counting is when someone in a pros-and-cons argument tries to count a single point more than once, by rephrasing it in various ways, counting things that are actually corellaries of it rather than distinct points, or just raising the same point again later in the conversation when you might not notice.

Let's practice identifying it with this article: [6 reasons you should use native web components](https://codeburst.io/6-reasons-you-should-use-native-web-components-b45e18e069c2).

The first section has a bulleted list that claims 9 advantages of native web components, but there are at most 4 distinct ones. Let's point out all the cheating:

* Declaration, extensibility, and interoperability are not benefits of native web components, just a description of how they work.

* Maintainability is not describing a distinct benefit; it's just explaining *why* composability and reusability are advantages. But the article lists it as if it's a separate benefit.

* Productivity is describing the same benefit as reusability. The article disguises this one a little better by placing them so far apart in the list, but again, productivity is the reason why reusability is a benefit, not another benefit. (It's also the reason why maintainability is good.)

So the actual list of distinct points here is: composability, reusability, scoping, and accessibility. Even though none of the statements are false, the case for native web components is made out to be more than twice as strong as it is.

I think the second section of the article, "Brand Consistency", is BS too, but because it's actually unsound, not because it's double-counting.

The third section, "Business Perspective", is another instance of double-counting. It rehashes *productivity* from the first section, and to make it sound original, adds a discussion of the financial benefits of productivity.

The fourth section, "Developer Experience", rehashes productivity and reusability from the first section.
