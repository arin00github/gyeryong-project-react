import { useEffect, useRef, useState } from "react";
import EmptyBox from "./EmptyBox";

import type {LegendComponentOption, TitleComponentOption, TooltipComponentOption, GridComponentOption, DatasetComponentOption} from 'echarts/components'
import type {LineSeriesOption} from 'echarts/charts';
import {LineChart} from 'echarts/charts'
import {LegendComponent, TitleComponent, TooltipComponent, GridComponent, DatasetComponent} from 'echarts/components'
import {use, ComposeOption} from 'echarts/core';
import * as echarts from 'echarts'

interface DataChartProps<T> {
    chartData: T[];
    xAxisKey: keyof T;
    yAxisKey?: string;
    totalCount: number;
}

interface UpdatedOptionParams<T> {
    chartData: T[];
    xAxisKey: keyof T;
    yAxisKey: string;
    totalCount: number;
}

export type ECOption = ComposeOption<LineSeriesOption | LegendComponentOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption>

use([LineChart, LegendComponent, TitleComponent, TooltipComponent, GridComponent, DatasetComponent])

const DataChart = <T extends object>(props: DataChartProps<T>) => {
    
    const {chartData, xAxisKey, yAxisKey, totalCount} = props;

    const [charInstance, setChartInstance] = useState<echarts.ECharts | null>(null)

    const chartRef = useRef<HTMLDivElement | null>(null);

    const updatedOptions = (params: UpdatedOptionParams<T>) => {
        const {chartData, xAxisKey, yAxisKey, totalCount} = params;
        const option: ECOption = {
            title: {
                show: totalCount === 0,
                    textStyle: {
                        color: "grey",
                        fontSize: 20,
                    },
                    text: "데이터가 없습니다. 검색 조건을 다시 확인해 주세요.",
                    left: "center",
                    top: "center",
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            legend: {
                data: ['SafeRoad Data Chart']
            },
            grid: {
                left: 40,
                right: 30,
                top: 30,
                bottom: 50,
                containLabel: true
            }, 
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartData.map((dt) => dt[xAxisKey]) as (string | number)[],
                show: totalCount !== 0,
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: "#afafaf",
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#8d8d8d",
                    },
                },
            },
            series: [
                {
                    type: "line",
                        lineStyle: {
                            color: "#69c6ff",
                        },
                        markPoint: {
                            symbolSize: 80,
                        },
                    data: chartData.map((dt) => dt[yAxisKey as keyof T]) as (string | number)[]
                }
            ]
        }
        charInstance?.setOption(option)
    }

    useEffect(() => {
        if(chartRef.current){
            const chart = echarts.init(chartRef.current);
            setChartInstance(chart)
        }
    },[])

    useEffect(() => {
        if(charInstance && yAxisKey){
            const yDataKey = yAxisKey.split("%")[0];
            console.log("yDataKey", yDataKey)
            updatedOptions({chartData, xAxisKey, yAxisKey: yDataKey, totalCount})
        
        }
    },[charInstance, chartData, xAxisKey, yAxisKey, totalCount])

    useEffect(() => {
        if(charInstance){
            charInstance.resize()
            window.addEventListener("resize", () => charInstance.resize())
        }
        return () => {
            if(charInstance){
                window.removeEventListener("resize", () => charInstance.resize())
            }
            
        }
    },[charInstance])




    if(chartData.length > 0){
        return(
            <div ref={chartRef} style={{width: '100%', height: '100%'}}>
            </div>
        )
    }else {
        return <EmptyBox />
    }
    
}


export default DataChart;