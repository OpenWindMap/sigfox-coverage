const express = require('express');
const router = express.Router();
const config = require('../config');
const http = config.https ? require('https') : require('http');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const filtered = ["AND", "ARE", "ARG", "AUS", "AUT", "BEL", "BGR", "BRA", "BWA", "CAN", "CIV", "CHE", "CHL", "COL", "CRI", "CZE", "DEU", "DNK", "ECU", "ESP", "EST", "FIN", "FRA", "GBR", "GRC", "GTM", "HKG", "HND", "HRV", "HUN", "IDN", "IRL", "ITA", "JPN", "KEN", "KOR", "LIE", "LTU", "LUX", "LVA", "MEX", "MLT", "MUS", "MYS", "NCL", "NGA", "NLD", "NOR", "NZL", "OMN", "PAN", "PER", "PNG", "POL", "PRI", "PRT", "PYF", "REU", "ROU", "RUS", "SAU", "SEN", "SGP", "SLV", "SRB", "SVK", "SWE", "SWZ", "THA", "TUN", "TWN", "URY", "USA", "ZAF"];
const geoJsonParsed = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/WorldCountries.geojson')));
const countriesToDisplay = _.filter(geoJsonParsed.features, feature => _.includes(filtered, feature.properties.ISO_A3));

const CACHE_TTL_MS = 60 * 60 * 1000;
let cache = null; // { url, at }

function fetchTileUrl() {
    return new Promise((resolve, reject) => {
        const req = http.get({
            hostname: config.sigfoxApiSite,
            path: config.publicMapPath,
            auth: config.sigfoxApiUser + ":" + config.sigfoxApiPassword,
            timeout: 8000
        }, (r) => {
            let buff = "";
            r.on('data', d => buff += d);
            r.on('end', () => {
                if (r.statusCode !== 200) return reject(Object.assign(new Error(r.statusMessage), { status: r.statusCode }));
                try { resolve(JSON.parse(buff).tmsTemplateUrl); } catch (e) { reject(e); }
            });
        });
        req.on('timeout', () => req.destroy(new Error('Sigfox API timeout')));
        req.on('error', reject);
    });
}

async function getTileUrl() {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.url;
    try {
        const url = await fetchTileUrl();
        cache = { url, at: Date.now() };
        return url;
    } catch (e) {
        if (cache) return cache.url; // API down: keep serving the last known URL
        throw e;
    }
}

router.get('/', async function(req, res) {
    try {
        res.render('publicmap', {
            title: 'Sigfox public map',
            sigfoxMapUrl: await getTileUrl()
        });
    } catch (e) {
        res.status(502).render('error', {
            message: 'Impossible to load Public layer',
            error: { status: e.status || 502, stack: e.message }
        });
    }
});

router.get('/countries', (req, res) => {
    res.set('Cache-Control', 'public, max-age=86400');
    res.json(countriesToDisplay);
});

module.exports = router;
