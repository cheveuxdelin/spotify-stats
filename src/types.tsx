export type trackFeatures = {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    speechiness: number;
    tempo: number;
    valence: number;
};

export type data = {
    id: string;
    name: string;
    img: string;
};

export type term = "short_term" | "medium_term" | "long_term";

export const trackFeaturesArray = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "loudness", "speechiness", "tempo", "valence"];
