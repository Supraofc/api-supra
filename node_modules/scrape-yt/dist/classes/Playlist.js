"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var constants_1 = require("../constants");
var Channel_1 = __importDefault(require("./Channel"));
var VideoCompact_1 = __importDefault(require("./VideoCompact"));
/**
 * Represent a Playlist
 */
var Playlist = /** @class */ (function () {
    function Playlist(playlist) {
        if (playlist === void 0) { playlist = {}; }
        Object.assign(this, playlist);
    }
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    Playlist.prototype.load = function (youtubeRawData, continuationLimit) {
        var _a;
        if (continuationLimit === void 0) { continuationLimit = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var sidebarRenderer, primaryRenderer, stats, playlistContents, videos, continuationRenderer, continuationVideos, videoOwner, _b, title, thumbnail;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sidebarRenderer = youtubeRawData.sidebar.playlistSidebarRenderer.items;
                        primaryRenderer = sidebarRenderer[0].playlistSidebarPrimaryInfoRenderer;
                        // Basic information
                        this.id = primaryRenderer.title.runs[0].navigationEndpoint.watchEndpoint.playlistId;
                        this.title = primaryRenderer.title.runs[0].text;
                        stats = primaryRenderer.stats;
                        if (primaryRenderer.stats.length === 3) {
                            this.videoCount = Playlist.getSideBarInfo(stats[0], true);
                            this.viewCount = Playlist.getSideBarInfo(stats[1], true);
                            this.lastUpdatedAt = Playlist.getSideBarInfo(stats[2], false);
                        }
                        else if (stats.length === 2) {
                            this.videoCount = Playlist.getSideBarInfo(stats[0], true);
                            this.lastUpdatedAt = Playlist.getSideBarInfo(stats[1], false);
                        }
                        playlistContents = youtubeRawData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
                            .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
                            .playlistVideoListRenderer.contents;
                        videos = Playlist.getVideos(playlistContents);
                        continuationRenderer = playlistContents[100];
                        if (!continuationRenderer) return [3 /*break*/, 2];
                        return [4 /*yield*/, Playlist.getVideoContinuation(continuationRenderer.continuationItemRenderer.continuationEndpoint.continuationCommand
                                .token, continuationLimit)];
                    case 1:
                        continuationVideos = _c.sent();
                        videos.push.apply(videos, continuationVideos);
                        _c.label = 2;
                    case 2:
                        this.videos = videos;
                        videoOwner = ((_a = sidebarRenderer[1]) === null || _a === void 0 ? void 0 : _a.playlistSidebarSecondaryInfoRenderer.videoOwner) || undefined;
                        if (videoOwner) {
                            _b = videoOwner.videoOwnerRenderer, title = _b.title, thumbnail = _b.thumbnail;
                            this.channel = new Channel_1.default({
                                id: title.runs[0].navigationEndpoint.browseEndpoint.browseId,
                                name: title.runs[0].text,
                                thumbnail: thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url,
                                url: "https://www.youtube.com" +
                                    title.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
                            });
                        }
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Get compact videos
     *
     * @param playlistContents raw object from youtubei
     */
    Playlist.getVideos = function (playlistContents) {
        var videosRenderer = playlistContents.map(function (c) { return c.playlistVideoRenderer; });
        var videos = [];
        for (var _i = 0, videosRenderer_1 = videosRenderer; _i < videosRenderer_1.length; _i++) {
            var videoRenderer = videosRenderer_1[_i];
            if (!videoRenderer)
                continue;
            videos.push(new VideoCompact_1.default().load(videoRenderer));
        }
        return videos;
    };
    /**
     * Load videos continuation
     *
     * @param continuation Continuation token
     * @param continuationLimit How many continuation
     */
    Playlist.getVideoContinuation = function (continuation, continuationLimit, continuationCount) {
        if (continuationLimit === void 0) { continuationLimit = 0; }
        if (continuationCount === void 0) { continuationCount = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var response, playlistContents, videos, continuationRenderer, continuationVideos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        continuationCount++;
                        if (continuationLimit && continuationCount >= continuationLimit)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, common_1.axios.post(constants_1.I_END_POINT + "/browse", { continuation: continuation })];
                    case 1:
                        response = _a.sent();
                        playlistContents = response.data.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
                        videos = Playlist.getVideos(playlistContents);
                        continuationRenderer = playlistContents[100];
                        if (!continuationRenderer) return [3 /*break*/, 3];
                        return [4 /*yield*/, Playlist.getVideoContinuation(continuationRenderer.continuationItemRenderer.continuationEndpoint.continuationCommand
                                .token, continuationLimit, continuationCount)];
                    case 2:
                        continuationVideos = _a.sent();
                        videos.push.apply(videos, continuationVideos);
                        _a.label = 3;
                    case 3: return [2 /*return*/, videos];
                }
            });
        });
    };
    Playlist.getSideBarInfo = function (stats, parseInt) {
        var data;
        if ("runs" in stats)
            data = stats.runs.map(function (r) { return r.text; }).join("");
        else
            data = stats.simpleText.replace(/[^0-9]/g, "");
        if (parseInt)
            data = +data.replace(/[^0-9]/g, "");
        return data;
    };
    return Playlist;
}());
exports.default = Playlist;
