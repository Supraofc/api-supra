"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Channel_1 = __importDefault(require("./Channel"));
/**
 * Represent a Compact Playlist (e.g. from search result, upNext / related of a video)
 */
var PlaylistCompact = /** @class */ (function () {
    function PlaylistCompact(playlist) {
        if (playlist === void 0) { playlist = {}; }
        Object.assign(this, playlist);
    }
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    PlaylistCompact.prototype.load = function (youtubeRawData) {
        var _a;
        var playlistId = youtubeRawData.playlistId, title = youtubeRawData.title, thumbnail = youtubeRawData.thumbnail, shortBylineText = youtubeRawData.shortBylineText, videoCount = youtubeRawData.videoCount, videoCountShortText = youtubeRawData.videoCountShortText;
        this.id = playlistId;
        this.title = title.simpleText || title.runs[0].text;
        this.videoCount = +((_a = (videoCount !== null && videoCount !== void 0 ? videoCount : videoCountShortText.simpleText)) === null || _a === void 0 ? void 0 : _a.replace(/[^0-9]/g, "")) || 0;
        // Thumbnail
        var thumbnails = youtubeRawData.thumbnails;
        if (!thumbnails)
            thumbnails = thumbnail.thumbnails;
        else
            thumbnails = thumbnails[0].thumbnails;
        this.thumbnail = thumbnails[thumbnails.length - 1].url;
        // Channel
        if (shortBylineText && shortBylineText.simpleText !== "YouTube") {
            this.channel = new Channel_1.default({
                id: shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId,
                name: shortBylineText.runs[0].text,
                url: "https://www.youtube.com" + shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
            });
        }
        return this;
    };
    return PlaylistCompact;
}());
exports.default = PlaylistCompact;
