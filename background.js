chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === 'complete') {
        setTimeout (() => {
            chrome.tabs.sendMessage(
                tabId,  // The ID of the tab to send the message to
                { message: 'Hello from the background script' },  // The message to send
                function(response) {  // Optional callback function to handle the response from the content script
                    console.log(response);
                }
            );
        },2000);

    }
    console.log(changeInfo);
});
  

// receiving a message
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ? 
//             "from content script:" + request.greeting + sender.tab.url:
//             "from the extension");
//         console.log(request.body);
//         if(request.greeting === "hello") {
            
//             sendResponse({farewell: "fuckoff"});
//         }
//     }
// )
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ? 
//             "from content script:" + sender.tab.url:
//             "from the extension");
//         if(request.greeting === "hello") 
//             sendResponse({farewell: "fuckoff"});
//     }
// )