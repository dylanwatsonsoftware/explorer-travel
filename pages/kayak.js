const osmosis = require('osmosis');
osmosis.config('keep_data', true)

function Kayak() {

}

Kayak.prototype.search = function (src) {
    return new Promise(async (resolve, reject) => {
        osmosis
            // TODO: Use https://www.kayak.com.au/s/horizon/exploreapi?airport=PER&v=1&initLoad=false
            //           https://www.kayak.com.au/s/horizon/exploreapi?airport=PER&v=1&exactDates=true&depart=20180405&return=20180412
            .get(`https://www.kayak.com.au/explore/${src}`) // Set the cookie (Maybe an easier way?)
            .get(`https://www.kayak.com.au/s/horizon/exploreapi?airport=${src}&v=1&initLoad=false`)
            .then((context, data, next) => {
                resolve(JSON.parse(context.response.data));
            })
            .error(function (msg) {
                reject(msg);
            })
            .done();
    });
}

module.exports = new Kayak()