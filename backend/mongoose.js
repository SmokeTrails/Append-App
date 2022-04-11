    
    const mongoose = require('mongoose')

	const DB = 'REMOVED CONNECTION STRING';
    /* Connnect to our database */
    // Get the URI of the local database, or the one specified on deployment.
    
	//{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    mongoose.connect(DB)
        .then(()=>{
            console.log('Connection Successful')
        })
        .catch((error) => { 
			console.log(error)
            console.log('Error connecting to mongoose.') 
        });
    
    module.exports = { mongoose }  // Export the active connection.
