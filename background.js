	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request.command == 'setClipboard') {
			var proxy = document.getElementById('clipboard_object');
         //alert(request.data);
			proxy.value = request.data;
			proxy.select();
			document.execCommand('copy');
		}
	});
