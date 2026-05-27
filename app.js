async function loadDailyReport() {

  try {

    const response = await fetch("./data/latest.json");

    const data = await response.json();

    // 标题
    document.getElementById("title").innerText =
      data.title || "Education Daily 教育行业日报";

    // 日期
    document.getElementById("date").innerText =
      data.date || "";

    // 更新时间
    document.getElementById("update-time").innerText =
      `最后更新：${data.generatedAt || ""}`;

    // 摘要
    const summaryContainer =
      document.getElementById("summary");

    summaryContainer.innerHTML = "";

    data.summary.forEach(item => {

      summaryContainer.innerHTML += `

        <div class="summary-card">
          ${item}
        </div>

      `;

    });

    // 趋势信号
    const signalsContainer =
      document.getElementById("signals");

    signalsContainer.innerHTML = "";

    data.signals.forEach(item => {

      // 兼容字符串格式
      if (typeof item === "string") {

        signalsContainer.innerHTML += `

          <div class="signal-card">

            <p>${item}</p>

          </div>

        `;

      } else {

        // 兼容对象格式
        signalsContainer.innerHTML += `

          <div class="signal-card">

            <h3>${item.title}</h3>

            <p>${item.desc}</p>

          </div>

        `;

      }

    });

    // 新闻列表
    const newsContainer =
      document.getElementById("news");

    newsContainer.innerHTML = "";

    data.news.forEach((item, index) => {

      newsContainer.innerHTML += `

        <div class="news-card">

          <div class="news-top">

            <span class="news-rank">
              TOP ${index + 1}
            </span>

            <span class="news-category">
              ${item.category}
            </span>

          </div>

          <h3 class="news-title">

            <a 
              href="${item.link}" 
              target="_blank"
            >
              ${item.title}
            </a>

          </h3>

          <div class="news-source">

            来源：${item.source}

          </div>

          <p class="news-desc">

            ${item.desc}

          </p>

          <div class="news-impact">

            <strong>行业影响：</strong>

            ${item.impact}

          </div>

        </div>

      `;

    });

  } catch (error) {

    console.error("日报加载失败：", error);

  }

}

// 历史归档
async function loadArchives() {

  const archiveList =
    document.getElementById("archive-list");

  if (!archiveList) return;

  const today = new Date();

  for (let i = 0; i < 30; i++) {

    const d = new Date(today);

    d.setDate(today.getDate() - i);

    const year = d.getFullYear();

    const month = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      d.getDate()
    ).padStart(2, "0");

    const dateStr =
      `${year}-${month}-${day}`;

    try {

      const response = await fetch(
        `./data/${dateStr}.json`
      );

      if (response.ok) {

        archiveList.innerHTML += `

          <a 
            class="archive-item"
            href="./data/${dateStr}.json"
            target="_blank"
          >
            ${dateStr}
          </a>

        `;

      }

    } catch (error) {

      console.log("归档不存在：", dateStr);

    }

  }

}

// 初始化
loadDailyReport();

loadArchives();