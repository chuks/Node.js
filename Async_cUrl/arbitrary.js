/**  
 *  @author  Chuks Onwuneme
 *  @version 1.0
 */

exports.begin = function(num){	
	//call this module with a num argument, which is the number of times the "loop" needs to run

	var async 					= require('async')
		,curl 					= require('node-curl')
		,arbitraryArrayObjs 	= [];

	//setup the object
	for (var i=0; i<num; i++){

		arbitraryArrayObjs.push({
			propNum: i,
			data: null
		});
	} 

	//this async block does the magic ;)
	async.map(arbitraryArrayObjs, processCURL, function(err, results) {
		if (err){
			console.log('Oops...err: '+err);

			throw err;
		}
		else{
			console.log('async completed.');
			console.log('processed results num: '+results.length);

			//the resulting data is contained in results object. Process/consume as you wish
		}
	});

	function processCURL(arbitraryArrayObj, callback){

   		var propNum = arbitraryArrayObjs.propNum;			//arbitrary property
   		var options = arbitraryArrayOptions( propNum );
   		var url 	= 'http://www.blablabla.com'; 			//url of arbitrary web service

  		var another_curl = curl.create(); 		//required, if not will block. This creates a new cUrl session

   		another_curl(url, options, function(err) {
		    if (err){
			
				return callback(err);
			}
			else{
				console.info('data received');
				console.info('curl - status: '+this.status);
				console.info('curl - body: '+this.body);
				console.info('curl - size: '+this.info('SIZE_DOWNLOAD'));
				
				arbitraryArrayObj.data = JSON.parse(this.body); 		//consume /process your data however you wish

				callback(null, arbitraryArrayObj);

				this.close(); //be sure to close each session after using
			}
		});

	}

	function arbitraryArrayOptions(propNum){

		//customize http headers to fit the service requirements.
		var headers = [
        	'Host: www.arbitraryArray.org', 				//host of arbitrary service
        	'Accept-Charset: UTF-8',
        	'Content-Type: application/json',
        	'Authorization: WSSE profile="UsernameToken"',
        	'X-WSSE: blablabla'							
    	];
    
    	//cUrl options. Customize accordingly. For all options, refer to http://curl.haxx.se/libcurl/c/curl_easy_getinfo.html
    	var options = { 
    		HTTPHEADER 		: headers, 
    		TIMEOUT 		: 45,
    		FOLLOWLOCATION 	: 0,
    		SSL_VERIFYPEER 	: 0,
    		SSL_VERIFYHOST 	: 2,
    		FORBID_REUSE 	: 0, 
    		SSLVERSION 		: 3,
    		VERBOSE 		: 1
    	}

    	return options;
    }

}