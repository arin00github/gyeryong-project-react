import { MapClickPositionInfo, PostFeatureResponse } from "./baseMap.interface";
import { Geometry, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, Map } from "ol";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { DISPLAY_PROJECTION_NAME, EMPTY_ICON } from "./baseMap.constant";
import { transformFromLonLat } from "./baseMap.utils";
import { MAP_PROJECTIONS } from "./baseMap.projections";
import Fill from "ol/style/Fill";
import { transform } from "ol/proj";
/** 좌표의 위치한 자산(feature)을 지도에 표시하는 레이어 생성에 필요한 props 정보 */
export interface GetPointFeaturesProps {
    /** 지도 객체 */
    mapObject: Map;
    /** postFeature Response 데이터 구조 */
    postFeatureResponse: PostFeatureResponse;
    /** 벡터 레이어 */
    vectorLayer: VectorLayer<VectorSource<Geometry>>;
    /** png로 변환한 지도에 표출되는 레이어의 자산 아이콘 */
    pngBase64?: string;
    /** png로 변환한 지도에 표출되는 선택 표시 아이콘 */
    selectedMarkerBase64?: string;
    /** scale 처리용 아이콘 사이즈 */
    scaleIconSize: number;
    /** 지도 위 클릭 지점 position 정보를 반환하는 콜백 함수 */
    mapClickPositionCallback: (mapClickPositionInfo: MapClickPositionInfo) => void;
}


export const getPointFeatures = (props: GetPointFeaturesProps) => {
    const { postFeatureResponse, vectorLayer, pngBase64 } = props;
    const featureVectorSource = vectorLayer.getSource();
    const featureStyle = new Style({
        //fill: new Fill({color: 'red'}),
        image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            crossOrigin: "anonymous",
            //color: 'red',
            //size: [20, 20],
            src: pngBase64 ? pngBase64 : EMPTY_ICON,
            rotateWithView: true,
        }),
    });

    const pointFeatures = postFeatureResponse.features.map((feature) => {
        const newFeature = new Feature({
            geometry: new Point(transformFromLonLat(transform(feature.geometry.coordinates, MAP_PROJECTIONS.baro.projectionName, DISPLAY_PROJECTION_NAME), MAP_PROJECTIONS.baro.projectionName)),
        })
        Object.keys(feature.properties).forEach((key) => {
            newFeature.set(key, feature.properties[key])
        });
        newFeature.setStyle(featureStyle);
        return newFeature;
    });
    console.log('pointFeatures', pointFeatures)
    featureVectorSource?.addFeatures(pointFeatures);
}