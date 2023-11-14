import styled from "styled-components";

export const MapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const MapZoomButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 36px;
    height: 36px;
    color: #fff;
    cursor: pointer;
    &:active {
        svg {
            transform: translateY(1px);
        }
    }
`;

export const MapZoomPlusButtonWrap = styled(MapZoomButtonWrap)`
    top: 0;
`;

export const MapZoomMinusButtonWrap = styled(MapZoomButtonWrap)`
    bottom: 0;
`;

export const MapZoomSlider = styled.div<{ $left?: number; $bottom?: number }>`
    display: flex;
    justify-content: center;
    position: absolute;
    left: ${props => (props.$left ? `${props.$left}px` : "8px")};
    bottom: ${props => (props.$bottom ? `${props.$bottom}px` : "8px")};
    z-index: 999;
    width: 36px;
    height: 170px;
    background: #4a4f54;
    padding: 36px 0;
    .rc-slider-vertical {
        display: flex;
        justify-content: center;
    }
    .rc-slider-track {
        left: auto;
        width: 12px;
        border-radius: 0;
        background: #3970c3;
    }
    .rc-slider-rail {
        width: 14px !important;
        border-radius: 0;
        background: #eee;
        border: 1px solid #ddd;
        margin: 1px;
    }
    .rc-slider-handle {
        width: 26px !important;
        height: 10px !important;
        border-radius: 0px;
        border: 1px solid rgb(0, 0, 0);
        cursor: grab;
        box-shadow: none;
        opacity: 1;
        margin-left: 0 !important;
        &.rc-slider-handle-dragging {
            box-shadow: none;
            border-color: #000;
        }
    }
`;
