import { Feature } from "geojson";
import { Map } from "ol";
import { PanelAssets } from "../../interfaces/common.interface";
import { GeometryPointType, PropertyType } from "../../interfaces/geo.interface";
import { PanelBody, PanelBoxContainer, PanelBoxSubTitle, PanelBoxTitle, PanelBoxTitleWrapper, PanelEquipmentContainer, PanelEquipmentRow, PanelHeader, PanelHeaderWrapper, PanelWrapper } from "../../styles/panel.style";
import { SetterOrUpdater, useRecoilState, useResetRecoilState } from "recoil";
import { baseMapState } from "../../services/recoil/baseMap.state";
import { moveMapByCoordinates } from "../../baseMap/baseMap.utils";
import { selectedAssetIdState } from "../../services/recoil/asset.state";
import { toggleSelectedFeature } from "../../baseMap/baseMap.feature";



interface MapAssetPanelProps {
    title?: string;
    assets: PanelAssets[];
    layerId: string;
    selectedMarkerBase64: string;
    assetFeatures: Feature<GeometryPointType, PropertyType>[]
}


const MapAssetPanel = (props: MapAssetPanelProps) => {

    const {title, assets, layerId, selectedMarkerBase64, assetFeatures} = props;

      /** 목록에서 선택한 자산 id 저장 */
      const [selectedAssetId, setSelectedAssetId]: [
        string | number | undefined,
        SetterOrUpdater<string | number | undefined>,
    ] = useRecoilState(selectedAssetIdState);

    /** 목록에서 선택한 자산 id 초기화 */
    const resetAssetIdState = useResetRecoilState(selectedAssetIdState);

     /** 모니터링 페이지에 생성된 지도 객체 */
     const [baseMapObject]: [Map | undefined, SetterOrUpdater<Map | undefined>] = useRecoilState(baseMapState);

    const handleClickAsset = (asset: PanelAssets) => {
        const targetFeature = assetFeatures.find((fet) => fet.properties.uid === asset.uid)
        setSelectedAssetId(asset.uid)
        
        if(baseMapObject && targetFeature){
            toggleSelectedFeature({
                mapObject: baseMapObject,
                layerId,
                selectedId: targetFeature.properties.id,
                selectedMarkerBase64,
            })
            const assetCoordinates = targetFeature.geometry.coordinates;
            moveMapByCoordinates(baseMapObject,assetCoordinates)
        }
    }

    return (
        <PanelWrapper>
                <PanelHeaderWrapper><PanelHeader>MapAssetPanel</PanelHeader></PanelHeaderWrapper>
            <PanelBody>
                {assets && assets.map((asset, idx) => {
                    return (
                        <PanelBoxContainer 
                            key={`${asset.uid}_${asset.properties.type}`} 
                            $isActive={selectedAssetId === asset.uid}
                            onClick={() => handleClickAsset(asset)}
                            >
                            <PanelBoxTitleWrapper>
                                <PanelBoxTitle>{asset.name}</PanelBoxTitle>
                                <PanelBoxSubTitle>{asset.address}</PanelBoxSubTitle>
                            </PanelBoxTitleWrapper>
                            <PanelEquipmentContainer>
                                {asset.properties.equipments.map((equipment) => {
                                    return (
                                        <PanelEquipmentRow key={equipment.value}>{equipment.name}</PanelEquipmentRow>
                                    )
                                })}
                            </PanelEquipmentContainer>
                        </PanelBoxContainer>
                    )
                })}
            </PanelBody>
        </PanelWrapper>
    )
}


export default MapAssetPanel