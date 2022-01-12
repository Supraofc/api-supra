import { YoutubeRawData } from "../common";
import Channel from "./Channel";
import VideoCompact from "./VideoCompact";
interface PlaylistAttributes {
    id: string;
    title: string;
    videoCount: number;
    viewCount: number;
    lastUpdatedAt: string;
    channel?: Channel;
    videos: VideoCompact[];
}
/**
 * Represent a Playlist
 */
export default class Playlist implements PlaylistAttributes {
    id: string;
    title: string;
    videoCount: number;
    viewCount: number;
    lastUpdatedAt: string;
    channel?: Channel;
    videos: VideoCompact[];
    constructor(playlist?: Partial<Playlist>);
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    load(youtubeRawData: YoutubeRawData, continuationLimit?: number): Promise<Playlist>;
    /**
     * Get compact videos
     *
     * @param playlistContents raw object from youtubei
     */
    static getVideos(playlistContents: YoutubeRawData): VideoCompact[];
    /**
     * Load videos continuation
     *
     * @param continuation Continuation token
     * @param continuationLimit How many continuation
     */
    static getVideoContinuation(continuation: string, continuationLimit?: number, continuationCount?: number): Promise<VideoCompact[]>;
    static getSideBarInfo<T extends true | false = true>(stats: YoutubeRawData, parseInt: T): T extends true ? number : string;
}
export {};
