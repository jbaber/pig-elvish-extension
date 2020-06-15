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
}


/* Listen for via toolbar button */
browser.browserAction.onClicked.addListener(function() {
  browser.tabs.executeScript({
    file: "pig-elvish.js"
  });
});
