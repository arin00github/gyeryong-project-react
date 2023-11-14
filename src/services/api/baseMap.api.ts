import axios, { AxiosError, AxiosResponse } from "axios";
import { LayerCreationConfig } from "../../baseMap/baseMap.interface";
import { REQUEST_OPTIONS } from "./common";
import { FETCH_API_URLS } from "../../utils/constant";
import { configureUrl } from "../../utils/utils";
import { FeatureCollection } from "geojson";

/** 지도 내 자산 호출을 위한 지역 코드 */
const AREA_CODE = 44250;





/**
 * gis 서비스에 등록된 레이어의 feature 및 스타일 조회 api fetch
 * @async
 * @function fetchFeatureAndStyleData
 * @param {string} layerId 지도 생성을 위한 레이어 아이디
 * @returns {Promise<LayerCreationConfig | undefined>}
 */
export const fetchFeatureAndStyleData = async (
    layerId: string,
): Promise<LayerCreationConfig | undefined> => {

    const feature_url = configureUrl({testUrl: FETCH_API_URLS.postFeature_test, devUrl: FETCH_API_URLS.postFeature})
    const style_url = configureUrl({testUrl: FETCH_API_URLS.postLayerStyle_test, devUrl: FETCH_API_URLS.postLayerStyle})    
    const fetchPostFeature = axios(feature_url, {
        ...REQUEST_OPTIONS,
        data: {
            layerId,
            area: AREA_CODE,
            properties_all: true,
        },
    });

    const fetchPostLayerStyle = axios(style_url, {
        ...REQUEST_OPTIONS,
        data: { layerId },
    });
    return axios
        .all([fetchPostFeature, fetchPostLayerStyle])
        .then(
            axios.spread((...responses: AxiosResponse[]) => {
                const postFeatureResponse = responses[0];
                const postLayerStyleResponse = responses[1];
                console.log('api res', responses)
                if (
                    postFeatureResponse &&
                    postFeatureResponse.status === 200 &&
                    postLayerStyleResponse &&
                    postLayerStyleResponse.status === 200
                ) {
                    return {
                        postFeatures: postFeatureResponse.data[0],
                        postLayerStyles: postLayerStyleResponse.data[0],
                    };
                }
                return undefined;
            }),
        )
        .catch((error: AxiosError) => {
            console.log("fetchFeatureAndStyleData", error);
            return undefined;
        });
};
