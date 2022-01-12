import { Channel, PlaylistCompact, VideoCompact } from "..";
export declare type SearchOptions = {
    type: "video" | "channel" | "playlist" | "all";
    limit: number;
};
export declare type SearchType<T> = T extends {
    type: "video";
} ? VideoCompact : T extends {
    type: "channel";
} ? Channel : T extends {
    type: "playlist";
} ? PlaylistCompact : VideoCompact | Channel | PlaylistCompact;
export declare type GetPlaylistOptions = {
    continuationLimit: number;
};
