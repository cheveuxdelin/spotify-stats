import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { data, term, trackFeatures } from "../types";

import Averages from "../components/Averages";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import Header from "../components/Header";

export default function Home({ token, logoutHandler }: { token: string; logoutHandler: () => void }) {
    const wrapper = new SpotifyWebApi();
    wrapper.setAccessToken(token);

    const [userData, setUserData] = useState<data>();

    const [trackSearchTerm, setTrackSearchTerm] = useState<term>("short_term");
    const [userTracks, setUserTracks] = useState<data[]>();

    const [artistsSearchTerm, setArtistSearchTerm] = useState<term>("short_term");
    const [userArtits, setUserArtists] = useState<data[]>();

    const [avergeTrackFeatues, setAverageTrackFeatures] = useState<trackFeatures>();

    async function getMe(): Promise<void> {
        try {
            const userProfile = (await wrapper.getMe()).body;
            setUserData({
                id: userProfile.id,
                img: userProfile.images![0].url,
                name: userProfile.display_name!,
            });
        } catch {
            logoutHandler();
        }
    }

    async function getTracks() {
        const tracks = (await wrapper.getMyTopTracks({ time_range: trackSearchTerm, limit: 50 })).body.items;
        setUserTracks(tracks.map((track) => {
            return {
                id: track.id,
                name: track.name,
                img: track.album.images[1].url,
            };
        }));
    }

    async function getArtists() {
        const artists = (await wrapper.getMyTopArtists({ time_range: artistsSearchTerm })).body.items;
        setUserArtists(artists.map((artist) => {
            return {
                id: artist.id,
                name: artist.name,
                img: artist.images[2].url,
            };
        }));
    }

    async function getAverageTrackFeatures(): Promise<trackFeatures | void> {


        if (userTracks) {
            const TruncateTo2DecimalPlaces = (num: number) => Math.floor(num * 100) / 100;
            const trackIds = userTracks.map((t) => t.id);
            const audioFeatures = (await wrapper.getAudioFeaturesForTracks(trackIds)).body.audio_features;

            const trackFeatures: trackFeatures = {
                "acousticness": 0,
                "danceability": 0,
                "energy": 0,
                "instrumentalness": 0,
                "liveness": 0,
                "loudness": 0,
                "speechiness": 0,
                "tempo": 0,
                "valence": 0,
            };

            for (const feature of audioFeatures) {
                for (const field in trackFeatures) {
                    trackFeatures[field as keyof trackFeatures] += feature[field as keyof trackFeatures];
                }
            }

            for (const field in trackFeatures) {
                trackFeatures[field as keyof trackFeatures] = TruncateTo2DecimalPlaces(trackFeatures[field as keyof trackFeatures] / audioFeatures.length);
            }

            setAverageTrackFeatures(trackFeatures);
        }
    }

    useEffect(() => {
        getMe();
    }, []);
    useEffect(() => {
        getTracks();
    }, [trackSearchTerm]);
    useEffect(() => {
        getArtists();
    }, [artistsSearchTerm]);
    useEffect(() => {
        getAverageTrackFeatures();
    }, [userTracks]);


    return (
        <div className="h-screen">
            <Header logoutHandler={logoutHandler} userData={userData!} />
            <div className="grid grid-rows-2 grid-cols-2 h-[calc(100vh-80px)] p-5">
                {userTracks && <TopTracks tracks={userTracks} setTrackSearchTerm={setTrackSearchTerm} />}
                {userArtits && <TopArtists artists={userArtits} setArtistSearchTerm={setArtistSearchTerm} />}
                {avergeTrackFeatues && <Averages features={avergeTrackFeatues} />}
            </div>
        </div >
    );
}