"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
/**
 * Represent a Video
 */
var Video = /** @class */ (function () {
    function Video(video) {
        if (video === void 0) { video = {}; }
        Object.assign(this, video);
    }
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    Video.prototype.load = function (youtubeRawData) {
        var _a, _b, _c, _d, _e;
        var contents = youtubeRawData[3].response.contents.twoColumnWatchNextResults.results.results.contents;
        var primaryInfo = contents[0].videoPrimaryInfoRenderer;
        var secondaryInfo = contents[1].videoSecondaryInfoRenderer;
        var videoDetails = youtubeRawData[2].playerResponse.videoDetails;
        var videoInfo = __assign(__assign(__assign({}, secondaryInfo), primaryInfo), { videoDetails: videoDetails });
        // Basic information
        this.id = videoInfo.videoDetails.videoId;
        this.title = videoInfo.title.runs[0].text;
        this.duration = +videoInfo.videoDetails.lengthSeconds || null;
        this.uploadDate = videoInfo.dateText.simpleText;
        this.viewCount = +videoInfo.videoDetails.viewCount;
        this.isLiveContent = videoInfo.videoDetails.isLiveContent;
        var thumbnails = videoInfo.videoDetails.thumbnail.thumbnails;
        this.thumbnail = thumbnails[thumbnails.length - 1].url;
        // Channel
        var _f = videoInfo.owner.videoOwnerRenderer, title = _f.title, thumbnail = _f.thumbnail;
        this.channel = new _1.Channel({
            id: title.runs[0].navigationEndpoint.browseEndpoint.browseId,
            name: title.runs[0].text,
            thumbnail: thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url.startsWith("https:")
                ? thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url
                : "https:" + thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url,
            url: "https://www.youtube.com/channel/" + title.runs[0].navigationEndpoint.browseEndpoint.browseId,
        });
        // Like Count and Dislike Count
        var topLevelButtons = videoInfo.videoActions.menuRenderer.topLevelButtons;
        this.likeCount =
            +((_a = topLevelButtons[0].toggleButtonRenderer.defaultText.accessibility) === null || _a === void 0 ? void 0 : _a.accessibilityData.label.replace(/[^0-9]/g, "")) || null;
        this.dislikeCount =
            +((_b = topLevelButtons[1].toggleButtonRenderer.defaultText.accessibility) === null || _b === void 0 ? void 0 : _b.accessibilityData.label.replace(/[^0-9]/g, "")) || null;
        // Tags and description
        this.tags =
            ((_d = (_c = videoInfo.superTitleLink) === null || _c === void 0 ? void 0 : _c.runs) === null || _d === void 0 ? void 0 : _d.reduce(function (tags, t) {
                if (t.text.trim())
                    tags.push(t.text.trim());
                return tags;
            }, [])) || [];
        this.description =
            ((_e = videoInfo.description) === null || _e === void 0 ? void 0 : _e.runs.map(function (d) { return d.text; }).join("")) || "";
        // Up Next and related videos
        this.related = [];
        var secondaryContents = youtubeRawData[3].response.contents.twoColumnWatchNextResults.secondaryResults
            .secondaryResults.results;
        for (var _i = 0, secondaryContents_1 = secondaryContents; _i < secondaryContents_1.length; _i++) {
            var secondaryContent = secondaryContents_1[_i];
            if ("compactAutoplayRenderer" in secondaryContent) {
                var content = secondaryContent.compactAutoplayRenderer.contents[0];
                if ("compactVideoRenderer" in content) {
                    this.upNext = new _1.VideoCompact().load(content.compactVideoRenderer);
                }
                else if ("compactRadioRenderer" in content) {
                    this.upNext = new _1.PlaylistCompact().load(content.compactRadioRenderer);
                }
            }
            else if ("compactVideoRenderer" in secondaryContent) {
                this.related.push(new _1.VideoCompact().load(secondaryContent.compactVideoRenderer));
            }
            else if ("compactRadioRenderer" in secondaryContent) {
                this.related.push(new _1.PlaylistCompact().load(secondaryContent.compactRadioRenderer));
            }
        }
        return this;
    };
    return Video;
}());
exports.default = Video;
