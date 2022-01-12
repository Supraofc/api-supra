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
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var _1 = require(".");
var constants_1 = require("../constants");
/**
 * Represent a Youtube Channel
 */
var Channel = /** @class */ (function () {
    function Channel(channel) {
        if (channel === void 0) { channel = {}; }
        Object.assign(this, channel);
    }
    /**
     * Get videos from current Channel
     *
     * TODO: Add continuation support
     */
    Channel.prototype.getVideos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, common_1.axios.post(constants_1.I_END_POINT + "/browse", {
                            browseId: this.id,
                            params: "EgZ2aWRlb3M%3D",
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items.map(function (i) { return new _1.VideoCompact().load(i.gridVideoRenderer); })];
                }
            });
        });
    };
    /**
     * Get playlists from current channel
     *
     * TODO: Add continuation support
     */
    Channel.prototype.getPlaylists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, section, gridPlaylistRenderer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, common_1.axios.post(constants_1.I_END_POINT + "/browse", {
                            browseId: this.id,
                            params: "EglwbGF5bGlzdHM%3D",
                        })];
                    case 1:
                        response = _a.sent();
                        section = response.data.contents.twoColumnBrowseResultsRenderer.tabs[2].tabRenderer.content
                            .sectionListRenderer;
                        // Has category
                        if ("shelfRenderer" in section.contents[0].itemSectionRenderer.contents[0]) {
                            gridPlaylistRenderer = section.contents
                                .map(function (c) {
                                return c.itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer
                                    .items;
                            })
                                .flat();
                        }
                        else {
                            gridPlaylistRenderer =
                                section.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                        }
                        return [2 /*return*/, gridPlaylistRenderer.map(function (i) {
                                return new _1.PlaylistCompact().load(i.gridPlaylistRenderer);
                            })];
                }
            });
        });
    };
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    Channel.prototype.load = function (youtubeRawData) {
        var _a;
        var channelId = youtubeRawData.channelId, title = youtubeRawData.title, thumbnail = youtubeRawData.thumbnail, videoCountText = youtubeRawData.videoCountText, navigationEndpoint = youtubeRawData.navigationEndpoint;
        this.id = channelId;
        this.name = title.simpleText;
        this.thumbnail = "https:" + thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url;
        this.url = "https://www.youtube.com" + navigationEndpoint.browseEndpoint.canonicalBaseUrl;
        this.videoCount = (_a = +(videoCountText === null || videoCountText === void 0 ? void 0 : videoCountText.runs[0].text.replace(/[^0-9]/g, ""))) !== null && _a !== void 0 ? _a : 0;
        return this;
    };
    return Channel;
}());
exports.default = Channel;
