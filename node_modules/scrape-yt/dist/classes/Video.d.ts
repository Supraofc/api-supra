import { PlaylistCompact, VideoCompact, Channel } from ".";
import { YoutubeRawData } from "../common";
interface VideoAttributes {
    id: string;
    title: string;
    duration: number | null;
    thumbnail: string;
    description: string;
    channel: Channel;
    uploadDate: string;
    viewCount: number | null;
    likeCount: number | null;
    dislikeCount: number | null;
    isLiveContent: boolean;
    tags: string[];
    upNext: VideoCompact | PlaylistCompact;
    related: (VideoCompact | PlaylistCompact)[];
}
/**
 * Represent a Video
 */
export default class Video implements VideoAttributes {
    id: string;
    title: string;
    duration: number | null;
    thumbnail: string;
    description: string;
    channel: Channel;
    uploadDate: string;
    viewCount: number | null;
    likeCount: number | null;
    dislikeCount: number | null;
    isLiveContent: boolean;
    tags: string[];
    upNext: VideoCompact | PlaylistCompact;
    related: (VideoCompact | PlaylistCompact)[];
    constructor(video?: Partial<VideoAttributes>);
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    load(youtubeRawData: YoutubeRawData): Video;
}
export {};
