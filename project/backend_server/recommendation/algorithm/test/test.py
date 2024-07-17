from transformers import BertTokenizer, BertModel
import torch

def get_sentence_embedding(sentence):
    # 加载预训练的BERT模型和分词器
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')

    # 对输入文本进行分词和编码
    inputs = tokenizer(sentence, return_tensors='pt')

    # 获取BERT的输出
    with torch.no_grad():
        outputs = model(**inputs)

    # 获取句子的表示（[CLS]标记的输出）
    sentence_embedding = outputs.last_hidden_state[:, 0, :].squeeze()

    return sentence_embedding

# 示例句子
sentence = "I love machine learning."
sentence = "I like deep learning."


# 获取句子的向量表示
embedding = get_sentence_embedding(sentence)


# 打印向量
print("Sentence Embedding:")
print(embedding)
