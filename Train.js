var Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'wqNCXgvoREAAZifnifES35QMcKvVCztV3r-wr_wf',
  'b9TdaV3FccAVvL3tpI2aqGqzEJv3eA3jnGDtsF2B'
);


var modelID = "cazzok";

app.inputs.create({
    url: "https://samples.clarifai.com/puppy.jpeg",
    concepts: [
      {
        id: "boscoe",
        value: true
      }
    ]
 });

app.models.delete(
    	modelID.toString());


app.models.create(
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


	app.models.train(modelID.toString()).then(
	    function(response) {
	      console.log(response);
	      console.log("TRAINED!");
	      predicting();
	    },
	    function(err) {
	    	//console.error(err);
	    	console.log("SLACKING");
	    }
	  );


//this gets called before the model finishes training

app.models.predict(modelID.toString(), ["http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg"]).then(
    function(response) {
      console.log(response);
      console.log("ANSWERED");
    },
    function(err) {
      	console.error(err);
    	console.log("CANNOTTALK");
    }
  );


  

