import { Feature } from "geojson";
import { PanelAssets } from "../../interfaces/common.interface";
import { GeometryPointType, PropertyType } from "../../interfaces/geo.interface";
import { PanelBody, PanelBoxContainer, PanelBoxSubTitle, PanelBoxTitle, PanelBoxTitleWrapper, PanelEquipmentContainer, PanelEquipmentRow, PanelHeader, PanelHeaderWrapper, PanelWrapper } from "../../styles/panel.style";



interface MapAssetPanelProps {
    title?: string;
    assets: PanelAssets[];
    layerId: string;
    selecedMarkerBase64: string;
    assetFeatures: Feature<GeometryPointType, PropertyType>[]
}


const MapAssetPanel = (props: MapAssetPanelProps) => {

    const {title, assets, layerId, selecedMarkerBase64, assetFeatures} = props;

    return (
        <PanelWrapper>
                <PanelHeaderWrapper><PanelHeader>MapAssetPanel</PanelHeader></PanelHeaderWrapper>
            <PanelBody>
                {assets && assets.map((asset, idx) => {
                    return (
                        <PanelBoxContainer key={`${asset.uid}_${asset.properties.type}`} $isActive>
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