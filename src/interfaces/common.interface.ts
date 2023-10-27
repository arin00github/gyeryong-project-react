export interface SelectOption {
    value: string;
    label: string
}


export interface TableSearchData {
    startDate: string;
    endDate: string;
    keyword: string
}

/** 데이터 테이블 검색 영역의 설정 */
export interface TableSearchConfig {
   dataDuration: {
    startDate: string;
    endDate: string;
   },
   selectOptions: SelectOption[]
   handleTableSearch: (searchData:TableSearchData) => void;
   handleTableExcelDownload?:() => void
}