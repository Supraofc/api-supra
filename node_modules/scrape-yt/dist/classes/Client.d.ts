import { SearchOptions, SearchType } from "../types";
import Playlist from "./Playlist";
import Video from "./Video";
export default class YoutubeClient {
	/**
	 * Searches for videos / playlists / channels
	 *
	 * @param {string} query
	 * @param {SearchOptions} searchOptions
	 */
	search<T extends SearchOptions>(query: string, searchOptions?: Partial<T>): Promise<SearchType<T>[]>;
	/**
	 * Get playlist information and its videos by playlist id or URL
	 *
	 * @param playlistIdOrUrl
	 */
	getPlaylist(playlistIdOrUrl: string): Promise<Playlist | undefined>;
	/**
	 * Get video information by video id or URL
	 *
	 * @param videoIdOrUrl
	 */
	getVideo(videoIdOrUrl: string): Promise<Video | undefined>;
	/**
	 * Get type query value
	 *
	 * @param type Search type
	 */
	private getSearchTypeParam;
}
