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
