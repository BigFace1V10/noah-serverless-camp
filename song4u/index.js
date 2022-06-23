const querystring = require('qs');

module.exports = async function (context, req) {
    // return the message I sent
    // const reqbody = req.body
    // context.log(reqbody)

    // filter out the mediaurl i sent
    const queryObject = querystring.parse(req.body);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: queryObject.MediaUrl0
    };
}