import { getTree } from "@/actions/treeActions";
import TreeInfo from "@/components/TreeInfo/index";
import { divIcon } from "leaflet";
import { Suspense } from "react";
import config from "@/map-core/config.json"
interface searchParams {
    TreeCode: string
}
import MapComponent from "@/components/Map";
import { fromLonLat } from "ol/proj";
import WMSFeature from "@/components/Map/WMSFeature";

async function Home({ searchParams }: { searchParams: searchParams }) {
    const teeeData = await getTree(searchParams.TreeCode)
    return (
        <main>
            <div className="h-screen w-screen overflow-hidden">
                {/* <Map qeury={searchParams} center={fromLonLat(json.center, "EPSG:900913")} extend={json.extend} /> */}
                <MapComponent center={fromLonLat(config.center, config.projection)} className="h-full overflow-hidden"    >
                    <WMSFeature />
                </MapComponent>
            </div>
        </main >
    );
}

export default Home;