from nltk.corpus import gutenberg
from nltk import Text


gutenberg_fileids = gutenberg.fileids()
print(gutenberg_fileids)

emma = gutenberg.words('austen-emma.txt')
print(len(emma))

emma_text = Text(emma)
print(emma_text.concordance("surprize"))
