import { filterCommonParams } from "../interfaces/common.interface";
import { ErrorResponse } from "../interfaces/http.interface";


/** configureUrl 함수의 parameter */
type configureUrlParams = {
    testUrl: string;
    devUrl: string;
};

/**
 * @description Node 환경에 따라 url을 다르게 반환하는 함수
 * @param {configureUrlParams} param
 * @returns {string} url문자열 값
 */
export const configureUrl = ({ testUrl, devUrl }: configureUrlParams) => {
    if (process.env.NODE_ENV === "test") {
        return testUrl;
    } else if (process.env.NODE_ENV === "development") {
        return testUrl;
    } else {
        return devUrl;
    }
};


/** fakeResponse 함수의 parameter */
type FakeResponseParams = {
    message: string;
    code: number;
};

/**
 * @description 에러객체를 반환하는 함수
 * @param {FakeResponseParams} param 
 * @returns {ErrorResponse} 에러 정보가 담긴 object
 */
export const fakeResponse = ({ message, code }: FakeResponseParams): ErrorResponse => {
    return {
        message,
        code,
        responseTime: String(new Date()),
    };
};



/**
 * 가짜 에러 객체 만드는 함수
 * @param {number} code 응답 status 코드 
 * @returns 
 */
export const makeErrorResultData = (code: number) => {
    return {
        code: code,
        message: "Fail",
        responseTime: "2021-03-12T13:56:43+09:00",
        response: undefined,
    };
};

/** filterTableData 함수의 parameter */
export interface filterTableParams<T> extends filterCommonParams {
    dataArray: T[];
    searchData: {
        dateString: keyof T;
        timeString: keyof T;
        assetId: keyof T;
    }
}


/**
 * [테이블] 데이터를 조건에 맞게 필터링 하는 함수
 * @param {filterTableParams<T>} param
 */
export const filterTableData = <T extends object>({ startDate, endDate, pageNum, deveui, dataArray, searchData }: filterTableParams<T>) => {
    
    const {dateString, timeString, assetId} = searchData;
    const startNumDate = new Date(startDate).getTime();
    const endNumDate = new Date(endDate).getTime();
    let filterArray = dataArray as T[]
    filterArray = filterArray.filter(data => {
        const thieDateString = `${data[dateString as keyof T]} ${data[timeString as keyof T]}`;
        const thisDate = new Date(thieDateString).getTime();
        return thisDate >= startNumDate && thisDate <= endNumDate;
    });

    filterArray = [...filterArray].sort((a, b) => {
        const aDateString = `${a[dateString as keyof T]} ${a[timeString as keyof T]}`;
        const aDate = new Date(aDateString).getTime();
        const bDateString = `${b[dateString as keyof T]} ${b[timeString as keyof T]}`;
        const bDate = new Date(bDateString).getTime();
        if (bDate > aDate) {
            return -1;
        } else if (bDate === aDate) {
            return 0;
        } else {
            return 1;
        }
    });

    filterArray = filterArray.filter(dt => {
        return dt[assetId as keyof T] === deveui;
    });
    const totalLength = filterArray.length;

    const startPoint = 10 * (pageNum - 1);
    const endPoint = startPoint + 10;
    filterArray = filterArray.slice(startPoint, endPoint);
    return { data: filterArray, totalLength };
};

export interface filterChartParams<T> {
    dataArray: T[];
    searchData: {
        dateString: keyof T;
        timeString: keyof T; 
    }
}


/**
 * [차트] 데이터를 조건에 맞게 필터링 하는 함수
 * @param {filterChartParams<T>} param
 */
export const filterChartData = <T>({  dataArray, searchData }: filterChartParams<T>) => {

    const {dateString, timeString} = searchData;

    let filterArray = dataArray;
    filterArray = [...filterArray].sort((a, b) => {
        const aDateString = `${a[dateString]} ${a[timeString]}`;
        const aDate = new Date(aDateString).getTime();
        const bDateString = `${b[dateString]} ${b[timeString]}`;
        const bDate = new Date(bDateString).getTime();
        if (bDate > aDate) {
            return -1;
        } else if (bDate === aDate) {
            return 0;
        } else {
            return 1;
        }
    });


    const totalLength = filterArray.length;

    filterArray = filterArray.slice(0, 20);
    return { data: filterArray, totalLength };
};


export function getRandomNumber(min: number, max: number): number {
    // Math.random()은 0 이상 1 미만의 무작위 부동소수점 숫자를 반환합니다.
    // 따라서, (max - min + 1)을 곱한 후, min을 더해주면 원하는 범위의 난수를 얻을 수 있습니다.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}