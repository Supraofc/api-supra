"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
/**
 * Represent a compact video (e.g. from search result, playlist's videos, channel's videos)
 */
var VideoCompact = /** @class */ (function () {
    function VideoCompact(videoCompact) {
        if (videoCompact === void 0) { videoCompact = {}; }
        Object.assign(this, videoCompact);
    }
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    VideoCompact.prototype.load = function (youtubeRawData) {
        var _a, _b, _c;
        var videoId = youtubeRawData.videoId, title = youtubeRawData.title, lengthText = youtubeRawData.lengthText, thumbnail = youtubeRawData.thumbnail, ownerText = youtubeRawData.ownerText, shortBylineText = youtubeRawData.shortBylineText, publishedTimeText = youtubeRawData.publishedTimeText, viewCountText = youtubeRawData.viewCountText, badges = youtubeRawData.badges, thumbnailOverlays = youtubeRawData.thumbnailOverlays;
        this.id = videoId;
        this.title = title.simpleText || ((_a = title.runs[0]) === null || _a === void 0 ? void 0 : _a.text);
        this.thumbnail = thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url;
        this.uploadDate = publishedTimeText ? publishedTimeText.simpleText : undefined;
        this.duration =
            common_1.getDuration((lengthText === null || lengthText === void 0 ? void 0 : lengthText.simpleText) || ((_b = thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer) === null || _b === void 0 ? void 0 : _b.text.simpleText) ||
                "") || null;
        this.isLiveContent = badges
            ? badges[0].metadataBadgeRenderer.style === "BADGE_STYLE_TYPE_LIVE_NOW"
            : false;
        // Channel
        if (ownerText || shortBylineText) {
            var _d = (ownerText || shortBylineText).runs[0].navigationEndpoint.browseEndpoint, browseId = _d.browseId, canonicalBaseUrl = _d.canonicalBaseUrl;
            this.channel = {
                id: browseId,
                name: (ownerText || shortBylineText).runs[0].text,
                url: "https://www.youtube.com" + canonicalBaseUrl,
            };
        }
        if (!this.isLiveContent)
            this.viewCount = +((_c = viewCountText === null || viewCountText === void 0 ? void 0 : viewCountText.simpleText) === null || _c === void 0 ? void 0 : _c.replace(/[^0-9]/g, "")) || undefined;
        else
            this.viewCount = +(viewCountText === null || viewCountText === void 0 ? void 0 : viewCountText.runs[0].text.replace(/[^0-9]/g, "")) || undefined;
        return this;
    };
    Object.defineProperty(VideoCompact.prototype, "isPrivateOrDeleted", {
        get: function () {
            return !this.duration;
        },
        enumerable: false,
        configurable: true
    });
    return VideoCompact;
}());
exports.default = VideoCompact;
