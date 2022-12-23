import { data, term } from "../types";
import TermsPicker from "./TermsPicker";

export default function TopArtists({ artists, setArtistSearchTerm }: { artists: data[], setArtistSearchTerm: (t: term) => void }) {
    return <div
        className="bg-slate-700 m-5 p-5 rounded-3xl flex flex-col"
        style={{ gridArea: " 1 / 2 / 2 / 3" }}
    >
        <TermsPicker setSearchTerm={setArtistSearchTerm} />

        <div className="flex items-center h-full overflow-x-scroll">
            {artists.map((a, index) => (
                <div className="mx-3 last:mr-0 first:ml-0 text-center" key={a.id}>
                    <img src={a.img} className="h-[100px] w-[100px]" />
                    <p className="ordinal">{index + 1}</p>
                    <p className="w-[100px] truncate">{a.name}</p>
                </div>
            ))}
        </div>
    </div>
};