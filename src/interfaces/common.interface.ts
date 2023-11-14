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
    /** 기간 검색인 date input 설정 */
   dataDuration: {
    startDate: string;
    endDate: string;
   },
    /** 기간 검색 우측 검색 키워드가 될 select options 정보 */
   selectOptions: SelectOption[]
   /** 검색 버튼 클릭 이벤트 핸들러 */
   handleTableSearch: (searchData:TableSearchData) => void;
   /** 엑셀 다운로드 버튼 클릭 이벤트 핸들러 */
   handleTableExcelDownload?:() => void
}

/** 테이블 컬럼을 위한 설정 */
export interface ColumnConfig {
    column: string;
    columnName: string;
    dimension?: string;
}

/** 테이블 생성을 위한 설정 interface */
export interface TableConfig<T> {
    /** 테이블 목록으로 표시 될 데이터 목록 */
    tableData: T[],
    /** 테이블 헤더로 표시 될 컬럼 목록 */
    tableColumnConfig: ColumnConfig[];
    /** 데이터의 총 row 갯수, paging 처리에 사용 */
    totalCount: number;
}


export interface ChartSearchSelectedValue {
    key: string;
    selectOption: SelectOption;
}

/** 차트 상단 검색 영역 내 select 구성을 위한 설정 interface */
export interface SelectOptionSets {
    key: string;
    /** select 구성을 위한 option 정보 */
    selectOptionArray: SelectOption[]
}

export interface ChartSearchConfig {
    selectConfigs: SelectOptionSets[];
    yAxisConfigs: SelectOptionSets[];
    handleChartSearch: (chartSearchData:ChartSearchSelectedValue[]) => void;
}


/**테이블 헤더 라벨 정보를 담은 객체   */
export type columnInfoType = {
    id: string;
    label: string;
    unit?: string;
};





export interface filterCommonParams {
    startDate: string;
    endDate: string;
    pageNum: number;
    deveui: string;
}


/** 자산 목록 구성 interface */
export interface PanelAssets {
    uid: string;
    name: string;
    address: string;
    properties: {
        type: string;
        equipments: {
            [key: string]: string | number;
        }[];
    };
}