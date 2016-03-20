function onMenuSelected(tab, id) {
	function sendRequestCallbackHandler(response) {
		var data = response;
		chrome.extension.sendMessage({
			command: 'setClipboard',
			data: data
		});
		window.close();
	}

	if(id == 'copyall') {
		chrome.tabs.sendMessage(tab.id, 'getAllLinks', sendRequestCallbackHandler);
	} else if(id == 'copytext') {
		chrome.tabs.sendMessage(tab.id, 'getTextLinks', sendRequestCallbackHandler);
	} else if (id == 'copyselection') {
	    chrome.tabs.sendMessage(tab.id, 'getSelectionLinks', sendRequestCallbackHandler);
	} else if(id == 'copytextselection') {
		chrome.tabs.sendMessage(tab.id, 'getTextLinksSelection', sendRequestCallbackHandler);
	}
}

function setupEventHandlers() {
	document.addEventListener('mouseup', function(ev) {
		chrome.windows.getCurrent(function(w) {
			chrome.tabs.getSelected(w.id, function(t) {
				onMenuSelected(t, ev.target.id);
			});
		});
	}, false);
}

window.addEventListener('load', function() {
		chrome.windows.getCurrent(function(w) {
			chrome.tabs.getSelected(w.id, function(t) {
            if(t.url.indexOf("chrome.google.com/webstore") != -1) {
               // Extensions generally don't work on Google Chrome Webstore!
               document.body.innerHTML = "<h4>Extensions generally won't work on Chrome Webstore due to Google policies. Please go to another page in order to use the extension.</h4>";
            } else {
               setupEventHandlers();
            }
			});
		});
   
}, false);

