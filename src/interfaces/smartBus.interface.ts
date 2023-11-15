import { HttpResponse } from "./http.interface";

/** 스마트 버스 자산 조회 result */
export interface GetSmartBusAssetResult {
    deveui: string;
    name: string;
}

/** 스마트 버스 자산 조회 response */
export interface GetSmartBusAssetResponse extends HttpResponse {
    response: {
        results: GetSmartBusAssetResult[];
        count: number;
        totalCount: number;
    }
}



/** 스마트 버스 이벤트 목록 조회 params */
export interface GetSmartBusDataParams {
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

/** 스마트 버스 이벤트 목록 조회 result */
export interface GetSmartBusResult {
    uid: string;
    sync_date: string;
    sync_time: string;
    devnm: string;
    deveui: string;
}

/** 스마트 버스 이벤트 목록 조회 response */
export interface GetSmartBusResponse extends HttpResponse {
    response: {
        results: GetSmartBusResult[];
        count: number;
        totalCount: number;
    }
}