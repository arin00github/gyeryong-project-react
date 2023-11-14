import { ForwardedRef, createElement, forwardRef, useState } from "react"
import { SelectOption, TableSearchConfig } from "../../interfaces/common.interface"
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import CommonButton from "../common/CommonButton";
import dayjs from "dayjs";
// import ko from "date-fns/locale/ko";
import CommonSelect from "../common/CommonSelect";

// registerLocale("ko", ko);

import "react-datepicker/dist/react-datepicker.css";


interface TableSearchProps {
    tableSearchConfig: TableSearchConfig
}

interface CustomInputProps {
    /** date picker 변경 이벤트 */
    onChange?(): void;
    /** date picker 클릭 이벤트 */
    onClick?(): void;
    /** date picker 입력 값 */
    value: string;
    id?: string;
}


const DataTableSearch = (props: TableSearchProps) => {

    const {tableSearchConfig} = props;

    /* 검색 시작 일자 */
    const [searchStartDate, setSearchStartDate] = useState<Date | null>(new Date(tableSearchConfig.dataDuration.startDate))

    /** 검색 종료 일자 */
    const [searchEndDate, setSearchEndDate] = useState<Date | null>(new Date(tableSearchConfig.dataDuration.endDate))

    /** 검색 키워드 */
    const [searchKeyword, setSearchKeyword] = useState<string>(tableSearchConfig.selectOptions[0].value)

    const CustomInput = forwardRef(({ onChange, onClick, value, id }:CustomInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <DatePickerWrap>
                <DataPickerInput
                    id={id}
                    value={value}
                    data-testid={id}
                    width={200}
                    onChange={onChange}
                    onClick={onClick}
                    ref={ref}
                />
            </DatePickerWrap>
        )
    })

    const handleKeywordChange = (changeOption:SelectOption): void => {
        setSearchKeyword(changeOption.value)
    }

    const handleSearchBtnClick = ():void => {
        tableSearchConfig.handleTableSearch({
            startDate: dayjs(searchStartDate).format("YYYY-MM-DD"),
            endDate: dayjs(searchEndDate).format("YYYY-MM-DD"),
            keyword: searchKeyword
        })
    }

    const handleDownloadBtnClick = ():void => {
        if(tableSearchConfig.handleTableExcelDownload){
            tableSearchConfig.handleTableExcelDownload()
        }
    }

    return (
        <TableSearchContainer>
            <TableSearchWrap>
            <DatePicker 
                id="data-picker-startdate" 
                locale={'ko'} 
                selected={searchStartDate} 
                dateFormat={`yyyy-MM-dd`} 
                onChange={setSearchStartDate} 
                customInput={createElement(CustomInput)}
            />
            <DatePicker 
                id="data-picker-enddate" 
                locale={'ko'} 
                selected={searchEndDate} 
                dateFormat={`yyyy-MM-dd`} 
                onChange={setSearchEndDate} 
                customInput={createElement(CustomInput)}
            />
            <CommonSelect 
                id="asset-select"
                selectOptions={tableSearchConfig.selectOptions}
                selectedItem={tableSearchConfig.selectOptions.find((opt) => opt.value === searchKeyword)}
                initialSelectedOption={tableSearchConfig.selectOptions[0]}
                handleSelectChange={handleKeywordChange}
            />
            <CommonButton text="검색" onClick={handleSearchBtnClick} id="search-button"/>
            </TableSearchWrap>
            <CommonButton text="엑셀다운로드" onClick={handleDownloadBtnClick} id="download-button"/>
        </TableSearchContainer>
    )


}


const TableSearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 8px;
`

const TableSearchWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f3f3f3;
    &:focus-visible {
        outline: none !important;
    }
`

const DatePickerWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    &:focus-visible {
        outline: none !important;
    }
`;

const DataPickerInput = styled.input`
    height: 28px;
    padding: 0 8px;
    font-size: 13px;
    background: #61666b;
    color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0);
    &:focus {
        border: 1px solid #28acfc;
    }
    &:focus-visible {
        outline: none !important;
    }
`;

export default DataTableSearch