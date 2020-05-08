TITLE Things we still can't do in CSS
NAV Things we still can't do in CSS
TEMPLATE DEFAULT
DESC There are still some layouts that CSS can't do without Javascript adjustment, at least not to the best of my knowledge.

For [all the progress CSS has made](https://eev.ee/blog/2020/02/01/old-css-new-css/), all the thousands of [features](features) it's received, there are still some layouts that CSS can't do without Javascript adjustment, at least not to the best of my knowledge. If you know how to solve the problems I describe without Javascript, please let me know!

# 1: Balanced columns

On my website, category indexes have the structure of a group of subcategory columns. Each subcategory column has an `<h3>` followed by a series of links to articles.

**What I want:** on a sufficiently wide screen, all of the columns display in one row. If the screen gets too narrow to fit them all with a comfortable minimum width, they'll wrap onto a second row, but *the number of colunms per row should stay as balanced as possible*. So if there are 5 columns and a row could fit 4 while respecting the minimum width, it should show 3 columns on top and 2 on bottom. That's the hard part. Everything I try with flexbox or grid can only achieve a 4-1 distribution for this case. So I use ugly Javascript to correct it onresize and onload.

# 2: Image cards bending around an aside

This is using a Javascript fix on my root page.

**What I want:** the image-cards all have the same height, which is just enough to satisfy the one with the longest description, while staying aligned in columns. More importantly, I want the image-cards to bend around the recent-comments panel on a screen where the image-cards are the taller element, as if the recent-comments element is floated. But apparently flexbox doesn't work with floats the way inline content does. And `inline-flex` doesn't seem to behave any different from `flex`.
