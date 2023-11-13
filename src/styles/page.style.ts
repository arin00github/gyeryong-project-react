import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    //background: #d5d5d5;
    overflow: hidden;
`;

export const MonitoringPageContainer = styled(PageContainer)`
    padding: 0;
`;

export const LoadingWrap = styled.div`
    width: 100%;
    height: 384.5px;
`;


export const DataStatusPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.whiteAlpha100};
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

export const DataSearchContainer = styled.div`
    min-height: 50px;
    display: flex;
`;

export const DataTableContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
`;


export const DataChartContainer = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.whiteAlpha300};
    display: flex;
    flex-direction: column;
    position: relative;
    div {
        flex: 1;
        width: 100%;
        height: 100%;
    }
`;
