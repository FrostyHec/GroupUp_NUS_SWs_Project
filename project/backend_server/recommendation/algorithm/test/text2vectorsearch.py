import sys
import time

sys.path.append('..')
from text2vec import SentenceModel, cos_sim, semantic_search

embedder = SentenceModel()

# Corpus with example sentences
corpus = [
    '花呗更改绑定银行卡',
    '我什么时候开通了花呗',
    'A man is eating food.',
    'A man is eating a piece of bread.',
    'The girl is carrying a baby.',
    'A man is riding a horse.',
    'A woman is playing violin.',
    'Two men pushed carts through the woods.',
    'A man is riding a white horse on an enclosed ground.',
    'A monkey is playing drums.',
    'A cheetah is running behind its prey.'
]
start_time = time.time()
corpus_embeddings = embedder.encode(corpus)
print("Corpus Embedding Time:", time.time() - start_time)

print("Corpus embeddings:", corpus_embeddings.shape)

# Query sentences:
queries = [
    '如何更换花呗绑定银行卡',
    'A man is eating pasta.',
    'Someone in a gorilla costume is playing a set of drums.',
    'A cheetah chases prey on across a field.']

start_time = time.time()
query_embedding = embedder.encode(queries)
print("Query Embedding Time:", time.time() - start_time)

print("Query embeddings:", query_embedding.shape)
start_time  = time.time()
hits = cos_sim(query_embedding, corpus_embeddings)
print("Semantic Search Time:", time.time() - start_time)
print("\n\n======================\n\n")
print("Query:", queries)
print(hits)

# 返回的是每个Query对应的最相似的5个句子的索引