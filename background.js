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