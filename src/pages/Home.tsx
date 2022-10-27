import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";

type term = "short_term" | "medium_term" | "long_term";

const terms: { name: string; term: term }[] = [
  {
    name: "4 Weeks",
    term: "short_term",
  },
  {
    name: "6 Months",
    term: "medium_term",
  },
  {
    name: "12 Months",
    term: "long_term",
  },
];

type data = {
  id: string;
  name: string;
  img: string;
};

export default function Home(
  { token, logoutHandler }: { token: string; logoutHandler: () => void },
) {
  const wrapper = new SpotifyWebApi();
  wrapper.setAccessToken(token);

  const [userData, setUserData] = useState<data>();

  const [trackSearchTerm, setTrackSearchTerm] = useState<term>();
  const [userTracks, setUserTracks] = useState<data[]>();

  const [artistsSearchTerm, setArtistSearchTerm] = useState<term>();
  const [userArtits, setUserArtists] = useState<data[]>();

  async function getMe() {
    const userProfile = (await wrapper.getMe()).body;
    setUserData({
      id: userProfile.id,
      img: userProfile.images![0].url,
      name: userProfile.display_name!,
    });
  }

  async function getTracks() {
    const tracks =
      (await wrapper.getMyTopTracks({ time_range: trackSearchTerm })).body
        .items;
    setUserTracks(tracks.map((track) => {
      return {
        id: track.id,
        name: track.name,
        img: track.album.images[1].url,
      };
    }));
  }

  async function getArtists() {
    const artists =
      (await wrapper.getMyTopArtists({ time_range: artistsSearchTerm })).body
        .items;
    setUserArtists(artists.map((artist) => {
      return {
        id: artist.id,
        name: artist.name,
        img: artist.images[2].url,
      };
    }));
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

  return (
    <div className="h-screen">
      <nav className="py-4 px-6 bg-slate-900 flex justify-between items-center border-b border-b-slate-500 h-[80px]">
        <p className="text-lg subpixel-antialiased font-semibold">
          Stats Spotify
        </p>
        <div className="flex items-center space-x-2">
          <img src={userData?.img} className="rounded-full w-14" />
          <p className="text-white">{userData?.name}</p>
          <button
            onClick={logoutHandler}
            className="bg-slate-700 rounded-md px-3 py-1 borde"
          >
            logout
          </button>
        </div>
      </nav>

      <div className="grid grid-rows-2 grid-cols-2 h-[calc(100vh-80px)] p-5">
        <div
          style={{ gridArea: "1 / 1 / 6 / 2" }}
          className="overflow-auto bg-slate-700 m-5 rounded-3xl p-6"
        >
          <div className="w-fit  rounded-sm m-auto space-y-5">
            <h2 className="text-4xl text-center">Tracks</h2>

            {terms.map((t) => (
              <button
                onClick={() => setTrackSearchTerm(t.term)}
                className="w-[120px] border-r last:border-r-0 text-center  first:text-right last:text-start px-3"
              >
                {t.name}
              </button>
            ))}
          </div>

          {userTracks?.map((track, index) => (
            <div
              key={track.id}
              className="border-b last:border-b-0 p-5 flex items-center  justify-between"
            >
              <div className="flex items-center space-x-3">
                <img src={track.img} className="h-[100px]" />
                <p>{track.name}</p>
              </div>
              <p className="">{index + 1}</p>
            </div>
          ))}
        </div>

        <div
          className=" bg-slate-700 m-5 p-5 rounded-3xl flex flex-col"
          style={{ gridArea: " 1 / 2 / 2 / 3" }}
        >
          <div>
            <h2 className="text-4xl text-center">Artists</h2>
            <div className="w-fit rounded-sm m-auto space-y-5">
              {terms.map((t) => (
                <button
                  onClick={() => setArtistSearchTerm(t.term)}
                  className="w-[120px] border-r last:border-r-0 text-center  first:text-right last:text-start px-3"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center h-full overflow-x-scroll">
            {userArtits?.map((a, index) => (
              <div className="mx-3 last:mr-0 first:ml-0 text-center">
                <img src={a.img} className="h-[100px] w-[100px]" />
                <p className="ordinal">{index+1}</p>
                <p className="w-[100px] truncate">{a.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className=" bg-slate-700 m-5 rounded-3xl"
          style={{ gridArea: "2 / 2 / 3 / 3" }}
        >
          hola
        </div>
      </div>
    </div>
  );
}
