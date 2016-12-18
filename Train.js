//keys.js contains:
/*
 'wqNCXgvoREAAZifnifES35QMcKvVCztV3r-wr_wf',
  'b9TdaV3FccAVvL3tpI2aqGqzEJv3eA3jnGDtsF2B'

  --but it's not being read by this js file
*/

var Clarifai = require('clarifai'); //

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
 	'wqNCXgvoREAAZifnifES35QMcKvVCztV3r-wr_wf',
 	'b9TdaV3FccAVvL3tpI2aqGqzEJv3eA3jnGDtsF2B'
);


var urls = ["http://bilder.markt.de/images/cms/hunde/golden_welpen.jpg", "http://media.indiatimes.in/media/content/2013/Jul/173322885_1375092140_540x540.jpg", "http://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/c0.100.799.799/12501866_1005478302876875_2075905929_n.jpg?ig_cache_key=MTIzMjc3NjM2NjUzMjcwMTU0NQ%3D%3D.2.c"]
var columns  = 4;

var urlObjects = [];
var tags = [];


for (var i = 0; i < urls.length; i++) {
	urlObjects.push(
		{url : urls[i], 
			"concepts": [
			    { "id": "cat", "value": false },
			    { "id": "dog", "value": true }
			]
		});
}

console.log(urlObjects[0].concepts[0].id); //debug


var modelid = "cazzo";
//************************************
//	DEBUGGING CALLS TO WRAPPERS

//if(newModel(modelid));
//if(train(modelid));
predicting("http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg", Clarifai.GENERAL_MODEL);

//************************************
	
/**************************************
	*** Interface wrapper functions ***

	--- newModel(name_of_model)
	--- predicting(image_url, name_of_model)

***************************************/

function newModel(modelID){ //create a new model with images and their IDs
app.models.delete(modelid);// clear medel before starting

var bob  = urlObjects; //this is a dummy object we are using to test --> we would like eventually to retrive data from "Parse.js"

  app.inputs.create({ //create inputs by taking in images and their tags
  		bob
   });


  app.models.create( //create model by associating IDs (tags == concepts) with the model
    modelID.toString(),
    [
      { "id": "boscoe" }
    ]
  ).then(
    function(response) {
      console.log(response);
      console.log("WORKED!");
      training();
    },
    function(err) {
      console.error(err);
      console.log("ERRORRRR");
    }
  );

  return true;
}

function train(modelID){
  app.models.train(modelID.toString()).then( //train model by pairing images (inputs) with concepts of that model (tags)
    function(response) {
      console.log(response);
      console.log("TRAINED!");
      return true;
    },
    function(err) {
    	console.error(err);
    	console.log("SLACKING");
    }
  );
}



//--------------------------------------------------
//if you call this before the model is trained, it won't work! 

function predicting(imageURL, modelID){//associate image with concepts based on chosen model

	//url E.G. - "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg"
app.models.predict(modelID, [imageURL]).then(
    function(response) {
      console.log(response);
      parseResp(response);
      console.log("ANSWERED");
    },
    function(err) {
      	console.error(err);
    	console.log("CANNOTTALK");
    }
  );
}

//helper function for predict -> get html text-box element and fill it with tag values
function parseResp(resp) {
  var tags = [];
  if (resp.statusText  === 'OK') {
    var results = resp.data.outputs[0].data;
    tags = results;
   		//if( tags === undefined ) train('cazzo');
    console.log(tags);  
  } else {
    console.log('Sorry, something is wrong.');
  }

  document.getElementById('output-textarea').value = tags.toString().replace(/,/g, ', ');
  return tags;
}







//------------------------------------


