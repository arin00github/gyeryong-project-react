
import { MAP_PROJECTIONS } from "./baseMap.projections";
import { Projection } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import * as OlExtent from "ol/extent";
import BaseLayer from "ol/layer/Base";
import WmtsTileGrid from "ol/tilegrid/WMTS";
import { Collection, ImageTile } from "ol";
import {  WMTS } from "ol/source";
import { Map } from "ol";
import { LayerCreationConfig, MapClickPositionInfo, MapCreationConfig } from "./baseMap.interface";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { CLUSTER_SCALE, LAYER_TYPE_KEY } from "./baseMap.constant";
import { resizeSvgToPng } from "./baseMap.utils";
import { getPointFeatures } from "./baseMap.feature";

const {VITE_MAP_API_KEY} =import.meta.env


export const getTileLayer = () => {
    // proj4.defs(MAP_PROJECTIONS.baro.projectionName, MAP_PROJECTIONS.baro.projection)
    // register(proj4)
    const customProjection = new Projection({
        code: MAP_PROJECTIONS.baro.projectionName,
        extent: MAP_PROJECTIONS.baro.extent,
        units: "m"
    })

    const tileLayer = new TileLayer({
        preload: Infinity,
        source: new WMTS({
            projection: customProjection,
            tileGrid: new WmtsTileGrid({
                origin: OlExtent.getTopLeft(customProjection.getExtent()),
                tileSize: 256,
                extent: MAP_PROJECTIONS.baro.extent,
                matrixIds: MAP_PROJECTIONS.baro.matrixIds,
                resolutions: MAP_PROJECTIONS.baro.resolution,
            }),
            tilePixelRatio: 2,
            style: 'korean',
            layer: 'korean_map',
            format: 'image/png',
            matrixSet: 'korean',
            url: `//map.ngii.go.kr/openapi/Gettile.do?apikey=${VITE_MAP_API_KEY}`,
            tileLoadFunction:(tile, src: string) => {
                const imageTile = tile as ImageTile;
                const ImageGet = imageTile.getImage() as HTMLImageElement;
                ImageGet.src = src;
            },
            crossOrigin: "anonymous",
            wrapX: true,
        }),
        //visible: true
    })

    return [tileLayer] as BaseLayer[] | Collection<BaseLayer>
}


interface addFeatureLayerProps {
    mapObject: Map;
    mapCreationConfig: MapCreationConfig;
    layerCreationConfig: LayerCreationConfig;
    mapClickPositionCallback: (mapClickPositionInfo: MapClickPositionInfo) => void;
}

export const addFeatureLayer = (props: addFeatureLayerProps) => {
    const { mapObject, mapCreationConfig, layerCreationConfig, mapClickPositionCallback } = props;
    const { postFeatures, postLayerStyles } = layerCreationConfig;

    console.log('addFeatureLayer', props)

    if(postFeatures && postLayerStyles){
        const featureVectorLayer = new VectorLayer({
            source: new VectorSource({})
        })
        featureVectorLayer.set(LAYER_TYPE_KEY, mapCreationConfig.layerId);
        mapObject.addLayer(featureVectorLayer);
        
        resizeSvgToPng(postLayerStyles.icon_img, mapCreationConfig.iconWidth, mapCreationConfig.iconHeight)
        .then((base64: string) => {
         console.log('base64', base64)
         getPointFeatures({
             mapObject,
             postFeatureResponse: postFeatures,
             vectorLayer: featureVectorLayer,
             pngBase64: base64,
             scaleIconSize: CLUSTER_SCALE[String(mapCreationConfig.iconWidth)],
             mapClickPositionCallback,
         })
        }).catch((error) => {
            console.log('error', error)
        })
        
    }

}