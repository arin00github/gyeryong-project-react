import { http, HttpResponse } from "msw";
import { SAFE_ROAD_API_URL } from "../utils/constant";
import { makeSafeRoadData, safeRoadAssetMockupData, safeRoadDailyStatusMockupData, safeRoadDataArray, safeRoadStatusMockupData } from "../data/safeRoad.data";
import { GetSafeRoadDailyStatusParams, GetSafeRoadStatusParams, SafeRoadStatusResult } from "../interfaces/safeRoad.interface";



export const handlers = [
     /**********************************************************************************************
     * 스마트 안심길
     *********************************************************************************************/
    http.post(SAFE_ROAD_API_URL.getAsset_test, () => {
        console.log('[MSW] getAsset_test')
        return HttpResponse.json(safeRoadAssetMockupData)
    }),
    http.post(SAFE_ROAD_API_URL.getChart_test, async() => {
        return HttpResponse.json(safeRoadDailyStatusMockupData);
    }),
    http.post(SAFE_ROAD_API_URL.getHistory_test, async({request}) => {
        const requestBody: GetSafeRoadStatusParams = await request.json() as GetSafeRoadStatusParams;
        console.log('requestBody', requestBody)

        const devArray = safeRoadAssetMockupData.response.results.map(dev => dev.deveui);
        const targetEui = devArray.find(dev => dev === requestBody.deveui);
        console.log('targetEui', targetEui)

        if (targetEui) {
            const resultData = requestBody.deveui
                ? makeSafeRoadData({
                      deveui: requestBody.deveui,
                      startDate: requestBody.start_date,
                      endDate: requestBody.end_date,
                      pageNum: requestBody.page_num || 0,
                      dataArray: safeRoadDataArray,
                  })
                : safeRoadStatusMockupData;
            return HttpResponse.json(resultData);
        } else {
            return HttpResponse.error();
        }
    })
]