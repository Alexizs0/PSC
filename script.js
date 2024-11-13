function loadWebsite() {
    const url = document.getElementById('url').value;
    const proxyUrl = `https://your-python-backend.vercel.app/api/proxy?url=${encodeURIComponent(url)}`;

    fetch(proxyUrl)
      .then(response => response.json())
      .then(data => {
          if (data.html) {
              document.getElementById('content').innerHTML = data.html;
          } else {
              document.getElementById('content').innerText = 'Error: ' + (data.error || 'Failed to fetch content');
          }
      })
      .catch(error => {
          document.getElementById('content').innerText = 'Error: ' + error;
      });
}
