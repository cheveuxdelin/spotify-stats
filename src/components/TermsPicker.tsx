import { term } from "../types";

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

export default function TermsPicker({ setSearchTerm }: { setSearchTerm: (t: term) => void }) {
    return <div className="w-fit  rounded-sm m-auto space-y-5">
        <h2 className="text-4xl text-center">Tracks</h2>
        {terms.map((t) => (
            <button
                onClick={() => setSearchTerm(t.term)}
                className="w-[120px] border-r last:border-r-0 text-center  first:text-right last:text-start px-3"
            >
                {t.name}
            </button>
        ))}
    </div>;
}