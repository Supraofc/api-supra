import { YoutubeRawData } from "../common";
import Channel from "./Channel";
interface PlaylistCompactAttributes {
    title: string;
    thumbnail: string;
    channel?: Channel;
    videoCount: number;
}
/**
 * Represent a Compact Playlist (e.g. from search result, upNext / related of a video)
 */
export default class PlaylistCompact implements PlaylistCompactAttributes {
    id: string;
    title: string;
    thumbnail: string;
    channel?: Channel;
    videoCount: number;
    constructor(playlist?: Partial<PlaylistCompactAttributes>);
    /**
     * Load instance attributes from youtube raw data
     *
     * @param youtubeRawData raw object from youtubei
     */
    load(youtubeRawData: YoutubeRawData): PlaylistCompact;
}
export {};
