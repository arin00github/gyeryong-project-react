
/*********************************************************************************************
 * 스마트 안심길 데이터현황 목록 조회
 ********************************************************************************************/

import { HttpResponse } from "./http.interface";



export interface GetSafeRoadStatusParams {
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


export interface SafeRoadStatusResult  {
    sync_date: string;
    sync_time: string;
    devnm: string;
    deveui: string;
    devstate: string;
    fast_pass: number;
    normal_pass: number;
    speed_average: number;
}

export interface GetSafeRoadStatusResponse extends HttpResponse {
    /** 응답 값 */
    response?: {
        /** 응답 결과 값의 배열 */
        results: SafeRoadStatusResult[];
        /** 응답 row 갯수 */
        count: number;
        /** 전체 데이터 수 */
        totalCount: number;
    };
}


/*********************************************************************************************
 * 스마트 안심길 자산 조회
 ********************************************************************************************/

export interface SafeRoadAssetResult {
    deveui: string;
    name: string;
}

export interface GetSafeRoadAssetResponse extends HttpResponse {
    /** 응답 값 */
    response?: {
        /** 응답 결과 값의 배열 */
        results: SafeRoadAssetResult[];
        /** 전체 데이터 수 */
        totalCount: number;
    };
}

/*********************************************************************************************
 * 스마트 안심길 일별 데이터현황 조회
 ********************************************************************************************/

/** 스마트 안심길 일별 데이터현황 조회 params */
export interface GetSafeRoadDailyStatusParams {
    deveui?: string;
    yAxis?:string;
}

/** 스마트 안심길 일별 데이터현황 조회 results */
export interface SafeRoadDailyStatusResult {
    sync_time: string;
    time: string;
    fast_pass: number;
    normal_pass: number;
}

export interface GetSafeRoadDailyStatusResponse extends HttpResponse {
    /** 응답 값 */
    response?: {
        /** 응답 결과 값의 배열 */
        results: SafeRoadDailyStatusResult[];
        /** 전체 데이터 수 */
        totalCount: number;
    };
}