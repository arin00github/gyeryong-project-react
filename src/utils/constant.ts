/** @description 페이지 구분을 위한 pageType */

export const SAFE_ROAD_COMMON_URL = "/ntms-smart-relaxroad/api/v1/gyeryong";
export const SMART_BUS_COMMON_URL = "/ntms-smart-businfo/api/v1/gyeryong";
export const CROSS_WALK_COMMON_URL = "/ntms-smart-crosswalk/api/v1/gyeryong";
export const FINE_DUST_COMMON_URL = "/ntms-smart-finddust/api/v1/gyeryong";

export const makeMSWUrl = (url: string) => {
    return `http://localhost:8080${url}`;
};

export const SAFE_ROAD_API_URL = {
    getAsset: `${SAFE_ROAD_COMMON_URL}/get/asset`,
    getAsset_test: makeMSWUrl(`${SAFE_ROAD_COMMON_URL}/get/asset`),
    getHistory: `${SAFE_ROAD_COMMON_URL}/get/history`,
    getHistory_test: makeMSWUrl(`${SAFE_ROAD_COMMON_URL}/get/history`),
    getChart: `${SAFE_ROAD_COMMON_URL}/get/dashboard`,
    getChart_test: makeMSWUrl(`${SAFE_ROAD_COMMON_URL}/get/dashboard`),
    exportHistory: `${SAFE_ROAD_COMMON_URL}/export/history`,
};

export const SMART_BUS_API_URL = {
    getAsset: `${SMART_BUS_COMMON_URL}/get/asset`,
    getAsset_test: makeMSWUrl(`${SMART_BUS_COMMON_URL}/get/asset`),
    getHistory: `${SMART_BUS_COMMON_URL}/get/history`,
    getHistory_test: makeMSWUrl(`${SMART_BUS_COMMON_URL}/get/history`),
    exportHistory: `${SMART_BUS_COMMON_URL}/export/history`,
};

export const CROSSWALK_API_URL = {
    getAsset: `${CROSS_WALK_COMMON_URL}/get/asset`,
    getAsset_test: makeMSWUrl(`${CROSS_WALK_COMMON_URL}/get/asset`),
    getHistory: `${CROSS_WALK_COMMON_URL}/get/history`,
    getHistory_test: makeMSWUrl(`${CROSS_WALK_COMMON_URL}/get/history`),
    getChart: `${CROSS_WALK_COMMON_URL}/get/dashboard`,
    getChart_test: makeMSWUrl(`${CROSS_WALK_COMMON_URL}/get/dashboard`),
    exportHistory: `${CROSS_WALK_COMMON_URL}/export/history`,
};

export const FINE_DUST_API_URL = {
    getAsset: `${FINE_DUST_COMMON_URL}/get/asset`,
    getAsset_test: makeMSWUrl(`${FINE_DUST_COMMON_URL}/get/asset`),
    getHistory: `${FINE_DUST_COMMON_URL}/get/history`,
    getHistory_Test: makeMSWUrl(`${FINE_DUST_COMMON_URL}/get/history`),
    getChart: `${FINE_DUST_COMMON_URL}/get/dashboard`,
    getChart_test: makeMSWUrl(`${FINE_DUST_COMMON_URL}/get/dashboard`),
};
