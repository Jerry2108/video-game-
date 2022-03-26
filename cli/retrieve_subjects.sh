#!/bin/sh
# Gets lists of subjects

# Note: there are much easier ways to extact content out of html
# e.g. document.querySelectorAll('.zebra tr td:nth-child(1)');

# A brief explanation of this command for those who are interested:
# 1. Retrieve the handbook page with subjects
# 2. Filter to lines with the token 'subject-link'
# 3. Split by '/', get 3rd column
# 4. Replace tag characters in the middle, replace > at the end, replace &amp; with &, and capitalise subject code
curl https://handbook.unimelb.edu.au/components/b-sci-infspc-1/course-structure | grep "subject-link" | cut -d'/' -f3 | sed -e 's/">/ /' -e 's/.$//' -e 's/&amp;/\&/' -e 's/\([a-z]*\)/\U\1/' > subjects
