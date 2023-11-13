import dayjs from "dayjs";
import { ChartSearchConfig, SelectOption, TableConfig, TableSearchConfig, TableSearchData, columnInfoType } from "../../interfaces/common.interface"
import { GetSafeRoadAssetResponse, GetSafeRoadStatusParams, GetSafeRoadStatusResponse, SafeRoadStatusResult } from "../../interfaces/safeRoad.interface"
import { PageContainer, DataStatusPageContainer, DataSearchContainer, DataChartContainer, DataTableContainer, LoadingWrap } from "../../styles/page.style"
import { useRecoilState } from "recoil";
import { tablePageNumberState } from "../../services/recoil/table.state";
import { useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getSafeRoadAssets, getSafeRoadStatusData } from "../../services/api/safeRoad.api";
import { ErrorResponse } from "../../interfaces/http.interface";
import DataTableSearch from "../../components/DataTableSearch";
import EmptyBox from "../../components/EmptyBox";
import { set } from "ol/transform";
import DataTable from "../../components/DataTable";





interface SafeRoadTableConfig extends TableConfig<SafeRoadStatusResult> {
    tableData: SafeRoadStatusResult[]
}

const columnLabel: columnInfoType[] = [
    { id: "sync_date", label: "데이터 수신날짜" },
    { id: "sync_time", label: "데이터 수신시간" },
    { id: "devnm", label: "장비명" },
    { id: "deveui", label: "장비번호" },
    { id: "devstate", label: "상태" },
    { id: "fast_pass", label: "과속차량 통과대수", unit: "대" },
    { id: "normal_pass", label: "정속차량 통과대수", unit: "대" },
    { id: "speed_average", label: "전체평균속도(km/h)", unit: "km/h" },
];


const SafeRoadDataPage = () => {
    const startDate = process.env.NODE_ENV === "test" ? "2023-10-16" : dayjs().subtract(1, "week").format("YYYY-MM-DD");
    const endDate = process.env.NODE_ENV === "test" ? "2023-10-27" : dayjs().format("YYYY-MM-DD");


    /** 데이터 검색에 사용되는 자산 정보 목록 */
    const [safeRoadAssetOptions, setSafeRoadAssetOptions] = useState<SelectOption[] | undefined>()

    /** [API Hook] 자산(개소) 조회 */
    const { data: safeRoadAssets }:UseQueryResult<GetSafeRoadAssetResponse> = useQuery({
        queryKey: ['smart-safe-road-asset'],
        queryFn: getSafeRoadAssets
    })

    /*************************************************/
    /************* 테이블 관련 상태관리 값 *************/
    /*************************************************/

    const [tablePageNumber, setTablePageNumber] = useRecoilState(tablePageNumberState);

    /** [테이블] 스마트 안심길 데이터 현황 조회를 위한 parameter 정보 */
    const [safeRoadStatusParams, setSafeRoadStatusParams]= useState<GetSafeRoadStatusParams>({
        deveui: undefined,
        start_date: startDate,
        end_date: endDate,
        page_cnt: 10,
        page_num: tablePageNumber
    });

    /** [테이블] 검색 영역 구성을 위한 설정 정보 */
    const [tableSearchConfig, setTableSearchConfig] = useState<TableSearchConfig>();

    /** [테이블] 테이블 생성을 위한 설정 정보 */
    const [safeRoadTableConfig, setSafeRoadTableConfig ]= useState<SafeRoadTableConfig>();

    /** [API Hook] 안심글 데이터현황 조회 */
    const {
        data: safeRoadStatusData,
        isLoading: safeRoadStatusLoading,
        isError: safeRoadIsError,
        error: safeRoadError,
    }:UseQueryResult<GetSafeRoadStatusResponse, ErrorResponse> = useQuery({
        queryKey: ['smart-safe-road-status', safeRoadStatusParams],
        queryFn: () => {
            const newParams:GetSafeRoadStatusParams = {
                ...safeRoadStatusParams,
                deveui: safeRoadStatusParams.deveui?.split('#')[0]
            }
            return getSafeRoadStatusData(newParams)
        },
        refetchOnWindowFocus: false,
    })

    /**
     * 데이터 테이블 상단 검색 영역 [검색] 버튼 클릭 이벤트
     * @function handleTableSearch
     * @param {TableSearchData} searchData 테이블 조회를 위한 검색 데이터
     * @returns {void}
     */
    const handleTableSearch = (searchData: TableSearchData) : void => {
        setTablePageNumber(1);
        setSafeRoadStatusParams({
            ...safeRoadStatusParams,
            start_date: searchData.startDate,
            end_date: searchData.endDate,
            deveui: `${searchData.keyword}@${new Date().getTime()}`
        })
    }

    /**
     * 데이터 테이블 [엑셀 다운로드] 버튼 클릭 이벤트
     * @function handleTableExcelDownload
     * @returns {void}
     */
    const handleTableExcelDownload = ():void => {
        //
        alert('테이블 정보 엑셀 다운로드')
    }



    /*************************************************/
    /************* 차트 관련 상태관리 값 *************/
    /*************************************************/

    const [chartSearchConfig, setChartSearchConfig] = useState<ChartSearchConfig>()



    /**
     * @private 테이블 페이징 변경 시 실행
     */
    useEffect(() => {
        setSafeRoadStatusParams({
            ...safeRoadStatusParams,
            page_num: tablePageNumber
        })
    },[tablePageNumber])

    /**
     * @private 자산 조회 데이터 useState에 업데이트, 데이터현황 조회 parameter 초기값 설정
     */
    useEffect(() => {
        if(safeRoadAssets){
            const results = safeRoadAssets.response?.results
            if(results){
                setSafeRoadStatusParams({...safeRoadStatusParams, deveui: results[0].deveui})
                setSafeRoadAssetOptions(results.map((result, idx) => ({
                    value: `${result.deveui}#${idx}`,
                    label: result.name
                })))
                
            }
        }
    }, [safeRoadAssets])

    /**
     * @private 테이블 검색 영역 설정 정보 업데이트
     */
    useEffect(()=> {
        if(safeRoadAssetOptions) {
            setTableSearchConfig({
                dataDuration: {
                    startDate: safeRoadStatusParams.start_date,
                    endDate: safeRoadStatusParams.end_date
                },
                selectOptions: safeRoadAssetOptions,
                handleTableSearch,
                handleTableExcelDownload
            })
        }
    }, [safeRoadAssetOptions])

    /**
     * @private 테이블 설정 정보 업데이트
     */
    useEffect(() => {
        if(safeRoadStatusData && safeRoadStatusData.code === 200){
            const results = safeRoadStatusData.response?.results
            if(results){
                setSafeRoadTableConfig({
                    tableColumnConfig: results.length > 0 ? Object.keys(results[0]).map((key: string) => {
                        const col = columnLabel.find((column) => column.id === key);
                        return {
                            column: key,
                            columnName: col?.label || "",
                            dimension: col?.unit
                        }
                    }) : [],
                    tableData: results,
                    totalCount: safeRoadStatusData.response?.totalCount || 0,
                   
                })
            }
        }
    }, [safeRoadStatusData])


    const tableErrorCheck = safeRoadError && safeRoadIsError


    return (
        <PageContainer>
            <DataStatusPageContainer>
                <DataSearchContainer>
                    {tableSearchConfig && <DataTableSearch tableSearchConfig={tableSearchConfig}/>}
                </DataSearchContainer>
                <DataTableContainer>
                    {tableErrorCheck && <EmptyBox />}
                    {safeRoadStatusLoading ? <LoadingWrap>loading</LoadingWrap> : (
                        safeRoadTableConfig && !tableErrorCheck && <div><DataTable config={safeRoadTableConfig} /></div>
                    )}
                </DataTableContainer>
                <DataSearchContainer>
                    search container
                </DataSearchContainer>
                <DataChartContainer>
                    chart container
                </DataChartContainer>
            </DataStatusPageContainer>
            <div>SafeRoadDataPage</div>
        </PageContainer>
    )
}


export default SafeRoadDataPage