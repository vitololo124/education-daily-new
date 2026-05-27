import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,

  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"

});

async function generateDailyReport() {

  console.log("开始生成教育行业日报...");

  const prompt = `
请生成一份中国教育行业日报。

返回 JSON 格式。

包括：

1. summary（3条摘要）
2. signals（3条趋势）
3. news（5条新闻）

每条新闻包括：

- category
- source
- title
- desc
- impact

JSON格式：

{
  "summary": [],
  "signals": [],
  "news": []
}

只返回 JSON。
`;

  try {

    const response = await client.chat.completions.create({

      model: "qwen-turbo",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.7

    });

    const text = response.choices[0].message.content;

    console.log("AI 返回内容：");

    console.log(text);

    fs.writeFileSync(
      "./data/latest.json",
      text
    );

    console.log("日报生成成功");

  } catch (error) {

    console.error("生成失败：");

    console.error(error);

  }

}

generateDailyReport();