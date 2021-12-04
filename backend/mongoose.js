   const mongoose = require('mongoose')

   const DB = "mongodb+srv://team51:54321@cluster0.dsirf.mongodb.net/team51?retryWrites=true&w=majority"
   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   //const mongoURI = process.env.MONGODB_URI || 
   
   mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>{
        console.log('Connection Successful')
    })
    .catch((error) => { 
        console.log('Error connecting to mongoose.') 
    });
   
   module.exports = { mongoose }  // Export the active connection.