import proj4 from "proj4"
import { MAP_PROJECTIONS } from "./baseMap.projections"
import { register } from "ol/proj/proj4";
import { METERS_PER_UNIT, fromLonLat } from "ol/proj";
import { Map } from "ol";
import { Coordinate } from "ol/coordinate";
import { MetersPerUnit } from "./baseMap.interface";
import { loadImage } from "canvas";

/**
 * 기본 지도 좌표계 등록 (바로E맵, EPSG:5181)
 * @return {void}
 */
export const setDefaultProjection = ():void => {
    proj4.defs(MAP_PROJECTIONS.baro.projectionName, MAP_PROJECTIONS.baro.projection);
    register(proj4)
}

/**
 * 좌표(coordinates)를 경도/위도에서 다른 투영법으로 변환
 * @function getFromLonLat
 * @param {number[]} coordinates - 경도/위도 좌표
 * @param {string} projectionName - 투영법 이름
 * @return {number[]}
 */
export const transformFromLonLat = (coordinates:number[], projectionName: string):number[] => {
    return fromLonLat(coordinates, projectionName)
}

/**
 * @name moveMapByCoordinates
 * @function
 * @description 맵을 특정 위치 좌표(coordinates)로 이동
 * @return {void}
 */
export const moveMapByCoordinates = (mapObject: Map, coordinates: Coordinate): void => {
    mapObject.getView().animate({center: coordinates, duration: 300})
}


/**
 * 현재 지도의 scale을 계산하여 반환
 * @param {Map} mapObject - 현재 지도 객체
 * @return {number | undefined} 현재 지도의 scale 값
 */
export const getCurrentScale = (mapObject: Map): number | undefined => {
    const unit = mapObject.getView().getProjection().getUnits()
    const resolution = mapObject.getView().getResolution();
    const metersPerUnit = METERS_PER_UNIT as MetersPerUnit;
    if(resolution){
        const inchesPerMeter = 39.37;
        const dpi = 25.4 / 0.28; // 25.4: inch -> mm 변환 값, 0.28: OGC WMS 표준 사양 픽셀 당 mm 값
        return Math.round(resolution * metersPerUnit[unit] * inchesPerMeter * dpi);
    }
    
    return undefined
}


/**
 * svg base64 문자열을 png 형식으로 변경하며 사이즈 변경 처리
 * @param {string} svgBase64 svg base64 문자열
 * @param {number} width width px 단위의 너비
 * @param {number} height height px 단위의 높이
 * @return {string}
 */
export const resizeSvgToPng = async(svgBase64: string, width: number, height: number): Promise<string> => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const img = await loadImage(svgBase64);

    ctx?.drawImage(img as any, 0, 0, width, height);
    const pngBase64 = canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");

    return `data:image/png;base64,${pngBase64}`;
}

export const convertSvgSize = (svgBase64: string, width: number, height: number): string => {
    // 입력된 base64 형식의 SVG 데이터를 디코딩하여 원본 SVG 코드를 가져옴
    const base64Code = atob(svgBase64.split('base64,')[1]);
    //console.log('base64Code', base64Code)
    // 가져온 SVG 코드를 파싱하여 XML 문서로 변환
    const svgDom = new DOMParser().parseFromString(base64Code, 'image/svg+xml');
    //console.log('svgDom', svgDom)
    // SVG 문서에서 'svg' 요소를 찾아 해당 요소를 가져옴
    const svgElement = svgDom.getElementsByTagName('svg')[0];
    //console.log('svgElement', svgElement)
    // 'width'와 'height' 속성을 설정하여 SVG 이미지의 크기를 변경
    svgElement.setAttribute('width', `${width}px`);
    svgElement.setAttribute('height', `${height}px`);
    //return `data:image/svg+xml;base64,${btoa(svgDom.documentElement.outerHTML)}`;
    // 변경된 SVG를 base64 형태의 문자열로 반환
    // 기존 코드는 serializeToString()을 사용하여 전체 XML 문서를 문자열로 변환
    // 그 후, 변환된 문자열을 base64로 인코딩하여 반환
    //console.log('new XMLSerializer().serializeToString(svgDom)', new XMLSerializer().serializeToString(svgDom))
    return `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svgDom))}`;
}