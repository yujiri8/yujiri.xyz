TITLE Python Reference
NAV Python Reference
NO_TIMESTAMP
NO_COMMENTS

For Raven. This page is unlisted.

```python
# printing strings
print("hello")
# printing non-strings
print(6)

# getting input
choice = input()
# getting input with a prompt
choice = input("enter a choice:")

# type casting (converting between types)
# necessary because directly using numbers and strings together,
# like 5 + "5", is an error.
# you have to convert the string to a number to do math with it.
int("5") == 5
str(5) == "5"
# + and * on strings
"hello" + "friend" == "hellofriend"
"5" + "5" == "55"
"hello" * 2 == "hellohello"

# ints (integers) can only be whole numbers. 'float' (for 'floating point') is
# the name for how decimal number are represented. These are technically a
# separate data type from int, but unlike int and str, int and float are
# compatible for most purposes.
float("5.6") == 5.6

# string escape sequences
# a \ inside a string is not interpreted literally. It "escapes" the next character,
# making it literal (or non-literal if it's normally literal). For example:
'hello, \'Raven\'.'
# that's the text "hello, 'Raven'" but the backslashes escape the single quotes so
# that they're interpreted as part of the string instead of as closing the string.
# \n is a newline character. \t is a tab. \\ is how you get a literal backslash.

# variables
# variables stand-in for their values. For example, if you do `number = 5`,
# then number is pretty much interchangeable with 5. You can replace any
# instance of 5 (or any other literal value) with the name of your variable.

# flow control
# the elif and else clauses are both optional. `if` can be used without them,
# or with only one of them.
if condition:
	# stuff in here only happens if condition is true
elif other_condition:
	# stuff in here only happens if the if block didn't,
	# but other_condition is true
else:
	# stuff in here only happens if both the if and elif blocks didn't
# stuff out here happens after the if/elif/else business,
# regardless of which of them executed.

# loops
while condition:
	# stuff in here keeps happening on loop, as long as condition keeps being true.
	# This is the 'loop body'
	# a 'continue' statement, if it gets executed, skips the rest of the
	# loop body this time, and jumps back up to the 'while' line.
	if other_condition:
	# a 'break' statement, if it gets executed, immediately exits the loop -
	# without waiting for it to finish - and jumps down to the first thing after it.
	if third_condition:
		break

# tuples
even_numbers = (2, 4, 6, 8, 10)
words = ('hello', 'goodbye')

# indexing
"hello"[1] == "e"
(6, 2, 4)[1] == 2
# position 0 gives the first element.
# position -1 gives the last.
# position -2 gives the second last, etc

# 'tuple of tuples' example (nested tuple)
high_scores = (("Alice", 600), ("Bob", 700), ("Carol", 800))
high_scores[0] == ("Alice", 600)
high_scores[0][1] == 600

# slicing
# (under construction)

# in
5 in (1, 2, 3, 4, 5) == True
6 in (1, 2, 3, 4, 5) == False
'e' in 'hello' == True
'el' in 'hello' == True
# note that the above "in a row" behavior only happens with strings.
# For tuples, `in` only tests if the left expression is equal to any
# of the items in the tuple. Example:
(2, 4) in (1, 2, 3, 4) == False
# because none of the individual elements in (1, 2, 3, 4) is (2, 4).

# iterating
# the for...in loop is .
for number in (1, 2, 3, 4):
	print(number)
# The expression to iterate on - (1, 2, 3, 4) in this case can be any sequence type:
# a string, a tuple, or some other things you'll encounter later. The 'item' variable,
# called number in this example, will be set to hold each item in the sequence so the
# loop body will execute for each of them.
# this is like doing:
numbers = (1, 2, 3, 4)
index = 0
while index < len(numbers):
	print(numbers[index])
	index += 1
```
