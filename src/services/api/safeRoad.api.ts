import { ErrorResponse } from "../../interfaces/http.interface";
import { GetSafeRoadAssetResponse, GetSafeRoadDailyStatusParams, GetSafeRoadDailyStatusResponse, GetSafeRoadStatusParams, GetSafeRoadStatusResponse } from "../../interfaces/safeRoad.interface";
import { SAFE_ROAD_API_URL } from "../../utils/constant";
import { configureUrl } from "../../utils/utils";
import { HTTP_REQUEST_TIMEOUT, executeRequest } from "./common";






/**
 * 스마트 안심길 개소 조회
 * @async
 * @function getSafeRoadAssets
 * @returns {Promise<GetSafeRoadAssetResponse | ErrorResponse | undefined>}
 */
export const getSafeRoadAssets = async(): Promise<GetSafeRoadAssetResponse | ErrorResponse | undefined> => {
    const url = configureUrl({
        testUrl: SAFE_ROAD_API_URL.getAsset_test,
        devUrl: SAFE_ROAD_API_URL.getAsset
    })

    const resData = await executeRequest(url, {method: "POST", timeout: HTTP_REQUEST_TIMEOUT});

    console.log('getSafeRoadAssets resData', resData)
    
    if(resData){
        switch(resData.status){
            case 200:
                return resData.data as GetSafeRoadAssetResponse;
            case 401:
                window.location.reload();
                break;
            default:
                throw resData.data as ErrorResponse;
        }
    } else {
        throw new Error('getSafeRoadAssets API Error')
    }
}

/**
 * [테이블] 스마트 안심길 데이터현황 목록 조회
 * @async
 * @function getSafeRoadStatusData
 * @param {GetSafeRoadStatusParams} params 테이블 목록 조회를 위한 parameter 정보
 * @returns {Promise<GetSafeRoadStatusResponse | ErrorResponse | undefined>}
 */
export const getSafeRoadStatusData = async (params: GetSafeRoadStatusParams
    ):Promise<GetSafeRoadStatusResponse | ErrorResponse | undefined> => {
    const url = configureUrl({
        testUrl: SAFE_ROAD_API_URL.getHistory_test,
        devUrl: SAFE_ROAD_API_URL.getHistory
    })

    const resData = await executeRequest(url, {method: "POST", data: params, timeout: HTTP_REQUEST_TIMEOUT});
    console.log('getSafeRoadStatusData resData', resData)
    
    if(resData){
        switch(resData.status){
            case 200:
                return resData.data as GetSafeRoadStatusResponse;
            case 401:
                window.location.reload();
                break;
            default:
                throw resData.data as ErrorResponse;
        }
    } else {
        throw new Error('getSafeRoadStatusData API Error')
    }
}

/**
 * [차트] 스마트 안심길 일별 데이터현황 조회
 * @async
 * @function getSafeRoadDailyStatus
 * @param {GetSafeRoadDailyStatusParams} params 일별 데이터현황 조회를 위한 parameter 정보
 * @returns {Promise<GetSafeRoadDailyStatusResponse | ErrorResponse | undefined>}
 */
export const getSafeRoadDailyStatus = async(params: GetSafeRoadDailyStatusParams
    ):Promise<GetSafeRoadDailyStatusResponse | ErrorResponse | undefined> => {
    const url = configureUrl({
        testUrl: SAFE_ROAD_API_URL.getChart_test,
        devUrl: SAFE_ROAD_API_URL.getChart
    })

    const resData = await executeRequest(url, {
        method: "POST", 
        data: params, 
        timeout: HTTP_REQUEST_TIMEOUT
    });
    
    if(resData){
        switch(resData.status){
            case 200:
                return resData.data as GetSafeRoadDailyStatusResponse;
            case 401:
                window.location.reload();
                break;
            default:
                throw resData.data as ErrorResponse;
        }
    } else {
        throw new Error('getSafeRoadDailyStatus API Error')
    }
}