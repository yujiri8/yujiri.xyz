TITLE Against variable declarations
NAV Against variable declarations
TEMPLATE DEFAULT
DESC My main argument against variable declarations in that they create unnecessary coupling within a function.

In "dynamic" languages like [Python](https://yujiri.xyz/software/python) and Ruby, there's usually no concept of *declaring* a variable, you just assign to it. In compiled languages on the other hand, you usually have to *declare* a variable before assigning to it (or at the same time as the first assignment) with a different syntax.

In general, the argument for declarations is mistake protection: if for example a variable is misspelled, it'll be a name that wasn't declared, or if you misspell it the time you declare it, all the other times it's used will be undeclared names. So you hear about your mistake at compile time. In languages that silently allow such misspellings, they can cost a lot of time and happiness on debugging. But I don't think this makes a good argument for having variable declarations, because you can have a compiler check for unused names or names that are used before being *assigned* without requiring a different syntax for declaration. GHC can do that (though it takes a command-line flag to enable checking for unused vars).

My main argument against variable declaration is that they create unnecessary coupling within a function. For example, consider this approximation of some code for an endpoint handler I've worked on, in the [Go](https://yujiri.xyz/software/go) language:
```
var job, err = getJob(args.JobID)
if err != nil {
	return errors.Wrap(err, "When getting job")
}
```
This code works. But let's say it needs to change. The endpoint also needs to check the user that's hitting it and make sure they have appropriate permissions. I need to add the following code before fetching the job:
```
var user, err = getUser(userID)
if err != nil {
	return errors.Wrap(err, "When getting user")
}
if !user.Admin {
	// assume error403 is a value the caller will interpret and
	// send a 403 response instead of its default 500 for errors.
	return error403
}
```
Look good? Well, this breaks the job-fetching code because the var `err` has already been declared. Adding this code requires me to change `var job, err =` to `job, err :=`.

Fetching the job and the user are conceptually independent operations, and these are perfectly correct ways of doing both of them. But they aren't *programmatically* independent, because they affect what things are valid for each other. For no good reason, one requires the other to change.

Now sure, the cost in this case was extremely small. Probably I just got a compiler error and had to go back in and fix it and then compile again. But just how often does this happen with a language that does variable declarations like this? If it happens a couple times a day, especially if build times are long, that can be a pretty significant cost on the scale that issues like this usually have. And there's also the diff size drawback: commit diffs are inflated by these semantically empty changes, which makes reading and reviewing a diff more time-consuming.

So that's my main reason for opposing variable declarations. Having the compiler check for unused names and names used without assignment still catches most name-related mistakes but doesn't have these drawbacks. Incidentally, the Go compiler *also* checks for unused local variables, which makes me think its declarations serve little to no purpose.
