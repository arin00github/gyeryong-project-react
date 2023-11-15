import { MapContainer } from "./baseMap.styles"
import { MAP_PROJECTIONS } from "./baseMap.projections";
import { Map, View } from "ol";
import * as proj from 'ol/proj'
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import PinchZoom from "ol/interaction/PinchZoom";
import { LayerCreationConfig, MapClickPositionInfo, MapCreationConfig } from "./baseMap.interface";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { baseMapState } from "../services/recoil/baseMap.state";
import { transformFromLonLat, setDefaultProjection } from "./baseMap.utils";
import {  addFeatureLayer, getTileLayer } from "./baseMap.layer";

interface BaseMapProps {
    /** 지도 생성을 위한 설정 정보 */
    mapCreationConfig: MapCreationConfig;
    /** 지도 위 레이어 생성을 위한 설정 정보 (postFeature, postLayerStyle 의 응답 데이터) */
    layerCreationConfig?:LayerCreationConfig;
    /** 지도 위 클릭 지점 position 정보를 반환하는 콜백 함수 */
    mapClickPosCallback:(positionInfo:MapClickPositionInfo) => void;
}

/**
 * 
 * @returns {React.Component}
 */
const BaseMap = (props:BaseMapProps) => {


    const { mapCreationConfig, layerCreationConfig, mapClickPosCallback } = props;

    /** 생성된 base 지도 객체를 저장 할 recoil state 객체  */
    const [baseMap, setBaseMap] = useRecoilState(baseMapState);

    /** base 지도를 감싸고 있는 div container ref 객체 */
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    /** base 지도가 생성될 target div ref 객체 */
    const baseMapRef = useRef<Map | null>(null);

    const zoomLevelRef = useRef<number | number[] | undefined>();

    useEffect(() => {
        if(mapContainerRef.current && !baseMapRef.current){
            setDefaultProjection()
            const tileLayers = getTileLayer();
            const fromLonLatCoordinate = transformFromLonLat(mapCreationConfig.center, MAP_PROJECTIONS.baro.projectionName);

            const view = new View({
                center: fromLonLatCoordinate,
                zoom: mapCreationConfig.zoom,
                minZoom: mapCreationConfig.minZoom,
                maxZoom: mapCreationConfig.maxZoom,
                projection: MAP_PROJECTIONS.baro.projectionName,
                resolutions: MAP_PROJECTIONS.baro.resolution,
                //constrainResolution: true,
                //smoothResolutionConstraint: false,
                //smoothExtentConstraint: false,
            })
            baseMapRef.current = new Map({
                controls: defaultControls({zoom: false, rotate: false}),
                interactions: defaultInteractions({doubleClickZoom: false}).extend([new PinchZoom()]),
                view: view,
                target: mapContainerRef.current,
                layers: tileLayers
            })
            
            setBaseMap(baseMapRef.current)
            
        }
    }, [mapContainerRef])
    useEffect(() => {

        if(baseMapRef.current && layerCreationConfig){
            addFeatureLayer({ mapObject: baseMapRef.current, mapCreationConfig, layerCreationConfig, mapClickPositionCallback: mapClickPosCallback})
        }

    }, [baseMapRef.current, layerCreationConfig])


    return (
        <MapContainer ref={mapContainerRef} className="map-container"></MapContainer>
    )
}

export default BaseMap