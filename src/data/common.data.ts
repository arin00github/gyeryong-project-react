export const makeErrorResultData = (code: number) => {
    return {
        code: code,
        message: "Fail",
        responseTime: "2021-03-12T13:56:43+09:00",
        response: undefined,
    };
};

export interface filterDataParams<T> {
    dataArray: T[];
    startDate: string;
    endDate: string;
    pageNum: number;
    deveui: string;
}

export const filterData = <T>({ startDate, endDate, pageNum, deveui, dataArray }: filterDataParams<T>) => {
    const startNumDate = new Date(startDate).getTime();
    const endNumDate = new Date(endDate).getTime();
    let filterArray = dataArray.filter(data => {
        const thieDateString = `${data["sync_date" as keyof T]} ${data["sync_time" as keyof T]}`;
        const thisDate = new Date(thieDateString).getTime();
        return thisDate >= startNumDate && thisDate <= endNumDate;
    });

    filterArray = [...filterArray].sort((a, b) => {
        const aDateString = `${a["sync_date" as keyof T]} ${a["sync_time" as keyof T]}`;
        const aDate = new Date(aDateString).getTime();
        const bDateString = `${b["sync_date" as keyof T]} ${b["sync_time" as keyof T]}`;
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
        return dt["deveui" as keyof T] === deveui;
    });
    const totalLength = filterArray.length;

    const startPoint = 10 * (pageNum - 1);
    const endPoint = startPoint + 10;
    filterArray = filterArray.slice(startPoint, endPoint);
    return { data: filterArray, totalLength };
};

export const filterData2 = <T>({ startDate, endDate, pageNum, deveui, dataArray }: filterDataParams<T>) => {
    const startNumDate = new Date(startDate).getTime();
    const endNumDate = new Date(endDate).getTime();

    let filterArray = dataArray.filter(data => {
        const thieDateString = `${data["reg_date" as keyof T]} ${data["reg_time" as keyof T]}`;

        const thisDate = new Date(thieDateString).getTime();
        return thisDate >= startNumDate && thisDate <= endNumDate;
    });

    filterArray = [...filterArray].sort((a, b) => {
        const aDateString = `${a["reg_date" as keyof T]} ${a["reg_time" as keyof T]}`;
        const aDate = new Date(aDateString).getTime();

        const bDateString = `${b["reg_date" as keyof T]} ${b["reg_time" as keyof T]}`;
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
        return dt["uid" as keyof T] === deveui;
    });

    const totalLength = filterArray.length;

    const startPoint = 10 * (pageNum - 1);
    const endPoint = startPoint + 10;
    filterArray = filterArray.slice(startPoint, endPoint);
    return { data: filterArray, totalLength };
};

export interface filterChartDataParams<T> {
    dataArray: T[];
    deveui: string;
    dateKey: string;
    timeKey: string;
}

export const filterChartData = <T>({ deveui, dataArray, dateKey, timeKey }: filterChartDataParams<T>) => {
    let filterArray = dataArray;
    filterArray = [...filterArray].sort((a, b) => {
        const aDateString = `${a[`${dateKey}` as keyof T]} ${a[`${timeKey}` as keyof T]}`;
        const aDate = new Date(aDateString).getTime();
        const bDateString = `${b[`${dateKey}` as keyof T]} ${b[`${timeKey}` as keyof T]}`;
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
        return dt["deveui" as keyof T] === deveui;
    });

    const totalLength = filterArray.length;

    filterArray = filterArray.slice(0, 20);
    return { data: filterArray, totalLength };
};
