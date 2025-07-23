async function fetchRedditData() {
  try {
    const res = await fetch('https://www.reddit.com/r/Angular2.json');
    const json = await res.json();
    const posts = json.data.children;
    const container = document.getElementById('feed');

    posts.forEach(post => {
      const data = post.data;

      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <div class="title">${data.title}</div>
        <div class="score">Score: ${data.score}</div>
        <div class="url"><a href="https://www.reddit.com${data.permalink}" target="_blank">View Post</a></div>
        <div class="selftext">${data.selftext_html ? decodeHTMLEntities(data.selftext_html) : '<i>No content</i>'}</div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to fetch Reddit data:', error);
    document.getElementById('feed').innerHTML = "<p>Failed to load data. Please try again later.</p>";
  }
}

function decodeHTMLEntities(text) {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}

fetchRedditData();
