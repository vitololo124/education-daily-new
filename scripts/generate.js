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

  // 当前时间
  const now = new Date();

  const today = now.toISOString().split("T")[0];

  const generatedAt = now.toLocaleString("zh-CN");

  const prompt = `

请生成一份中国教育行业日报。

要求：

1. 返回 JSON 格式
2. 不要输出 markdown
3. 不要输出解释文字
4. 只返回 JSON

包括：

1. title
2. summary（3条摘要）
3. signals（3条趋势）
4. news（10条重点新闻）

每条新闻包括：

- category
- source
- title
- desc
- impact
- link

要求：

1. 新闻必须像真实行业新闻
2. link 必须是完整 https 链接
3. 内容偏教育行业、AI教育、职业教育、教育政策、教育科技

JSON格式：

{
  "title": "",
  "summary": [],
  "signals": [],
  "news": []
}

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

    // 转 JSON
    const jsonData = JSON.parse(text);

    // 增加日期
    jsonData.date = today;

    // 增加更新时间
    jsonData.generatedAt = generatedAt;

    // 保存 latest.json
    fs.writeFileSync(

      "./data/latest.json",

      JSON.stringify(jsonData, null, 2),

      "utf-8"

    );

    // 历史归档
    fs.writeFileSync(

      `./data/${today}.json`,

      JSON.stringify(jsonData, null, 2),

      "utf-8"

    );

    console.log("日报生成成功");

  } catch (error) {

    console.error("生成失败：");

    console.error(error);

  }

}

generateDailyReport();