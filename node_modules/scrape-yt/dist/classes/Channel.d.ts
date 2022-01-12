import { YoutubeRawData } from "../common";
import { PlaylistCompact, VideoCompact } from ".";
interface ChannelProperties {
    id: string;
    name: string;
    url: string;
    thumbnail?: string;
    videoCount?: number;
}
/**
 * Represent a Youtube Channel
 */
export default class Channel implements ChannelProperties {
    id: string;
    name: string;
    url: string;
    thumbnail?: string;
    videoCount?: number;
    constructor(channel?: Partial<ChannelProperties>);
    /**
     * Get videos from current Channel
     *
     * TODO: Add continuation support
     */
    getVideos(): Promise<VideoCompact[]>;
    /**
     * Get playlists from current channel
     *
     * TODO: Add continuation support
     */
    getPlaylists(): Promise<PlaylistCompact[]>;
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    load(youtubeRawData: YoutubeRawData): Channel;
}
export {};
