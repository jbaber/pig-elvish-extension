var currentTab;

browser.contextMenus.create({
  id: "pig-elvish",
  title: "Pig-Elvish this page"
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "pig-elvish") {
    browser.tabs.executeScript({
      file: "pig-elvish.js"
    });
  }
});
