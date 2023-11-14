import { SetterOrUpdater, useRecoilState } from "recoil";
import BaseMap from "../../baseMap"
import { SMART_SAFE_ROAD_MAP_CONFIG } from "./constant"
import { LayerCreationConfig, MapClickPositionInfo } from "../../baseMap/baseMap.interface";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchFeatureAndStyleData } from "../../services/api/baseMap.api";
import { PanelAssets } from "../../interfaces/common.interface";
import MapAssetPanel from "../../components/mapPanel/MapAssetPanel";

const SafeRoadMonitorPage = () => {

     

      /** 레이어 생성을 위한 생성 정보를 담고 있는 state */
    const [layerCreationConfig, setLayerCreationConfig]: [
        LayerCreationConfig | undefined,
        React.Dispatch<React.SetStateAction<LayerCreationConfig | undefined>>,
    ] = useState<LayerCreationConfig>();

    const [convertAssetData, setConvertAssetData] = useState<PanelAssets[]>()

    const mapClickPosCallback = (positionInfo:MapClickPositionInfo) => {
        console.log('mapClickPosCallback', positionInfo)
    }

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
                selecedMarkerBase64=""
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