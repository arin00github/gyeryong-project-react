import { SetterOrUpdater, useRecoilState } from "recoil";
import BaseMap from "../../baseMap"
import { SMART_SAFE_ROAD_MAP_CONFIG } from "./constant"
import { LayerCreationConfig, MapClickPositionInfo } from "../../baseMap/baseMap.interface";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchFeatureAndStyleData } from "../../services/api/baseMap.api";
import { PanelAssets } from "../../interfaces/common.interface";
import MapAssetPanel from "../../components/mapPanel/MapAssetPanel";
import { convertSvgSize, moveMapByCoordinates } from "../../baseMap/baseMap.utils";
import Map from "ol/Map";
import { baseMapState } from "../../services/recoil/baseMap.state";
import { toggleSelectedFeature } from "../../baseMap/baseMap.feature";
import { transform } from "ol/proj";
import { MAP_PROJECTIONS } from "../../baseMap/baseMap.projections";

const SafeRoadMonitorPage = () => {

    const [baseMapObject]: [Map | undefined, SetterOrUpdater<Map | undefined>] = useRecoilState(baseMapState);

      /** 레이어 생성을 위한 생성 정보를 담고 있는 state */
    const [layerCreationConfig, setLayerCreationConfig]: [
        LayerCreationConfig | undefined,
        React.Dispatch<React.SetStateAction<LayerCreationConfig | undefined>>,
    ] = useState<LayerCreationConfig>();

    const [convertAssetData, setConvertAssetData] = useState<PanelAssets[]>()

    const mapClickPosCallback = (positionInfo:MapClickPositionInfo) => {
        
        if(baseMapObject){
            const center =  transform(positionInfo.center, MAP_PROJECTIONS.baro.projectionName, 'EPSG:4326')
            console.log('center', center)
            removeSelectedFeature()
            moveMapByCoordinates(baseMapObject, positionInfo.center)
            
        }
        console.log('mapClickPosCallback', positionInfo)
    }

    /**
     * 선택 표시용 feature 삭제
     * @function removeSelectedFeature
     * @returns {void}
     */
    const removeSelectedFeature = () => {
        const toggleSelectedFeatureParams = {
            mapObject: baseMapObject,
            layerId: SMART_SAFE_ROAD_MAP_CONFIG.layerId,
        };
        toggleSelectedFeature(toggleSelectedFeatureParams);
    };

    const fetchBaseMapData = async() => {
        const response = await fetchFeatureAndStyleData(SMART_SAFE_ROAD_MAP_CONFIG.layerId)
        setLayerCreationConfig(response)
    }

    useEffect(()=> {
        fetchBaseMapData()
    },[])

    useEffect(() => {
        if(layerCreationConfig && layerCreationConfig.postFeatures.features.length > 0){
           const features = layerCreationConfig.postFeatures.features;
           setConvertAssetData(features.map((fet) => {
            return {
                uid: fet.properties.uid as string,
                name: fet.properties.name as string,
                address: fet.properties.address as string,
                properties: {
                    type: 'layer_relaxroad',
                    equipments: [
                        {
                            state: fet.properties.state,
                            deveui: fet.properties.deveui
                        }
                    ]
                }
            }
           }))
        } 
    }, [layerCreationConfig])

    console.log('layerCreationConfig', layerCreationConfig)

    return (
        <PageContainer>
            {convertAssetData && layerCreationConfig &&
             <MapAssetPanel 
                title="개소목록" 
                assets={convertAssetData} 
                assetFeatures={layerCreationConfig?.postFeatures.features}
                layerId={SMART_SAFE_ROAD_MAP_CONFIG.layerId}
                selectedMarkerBase64={convertSvgSize(SMART_SAFE_ROAD_MAP_CONFIG.selectedIcon, SMART_SAFE_ROAD_MAP_CONFIG.iconWidth, SMART_SAFE_ROAD_MAP_CONFIG.iconHeight)}
                />
            }

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