TITLE The Concise Python Tutorial, part 6: Exceptions and IO
NAV The Concise Python Tutorial, part 6: Exceptions and IO
TEMPLATE DEFAULT
DESC Learn how to handle exceptions/errors in Python, and use IO to affect the outside world.

[Previous lesson: Functions](pythontut5)

We're going to gain two big concepts here. First up is *exceptions*.

# Exceptions

Up to this point, you haven't had any way to *not* crash the program if there's an error. If you had wanted to, say, get a number from the user but *not crash* if they entered a non-number, there was just no way you could've done it, short of reimplmenting the `int` or `float` functions yourself with your knowledge of strings. Of course there's a way. Now we're finally getting to it.

Terminology note: the terms "error" and "exception" are pretty interchangeable, at least when it comes to Python. When you try to use `int` to convert something that can't be converted to an int, it **raises** an exception, which by default leads to a crash.

You can override this using the `try` and `except` statements. Here's a demonstration:
```
try:
    num = float(input("Enter a number, please: "))
except:
    print("That's not a number, you dimwit! I'll just use 5 as a fallback.")
    num = 5
print("The number + 1 is", num + 1)
```
You can run that to see it work. If an exception is raised by something inside a `try` block, it won't crash; instead, it'll go to the `except` block after it, and if that finishes without any further errors, it'll proceed with the program. With that, try making the calculator from part 1, but if the user enters a non-number, it should explain their mistake and then let them try again.

<expand-note closedtext="Show solution" opentext="Hide solution">

```
def safe_getnum(prompt):
    while True:
        try:
            return float(input(prompt))
        except:
            print("That's not a number.")

num1 = safe_getnum("enter a number:")
num2 = safe_getnum("enter another number:")
print(num1 + num2)
```

</expand-note>

Isn't that a cool power to have unlocked! There's a lot more cool stuff I need to show you about exceptions.

# Exception types

You know how there are all those different types of errors? You can make an `except` clause that only catches one kind.
```
def safe_getnum(prompt):
    while True:
        try:
            return float(input(prompt))
        except TypeError:
            print("That's not a number.")
```
This is actually way better in general since you would almost never want `NameError`s to be caught. If you catch all exception types under the assumption that any error is because the user entered something invalid, then if you had, say, spelled `inupt` instead of `input` in the `try` clause, it would be raising a `NameError` every time, before even asking for input. But with only the naive exception clause, the program would be shouting at you that "That's not a number." repeatedly even though you hadn't entered anything. If the real error is a typo in your code, you certainly wouldn't want it to be handled the same as a `TypeError`. You could write this:
```
def safe_getnum(prompt):
    while True:
        try:
            return float(input(prompt))
        except TypeError:
            print("That's not a number.")
        except NameError:
            print("Unfortunately, I mispelled my code. I guess I'm the dimwit now.")
        except:
            print("Something else went wrong. I don't even know what," +\
                "so I'm going to be one of those useless \"an error occured\" messages.")
```
Of course, you wouldn't actually want to handle `NameError`s that way either - you'd probably just want to let it crash so you could see the line number - but it shows how you can handle multiple types of exceptions differently.

You can also assign one `except` clause to multiple types of errors:
```
try: int('blah')
except (TypeError, ValueError):
    print("TypeError or ValueError")
```

# `except` ... `as`

With the `as` clause, you can get a reference to the exception. Let me show you what I mean.
```
try: do_something()
except Exception as e:
    print("the following error occured:", e)
```
Run that so you see how it works.

`Exception` is an umbrella for any kind of exception. Normally, it's the same as just writing `except:`, but the `as` clause requires an exception type to be specified, so I had to do `except Exception as e`.

Okay well actually that's not quite true. There are some exception types that are not considered a subtype of `Exception` - like `KeyboardInterrupt`. Technically it's `BaseException` that encompasses any exception type - but `Exception` would usually be the one you want, since catching `KeyboardInterrupt` would mess with the user's ability to use Ctrl-C to get out of the program.

## `pass`

Python needs to see some code after anything that ends in `:` (like `if`, `while`, `except`, or whatever); putting nothing is an `IndentationError`:
```
>>> if True:
...
  File "<stdin>", line 2

    ^
IndentationError: expected an indented block
```
I suspect the reason for this is that an empty block is most likely to be a mistake made by a programmer who forgot to indent stuff properly. Which is true for `if`. But if you want to have a block that does nothing, you can use the `pass` keyword. This is useful when you want to silently ignore an error:
```
try:
    entry = float(input("enter a number, please: "))
except:
    pass
```
That way, an error getting or converting the input would just be ignored, since it'd be caught by an `except` clause that doesn't do anything. Not that you'd want to silently ignore such an error, but there are situations where you do.

# `raise`

`raise` lets you deliberately raise an exception. Why would you want to do that? Well, quite often actually, when you want some set of conditions to count as an error for the purposes of your program even if they're not a Python error. Imagine you want the user to enter a single-digit number. If you get the input from `input`, you would use `int` or `float` to convert it to a number, but trying to convert `'50'` to a number won't raise an error because 50 is a perfectly valid number, just not valid for your use case.

Now, if you were getting it from the user interactively in a command-line setting, like we've been doing, you wouldn't need `raise` because you could just modify `safe_getnum` to also make sure the number's within your range before returning it. The better examples for this are when it's in a non-interactive setting so you can't ask them to try again, like if you're reading data from a file that was saved earlier; or when the function that checks whether the data is valid isn't the same one that's fetching it. Hard to give a good example when we haven't gone outside the domain of command-line applications yet (which we will at the end of this series), but `safe_getnum` with a specific acceptable number range could've been written like this:
```
def safe_getnum(prompt, min, max):
    num = int(input(prompt))
    if not (min < num > max):
        raise ValueError('The number has to be between ' + str(min) + ' and ' + str(max))

rating = get_number("How many stars do you give it?", 1, 5)
```
And this way trying to get the rating would crash if they entered an invalid number of stars. And yes, you can raise normal error types with custom messages like that. I could also have just done `raise ValueError`, without even the parentheses, but then it wouldn't show a useful message to tell me what was wrong with the value.

Here's a real-world example: in the Javascript (code that runs in the browser) on my website, the function that gets called when you try to post a comment raises an error if it gets a response from the server telling it it didn't succeed (which isn't inherently considered an error in Javascript). In Javascript the keyword is `throw` instead of `raise`, but it's the same concept. This lets the calling function look like (it's not literally like this):
```
# Read the name and comment the user entered.
name = read_comment_name_box()
body = read_comment_text_box()
send_network_request("POST_COMMENT", name, body)
show_notification("comment posted successfully")
```
while `send_network_request`, paraphrased, looks like:
```
def send_network_request(request_type, *parameters):
    response_code = send_to_server(request_type, *parameters)
    if response_code != 200: # 200 means OK
        raise ValueError("Server sent failure code: " + str(response_code))
```
And so if it gets an unsuccessful response code, the exception, since it's not caught, will stop the first function in its tracks and it won't show you the success message. It's useful to have the error-handling done inside `send_network_request` because that's the same function that's used in a dozen other places, and this way the error-handling only has to exist in one place. Otherwise, every place that called it would have to duplicate the code checking if it was successful.

Sometimes you use `except`...`raise` when you do want to raise the error, but want to do something first. For example:
```
def 3_phase_plan():
    phase1()
    try:
        phase2()
    except:
        contigency_plan()
        # Just 'raise' by itself will re-raise the
        # caught exception if you're in an except clause.
        raise
    phase3()
```
If I did this, an error in `phase2` will execute `contingency_plan()`, but then cause the `3_phase_plan` function to raise the error again, as if it hadn't been caught. This way, code that calls `3_phase_plan` could know if an error happened, and do its own `try`...`except` stuff, but not have to manually worry about the need to call `contingency_plan`.

In fact, my comment Javascript kind of does this too. The function that sends requests to the server catches any errors during transmission (things like network outage *are* considered errors in Javascript, while an unsuccessful response code is not), and if it gets one - or an unsuccessful response code - then it shows the user a friendly error message, and then throws the exception upward so that the caller (the function that called `send_network_request`) doesn't continue. (It has to do all that because in Javascript running in a browser, errors don't get shown to the user by default, only logged to the developer console. But the user should definitely see a message if their comment can't post.)

# `try`, `except`, `else`

When you have a `try` followed by one or more `except` clauses, you can put an `else` clause after it, and it'll execute if there were no exceptions. This is different from just putting the code after the whole `try`/`except` block, because code in the `else` clause won't execute if there was an exception, but it was caught safely by an `except` clause. Code after the whole error-handling block would.
```
try:
    num = int(input("enter a number:"))
except TypeError:
    print("That's not a number.")
else:
    print("Thanks for entering the number", num)
print("Regardless of whether you entered a number or not, thanks for your visit.")
```

# `finally`

`finally` can be used kind of like `else` here, except it executes no matter what. It'll execute if everything worked, or if one of the `except` clauses was executed, or if there was an uncaught exception. It even executes on the way out if one of the clauses executes a `return` statement. Let's imagine we want to do something that involves creating a temporary file, and we want to make sure we don't leave the file existing when we're done:
```
try:
    create_temp_file()
    do_something()
except Exception as e:
    print("The following error ocurred:", e)
else:
    print("Everything worked")
finally:
    remove_temp_file()
```
This makes sure we always remove our temporary file at the end, whether an error occurs or not.

# I/O and files

Up to this point, even after learning randomness, you haven't had any way to keep anything persistent. You wouldn't have been able to, for example, store the high scores somewhere in the score reporter program so the players wouldn't have to re-enter all their scores when they got a new one to see what the new stats were. Now it's time to learn how to save things persistently, by using text files.

`open` is the basic function we need:
```
# the 'w' means that we're opening it for writing. I'll explain more about that later.
file = open("notes.txt", 'w')
file.write("This is a test note. It'll still be in the file after the program ends.")
```
If you run this, you'll notice the file `notes.txt` was created and has the text we wrote to it. It's just a text file, completely independent of the program now.

So if we want to open it later for reading:
```
# the 'r' is default, so we didn't need to specify it, but I'm showing it for clarity.
file = open('notes.txt', 'r')
print("the file contained:")
print(file.read())
```

File I/O is a very good time to use `try` and `except`, because dealing with external stuff is one of the most likely places to get an exception. You'll get an exception if you try to read from a file that doesn't exist, for example, or if you're running without administrator privileges and don't have access to the file.

## File access modes

There's a lot more to those `'r'` and `'w'` flags we're passing to `open`. The `'w'` mode actually *truncates* the file (empties it) just by opening it, even before you write anything. If you want to open a file and not wipe out everything already in it, you need the `'a'` mode, for *append*.

If you want to open it so you can both read and write, it's `r+`, or `a+` for read and append.

Also, all of this only works for text files. For reading and writing binary files (such as audio, images, compiled executables, database dumps to name a few), you need to add `b` after the letter for the mode. But don't worry too much about that because it's related to the `bytes` type, which is different from `str`, and which I'll put off until a few chapters later because it's not that essential for now.

## Other reading and writing methods

There are other ways to read and write to files besides doing it all at once. the `read` method has an optional parameter; if you pass a number, it'll read at most that many characters and then stop. You can read more characters from the file later on and they'll be read from the position you left off at. (A possible use case that comes to mind is if you're going to read a file that might be massive, and don't want your program to lag as it loads it the whole thing upfront.)
```
file = open('notes.txt', 'r')
print(file.read(5)) # prints only the first 5 characters in the file
print(file.read(5)) # prints the next 5
```
Reading more characters than the file has will just return empty. So if there are 8 characters in a file and you read the first five and ask to read five more, you'll just get the last three.

You can read more about the possible modes of opening [in the online Python docs](https://docs.python.org/3/library/functions.html#open).

There are also more interesting methods for reading and writing. `readline` reads until a newline (but you can also pass it a maximum number of characters to read). `readlines` reads all of the lines in a file and returns them as a list. `writelines` takes a list of strings and writes them all as lines. (Also, the writing methods return the number of bytes written.) You can try those out if you want.

# Closing files

When you open a file, you should make sure you close it when you're done. Leaving files open can cause [memory leaks](https://en.wikipedia.org/wiki/Memory_leak) in long-running programs, and files opened for writing aren't guaranteed to *actually* write their data as soon as you call `file.write` - sometimes the data is "buffered" and only synchronized with the hard drive every few minutes. It depends a lot on your operating system and stuff. Closing the file ensures the data has been written. Python might automatically close files when your reference to the them (your variable named `file` or whatever) goes out of scope (eg. the function it was defined in returns), but you can't rely on this. Here's how to close a file properly:
```
file = open('notes.txt', 'w')
file.write("note")
file.close()
```
And after that, `file` is closed and can't be used, but you can open it again with another `file = open(...` if you have more stuff to write.

# `repr` and `eval`

For the project I'm going to suggest, there are two functions that'll be incredibly useful. `repr` is for 'representation' and returns a string that represents whatever you pass it. You know how at the interactive prompt you can just enter `var` and it'll show you what `var` is, but it's not exactly the same as `print(var)` (mostly with strings)? `repr` is the interactive prompt behavior. This is useful because...

`eval` is the inverse of `repr`. `eval` take a string and returns the Python object that the string describes. Here are examples:
```
>>> nums = eval('[1, 2, 3, 4]')
>>> nums
[1, 2, 3, 4]
>>> nums[2]
3
>>> spanish = eval("{'casa': 'house', 'hola': 'hello', 'si': 'yes'}")
>>> spanish['si']
'yes'
```
You can use `repr` to convert Python objects to strings and be able to reliably convert them back with `eval`. If you're clever, you might be guessing where this is going.

# Persistent score tracker!

Try modifying the score reporter program so it can save the scores to a text file. When you run the program, you should be able to load the scores you told it last time, see the stats on them, edit/add scores and save the changes, or clear them all. The program should print meaningful error messages whenever something goes wrong; under no circumstances should it crash. (The addition of functions will have made this a lot easier.)

Preferably do it without catching all exception types. If you're not sure which ones you need to catch, try causing every failure condition you can think of besides `NameError` - delete the file before trying to load, edit the file to have invalid data, etc. That will tell you the names of the exception types you want to catch.

<expand-note closedtext="Show solution" opentext="Hide solution">

```
import util

menu = """Menu:

1 - Load scores from a file.
2 - View all loaded scores.
3 - Show statistics.
4 - Edit scores.
5 - Save scores to a file.
6 - Quit.
"""

scores = {}
unsaved_changes = False

# For now, there's a constnat filename, but we're using a variable
# for it so it's all in one place.
SAVE_FILE = "scores.txt"

print("Welcome to ScoreTracker 2.0!", menu)

def load_scores():
    # This is the only one that needs to declare scores as global,
    # because it's the only one that needs to assign to the name.
    global scores, unsaved_changes
    # Make file None so that we won't get a NameError
    # later on if it fails to open.
    file = None
    try:
        file = open(SAVE_FILE)
        raw = file.read()
        if not raw:
            # Since print returns None, returning the result
            # of print is the same as just 'return'.
            return print("There were no scores saved.")
        scores = eval(raw)
    except (OSError, SyntaxError) as e:
        print("Error when loading scores:", e)
    else:
        print("Scores loaded successfully.")
        # If we just loaded scores, there are no unsaved changes.
        unsaved_changes = False
    finally:
        # Don't try to close the file if it's None
        # (meaning we never opened it). That would
        # raise another error.
        if file: file.close()

def save_scores():
    global unsaved_changes # Need to be able to change this globally.
    file = None
    try:
        file = open(SAVE_FILE, 'w')
        file.write(repr(scores))
        unsaved_changes = True
    except (OSError, SyntaxError) as e:
        print("Error when saving scores:", e)
    else:
        print("Scores saved successfully.")
        unsaved_changes = False
    finally:
        if file: file.close()

def show_scores():
    # Don't just show nothing if there are no scores.
    if not scores:
        return print("No scores yet.")
    for player in scores:
        # This trick with repr gets the list representation as a string,
        # and then strips the brackets so it looks good.
        print(player + "'s scores:", repr(scores[player])[1:-1])

def show_stats():
    grand_max = {'name': '', 'score': 0}
    for player in scores:
        # If this player has a higher score than the highest we've found yet,
        # make them the new highest.
        if max(scores[player]) > grand_max['score']:
            grand_max = {'name': player, 'score': max(scores[player])}
    print("The highest score ever was", grand_max['score'], 'by', grand_max['name'], '\n')
    # This time I'm making it a list of tuples of (playername, average),
    # since we need to sort it, and dicts don't have a .sort method.
    averages = []
    for player in scores:
        averages.append((player, sum(scores[player]) / len(scores[player])))
    averages.sort(reverse = True)
    print("Averages:")
    for data in averages:
        print('\t' + data[0] + ":", data[1])

def edit_scores():
    global unsaved_changes # Need to be able to change this globally.
    player = input("Enter a player name to edit: ")
    if player in scores:
        print("The scores for " + player + " are currently:", repr(scores[player])[1:-1])
    else:
        print("There are currently no scores for " + player + ".")
        if not util.ask_bool("Start them with an empty list?"):
            return print("Canceling.")
        scores[player] = []
        unsaved_changes = True
    while True:
        try:
            score = input("Enter a score to add, or blank to stop: ")
            if not score: break
            score = int(score)
        except ValueError:
            print("That's not a valid score.")
        scores[player].append(score)
        unsaved_changes = True
        print("Added score " + str(score) + ".")
    print('\n' + player + "'s scores are now:", repr(scores[player])[1:-1])

while True:
    entry = input("\nYour choice: ")
    print()
    # No need to convert it to a number here because we're not doing math.
    if entry == '1': load_scores()
    elif entry == '2': show_scores()
    elif entry == '3': show_stats()
    elif entry == '4': edit_scores()
    elif entry == '5': save_scores()
    elif entry == '6':
        if unsaved_changes and not util.ask_bool('Are you sure? You have unsaved changes.'):
            continue
        break
    else:
        print("Not a valid entry.\n" + menu)
```

</expand-note>

[Next lesson: Classes](pythontut7)
