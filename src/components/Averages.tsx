import { data, term, trackFeatures, trackFeaturesArray } from "../types";


export default function Averages({ features }: { features: trackFeatures }) {
    return <div
        className=" bg-slate-700 m-5 p-5 rounded-3xl flex flex-col"
        style={{ gridArea: "2 / 2 / 3 / 3" }}
    >
        <h2 className="text-4xl text-center">Averages</h2>
        <div className="flex flex-wrap justify-center h-full content-center">
            {trackFeaturesArray.map(feature => <div className="m-5 h-min text-center" key={feature}>
                <p className="text-2xl">{feature}</p>
                <p className="text-green-300">{features[feature as keyof trackFeatures]}</p>
            </div>
            )}
        </div>
    </div>
};