"use strict";
var config = (function () {
    function config() {
        this.host = process.env.HOST || "https://executivedashboardapp.documents.azure.com:443/";
        this.authKey = process.env.AUTH_KEY || "qEW8qReetvNmsLPRtw8DF84qG9lJw2/2maCAQm7Di77m7w8DkHF9QFeeFNE7WKQ+ajPtR990GGCkd2gVvL7sWw==";
        this.databaseId = "ExecutiveDashboard";
        this.collectionId = "DashDetails";
    }
    return config;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config;
//# sourceMappingURL=config.js.map