var currentTab;

if (typeof browser !== "undefined") {
  if (typeof browser.contextMenus !== "undefined") {

    /* Create the context menu */
    browser.contextMenus.create({
      id: "pig-elvish",
      title: "Pig-Elvish this page"
    });

    /* Listen for context menu */
    browser.contextMenus.onClicked.addListener(function(info, tab) {
      if (info.menuItemId == "pig-elvish") {
        browser.tabs.executeScript({
          file: "pig-elvish.js"
        });
      }
    });
  }


  /* Listen for via toolbar button (firefox) */
  if (typeof browser.browserAction !== "undefined") {
    browser.browserAction.onClicked.addListener(function() {
      browser.tabs.executeScript({
        file: "pig-elvish.js"
      });
    });
  }

}

/* Listen for via toolbar button (chrome) */
if (typeof chrome !== "undefined") {
  if (typeof chrome.browserAction !== "undefined") {
    chrome.browserAction.setIcon({path: 'icons/elf.png'});
    chrome.browserAction.onClicked.addListener(function(tab) {
      chrome.tabs.executeScript({
        file: "pig-elvish.js"
      });
    });
  }
}
