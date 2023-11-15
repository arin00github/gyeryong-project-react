import { MapClickPositionInfo, PostFeatureResponse } from "./baseMap.interface";
import { Geometry, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, Map } from "ol";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import { DISPLAY_PROJECTION_NAME, EMPTY_ICON, LAYER_TYPE_KEY, SELECTED_CIRCLE_FEATURE_KEY, SELECTED_CIRCLE_FEATURE_VALUE } from "./baseMap.constant";
import { getCurrentScale, transformFromLonLat } from "./baseMap.utils";
import { MAP_PROJECTIONS } from "./baseMap.projections";
import { transform } from "ol/proj";



/** getPointFeatures 함수의 parameter */
export interface GetPointFeaturesParams {
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

/**
 * 자산 데이터를 Point Feature로 변환하여 vectorSource에 추가
 * @param {Map} params.mapObject - 지도 객체
 * @param {PostFeatureResponse} params.postFeatureResponse - postFeature Response 데이터 구조
 * @param {VectorLayer<VectorSource<Geometry>>} params.vectorLayer - 벡터 레이어
 * @param {string | undefined} params.pngBase64 - png로 변환한 지도에 표출되는 레이어의 자산 아이콘
 * @param {string | undefined} params.selectedMarkerBase64 - png로 변환한 지도에 표출되는 선택 표시 아이콘
 * @param {number} params.scaleIconSize - scale 처리용 아이콘 사이즈
 * @param params.mapClickPositionCallback - 지도 위 클릭 지점 position 정보를 반환하는 콜백 함수 
 */
export const getPointFeatures = (params: GetPointFeaturesParams) => {
    const { postFeatureResponse, vectorLayer, pngBase64, mapClickPositionCallback, mapObject } = params;
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
    featureVectorSource?.addFeatures(pointFeatures);

    if(mapObject){
        mapObject.on('pointermove', (evt) => {
           
            if(evt.dragging){
                return
            }
            const pixel = evt.map.getEventPixel(evt.originalEvent);
            const hit = evt.map.hasFeatureAtPixel(pixel);
            mapObject.getTargetElement().style.cursor = hit ? 'pointer' : '';
        })
        mapObject.on('singleclick', (evt) => {
            console.log('evt', evt)
            mapClickPositionCallback({
                center: evt.coordinate,
                convert_center: transform(evt.coordinate, DISPLAY_PROJECTION_NAME, MAP_PROJECTIONS.baro.projectionName),
                radius: getCurrentScale(mapObject) ? (getCurrentScale(mapObject) as number) / 2 : undefined,
            })
        })
    }
}

/** removeDuplicateFeatures 함수의 parameter */
interface RemoveDuplicateFeaturesParams {
    vectorSource: VectorSource<Geometry>;
    key: string;
    value: string;
}


/**
 * 중복된 feature 제거
 * @param {VectorSource<Geometry>} params.vecorSource  - 중복된 feature를 제거할 vectorSource
 * @param {string} params.key  - 중복 된 feature를 탐색 할 properties key
 * @param {string} params.value  - 중복 된 feature를 탐색 할 properties value
 */
export const removeDuplicateFeatures = (params:RemoveDuplicateFeaturesParams) => {
   const { vectorSource, key, value } = params;

   const features = vectorSource.getFeatures();
   const isDuplicateFeature = features.filter((feature) => feature.get(key) === value);
   if(isDuplicateFeature && isDuplicateFeature.length > 0){
       isDuplicateFeature.forEach((feature) => vectorSource.removeFeature(feature))
   }
}


/** toggleSelectedFeature 함수의 parameter */
export interface ToggleSelectedFeatureParams {
    /** 지도 객체 */
    mapObject: Map | undefined;
    /** toggle 대상 레이어 id */
    layerId?: string;
    /** toggle 대상 선택한 자산의 id */
    selectedId?: string | undefined;
    /** png로 변환한 지도에 표출되는 선택 표시 아이콘 */
    selectedMarkerBase64?: string;
}


/**
 * 지도 위 자산 선택/선택 해제시 강조 표시를 위한 함수
 * @param {Map | undefined} params.mapObject - 지도 객체
 * @param {string | string} params.layerId - toggle 대상 레이어 id
 * @param {string | string} params.selectedId - toggle 대상 선택한 자산의 id
 * @param {string | string} params.selectedMarkerBase64 - png로 변환한 지도에 표출되는 선택 표시 아이콘 
 * @returns 
 */
export const toggleSelectedFeature = (params: ToggleSelectedFeatureParams) => {
   const { mapObject, layerId, selectedId, selectedMarkerBase64 } = params;

   if(!mapObject || !layerId){
    return;
   }

   const findLayer = mapObject.getAllLayers().find((layer) => layer.getProperties()[LAYER_TYPE_KEY] === layerId);

   if(!findLayer){
       return;
   }
   const featureVectorSource = findLayer.getSource() as VectorSource<Geometry>;

   if(!featureVectorSource){
       return;
   }    

   removeDuplicateFeatures({vectorSource: featureVectorSource , key: SELECTED_CIRCLE_FEATURE_KEY, value: SELECTED_CIRCLE_FEATURE_VALUE});
   if(!selectedId){
    return
   }

   const features = featureVectorSource.getFeatures();
   const findFeatre = features.find((feature) => feature.getProperties().id === selectedId);
   if(!findFeatre){
    return
   }

   const selectedCoordinates:number[] = (findFeatre.getGeometry() as Point).getCoordinates();
    const selectedFeature = new Feature({
         geometry: new Point(selectedCoordinates),
    });
    selectedFeature.set(SELECTED_CIRCLE_FEATURE_KEY, SELECTED_CIRCLE_FEATURE_VALUE);
    selectedFeature.setStyle(new Style({
        image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            crossOrigin: "anonymous",
            src: selectedMarkerBase64,
            rotateWithView: true,
        })
    }))

    featureVectorSource.addFeature(selectedFeature);
}