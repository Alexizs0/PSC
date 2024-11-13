document.getElementById("url-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    const url = document.getElementById("url").value;

    // Validate URL and embed it in an iframe
    if (url) {
        const iframeContainer = document.getElementById("iframe-container");
        iframeContainer.innerHTML = `<iframe src="${url}" width="100%" height="600px"></iframe>`;
    } else {
        alert("Please enter a valid URL.");
    }
});
