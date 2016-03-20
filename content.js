chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var data = '';
	if(request == 'getAllLinks') {
		var theLinks = document.links;
		for(var i=0; i<theLinks.length; i++) {
         if(theLinks[i].href.indexOf('javascript:') == -1) data += theLinks[i].href + '\n';
		}
	} else if(request == 'getTextLinks') {
		var theText = document.body.textContent.toString();
		var theMatch = theText.match(/(http[^\s]*)/g);
		for(var i=0; i<theMatch.length; i++) {
			data += theMatch[i] + '\n';
		}
	} else if (request == 'getSelectionLinks') {
	    var theLinks = document.links;
	    for (var i = 0; i < theLinks.length; i++) {
	        if (document.getSelection().containsNode(theLinks[i], true) && theLinks[i].href.indexOf('javascript:') == -1) {
	            data += theLinks[i].href + '\n';
	        }
	    }
	} else if(request == 'getTextLinksSelection') {
		var theText = window.getSelection().toString();
		var theMatch = theText.match(/(http[^\s]*)/g);
      if(theMatch)
         for(var i=0; i<theMatch.length; i++) {
            data += theMatch[i] + '\n';
         }
	}
   //alert(data);
	sendResponse(data);
});