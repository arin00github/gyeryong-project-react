import { http, HttpResponse } from "msw";
import { SAFE_ROAD_API_URL } from "../utils/constant";
import { createSafeRoadDailyData, createSafeRoadData, fakeSafeRoadAssetData, fakeSafeRoadDailyData, fakeSafeRoadData } from "../data/safeRoad.data";
import { GetSafeRoadDailyStatusParams, GetSafeRoadStatusParams, SafeRoadStatusResult } from "../interfaces/safeRoad.interface";



export const handlers = [
     /**********************************************************************************************
     * 스마트 안심길
     *********************************************************************************************/
    http.post(SAFE_ROAD_API_URL.getAsset_test, () => {
        return HttpResponse.json(fakeSafeRoadAssetData)
    }),
    http.post(SAFE_ROAD_API_URL.getChart_test, async({request}) => {
        const {deveui} = await request.json() as GetSafeRoadDailyStatusParams;
        if(deveui){
            const resultData = createSafeRoadDailyData({dataArray: fakeSafeRoadDailyData, searchData: {
                dateString: 'sync_date',
                timeString: 'time',
            }})
            return HttpResponse.json(resultData)
        }else {
            return HttpResponse.error()
        }
    }),
    http.post(SAFE_ROAD_API_URL.getHistory_test, async({request}) => {
        const {deveui, start_date, end_date, page_num} = await request.json() as GetSafeRoadStatusParams;
        if(deveui){
            const resultData = createSafeRoadData<SafeRoadStatusResult>({
                startDate: start_date, 
                endDate: end_date, 
                deveui: deveui, 
                dataArray: fakeSafeRoadData,
                pageNum: page_num || 1,
                searchData: {
                    dateString: 'sync_date',
                    timeString: 'sync_time',
                    assetId: 'deveui'
            }})
            return HttpResponse.json(resultData)
        }else {
            return HttpResponse.error()
        }
    })
]