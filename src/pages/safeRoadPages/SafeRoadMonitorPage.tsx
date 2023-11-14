import { SetterOrUpdater, useRecoilState } from "recoil";
import BaseMap from "../../baseMap"
import { SMART_SAFE_ROAD_MAP_CONFIG } from "./constant"
import { LayerCreationConfig, MapClickPositionInfo } from "../../baseMap/baseMap.interface";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchFeatureAndStyleData } from "../../services/api/baseMap.api";

const SafeRoadMonitorPage = () => {

     

      /** 레이어 생성을 위한 생성 정보를 담고 있는 state */
    const [layerCreationConfig, setLayerCreationConfig]: [
        LayerCreationConfig | undefined,
        React.Dispatch<React.SetStateAction<LayerCreationConfig | undefined>>,
    ] = useState<LayerCreationConfig>();

    const mapClickPosCallback = (positionInfo:MapClickPositionInfo) => {
        console.log('mapClickPosCallback', positionInfo)
    }

    const fetchBaseMapData = async() => {
        const response = await fetchFeatureAndStyleData('layer_relaxroad')
        setLayerCreationConfig(response)
    }

    useEffect(()=> {
        fetchBaseMapData()
    },[])

    return (
        <PageContainer>
            <BaseMap mapCreationConfig={{...SMART_SAFE_ROAD_MAP_CONFIG,}}
            layerCreationConfig={layerCreationConfig}
            mapClickPosCallback={mapClickPosCallback}
            />
        </PageContainer>
    )
}

export const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #d5d5d5;
    overflow: hidden;
`;


export default SafeRoadMonitorPage