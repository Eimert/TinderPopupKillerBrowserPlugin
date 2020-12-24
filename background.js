// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action button.
// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.executeScript({
//     file: 'content.js'
//   });
// });

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if( request.message === "open_max_url" ) {
      fullURL = "http://" + request.url;
      chrome.tabs.create({"url": fullURL, "active": false});
    }
  }
);