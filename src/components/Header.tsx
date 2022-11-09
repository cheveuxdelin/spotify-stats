import { data } from "../types";

export default function Header({ userData, logoutHandler }: { userData: data, logoutHandler: () => void }) {
    return <header className="py-4 px-6 bg-slate-900 flex justify-between items-center border-b border-b-slate-500 h-[80px]">
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
    </header>;
}