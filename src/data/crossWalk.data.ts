import { extractDateString, getRandomNumber } from "../utils/utils";
import { filterData2, filterDataParams } from "./common.data";

/** 스마트 횡단 보도 자산 조회 데이터 */
export const crossWarkAssetData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(15)
            .fill(0)
            .map((_, index) => {
                return {
                    uid: `1001-${100 + index}`,
                    name: `엄사중앙로 사거리 ${_}${index}`,
                };
            }),
        totalCount: 15,
    },
};


/** 스마트 횡단 보도 자산 조회 데이터 */
export const crossWalkSourceArray = Array(400)
    .fill(0)
    .map((_, idx) => {
        const thisDate = new Date();
        thisDate.setDate(thisDate.getDate() - (idx % 10));
        return {
            reg_date: `${extractDateString(thisDate)}`,
            reg_time: `10:0${idx % 7}:${10 + (idx % 43)}`,
            uid: `1001-${100 + (idx % 3)}`,
            event_name: `보행자주의 이벤트_${idx % 2}`,
            crosswalk_name: "엄사중앙로 사거리A",
            cctv_name: `CCTV(0${idx % 5})-보행자검지`,
        };
    });

export const makeCrossWalkData = <T>({ endDate, startDate, dataArray, deveui, pageNum }: filterDataParams<T>) => {
    const { data, totalLength } = filterData2({ startDate, endDate, dataArray, deveui, pageNum });

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

/** 스마트 횡단 보도 일 별 이벤트 조회 데이터 */
export const crossWarkDailyData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(10)
            .fill(0)
            .map(() => {
                return {
                    sync_date: "2023-09-15",
                    time: "10:09:54",
                    cnt: getRandomNumber(5, 20),
                };
            }),
        totalCount: 175,
    },
};

export const makeCrossWalkDailyData = () => {
    return {
        code: 200,
        message: "success",
        responseTime: "2021-03-12T13:56:43+09:00",
        response: {
            results: Array(10)
                .fill(0)
                .map((_, idx) => {
                    return {
                        sync_date: "2023-09-15",
                        time: `10:09:${10 + idx * 2}`,
                        cnt: getRandomNumber(5, 20),
                    };
                }),
            totalCount: 175,
        },
    };
};
