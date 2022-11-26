console.log("Loading worker...");
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      "id": "helloWorldContextMenu",
      "title": "Hello World! Context Menu",
      "contexts": ["selection"]
    });
  });

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(() => {
    console.log("Hello World! - Bookmark created :)")
  });

const filter = {
    url: [
      {
        urlMatches: 'https://www.google.com/',
      },
    ],
  };  

chrome.webNavigation.onCompleted.addListener(() => {
    console.info("Hello World! - You've loaded google :)");
  }, filter);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "Hello") {
            sendResponse({response: "World!"});
        }
    }
  );

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['color_changer.js']
        // func: injectedFunction (if you want to inject functions)
    });
});