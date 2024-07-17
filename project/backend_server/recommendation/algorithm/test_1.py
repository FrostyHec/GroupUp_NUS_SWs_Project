from transformers import BertTokenizer, BertModel
import torch
import torch.nn.functional as F

def get_sentence_embedding(sentence, model, tokenizer, device):
    # 对输入文本进行分词和编码
    inputs = tokenizer(sentence, return_tensors='pt', padding=True, truncation=True).to(device)
    
    # 获取BERT的输出
    with torch.no_grad():
        outputs = model(**inputs)
    
    # 获取句子的表示（[CLS]标记的输出）
    sentence_embedding = outputs.last_hidden_state[:, 0, :].squeeze()
    
    return sentence_embedding

def cosine_similarity(embedding1, embedding2):
    # 计算余弦相似度
    cos_sim = F.cosine_similarity(embedding1, embedding2, dim=0)
    return cos_sim.item()

# 检查是否有可用的GPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 加载预训练的BERT模型和分词器
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased').to(device)

# 示例句子
sentence1 = "I love machine learning."
sentence2 = "I hate learning about artificial intelligence."

# 获取句子的向量表示
embedding1 = get_sentence_embedding(sentence1, model, tokenizer, device)
embedding2 = get_sentence_embedding(sentence2, model, tokenizer, device)

# 计算句子相似度
similarity = cosine_similarity(embedding1, embedding2)

# 打印相似度
print(f"Similarity between the sentences: {similarity:.4f}")
