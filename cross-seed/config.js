"use strict";
// If you find yourself always using the same command-line flag, you can set
// it here as a default.
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    /**
     * Pause at least this much in between each search. Higher is safer.
     * It is not recommended to set this to less than 2 seconds.
     */
    delay: 30,
    /**
     * List of Torznab URLs.
     * For Jackett, click "Copy RSS feed"
     * For Prowlarr, click on the indexer name and copy the Torznab Url, then append "?apikey=YOUR_PROWLARR_API_KEY"
     * Wrap each URL in quotation marks, and separate them with commas, and surround the entire set in brackets.
     */
    torznab: [
        "http://prowlarr.prowlarr/1/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // RevolutionTT
        "http://prowlarr.prowlarr/2/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // Milkie
        "http://prowlarr.prowlarr/3/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // Digital core
        "http://prowlarr.prowlarr/4/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // My Anonymouse
        "http://prowlarr.prowlarr/5/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // LST
        "http://prowlarr.prowlarr/6/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // SportsCult
        "http://prowlarr.prowlarr/9/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // TorrentLeech
        "http://prowlarr.prowlarr/10/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // TheLeachZone
        "http://prowlarr.prowlarr/11/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // Seedpool
        "http://prowlarr.prowlarr/12/api?apikey=<path:azurekv-secrets#prowlarr-api-key>&extended=1&t=search", // ABTorrents
    ],

    sonarr: ["http://sonarr.sonarr?apikey=<path:azurekv-secrets#sonarr-api-key>"],

    radarr: ["http://radarr.radarr?apikey=<path:azurekv-secrets#radarr-api-key>"],

    /**
     * To search with downloaded data, you can pass in directories to your downloaded torrent
     * data to find matches rather using the torrent files themselves for matching.
     *
     * If enabled, this needs to be surrounded by brackets. Windows users will need to use
     * double backslash in all paths in this config.
     * e.g.
     * 		dataDirs: ["/path/here"],
     * 		dataDirs: ["/path/here", "/other/path/here"],
     * 		dataDirs: ["C:\\My Data\\Downloads"]
     */
    dataDirs: undefined, // ["/data/torrents"],
    /**
     * Determines flexibility of naming during matching. "safe" will allow only perfect name matches
     * using the standard matching algorithm. "risky" uses filesize as its only comparison point.
     * Options: "safe", "risky"
     */
    matchMode: "safe",
    /**
     * Defines what category torrents injected by data-based matching should use.
     * Default is "cross-seed-data"
     */
    dataCategory: undefined,
    /**
     * If this is specified, cross-seed will create links to scanned files in the specified directory.
     * It will create a different link for every changed file name or directory structure.
     */
    linkDir: undefined, // "/data/torrents/",
    /**
     * cross-seed will use links of this type to inject data-based matches into your client.
     * Only relevant if dataDirs is specified.
     * Options: "symlink", "hardlink"
     */
    linkType: "hardlink",

    /**
     * Determines how deep into the specified dataDirs to go to generate new searchees.
     * Setting this to higher values will result in more searchees and more API hits to
     * your indexers.
     */
    maxDataDepth: 3,
    /**
     * Directory containing .torrent files.
     * For qBittorrent, this is BT_Backup
     * For rtorrent, this is your session directory
     * 		as configured in your .rtorrent.rc file.
     * For Deluge, this is ~/.config/deluge/state.
     * For Transmission, this would be ~/.config/transmission/torrents
     *
     * Don't change this for Docker.
     * Instead set the volume mapping on your docker container.
     */
    torrentDir: "/torrents",
    /**
     * Where to put the torrent files that cross-seed finds for you.
     * Don't change this for Docker.
     * Instead set the volume mapping on your docker container.
     */
    outputDir: "cross-seeds",

    /**
     * Whether to include single episode torrents in the search (not from season packs).
     * Like `includeEpisodes` but slightly more restrictive.
     */
    includeSingleEpisodes: true,
    /**
     * Include torrents which contain non-video files
     * This option does not override includeEpisodes or includeSingleEpisodes.
     *
     * To search for everything except episodes, use (includeEpisodes: false, includeSingleEpisodes: false, includeNonVideos: true)
     * To search for everything including episodes, use (includeEpisodes: true, includeNonVideos: true)
     * To search for everything except season pack episodes (data-based)
     *    use (includeEpisodes: false, includeSingleEpisodes: true, includeNonVideos: true)
     */
    includeNonVideos: true,
    /**
     * fuzzy size match threshold
     * decimal value (0.02 = 2%)
     */
    fuzzySizeThreshold: 0.02,
    /**
     * Exclude torrents first seen more than this long ago.
     * Format: https://github.com/vercel/ms
     * Examples:
     * "10min"
     * "2w"
     * "3 days"
     */
    excludeOlder: "52w",
    /**
     * Exclude torrents which have been searched
     * more recently than this long ago.
     * Examples:
     * "10min"
     * "2w"
     * "3 days"
     */
    excludeRecentSearch: "26w",
    /**
     * With "inject" you need to set up one of the below clients.
     * Options: "save", "inject"
     */
    action: "inject",
    /**
     * The url of your rtorrent XMLRPC interface.
     * Only relevant with action: "inject".
     * Could be something like "http://username:password@localhost:1234/RPC2
     */
    rtorrentRpcUrl: undefined,
    /**
     * The url of your qBittorrent webui.
     * Only relevant with action: "inject".
     * Supply your username and password inside the url like so:
     * "http://username:password@localhost:8080"
     */
    qbittorrentUrl: "http://admin:<path:azurekv-secrets#qbittorrent-password>@qbittorrent.qbittorrent",
    /**
     * The url of your Transmission RPC interface.
     * Usually ends with "/transmission/rpc".
     * Only relevant with action: "inject".
     * Supply your username and password inside the url like so:
     * "http://username:password@localhost:9091/transmission/rpc"
     */
    transmissionRpcUrl: undefined,
    /**
     * The url of your Deluge JSON-RPC interface.
     * Usually ends with "/json".
     * Only relevant with action: "inject".
     * Supply your WebUI password as well
     * "http://:password@localhost:8112/json"
     */
    delugeRpcUrl: undefined,
    /**
     * qBittorrent and Deluge specific
     * Whether to inject using the same labels/categories as the original torrent.
     * qBittorrent: This will apply the category's save path
     * Example: if you have a label/category called "Movies",
     * this will automatically inject cross-seeds to "Movies.cross-seed"
     */
    duplicateCategories: true,
    /**
     * cross-seed will send POST requests to this url
     * with a JSON payload of { title, body }.
     * Conforms to the caronc/apprise REST API.
     */
    notificationWebhookUrl: "https://notifiarr.com/api/v1/notification/crossSeed/60829eba-7fd6-4efb-8a1b-f5a669028e7d",
    /**
     * Listen on a custom port.
     */
    port: 2468,
    /**
     * Bind to a specific host address.
     * Example: "127.0.0.1"
     * Default is "0.0.0.0"
     */
    host: undefined,
    /**
     * Run rss scans on a schedule. Format: https://github.com/vercel/ms
     * Set to undefined or null to disable. Minimum of 10 minutes.
     * Examples:
     * "10min"
     * "2w"
     * "3 days"
     */
    rssCadence: null,
    /**
     * Run searches on a schedule. Format: https://github.com/vercel/ms
     * Set to undefined or null to disable. Minimum of 1 day.
     * If you have RSS enabled, you won't need this to run often (2+ weeks recommended)
     * Examples:
     * "10min"
     * "2w"
     * "3 days"
     */
    searchCadence: "8w",
    /**
     * Fail snatch requests that haven't responded after this long.
     * Set to null for an infinite timeout.
     * Format: https://github.com/vercel/ms
     * Examples:
     * "30sec"
     * "10s"
     * "1min"
     * null
     */
    snatchTimeout: undefined,
    /**
     * Fail search requests that haven't responded after this long.
     * Set to null for an infinite timeout.
     * Format: https://github.com/vercel/ms
     * Examples:
     * "30sec"
     * "10s"
     * "1min"
     * null
     */
    searchTimeout: undefined,
    /**
     * The number of searches to be done before it stops.
     * Combine this with "excludeRecentSearch" and "searchCadence" to smooth long-term API usage patterns.
     * Default is no limit.
     */
    searchLimit: 400,
    blocklist: [],

    flatLinking: true,
};
//# sourceMappingURL=config.template.docker.cjs.map