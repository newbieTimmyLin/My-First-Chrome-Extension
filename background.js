let active_tab_id = 0;

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        active_tab_id = tab.tabId;
        // Test if the tab is on the site we wish to inject the specific domain
        if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
            chrome.tabs.insertCSS(null, {file: './myStyle.css'});
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('I injected it'))
        }
    })
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'yo check the storage') {
        chrome.tabs.sendMessage(active_tab_id, {message: 'yo I got your message'})

        chrome.storage.local.get("password", value => {
            console.log(value);
        })
    }
})