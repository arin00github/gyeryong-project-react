import { HttpResponse } from "./http.interface";


export type CctvAssetType = {
    id: string;
    name: string;
    state: number
}

/** 스마트 횡단 보도 자산 정보 조회 results */
export interface GetCrossWalkAssetResult {
    uid: string;
    name: string;
    address: string;
    cctv: CctvAssetType[]
}

/** 스마트 횡단 보도 자산 정보 response */
export interface GetCrossWalkAssetResponse extends HttpResponse {
    response: {
        results: GetCrossWalkAssetResult[];
        totalCount: number;
    }
}

/** 스마트 횡단 보도 이벤트 목록 조회 params */
export interface GetCrossWalkEventParams {
    /** place ID */
    asset_id?: string;
    /** 조회 시작일자 */
    start_date: string;
    /** 조회 종료일자 */
    end_date: string;
    /** 페이지 건수 */
    page_cnt?: number;
    /** 페이지 넘버 */
    page_num?: number;
}

/** 스마트 횡단 보도 이벤트 목록 조회 results */
export interface GetCrossWalkEventResult {
    uid: string;
    reg_date: string;
    event_name: string;
    crosswalk_name: string;
    cctv_name: string;
}


/** 스마트 횡단 보도 이벤트 목록 조회 response */
export interface GetCrossWalkEventResponse extends HttpResponse {
    response: {
        results: GetCrossWalkEventResult[];
        count: number;
        totalCount: number;
    }
}

/** 스마트 횡단 보도 일별 이벤트 조회 params */
export interface GetCrossWalkDailyEventParams {
    [key: string]: string | number | undefined;
    /** place ID */
    asset_id?: string; 
}

/** 스마트 횡단 보도 일별 이벤트 조회 result */
export interface GetCrossWalkDailyEventResult {
    sync_date: string;
    time: string;
    cnt: number
}

/** 스마트 횡단 보도 일별 이벤트 조회 response */
export interface GetCrossWalkDailyEventResponse extends HttpResponse {
    response: {
        results: GetCrossWalkDailyEventResult[];
        count: number;
        totalCount: number;
    }
}