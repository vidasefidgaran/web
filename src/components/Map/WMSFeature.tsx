"use client"
import { useContext, useEffect, useState } from "react";
import MapContext from "./MapContext";
import { GeoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { FeatureInfoUrlCreator, OPERATOR, getInfoByAttribute } from "@/lib/map/map";
import config from "@/map-core/config.json"
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import CodeStore from "@/store/CodeStore";
import { baseMaps } from "./BaseMaps";
import { getTree } from "@/actions/treeActions";
import { Axios } from "@/lib/axios/axios";
import { uppercaseKeyCovertor } from "@/lib/helper/errHandler";

interface WMSFeatureProps  {
    isFullScreen?: boolean;
}

const WMSFeature: React.FC<WMSFeatureProps> = ({ isFullScreen = false }) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const key = searchParams.get("TreeCode");
    const [isCodeInfo, setIsCodeInfo] = useState<boolean>(false)
    const layers = baseMaps.getLayers().getArray()





    const { map, handleCodeSelect, codeInfo } = useContext(MapContext)
    const store = CodeStore()


    const temp = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
            fill: new Fill({
                color: "#253289",
            }),
            stroke: new Stroke({
                color: "black",
                width: 2,
            }),
        }),
    });

    useEffect(() => {
        if (!map) {
            return
        }
        map.addLayer(temp);
        //@ts-ignore
        map.on("click", async (event) => {
            if (!key) {

                store.setIsLoading(true)
                //@ts-ignore
                temp.getSource().clear()
                const clickedCoordinate = event.coordinate;
                //@ts-ignore
                let data = await FeatureInfoUrlCreator(layers[1], clickedCoordinate, map.getView().getResolution(), config.projection)
                if (isFullScreen) {

                    if (data.features.length > 0) {
                        //@ts-ignore
                        let attribute = data.features[0].properties;

                        router.push(`?TreeCode=${attribute.Code}`);
                        return
                    }

                } else {

                    try {
                        const features = new GeoJSON().readFeatures(data);
                        temp.getSource()?.clear()
                        //@ts-ignore
                        store.setInfo({ ...features[0].getProperties(), id: features[0].id_.split(".")[1] })
                        // console.log(features[0].getGeometry()?.flatCoordinates)
                        // Get the extent of the clicked feature
                        const extent = features[0].getGeometry()?.getExtent()
                        // Fit the map to the extent of the clicked feature
                        map.getView().fit(extent, {
                            padding: [50, 50, 50, 50],
                            duration: 500,
                        })
                        // router.push(`?key=${features[0].getProperties().plate_id}`)
                        store.setIsLoading(false)
                    } catch (err) {
                        handleCodeSelect(null)
                        store.setIsLoading(false)
                        toast.error("پلاک درختی  ثبت نشده")
                    }


                }
            } else {
                store.setIsLoading(true)
                //@ts-ignore
                temp.getSource().clear()
                const clickedCoordinate = event.coordinate;
                //@ts-ignore
                let data = await FeatureInfoUrlCreator(layers[1], clickedCoordinate, map.getView().getResolution(), config.projection)
                if (isFullScreen) {

                    if (data.features.length > 0) {
                        //@ts-ignore
                        let attribute = data.features[0].properties;

                        router.push(`?TreeCode=${attribute.Code}`);
                        return
                    }

                }
            }
        })
        if (key) {

            getInfoByAttribute(config.baseOwsUrl, "Trees", "Code", OPERATOR.equal_to, key, "EPSG:900913", async (data) => {
                temp.getSource()?.clear()
                try {

                    const features = new GeoJSON().readFeatures(data)
                    //@ts-ignore
                    const getData = Axios.get(`/Tree/${features[0].id_.split(".")[1]}`).then((res) => {
                        const convertedData = uppercaseKeyCovertor(res.data.payload)

                        //@ts-ignore
                        store.setInfo({ ...convertedData, id: convertedData.Id })

                    })

                    await getData

                    handleCodeSelect(features[0].getProperties())

                    // Get the extent of the clicked feature
                    const extent = features[0].getGeometry()
                    // Fit the map to the extent of the clicked feature
                    map.getView().fit(extent, {
                        padding: [50, 50, 50, 50],
                        duration: 500,

                    })
                    store.setIsLoading(false)
                    setIsCodeInfo(true)
                } catch (err) {
                    handleCodeSelect(null)
                    store.setIsLoading(false)
                    toast.error("پلاک درختی  ثبت نشده")
                }

            }
            );
        }

        () => map.removeLayer(temp)
    }, [map, key])
    return null
}

export default WMSFeature;