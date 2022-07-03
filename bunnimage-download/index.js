const fetch = require('node-fetch')

module.exports = async function (context, req) {
    const blob_url = "noahblobstorage"
    const username = req.headers['username']
    let download = ""
    let downloadpng = "https://" + blob_url + ".blob.core.windows.net/images/" + username + ".png";
    let downloadjpg = "https://" + blob_url + ".blob.core.windows.net/images/" + username + ".jpeg";

    let pngresp = await fetch(downloadpng, {
        method: 'GET',
     })
     let pngdata = await pngresp; // why do we need this?
     
     let jpgresp = await fetch(downloadjpg, {
        method: 'GET',
     })
     let jpgdata = await jpgresp;

    if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." ) {
        success = false;
        context.log("Does not exist: " + pngdata)
        context.log("Does not exist: " + jpgdata)
    } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
        context.log("Does exist: " + pngdata)
    } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
        context.log("Does exist: " + jpgdata)
    }

    context.res = {
        body: {
                 "downloadUri" : download,
                 "success": success,
        }
  };
  context.log(download);
  context.done();
}