// @ts-nocheck

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;
let cachedDb = null;

function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  if (cachedDb) {
    return cachedDb;
  } else {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      client = new MongoClient(uri, options);
      // @ts-ignore
      if (!global._mongoClientPromise) {
        // @ts-ignore
        global._mongoClientPromise = client.connect();
        cachedDb = client.db("myWay");
        return cachedDb;
      }
      // @ts-ignore
      clientPromise = global._mongoClientPromise;
      cachedDb = client.db("myWay");
      return cachedDb;
    } else {
      // In production mode, it's best to not use a global variable.
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
      cachedDb = client.db("myWay");

      return cachedDb;
    }
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default connectToDatabase;
