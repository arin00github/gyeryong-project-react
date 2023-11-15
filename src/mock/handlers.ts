import { http, HttpResponse } from "msw";
import { CROSSWALK_API_URL, FETCH_API_URLS, FINE_DUST_API_URL, SAFE_ROAD_API_URL, SMART_BUS_API_URL } from "../utils/constant";
import { makeSafeRoadData, safeRoadAssetMockupData, safeRoadDailyStatusMockupData, safeRoadSourceArray, safeRoadStatusMockupData } from "../data/safeRoad.data";
import { GetSafeRoadStatusParams } from "../interfaces/safeRoad.interface";
import { FeatureCollection } from "geojson";
import safeRoadGeojson from '../data/safeRoad.geodata';
import { safeRoadSymbol, busSymbol, finedustSymbol, crossWalkSymbol } from "../data/layerStyle.data";
import { fineDustAssetMockupData, fineDustDailyMockupData, finedustResourceArray, makeFineDustData } from "../data/fineDust.data";
import { crossWalkSourceArray, crossWarkAssetData, crossWarkDailyData, makeCrossWalkData, } from "../data/crossWalk.data";
import { makeBusData, smartBusAssetMockupData, smartBusSourceArray } from "../data/bus.data";
import { GetCrossWalkEventParams } from "../interfaces/crossWalk.interface";
import { GetFineDustDataParams } from "../interfaces/fineDust.interface";
import { GetSmartBusDataParams } from "../interfaces/smartBus.interface";


export const handlers = [
     /**********************************************************************************************
     * 스마트 안심길
     *********************************************************************************************/
    http.post(SAFE_ROAD_API_URL.getAsset_test, () => {
      
        return HttpResponse.json(safeRoadAssetMockupData)
    }),
    http.post(SAFE_ROAD_API_URL.getChart_test, async() => {
        return HttpResponse.json(safeRoadDailyStatusMockupData);
    }),
    http.post(SAFE_ROAD_API_URL.getHistory_test, async({request}) => {
        const requestBody = await request.json() as GetSafeRoadStatusParams;

        const devArray = safeRoadAssetMockupData.response.results.map(dev => dev.deveui);
        const targetEui = devArray.find(dev => dev === requestBody.deveui);

        if (targetEui) {
            const resultData = requestBody.deveui
                ? makeSafeRoadData({
                      deveui: requestBody.deveui,
                      startDate: requestBody.start_date,
                      endDate: requestBody.end_date,
                      pageNum: requestBody.page_num || 0,
                      dataArray: safeRoadSourceArray,
                  })
                : safeRoadStatusMockupData;
            return HttpResponse.json(resultData);
        } else {
            return HttpResponse.error();
        }
    }),

    /**********************************************************************************************
     * 스마트 미세먼지
     *********************************************************************************************/
    http.post(FINE_DUST_API_URL.getAsset_test, () => {
        console.log('[MSW] getAsset_test')
        return HttpResponse.json(fineDustAssetMockupData)
    }),
    http.post(FINE_DUST_API_URL.getChart_test, async() => {
        return HttpResponse.json(fineDustDailyMockupData);
    }),
    http.post(FINE_DUST_API_URL.getHistory_test, async({request}) => {
        const requestBody = await request.json() as GetFineDustDataParams

        const devArray = fineDustAssetMockupData.response.results.map(dev => dev.deveui);
        const targetEui = devArray.find(dev => dev === requestBody.deveui);

        if (targetEui) {
            const resultData = requestBody.deveui
                ? makeFineDustData({
                      deveui: requestBody.deveui,
                      startDate: requestBody.start_date,
                      endDate: requestBody.end_date,
                      pageNum: requestBody.page_num || 0,
                      dataArray: finedustResourceArray,
                  })
                : safeRoadStatusMockupData;
            return HttpResponse.json(resultData);
        } else {
            return HttpResponse.error();
        }
    }),
    /**********************************************************************************************
     * 스마트 횡단보도
     *********************************************************************************************/
    http.post(CROSSWALK_API_URL.getAsset_test, () => {
        console.log('[MSW] getAsset_test')
        return HttpResponse.json(crossWarkAssetData)
    }),
    http.post(CROSSWALK_API_URL.getChart_test, async() => {
        return HttpResponse.json(crossWarkDailyData);
    }),
    http.post(CROSSWALK_API_URL.getHistory_test, async({request}) => {
        const requestBody = await request.json() as GetCrossWalkEventParams

        const devArray = crossWarkAssetData.response.results.map(dev => dev.uid);
        const targetEui = devArray.find(dev => dev === requestBody.asset_id);

        if (targetEui) {
            const resultData = requestBody.asset_id
                ? makeCrossWalkData({
                      deveui: requestBody.asset_id,
                      startDate: requestBody.start_date,
                      endDate: requestBody.end_date,
                      pageNum: requestBody.page_num || 0,
                      dataArray: crossWalkSourceArray,
                  })
                : safeRoadStatusMockupData;
            return HttpResponse.json(resultData);
        } else {
            return HttpResponse.error();
        }
    }),
    /**********************************************************************************************
     * 스마트 버스
     *********************************************************************************************/
    http.post(SMART_BUS_API_URL.getAsset_test, () => {
        console.log('[MSW] getAsset_test')
        return HttpResponse.json(smartBusAssetMockupData)
    }),
    http.post(SMART_BUS_API_URL.getHistory_test, async({request}) => {
        const requestBody = await request.json() as GetSmartBusDataParams;

        const devArray = smartBusAssetMockupData.response.results.map(dev => dev.deveui);
        const targetEui = devArray.find(dev => dev === requestBody.deveui);

        if (targetEui) {
            const resultData = requestBody.deveui
                ? makeBusData({
                      deveui: requestBody.deveui,
                      startDate: requestBody.start_date,
                      endDate: requestBody.end_date,
                      pageNum: requestBody.page_num || 0,
                      dataArray: smartBusSourceArray,
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