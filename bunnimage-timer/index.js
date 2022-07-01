const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
const {BlobServiceClient} = require("@azure/storage-blob")
const account = "noahblobstorage"

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    // create blob & container service client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "bunnimage";
    const blobContainerClient = await blobServiceClient.getContainerClient(deletecontainer);

    for await (const blob of blobContainerClient.listBlobsFlat()) {
        context.log(`Deleting blob name ${blob.name}`);
        
        // a line of code here should access the blob's name and use `deleteBlob()` to delete the blob!
        await blobContainerClient.deleteBlob(blob.name);
    }
    context.log("Just deleted your blobs!")

    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};