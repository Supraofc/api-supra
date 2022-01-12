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
var constants_1 = require("../constants");
var axios_1 = __importDefault(require("../common/axios"));
var PlaylistCompact_1 = __importDefault(require("./PlaylistCompact"));
var VideoCompact_1 = __importDefault(require("./VideoCompact"));
var Channel_1 = __importDefault(require("./Channel"));
var Playlist_1 = __importDefault(require("./Playlist"));
var Video_1 = __importDefault(require("./Video"));
var helper_1 = require("../common/helper");
var YoutubeClient = /** @class */ (function () {
    function YoutubeClient() {
    }
    /**
     * Searches for videos / playlists / channels
     *
     * @param {string} query
     * @param {SearchOptions} searchOptions
     */
    YoutubeClient.prototype.search = function (query, searchOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var options, response, contents, results, _i, contents_1, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = __assign({ type: "all", limit: 10 }, searchOptions);
                        return [4 /*yield*/, axios_1.default.post(constants_1.I_END_POINT + "/search", {
                                query: query,
                                params: this.getSearchTypeParam(options.type),
                            })];
                    case 1:
                        response = _a.sent();
                        contents = response.data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents
                            .filter(function (c) { return "itemSectionRenderer" in c; })
                            .pop().itemSectionRenderer.contents;
                        results = [];
                        for (_i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
                            content = contents_1[_i];
                            if ("playlistRenderer" in content)
                                results.push(new PlaylistCompact_1.default().load(content.playlistRenderer));
                            else if ("videoRenderer" in content)
                                results.push(new VideoCompact_1.default().load(content.videoRenderer));
                            else if ("channelRenderer" in content)
                                results.push(new Channel_1.default().load(content.channelRenderer));
                            if (results.length >= options.limit)
                                break;
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Get playlist information and its videos by playlist id or URL
     *
     * @param playlistIdOrUrl
     */
    YoutubeClient.prototype.getPlaylist = function (playlistIdOrUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var playlistId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playlistId = helper_1.getQueryParameter(playlistIdOrUrl, "list");
                        return [4 /*yield*/, axios_1.default.post(constants_1.I_END_POINT + "/browse", {
                                browseId: "VL" + playlistId,
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.data.error || response.data.alerts)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, new Playlist_1.default().load(response.data)];
                }
            });
        });
    };
    /**
     * Get video information by video id or URL
     *
     * @param videoIdOrUrl
     */
    YoutubeClient.prototype.getVideo = function (videoIdOrUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var videoId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        videoId = helper_1.getQueryParameter(videoIdOrUrl, "v");
                        return [4 /*yield*/, axios_1.default.get("" + constants_1.WATCH_END_POINT, {
                                params: { v: videoId, pbj: 1 },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.data[3].response.contents)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, new Video_1.default().load(response.data)];
                }
            });
        });
    };
    /**
     * Get type query value
     *
     * @param type Search type
     */
    YoutubeClient.prototype.getSearchTypeParam = function (type) {
        var searchType = {
            video: "EgIQAQ%3D%3D",
            playlist: "EgIQAw%3D%3D",
            channel: "EgIQAg%3D%3D",
            all: "",
        };
        return type in searchType ? searchType[type] : "";
    };
    return YoutubeClient;
}());
exports.default = YoutubeClient;
