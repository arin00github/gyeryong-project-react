import { extractDateString } from "../utils/utils";
import { filterData, filterDataParams } from "./common.data";

/** 스마트 버스 자산 조회 데이터 */
export const smartBusAssetMockupData = {
    code: 200,
    message: "success",
    responseTime: "2021-03-12T13:56:43+09:00",
    response: {
        results: Array(15)
            .fill(0)
            .map((_, index) => {
                return {
                    deveui: `1001-${100 + index}`,
                    name: `신촌중앙로 사거리_${index}`,
                };
            }),
        totalCount: 15,
    },
};

export const smartBusSourceArray = Array(167)
    .fill(0)
    .map((_, idx) => {
        const thisDate = new Date();
        thisDate.setDate(thisDate.getDate() - (idx % 10));
        return {
            uid: `1001-${100 + (idx % 3)}`,
            sync_date: `${extractDateString(thisDate)}`,
            sync_time: `10:0${idx % 7}:${10 + (idx % 43)}`,
            devnm: "엄사중앙로 사거리A",
            deveui: `1001-${100 + (idx % 3)}`,
        };
    });

export const makeBusData = <T>({ dataArray, deveui, endDate, startDate, pageNum }: filterDataParams<T>) => {
    const { data, totalLength } = filterData<T>({ startDate, endDate, pageNum, dataArray, deveui });
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