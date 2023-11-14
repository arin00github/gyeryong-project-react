import styled from "styled-components";

export const EllipsisDiv = styled.div`
    word-break: keep-all;
    word-wrap: break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const EllipsisP = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
