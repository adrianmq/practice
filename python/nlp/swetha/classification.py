from urllib import request
from collections import defaultdict
from string import punctuation
from heapq import nlargest

import nltk
import numpy as np

from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.neighbors import KNeighborsClassifier
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist


def getAllDoxyDonkeyPosts(url, links):
    response = request.urlopen(url).read().decode('utf8', 'ignore')
    soup = BeautifulSoup(response, 'lxml')
    for a in soup.findAll('a'):
        try:
            url = a['href']
            title = a['title']
            if title == 'Older Posts' and len(links) < 5:
                links.append(url)
                getAllDoxyDonkeyPosts(url, links)
        except:
            title = ''
    return


def getDoxyDonkeyText(testUrl):
    response = request.urlopen(testUrl)
    soup = BeautifulSoup(response)
    mydivs = soup.findAll('div', {'class': 'post-body'})

    posts = []
    for div in mydivs:
        posts += map(lambda p: p.text, div.findAll('li'))
    return posts


blogUrl = "https://doxydonkey.blogspot.com"
links = []
getAllDoxyDonkeyPosts(blogUrl, links)

doxyDonkeyPosts = []
for link in links:
    doxyDonkeyPosts += getDoxyDonkeyText(link)

vectorizer = TfidfVectorizer(max_df=0.5, min_df=2, stop_words='english')
X = vectorizer.fit_transform(doxyDonkeyPosts)
print('X vertorizer transformed', X)

km = KMeans(n_clusters=3, init='k-means++',
            max_iter=100, n_init=1, verbose=True)
km.fit(X)

# array of cluster number assigned to each post
print('km.labels_', km.labels_)
print('numpy unique km.labels_', np.unique(km.labels_, return_counts=True))

text = {}
for i, cluster in enumerate(km.labels_):
    oneDocument = doxyDonkeyPosts[i]
    if cluster not in text.keys():
        text[cluster] = oneDocument
    else:
        text[cluster] += oneDocument

_stopwords = set(stopwords.words('english') + list(punctuation))
keywords = {}
counts = {}
for cluster in range(3):
    word_sent = word_tokenize(text[cluster].lower())
    word_sent = [word for word in word_sent if word not in _stopwords]
    freq = FreqDist(word_sent)
    keywords[cluster] = nlargest(100, freq, key=freq.get)
    counts[cluster] = freq

print('keywords per cluster ', keywords)
print('counts(freq) per cluster ', counts)

unique_keys = {}
for cluster in range(3):
    other_clusters = list(set(range(3)) - set([cluster]))
    keys_other_clusters = set(keywords[other_clusters[0]]).union(
        set(keywords[other_clusters[1]]))
    unique = set(keywords[cluster]) - keys_other_clusters
    unique_keys[cluster] = nlargest(10, unique, key=counts[cluster].get)

print('unique keys per cluster', unique_keys)


"""
    Assigning theme to article
"""
classifier = KNeighborsClassifier(n_neighbors=10)
classifier.fit(X, km.labels_)  # training phase

article = getDoxyDonkeyText(blogUrl)[0]
print(article)

# represent the test article as TF-IDF
test = vectorizer.transform([article])
print(test)

res = classifier.predict(test)  # test phase
print(res)
