import { extractDateString, getRandomNumber } from "../utils/utils";
import { filterData, filterDataParams } from "./common.data";

export const fineDustAssetMockupData = {
    code: 200,
    message: "success",
    responseTime: new Date().toLocaleString(),
    response: {
        results: Array(15)
            .fill(0)
            .map((_, index) => {
                return {
                    deveui: `1001-${100 + index}`,
                    name: `푸르지오아파트 ${_}${index}`,
                };
            }),
        totalCount: 15,
    },
};

export const finedustResourceArray = Array(400)
    .fill(0)
    .map((_, idx) => {
        const thisDate = new Date();
        thisDate.setDate(thisDate.getDate() - (idx % 10));
        return {
            uid: `1001-${100 + (idx % 3)}`,
            sync_date: `${extractDateString(thisDate)}`,
            sync_time: `10:0${idx % 8}:${10 + (idx % 45)}`,
            asset_name: "대실 농소천 산책로",
            deveui: `1001-${100 + (idx % 3)}`,
            state: "정상",
            pm10_high: getRandomNumber(20, 30),
            pm10_low: getRandomNumber(3, 13),
            pm25_high: getRandomNumber(20, 30),
            pm25_low: getRandomNumber(3, 13),
            temp_high: getRandomNumber(20, 30),
            temp_low: getRandomNumber(5, 14),
            humidity_high: getRandomNumber(33, 55),
            humidity_low: getRandomNumber(20, 32),
        };
    });

export const makeFineDustData = <T>({ startDate, endDate, pageNum, deveui, dataArray }: filterDataParams<T>) => {
        const { data, totalLength } = filterData<T>({ startDate, endDate, pageNum, deveui, dataArray });
    
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
};


export const fineDustDailyMockupData = {
    code: 200,
    message: "success",
    responseTime: `${new Date()}`,
    response: {
        results: Array(10)
            .fill(0)
            .map((_, idx) => {
                return {
                    sync_date: "2023-09-15",
                    time: `10:09:${10 + idx * 2}`,
                    pm10: getRandomNumber(5, 40),
                    pm25: getRandomNumber(20, 50),
                    temp: getRandomNumber(2, 32),
                    humidity: getRandomNumber(20, 50),
                };
            }),
        totalCount: 175,
    },
};