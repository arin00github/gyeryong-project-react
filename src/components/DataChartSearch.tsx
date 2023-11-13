import { useState } from "react";
import { ChartSearchConfig, ChartSearchSelectedValue, SelectOption } from "../interfaces/common.interface"
import styled from "styled-components";
import CommonSelect from "./CommonSelect";
import CommonButton from "./CommonButton";
import { config } from "process";

interface DataChartSearchProps {
    chartSearchConfig: ChartSearchConfig;
}


const DataChartSearch = (props: DataChartSearchProps) => {
  
    const {chartSearchConfig: configCollect} = props;

    const firstSelect = configCollect.selectConfigs.map((config) => {
        return {
            key: config.key,
            selectOption: config.selectOptionArray[0]
            
        }
    })

    const secondSelect = configCollect.yAxisConfigs.map((config) => {
        return {
            key: config.key,  
            selectOption: config.selectOptionArray[0]
        }
    })

    const [selectedOptions, setSelectedOptions] = useState<ChartSearchSelectedValue[]>([...firstSelect, ...secondSelect].filter(Boolean) as ChartSearchSelectedValue[])


    const handlekeywordChange = (key: string | number, changeOpen: SelectOption): void => {
        const updatedOptions = selectedOptions.map((option) => {
            if (option.key === key) {
                return {
                    ...option,
                    selectOption: changeOpen
                }
            }
            return option
        })
        setSelectedOptions(updatedOptions)
    }

    return (
        <DataChartSearchContainer>
            <DataTableSearchSelectWrap>
                {configCollect.selectConfigs.map((config, idx) => {
                    return (
                        <CommonSelect 
                            key={idx}
                            selectedItem={selectedOptions.find((selOpt) => selOpt.key === config.key)?.selectOption}
                            selectOptions={config.selectOptionArray}
                            initialSelectedOption={config.selectOptionArray[0]} 
                            handleSelectChange={(keyword) => handlekeywordChange(config.key, keyword)}/>
                    )
                })}
                { configCollect.yAxisConfigs &&
                configCollect.yAxisConfigs.map((config, idx) => {
                    return (
                        <CommonSelect 
                            key={idx}
                            selectedItem={selectedOptions.find((selOpt) => selOpt.key === config.key)?.selectOption}
                            selectOptions={config.selectOptionArray}
                            initialSelectedOption={config.selectOptionArray[0]} 
                            handleSelectChange={(keyword) => handlekeywordChange(config.key, keyword)}/>
                    )
                })}
                <CommonButton text="검색" onClick={() => configCollect.handleChartSearch(selectedOptions)} />
            </DataTableSearchSelectWrap>
        </DataChartSearchContainer>
    )
 }


 export default DataChartSearch

 const DataChartSearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 16px 8px;
`;

const DataTableSearchSelectWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f3f3f3;
    &:focus-visible {
        outline: none !important;
    }
`;