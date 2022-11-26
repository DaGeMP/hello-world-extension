chrome.runtime.sendMessage({greeting: "Hello"}, function(message) {
    const searchBoxes = document.getElementsByClassName("gLFyf");
    searchBoxes[0].value = message.response;
});
