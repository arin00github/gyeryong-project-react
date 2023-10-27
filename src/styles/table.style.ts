import styled from "styled-components";

export const TanstackReactTable = styled.table`
    width: 100%;
    th {
        overflow: hidden;
        font-size: 14px;
        height: 32px;
        color: #fff;
        border-bottom: ${props => `2px solid ${props.theme.whiteAlpha400}`};
        background-color: rgba(97, 102, 107, 0.4);
        font-weight: 700;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        word-break: keep-all;
        word-wrap: break-word;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    td {
        height: 32px;
        font-size: 13px;
        border-bottom: ${props => `1px solid ${props.theme.whiteAlpha400}`};
        color: #ddd;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        word-break: keep-all;
        word-wrap: break-word;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;
