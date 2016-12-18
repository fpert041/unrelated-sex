$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "porn-data.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});


var pornDataArray = [[],[],[],[]];

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                //tarr.push(headers[j]+":"+data[j]);
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }

	// Generate arrays to store concepts and urls
    numColumns = lines[0].length;
    var urls = [];
    var concepts = [];
    for (i=0; i< numColumns / 2; i++){
		urls.push([]);
		concepts.push([]);
	}
    for (var l=0; l<lines.length; l++) {
		for (var i=0; i<numColumns/2; i++) {
			// Store URLs
			var urlValue = lines[l][i * 2]
			if (!isEmpty(urlValue)) {
				urls[i].push(urlValue);
			}
			// Store Concepts
			var conceptValue = lines[l][(i * 2) + 1];
			if (!isEmpty(conceptValue)) {
				concepts[i].push(conceptValue);
			}
		}
	}
	//urlDataArray = urls;
	//conceptDataArray = concepts;
	
	for (i=0; i<numColumns/2; i++) {
		for (u=0; u < urls[i].length; u++) {
			pornDataArray[i].push({"url": urls[i][u], "concepts" : []});
			for (c=0; c<concepts.length; c++) {
				pornDataArray[i][u]["concepts"].push(
				{"id" : concepts[i][c], "value" : "true"});
			}
		}
	}
	//console.log(pornDataArray);
	document.write(JSON.stringify(pornDataArray[3]));
}

function isEmpty(str) {
    return (!str || 0 === str.length || str == '"');
}
