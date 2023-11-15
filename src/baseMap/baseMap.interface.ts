import { Map } from "ol";
import { Coordinate } from "ol/coordinate";

import { GeometryPointType, PropertyType } from "../interfaces/geo.interface";
import { FeatureCollection, Feature } from "geojson";

/**********************************************************************************************
 * baseMap http 관련 interface 정의
 *********************************************************************************************/


/** postFeature 응답 데이터 interface  */
export interface PostFeatureResponse {
    /** 타입 FeatureCollection */
    type: string;
    /** 요청 대상 레이어 명 */
    layer: string;
    /** 요청 대상 레이어의 feature 정보 배열 */
    features: Feature<GeometryPointType, PropertyType>[];
}

/** postFeature 응답 데이터의 results 배열 interface  */
export interface PostLayerStyleResult {
    /** 레이어 id */
    layer_id: string;
    /** 서브레이어 id */
    sublayer_id: string;
    /** 서브레이어 이름 */
    sublayer_name: string;
    /** 서브레이어 스타일 */
    sublayer_style: string;
    /** 서브레이어 등록일 */
    reg_date: string;
    /** 아이콘 id */
    icon_id: string;
    /** 아이콘 이미지 */
    icon_img: string;
    /** 아이콘 이미지 종류 */
    icon_img_type: string;
    /** 아이콘 종류 */
    icon_type: string;
}


/** postFeatureDetail 응답 데이터의 feature 배열 interface  */
export interface PostFeatureDetailFeature {
    /** feature 타입 */
    type: string;
    /** feature의 공간 정보 */
    geometry: {
        /** feature 타입, point, polygon, line 등 */
        type: string;
        /** feature 의 중심 좌표, 점 타입이 아닌 경우 각 feature의 중앙 위치를 말한다. */
        center: number[];
        /** feature의 위치 정보 (EPSG:5179 좌표) */
        coordinates: number[];
    };
    /** geometry 유형, geom, line, polygon 등 */
    geometry_name: string;
    /** feature의 properties 정보 */
    properties: PropertyType;
}

/**  postFeatureDetail 응답 데이터 interface */
export interface PostFeatureDetailResponse {
    /** 타입 FeatureCollection */
    type: string;
    /** 요청 대상 레이어의 feature 정보 배열 */
    features: PostFeatureDetailFeature[];
}


/**********************************************************************************************
 * baseMap 생성 parameter interface 정의
 *********************************************************************************************/

/** 지도 생성을 위한 설정 정보 */
export interface MapCreationConfig {
    /** 초기 지도 화면의 중심 좌표 */
    center: number[];
    /** 지도의 최소 줌 레벨 */
    minZoom: number;
    /** 지도의 최대 줌 레벨 */
    maxZoom: number;
    /** 초기 지도 화면의 줌 레벨 */
    zoom: number;
    /** 레이어 id */
    layerId: string;
    /** 기본 subLayer, 스타일 처리용 */
    subLayerId: string;
    /** 지도 위 자산으로 표현되는 icon의 가로 너비, px 단위 */
    iconWidth: number;
    /** 지도 위 자산으로 표현되는 icon의 세로 높이, px 단위 */
    iconHeight: number;
    /** 지도 위 자산 선택 시 보여질 icon */
    selectedIcon: string;
    /** slider left */
    sliderLeft?: number;
    /** slider bottom */
    sliderBottom?: number;
}

/** 지도 위 레이어 생성을 위한 설정 정보 (postFeature, postLayerStyle 의 응답 데이터) */
export interface LayerCreationConfig {
    /** postFeature 응답 데이터 feature 배열 정보 */
    postFeatures: PostFeatureResponse;
    /** postLayerStyle 응답 데이터 스타일 배열 정보*/
    postLayerStyles: PostLayerStyleResult;
}

/**********************************************************************************************
 * 자산 레이어 및 feature 정보 관련 interface 정의
 *********************************************************************************************/

/** 지도의 확대 축소에 레벨에 따른 scale 처리 지정 값 */
export interface ClusterScale {
    [key: string]: number;
    "48": number;
    "40": number;
    "32": number;
    "24": number;
    "16": number;
    minScale: number;
}

/** 지도에서 선택한 위치 정보(postFeatureDetail api request 정보) */
export interface MapClickPositionInfo {
    /** 중심 좌표 */
    center: Coordinate;
    /** 4326 투영법으로 변경한 중심 좌표 */
    convert_center: number[];
    /** postFeatureDetail 검색을 위한 클릭 지점의 반경 */
    radius: number | undefined;
}



/** scale 단위당 meter 처리용 interface */
export interface MetersPerUnit {
    [key: string]: number;
}

