import styled from "styled-components";
import { EllipsisDiv, EllipsisP } from "./common.style";


export const PanelWrapper = styled.div`
    position: absolute;
    left: 0;
    width: 300px;
    height: 100%;
    background-color: rgb(60, 65, 72);
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.2) 10px 0px 10px 0px;
`;

export const PanelHeaderWrapper = styled.div`
    height: 45px;
    width: 100%;
    display: flex;
    background: rgb(48, 53, 59);
    justify-content: space-between;
    padding: 0 16px;
`;

export const PanelHeader = styled(EllipsisDiv)`
    font-size: 14px;
    font-weight: 700;
    color: rgb(243, 243, 243);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
`;


export const PanelBody = styled.div`
    width: 100%;
    height: calc(100% - 45px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: #cbd5e0;
        border-radius: 8px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #a0aec0;
    }
`;

export const PanelBoxTitleWrapper = styled.div`
    position: relative;
    padding: 4px 0;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
`;

export const PanelBoxTitle = styled.div`
    padding: 8px 0 8px 16px;
    color: rgb(243, 243, 243);
    font-size: 14px;
    font-weight: 700;
`;

export const PanelBoxSubTitle = styled.div`
    padding: 4px 0 8px 16px;
    color: rgb(243, 243, 243);
    font-size: 11px;
    font-weight: normal;
`;

export const PanelBoxContainer = styled.div<{ $isActive: boolean }>`
    cursor: pointer;
    &:hover {
        background: rgb(101, 156, 211);
    }
    background: ${props => (props.$isActive ? "rgb(15, 122, 203)" : "")};
`;

export const PanelItemIcon = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
    img {
        width: 30px;
        height: 30px;
        border-radius: 25px;
        margin-right: 10px;
    }
`;

export const PanelItemName = styled(EllipsisP)`
    width: 100%;
    color: rgb(243, 243, 243);
    font-size: 14px;
    font-weight: 700;
`;

export const PanelItemAddr = styled(EllipsisP)`
    color: rgb(243, 243, 243);
    font-size: 11px;
`;



export const PanelEquipmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 13px;
    color: rgb(243, 243, 243);
`;

export const PanelEquipmentRow = styled.div`
    padding-right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
`;

export const PanelEquipmentItem = styled(EllipsisDiv)`
    width: 180px;
    padding: 8px 0 8px 16px;
    color: rgb(243, 243, 243);
    font-size: 12px;
    font-weight: normal;
`;

export const PanelEquipmentStatus = styled.div<{ $state?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => (props.$state ? (props.$state === "ok" ? "#28a745" : "#dc3545") : "#6c757d")};
    width: 30px;
    height: 15px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 700;
`;


export const PanelButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    > svg {
        cursor: pointer;
        &:active {
            transform: translateY(1px);
        }
    }
`;
