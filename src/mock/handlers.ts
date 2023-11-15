import { http, HttpResponse } from "msw";
import { FETCH_API_URLS, SAFE_ROAD_API_URL } from "../utils/constant";
import { makeSafeRoadData, safeRoadAssetMockupData, safeRoadDailyStatusMockupData, safeRoadDataArray, safeRoadStatusMockupData } from "../data/safeRoad.data";
import { GetSafeRoadStatusParams } from "../interfaces/safeRoad.interface";
import { FeatureCollection } from "geojson";
import safeRoadGeojson from '../data/safeRoad.geodata';
import { safeRoadSymbol, busSymbol, finedustSymbol, crossWalkSymbol } from "../data/layerStyle.data";


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

        const devArray = safeRoadAssetMockupData.response.results.map(dev => dev.deveui);
        const targetEui = devArray.find(dev => dev === requestBody.deveui);

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
    }),
    /**********************************************************************************************
     * 모니터링
     *********************************************************************************************/
    http.post(FETCH_API_URLS.postFeature_test, async({request}) => {
       const requestBody = await request.json() as Record<string, any>;
       const {layerId} = requestBody;
       //new HttpResponse('postFeature API success', {status: 200});
       if(layerId === 'layer_relaxroad'){
           return HttpResponse.json(safeRoadGeojson as unknown as FeatureCollection);
       } else {
           return HttpResponse.error();
       }
    }),
    http.post(FETCH_API_URLS.postLayerStyle_test, async({request}) => {
        const requestBody = await request.json() as Record<string, any>;
        const {layerId} = requestBody;
        //new HttpResponse('postFeature API success', {status: 200});
        if(layerId === 'layer_relaxroad'){
            return HttpResponse.json(safeRoadSymbol.response.results);
        } else if(layerId === 'layer_businfo') {
            return HttpResponse.json(busSymbol.response.results);
        } else if(layerId ==='layer_finddust'){
            return HttpResponse.json(finedustSymbol.response.results);
        } else if (layerId === 'layer_crosswalk') {
            return HttpResponse.json(crossWalkSymbol.response.results);
        }else  {
            return HttpResponse.error();
        }
     }),
]