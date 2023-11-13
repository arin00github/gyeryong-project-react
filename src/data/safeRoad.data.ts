import { extractDateString, getRandomNumber } from "../utils/utils";
import { filterChartData, filterChartDataParams, filterData, filterDataParams } from "./common.data";

export const safeRoadStatusMockupData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(10)
            .fill(0)
            .map((_, idx) => {
                return {
                    sync_date: `2023-10-${getRandomNumber(1, 30)}`,
                    sync_time: "10:09:54",
                    deveui: `1001-${getRandomNumber(100, 110)}_${idx}`,
                    state: "정상",
                    fast_pass: getRandomNumber(5, 30),
                    normal_pass: getRandomNumber(5, 30),
                    speed_average: getRandomNumber(15, 22),
                };
            }),
        count: 10,
        totalCount: 175,
    },
};

export const safeRoadDataArray = Array(400)
    .fill(0)
    .map((_, idx) => {
        const thisDate = new Date();
        thisDate.setDate(thisDate.getDate() - (idx % 10));
        return {
            sync_date: `${extractDateString(thisDate)}`,
            sync_time: `10:0${idx % 8}:${10 + (idx % 45)}`,
            deveui: `1001-${100 + (idx % 3)}`,
            state: "정상",
            fast_pass: getRandomNumber(5, 30),
            normal_pass: getRandomNumber(5, 30),
            speed_average: getRandomNumber(15, 22),
        };
    });

export const makeSafeRoadData = <T>({ startDate, endDate, pageNum, deveui, dataArray }: filterDataParams<T>) => {
    const { data, totalLength } = filterData<T>({ startDate, endDate, pageNum, deveui, dataArray });
    return {
        code: 200,
        message: "success",
        responseTime: "2021-03-12T13:56:43+09:00",
        response: {
            results: data,
            count: 10,
            totalCount: totalLength,
        },
    };
};

export const safeRoadAssetMockupData = {
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

export const safeRoadDailyDataArray = Array(200)
    .fill(0)
    .map((_, idx) => {
        return {
            sync_date: `2023-10-25`,
            time: `10:0${idx % 9}:${10 + (idx % 2)}`,
            fast_pass: getRandomNumber(10, 20),
            normal_pass: getRandomNumber(5, 30),
        };
    });

export const safeRoadDailyStatusMockupData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(10)
            .fill(0)
            .map((_, index) => {
                return {
                    sync_date: "2023-09-15",
                    time: `10:09:${10 + index * 2}`,
                    fast_pass: getRandomNumber(10, 20),
                    normal_pass: getRandomNumber(5, 30),
                };
            }),
        totalCount: 175,
    },
};

export const makeRoadDailyData = <T>({ dataArray, deveui, dateKey, timeKey }: filterChartDataParams<T>) => {
    const { data, totalLength } = filterChartData<T>({ dataArray, dateKey, deveui, timeKey });
    return {
        code: 200,
        message: "success",
        responseTime: "2021-03-12T13:56:43+09:00",
        response: {
            results: data,
            totalCount: totalLength,
        },
    };
};
