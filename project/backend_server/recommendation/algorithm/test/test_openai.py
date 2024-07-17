# python3
# please install OpenAI SDK first: `pip3 install openai`
from openai import OpenAI
import json

client = OpenAI(api_key="sk-22e65dae61bd4b238809abd0280162e5", base_url="https://api.deepseek.com")

with open("model_questionnaire.json", "r") as f:
    questionnaire = f.read()
    
with open("text.txt", "r") as f:
    text = f.read()
    
content = '问卷内容：' + questionnaire + '\n\n' + '文本内容：' + text

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "你是一个根据JSON格式转换文本的助手，我会给你一个问卷的JSON格式文件，然后输入一段文字，请你把文字转换成问卷的答案，然后用JSON返回给我（请直接返回JSON格式{id:number, answer:string}）"},
        {"role": "user", "content": content},
    ],
    stream=False
)
response = response.choices[0].message.content
response = '\n'.join(response.splitlines()[1:-1])
response = json.loads(response)
print(response)