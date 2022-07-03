const querystring = require("qs")
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {kind: "Hash", paths: ["/secrets"]}
};

module.exports = async function (context, req) {
    
    const queryObject = querystring.parse(req.body);
    let message = queryObject.Body;
    let document = {"message": message}; // create an object with the string `"message"` as the key, and the variable `message` as its value
    let items = await createDocument(document); // call the createDocument function with the document we just made
    let random_value = Math.floor(items.length * Math.random()); // get a random index of item array
    const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[random_value].message)}`
    context.res = {
        body: responseMessage
    };
}

async function createDocument(newItem) {
    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);
    // Make sure Tasks database is already setup. If not, create it.
    await create(client, databaseId, containerId);

    // create new item
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
        query: "SELECT * from c"
        // select the most recent secret
        // query: "SELECT top 1 * FROM c order by c._ts desc" 
    };

    // read all items in the Items container
    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
    // why must we create this here?
    const { resource: createdItem } = await container.items.create(newItem);

    return items;
}

/*
// This script ensures that the database is setup and populated correctly
*/
async function create(client, databaseId, containerId) {
    const partitionKey = config.partitionKey;

    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
        id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);

    /**
     * Create the container if it does not exist
     */
    const { container } = await client
        .database(databaseId)
        .containers.createIfNotExists(
        { id: containerId, partitionKey },
        { offerThroughput: 400 }
        );

    console.log(`Created container:\n${container.id}\n`);
}

