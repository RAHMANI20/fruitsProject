

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // assert validates our data entry and our connection to the MongoDB database

// Connection URL
const url = 'mongodb://localhost:27017';

//database name
const dbName = 'fruitsDB';

// create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});

// Use connect method to connect to the server
client.connect(function(err){
  assert.equal(null,err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  findDocuments(db,function(){
    client.close();  // we call this method once it's done inserting the documents to close the connection with the database
  });
});

const insertDocuments = function(db,callback){
  //Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff !"
    }
  ], function(err, result){
    assert.equal(err,null); // validate to make sure that there are no errors whene we inserted our document
    assert.equal(3, result.insertedCount); // ensure that we have results tha are inserted into our collection
    assert.equal(3, Object.keys(result.insertedIds).length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db,callback){
  //Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.find({}).toArray(function(err, fruits){
     assert.equal(err,null); 
     console.log("found the following records");
     console.log(fruits);
     callback(fruits);
    });

}
