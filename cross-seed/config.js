const { flatLinking } = require("./config.js.old");

module.exports = {
    /**
     * List of Torznab URLs from Prowlarr or Jackett.
     * MUST be enclosed in brackets [] and strings separated by commas.
     */
    torznab: [
        `http://prowlarr.prowlarr/2/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // Milkie
        `http://prowlarr.prowlarr/4/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // My Anonymouse
        `http://prowlarr.prowlarr/5/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // LST
        `http://prowlarr.prowlarr/9/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // TorrentLeech
        `http://prowlarr.prowlarr/10/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // TheLeachZone
        `http://prowlarr.prowlarr/11/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // Seedpool
        `http://prowlarr.prowlarr/12/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // ABTorrents
        `http://prowlarr.prowlarr/13/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // Digital core
        `http://prowlarr.prowlarr/14/api?apikey=${process.env.PROWLARR_API_KEY}&extended=1&t=search`, // RevoTT
    ],

    /**
     * Torrent Client Connection Strings
     * Only configure the line for the client you actually use.
     * Format -> client:http://username:password@host:port
     */
    torrentClients: [
        `qbittorrent:http://admin:${process.env.QBITTORRENT_PASSWORD}@qbittorrent.qbittorrent`,
        // "deluge:http://:your_password@localhost:8112/json",
        // "transmission:readonly:http://user:pass@localhost:9091/transmission/rpc",
        // "rtorrent:http://user:pass@localhost:8080/RPC2"
    ],

    /**
     * What action to perform when a match is found.
     * Options: "inject" (injects directly to client) or "save" (saves .torrent files to outputDir)
     */
    action: "inject",

    /**
     * Use torrents already inside your client to search for matches.
     * Highly recommended to keep true.
     */
    useClientTorrents: true,

    /**
     * Search and matching settings
     */
    delay: 30,                // Pause in seconds between indexer searches (Minimum 30)
    matchMode: "partial",     // Options: "strict" (exact match) or "partial" (allows missing small files like .nfo)
    skipRecheck: true,        // Skips hash checking upon injection if data is already 100% complete

    /**
     * Data-Based Matching & Linking (Optional but highly recommended)
     * Required if you want cross-seed to parse raw files or use partial matching.
     */
    dataDirs: [
        "/data/torrents/movies",
        "/data/torrents/tv"
    ],

    linkDirs: [
        "/data/torrents/cross-seed-links"
    ],

    linkType: "hardlink",     // Options: "symlink", "hardlink", "reflink"
    linkCategory: "cross-seed-link",

    /**
     * Media Management Integration (Sonarr/Radarr)
     * Allows searching by specific Media IDs rather than just raw text titles.
     */
    sonarr: [`http://sonarr.sonarr?apikey=${process.env.SONARR_API_KEY}`],
    radarr: [`http://radarr.radarr?apikey=${process.env.RADARR_API_KEY}`],
    duplicateCategories: true, // Appends ".cross-seed" to your existing hardlink categories

    /**
     * Daemon Options
     */
    port: 2468,               // Port for the local API/Webhooks (e.g., for autobrr integration)
    searchCadence: "14d",     // How frequently to scan your entire library (e.g., every 14 days)
    rssCadence: "10m",        // How frequently to scan indexer RSS feeds

    notificationWebhookUrls: [
        "https://notifiarr.com/api/v1/notification/crossSeed/60829eba-7fd6-4efb-8a1b-f5a669028e7d"
    ],

    flatLinking: true,
};