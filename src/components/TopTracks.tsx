import { data, term } from "../types";
import TermsPicker from "./TermsPicker";

export default function TopTracks({ tracks, setTrackSearchTerm }: { tracks: data[], setTrackSearchTerm: (t: term) => void }) {
    return <div
        style={{ gridArea: "1 / 1 / 6 / 2" }}
        className="overflow-auto bg-slate-700 m-5 rounded-3xl p-5"
    >
        <TermsPicker setSearchTerm={setTrackSearchTerm} />

        {tracks.map((track, index) => (
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
};