async function loadDailyData() {

  const response = await fetch("./data/latest.json");

  const dailyData = await response.json();




  // 摘要

  const summaryContainer = document.getElementById("summary-container");

  dailyData.summary.forEach(item => {

    const div = document.createElement("div");

    div.className = "summary-item";

    div.innerHTML = `• ${item}`;

    summaryContainer.appendChild(div);

  });




  // Signal

  const signalContainer = document.getElementById("signal-container");

  dailyData.signals.forEach(item => {

    const card = document.createElement("div");

    card.className = "signal-card";

    card.innerHTML = `
    
      <h3>${item}</h3>

    `;

    signalContainer.appendChild(card);

  });




  // 新闻

  const newsContainer = document.getElementById("news-container");

  dailyData.news.forEach(item => {

    const card = document.createElement("div");

    card.className = "news-card";

    card.innerHTML = `
    
      <div class="news-top">

        <div class="news-tag">
          ${item.category}
        </div>

        <div class="news-source">
          ${item.source}
        </div>

      </div>

      <h3>${item.title}</h3>

      <p>${item.desc}</p>

      <div class="impact">
        影响：${item.impact}
      </div>

    `;

    newsContainer.appendChild(card);

  });

}

loadDailyData();