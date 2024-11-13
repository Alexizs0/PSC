document.getElementById("url-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const url = document.getElementById("url").value;

    // Validate URL input
    if (url) {
        const iframeContainer = document.getElementById("iframe-container");
        iframeContainer.innerHTML = ''; // Clear previous content

        // Fetch the content through the proxy function
        fetch(`/proxy?url=${encodeURIComponent(url)}`)
            .then(response => {
                if (response.ok) {
                    return response.text(); // Return the response text (HTML)
                } else {
                    throw new Error('Failed to fetch the URL');
                }
            })
            .then(data => {
                // Insert the fetched content into the iframe container
                iframeContainer.innerHTML = data;
            })
            .catch(error => {
                // Handle errors (e.g., network issues, invalid URL, etc.)
                iframeContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            });
    } else {
        alert("Please enter a valid URL.");
    }
});
