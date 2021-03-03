TITLE What Escape Sequences Are
NAV Escape sequences
DESC The concept of an escape sequence is a common one in computing, but the concept is far broader than computers themselves. 

The concept of an 'escape sequence' is a common one in all fields of computing, but the concept is far broader than computers themselves. The idea of an escape sequence is to solve the following problem: we're desiging a code that uses a limited range of symbols to convey information and we need to be able to communicate each of their meanings literally; so how, without adding more possible symbols, do we signal a meaning that isn't any of those?

The brilliant and all-applicable answer is escape sequences. You agree on a single symbol that's used to toggle the next symbol between literal and alternate meanings; and to convey this special symbol's literal meaning, you just use it twice. In computing, a common character for this is `\`.

A concrete example: how do you encode text so it all goes on one line, without removing the line breaks? `\n` is the usual escape sequence for 'newline'. For example,
```
Hello?
Are you there?
```
Is encoded to
```
Hello?\nAre you there?
```
But you don't lose the ability to represent any possible string of text, because you can still signal a literal `\` with `\\`. To signal a literal `\n` you would write `\\n`.

---

Most programming languages have a few that are commonly agreed on; besides `\n` for newline, `\t` usually represents tab, `\a` a "BEL" character (which is a nonprintable character that causes the computer to beep when outputted in environments that support it), `\r` is "carriage return", which causes the following text to appear at the beginning of the line overwriting the previous beginning - so basically a newline that doesn't go down. Likewise, in most programming languages, literal strings of text have to be enclosed in quotes, so to indicate a string that actually has a quote in it, you would write for example `print("hello \"user\"")` and it would print `hello "user"`.

In fact, even Unix terminal text coloration is achieved through escape sequences. There's a standard of [ANSI codes](https://en.wikipedia.org/wiki/ANSI_escape_code) that terminals support which includes escape characters that a program can output to change the current text color, switch to outputting text at a different position, or do almost anything you can imagine in a text-based terminal.
