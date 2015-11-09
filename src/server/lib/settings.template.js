/** settings to configure the behaviuor of the application
 * rename to settings.js
 * 
 */
module.exports = {
    /** name of the application  */
    name: 'ciclismean',
    /** port where we are listening */
    port: 3030,
    /** url with credentials to connect with mongodb */
    mongoUrl: "mongodb://your.server:port/example",
    /** logging level: debug | production */
    logMode: "debug",
    /** cache mode: off | on */
    cacheMode: "off",
    /** jwt secret*/
    secret: "ciclismean",
    /** GCM APIkey for push notifications*/
    APIkey: "AIzaSyB1iUfH6A3p9W3a7g52d6zm5dzXiHVWU74"
};
