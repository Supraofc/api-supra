import { YoutubeRawData } from "../common";
import Channel from "./Channel";
interface VideoCompactAttributes {
    id: string;
    title: string;
    duration: number | null;
    thumbnail: string;
    isLiveContent: boolean;
    channel?: Channel;
    uploadDate?: string;
    viewCount?: number;
}
/**
 * Represent a compact video (e.g. from search result, playlist's videos, channel's videos)
 */
export default class VideoCompact implements VideoCompactAttributes {
    id: string;
    title: string;
    duration: number | null;
    thumbnail: string;
    isLiveContent: boolean;
    channel?: Channel;
    uploadDate?: string;
    viewCount?: number;
    constructor(videoCompact?: Partial<VideoCompactAttributes>);
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    load(youtubeRawData: YoutubeRawData): VideoCompact;
    get isPrivateOrDeleted(): boolean;
}
export {};
