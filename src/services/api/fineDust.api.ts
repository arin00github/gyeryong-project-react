
import { GetFineDustAssetResponse, GetFineDustDataParams, GetFineDustDataResponse, GetFineDustDailyResponse } from "../../interfaces/fineDust.interface"
import { ErrorResponse } from "../../interfaces/http.interface"
import { FINE_DUST_API_URL } from "../../utils/constant"
import { configureUrl } from "../../utils/utils"
import { HTTP_REQUEST_TIMEOUT, executeRequest } from "./common"


/**
 * 미세먼지 자산 목록 조회
 * @returns {Promise<GetFineDustAssetResponse | ErrorResponse | undefined>}
 */
export const getFineDustAssets = async():Promise<GetFineDustAssetResponse | ErrorResponse | undefined> => {
    const url = configureUrl({
        testUrl: FINE_DUST_API_URL.getAsset_test,
        devUrl: FINE_DUST_API_URL.getAsset
    })

    const resObject = await executeRequest(url, {method: "POST", timeout: HTTP_REQUEST_TIMEOUT})

    if(resObject){
        switch(resObject.status){
            case 200:
                return resObject.data as GetFineDustAssetResponse;
            case 401:
               window.location.reload();
               break;  
            default:
                throw resObject.data as ErrorResponse;
        }
    } else {
        throw new Error('getFineDustAssets API Error')
    }
}

/**
 * 스마트 미세먼지 데이터 현황 목록 조회
 * @param {GetFineDustDataParams} params 데이터 현황 조회를 위한 parameter 정보
 * @returns {Promise<GetFineDustDataResponse| ErrorResponse | undefined>}
 */
export const getFineDustData = async (params: GetFineDustDataParams): Promise<GetFineDustDataResponse| ErrorResponse | undefined> => {
    const url = configureUrl({
        testUrl: FINE_DUST_API_URL.getHistory_test,
        devUrl: FINE_DUST_API_URL.getHistory
    })

    const resObject = await executeRequest(url, {method: "POST", data: params, timeout: HTTP_REQUEST_TIMEOUT})
    if(resObject){
        switch(resObject.status){
            case 200: 
              return resObject.data as GetFineDustDataResponse;
            case 401:
                window.location.reload();
                break;
            default: 
                throw resObject.data as ErrorResponse;
        }
    }else {
        throw new Error('getFineDustData API Error')
    }
}

/**
 * 스마트 미세먼지 일별 데이터 현황 목록 조회
 * @param {GetFineDustDataParams} params 일별 데이터 현황 조회 parameter 정보
 * @returns {Promise<GetFineDustDailyResponse | ErrorResponse | undefined>}
 */
export const getFineDustDailyData = async(params:GetFineDustDataParams): Promise<GetFineDustDailyResponse | ErrorResponse | undefined> => {
    const url = configureUrl({
        testUrl: FINE_DUST_API_URL.getChart_test,
        devUrl: FINE_DUST_API_URL.getChart
    })

    const resObject = await executeRequest(url, {method: "POST", data: params, timeout: HTTP_REQUEST_TIMEOUT})
    if(resObject){
        switch(resObject.status){
            case 200: 
               return resObject.data as GetFineDustDailyResponse;
            case 401:
                window.location.reload();
                break;
            default:
                throw resObject.data as ErrorResponse;
        }
    }else {
        throw new Error('getFineDustDailyData API Error')
    }
}