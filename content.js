// document.body.style.backgroundColor = "orange";
(async () => {
    // const module = await import('./module.js');
    console.log("initializing extension");

    let isButtonAdded = false;


    function shouldAddButton(actionsArea) {
        const buttons = actionsArea.querySelectorAll("button");
        const hasTryAgainButton = Array.from(buttons).some((button) => {
            return !button.id?.includes("download");
        });
        if (buttons.length === 1) {
            return true;
        }
        return false;
    }

    const init = async e => {
        if(window.buttonsInterval) {
            clearInterval(window.buttonsInterval);
        }
        window.buttonsInterval = setInterval(() => {
            const actionsArea = document.querySelector("form>div");
            if(!actionsArea)
                return;
            // let RegenerateButton = actionsArea.querySelector("button");
            if(/*RegenerateButton && */shouldAddButton(actionsArea)) {
                const downloadButton = document.createElement("button");
                downloadButton.id = 'download-button';
                downloadButton.setAttribute("share-ext", "true");
                downloadButton.innerText = "Download PDF";
                downloadButton.onclick = () => {
                    var divContents = document.getElementById("__next").innerHTML;
                    var printWindow = window.open('', '', 'height=400,width=800');
                    printWindow.document.write('<html><head><title>DIV Contents</title>');
                    printWindow.document.write('</head><body >');
                    printWindow.document.write(divContents);
                    printWindow.document.write('</body></html>');
                    var rmElems = printWindow.document.querySelectorAll("button");
                    var rm_array = [...rmElems]; // converts NodeList to Array
                    rm_array.forEach(div => {
                        div.parentNode.removeChild(div);
                    });
                    var nlElems = printWindow.document.querySelectorAll("div>span>span")
                    setTimeout (() => {
                        printWindow.document.close();
                        printWindow.print();
                        printWindow.close();
                    },200);
                }
                actionsArea.appendChild(downloadButton);
            }
        }, 200);
    }

    if(document.readyState === "complete" || document.readyState === "interactive") {
        init();
    } else {
        document.addEventListener("DOMContentLoaded", init);
    }

    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'Hello from the background script') {
        console.log('Received message from the background script');
        isButtonAdded = false;
        init();
        sendResponse({ message: 'Hello from the content script' });  // Send a response back to the background script
        }
    }
    );

// Use the module here
})();

