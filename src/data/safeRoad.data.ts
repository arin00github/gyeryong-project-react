import { filterCommonParams} from '../interfaces/common.interface'
import { filterChartData, filterTableData, getRandomNumber } from '../utils/utils';

/** 스마트 안심길 자산 목록 데이터 */
export const fakeSafeRoadAssetData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(15)
            .fill(0)
            .map((_, index) => {
                return {
                    deveui: `1001-${100 + index}`,
                    name: `구미중앙로사거리_${index}`,
                };
            }),
        totalCount: 15,
    },
};


export const fakeSafeRoadData = Array(400)
.fill(0)
.map((_, idx) => {
    return {
        sync_date: `2023-10-${15 + (idx % 12)}`,
        sync_time: `10:0${idx % 8}:${10 + (idx % 45)}`,
        deveui: `1001-${100 + (idx % 3)}`,
        devstate: "정상",
        devnm: `장비${idx}`,
        fast_pass: getRandomNumber(5, 30),
        normal_pass: getRandomNumber(5, 30),
        speed_average: getRandomNumber(15, 22),
    };
});

/** createSafeRoadData 함수의 parameter */
export interface createSafeRoadParams<T> extends filterCommonParams {
    dataArray: T[];
    searchData: {
        dateString: keyof T;
        timeString: keyof T;
        assetId: keyof T;
    }
}

export const createSafeRoadData = <T extends object>(params:createSafeRoadParams<T>) => {
   const {data, totalLength} = filterTableData<T>(params);
   return {
    code: 200,
    message: "success",
    responseTime: `${new Date()}`,
    response: {
        results: data,
        count: 10,
        totalCount: totalLength,
    },
};
}


export const fakeSafeRoadDailyData = Array(10)
.fill(0)
.map((_, index) => {
    return {
        sync_date: "2023-09-15",
        time: `10:09:${10 + index * 2}`,
        fast_pass: getRandomNumber(10, 20),
        normal_pass: getRandomNumber(5, 30),
    };
})

export interface createSafeRoadDailyParams<T> {
    dataArray: T[];
    searchData: {
        dateString: keyof T;
        timeString: keyof T;
     
    }
}

export const createSafeRoadDailyData = <T extends object>(params: createSafeRoadDailyParams<T>) => {
    const {data, totalLength} = filterChartData<T>(params);
    return {
        code: 200,
        message: "success",
        responseTime: "2021-03-12T13:56:43+09:00",
        response: {
            results: data,
            totalCount: totalLength,
        },
    };
}