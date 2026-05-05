# lets-recite

## 介绍

用背单词的思路来背东西！背诵自检学习工具，持续更新中。

你可以用它背思政，背历史……

项目地址https://www.565455.xyz/projects/lets-recite/

备用https://g.565455.xyz/lets-recite/

```txt
.
├── assets # 静态资源
│   ├── catalog.js
│   ├── common.css
│   ├── defa.js
│   └── dftts.js
├── books # 图书列表
│   ├── books.js # 图书表
│   ├── defa2023.json
│   ├── jgdj.json
│   ├── szbook.json
│   ├── szqt.json
│   └── szzy.json
├── catalog.html # 全览
├── index.html # 主页
├── LICENSE
└── README.md
```

## 数据来源

### 要求

欢迎提交pr在/books目录下新增书目，格式如下

```json
{
  "bookName": "书名",
  "data": [
    {
      "id": 1,
      "question": "第一题",
      "answer": "答案；如果有分点，每个分点后面最好有分号或者句号，会自动解析。"
    },
    {
      "id": 2,
      "question": "第二题",
      "answer": "像这样；这样；这样的。"
    }
  ]
}
```

### 致谢

szzy.json数据来自kangkang

szqt.json数据来自lft

## 项目

FANCC @2026

5月重构第一轮
