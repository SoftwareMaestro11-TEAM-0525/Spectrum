import krwordrank
import json

fname = 'test_data.txt'

def get_texts_scores(fname):
    with open(fname, encoding='utf-8') as f:
        docs = [doc.split('.') for doc in f]
        if not docs:
            return []
        
#         texts = zip(*docs)
#         print(docs)
        return docs.pop()


texts= get_texts_scores(fname)
print(texts)

import sys
sys.path.append('../')
from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize
import krwordrank

wordrank_extractor = KRWordRank(
    min_count = 3, # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 8, # 단어의 최대 길이
    verbose = True
    )

beta = 0.85    # PageRank의 decaying factor beta
max_iter = 10

keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)
for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
    print('%8s:\t%.4f' % (word, r))