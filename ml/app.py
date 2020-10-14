from flask import Flask
import krwordrank
import json
app = Flask(__name__)

fname = 'swmaestro.txt'
def get_texts_scores(fname):
    with open(fname, encoding='utf-8') as f:
        docs = [doc.lower().replace('\n','') for doc in f]
        if not docs:
            return []
        
        texts = zip(*docs)
        # print(docs)
        return docs
# with open('words.json') as json_file:
#     json_data = json.load(json_file)
# print(json_data)
@app.route('/')
# @app.route('/ml/keyword', methods=['GET'])
def sentence_extract():

    texts= get_texts_scores(fname)
    # texts=json_data

    # print(texts)

    from krwordrank.word import KRWordRank

    wordrank_extractor = KRWordRank(
        min_count = 2, # 단어의 최소 출현 빈도수 (그래프 생성 시)
        max_length = 30, # 단어의 최대 길이
        verbose = True
        )

    beta = 0.85    # PageRank의 decaying factor beta
    max_iter = 10

    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter, num_keywords=100)

    from krwordrank.sentence import make_vocab_score
    from krwordrank.sentence import MaxScoreTokenizer


    stopwords = {}
    vocab_score = make_vocab_score(keywords, stopwords, scaling=lambda x:1)
    tokenizer = MaxScoreTokenizer(vocab_score)

    from krwordrank.sentence import keysentence

    penalty = lambda x: 0 if 25 <= len(x) <= 80 else 1

    sents = keysentence(
        vocab_score, texts, tokenizer.tokenize,
        penalty=penalty,
        diversity=0.3,
        topk=10
    )

    # for sent in sents:
    #     print(sent)

    from krwordrank.sentence import summarize_with_sentences

    penalty = lambda x:0 if (10 <= len(x) <= 50) else 1
    stopwords = {'잘 부탁드립니다', '부탁드립니다', '잘', '정말', '진짜'}

    keywords, sents = summarize_with_sentences(
        texts,
        penalty = penalty,
        stopwords = stopwords,
        diversity = 0.7,
        num_keywords = 50,
        num_keysents = 10,
        scaling = lambda x:1,
        verbose = False,
    )
    for sent in sents:
        print(sent)
        
    # json으로 변경
    # decode 코드가 주피터에서 안먹긴 하는데, 아마 decode 하면 될거라고 생각
    # print(json.dumps(sents))

    # print('')
    # print(json.dumps(sents, indent=4))
    # print(type(json.dumps(sents)))
    with open('words.json','w',encoding="utf-8") as make_file:
        json.dump(sents,make_file, ensure_ascii=False, indent="\t")
    return 'hello world'
@app.route('/info')
# @app.route('/ml/sentence', methods=['GET'])
def info():
    return 'Info'

