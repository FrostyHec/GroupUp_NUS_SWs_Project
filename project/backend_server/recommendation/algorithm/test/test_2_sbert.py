from sentence_transformers import SentenceTransformer, util
import torch

# 加载预训练的Sentence-BERT模型
model = SentenceTransformer('all-MiniLM-L6-v2')

# 示例句子
sentence1 = "I love music."
sentence2 = "I love piano."

# 获取句子的向量表示
embedding1 = model.encode(sentence1, convert_to_tensor=True)
embedding2 = model.encode(sentence2, convert_to_tensor=True)

# 计算余弦相似度
similarity = util.pytorch_cos_sim(embedding1, embedding2)

# 打印相似度
print(f"Semantic similarity between the sentences: {similarity.item():.4f}")
