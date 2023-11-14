


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


export function getRandomNumber(min: number, max: number): number {
    // Math.random()은 0 이상 1 미만의 무작위 부동소수점 숫자를 반환합니다.
    // 따라서, (max - min + 1)을 곱한 후, min을 더해주면 원하는 범위의 난수를 얻을 수 있습니다.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const extractDateString = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

export const beforeOneWeek = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
    return extractDateString(oneWeekAgo);
};
