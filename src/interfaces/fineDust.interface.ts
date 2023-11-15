import { HttpResponse } from "./http.interface";


/** 메시먼지 자산 목록 조회 result */
export interface GetFineDustAssetResult {
    uid: string;
    name: string;
    address: string;
    traffic_light: string;
    temp_sensor: string;
    finedust_sensor: string;
}

/** 메시먼지 자산 목록 조회 response */
export interface GetFineDustAssetResponse extends HttpResponse {
    response: {
        results: GetFineDustAssetResult[];
        totalCount: number;
    }
}


/** 스마트 미세먼지 데이터 현황 목록 조회 params */
export interface GetFineDustDataPamras {
    /** place ID */
    deveui?: string;
    /** 조회 시작일자 */
    start_date: string;
    /** 조회 종료일자 */
    end_date: string;
    /** 페이지 건수 */
    page_cnt?: number;
    /** 페이지 넘버 */
    page_num?: number;

}

/** 스마트 미세먼지 데이터 현황 목록 조회 result */
export interface GetFineDustDataResult {
    uid: string;
    sync_date: string;
    sync_time: string;
    asset_name: string;
    deveui: string;
    state: string;
    pm10: number;
    pm25: number;
    temp: number;
    humidity: number;
    traffic_light: string;
    temp_sensor: string;
    finddust_sensor: string;
}

/** 스마트 미세먼지 데이터 현황 목록 조회 response */
export interface GetFineDustDataResponse extends HttpResponse {
    response: {
        results: GetFineDustDataResult[];
        count: number;
        totalCount: number;
    }
}

/** 일별 스마트 미세먼지 데이터 현황 목록 조회 params */
export interface GetFineDustDailyParams {
    [key: string]: string | number | undefined;
    /** place ID */
    deveui?: string;
}

/** 일별 스마트 미세먼지 데이터 현황 목록 조회 result */
export interface GetFineDustDailyResult {
    uid: string;
    sync_date: string;
    time: string;
    pm10: number;
    pm25: number;
    temp: number;
    humidity: number;
}

/** 일별 스마트 미세먼지 데이터 현황 목록 조회 response */
export interface GetSmartFineDustDailyResponse extends HttpResponse {

    response: {
        results: GetFineDustDailyResult[];
        totalCount: number
    }
}