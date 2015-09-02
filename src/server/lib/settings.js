/** settings to configure the behaviuor of the application */
module.exports = {
    /** name of the application  */
    name: 'ciclismean',
    /** port where we are listening */
    port: 3030,
    /** url with credentials to connect with mongodb */
    mongoUrl: "mongodb://46.101.187.241:4001/ciclismania",
    /** logging level: debug | production */
    logMode: "debug",
     /** cache mode: off | on */
    cacheMode: "off"
};
