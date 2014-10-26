
/* JavaScript content from js/myfunctions.js in folder common */
// METHOD FOR LOGGING EVENTS IN THE DIV-LOGGER
function mylog(thisevent) {
	var currentdate = new Date();
	var datetime = currentdate.getHours() + ":" + currentdate.getMinutes()
			+ ":" + currentdate.getSeconds();

	var outputtext = mylogarea.innerHTML + "<br/>" + datetime + " " + thisevent;
	mylogarea.innerHTML = outputtext;
	console.log(thisevent);
	mylogarea.scrollTop = mylogarea.scrollHeight;
}

//INITIATE THE DATABASE WHEN THE LOAD IS READY
function onBodyLoad() {
	document.addEventListener("deviceready", myinitdb, false);
}

// METHOD FOR INITIALISING THE JSONSTORE
function myinitdb() {
	// Sets up the table/collection with the search fields
	var collections = {
		mycustomers : {
			searchFields : {
				"name" : "string"
			},
			adapter : {
				name : 'customerAdapter',
				replace : '',
				remove : '',
				add : 'addCustomerAdapter',
				load : {
					procedure : 'getCustomerAdapter',
					params : [],
					key : 'mycustomers'
				},
				accept : function(data) {
					return (data.status === 200);
				}
			}
		}

	};

	// This sets up the options - don't know why
	var options = { // all optional
	// username: 'carlos', //default: 'jsonstore'
	// password: '123' //default: no encryption
	};

	// INITIATE THE DATABASE TABLES
	mylog("Initialising database");

	// This actually creates and/or initiates the table with the specified
	// collection and options
	WL.JSONStore.init(collections, options).then(function(res) {
		mylog("Database initialised");
	}).fail(function(errobject) {
		WL.Logger.debug(errobject.toString());
		mylog("Error creating Table...");
	});
}



// THIS FUNCTION REMOVED THE TABLE IF IT ALREADY EXISTS - required if the table
// has to be recreated.
function myremovetable() {
	mylog("Removing Table...");
	WL.JSONStore.get('mycustomers').removeCollection().then(function(res) {
		mylog("Table removed");
	}).fail(function(errobject) {
		WL.Logger.debug(errobject.toString());
		mylog("Error removing table...");
	});
}

// FUNCTON TO ADD DATA TO JSONSTORE
function myadddata() {

	mylog("Start adding data");

	WL.JSONStore.get('mycustomers').add({
		name : mytextbox.value
	}).then(function(res) {
		mylog("Finished adding data " + mytextbox.value);
	}).fail(function(errobject) {
		mylog("Error adding data " + errobject.toString());
	});

}

// FUNCTION TO DISPLAY THE DATA FROM JSON STORE
function mydisplaydata() {

	mylog("Starting displaying data");

	WL.JSONStore.get('mycustomers').findAll().then(function(resall) {
		for (var index = 0; index < resall.length; ++index) {
			mylog(JSON.stringify(resall[index].json));
		}
		mylog("Finished displaying all data");
	}).fail(function(errobject) {
		mylog("Error displaying all data " + errobject.toString());
	});

}

// THIS IS THE METHOD FOR QUERY DATA

function mydisplayquerydata() {

	mylog("Starting displaying query data");

	var query = {
		name : mysearchbox.value
	};

	var queryoptions = {
		exact : false,
		limit : 10
	};

	WL.JSONStore.get('mycustomers').find(query, queryoptions).then(
			function(resquery) {
				for (var index = 0; index < resquery.length; ++index) {
					mylog(JSON.stringify(resquery[index].json));
				}
				mylog("Finished displaying query data");
			}).fail(function(errobject) {
		mylog("Error displaying query data " + errobject.toString());
	});

}

function myinvokeadapter() {
	mylog("Invoking Adapter");
	
		var invocationData = {
		        adapter : 'myfirstadapter',
		        procedure : 'mynames',
		        parameters : []
		    };

		WL.Client.invokeProcedure(invocationData,{
		    onSuccess : getDataSuccess,
		    onFailure : getDataFailure,
		});
	
}

function getDataSuccess(result){
// Response object is
//	{"status":200,
//	 "invocationContext":null,
//	 "invocationResult":
//			{
//			 "responseID":"21",
//		   	 "isSuccessful":true,
//			 "name":"pete1"
//			}
//	}
	mylog("Feed retrieve success:"+JSON.stringify(result.invocationResult.name));
}

function getDataFailure(result){
    mylog("Feed retrieve failure");

}