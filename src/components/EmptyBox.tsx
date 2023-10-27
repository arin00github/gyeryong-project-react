// import { AlertCircle } from "react-feather";
import styled from "styled-components";

interface EmptyBoxProps {
    height?: number;
}

const EmptyBox = (props: EmptyBoxProps) => {
    return (
        <StyledEmptyBox className="emptybox" style={{ height: props.height || "384.5px" }}>
            <StyledWrap>
                <StyledEmptyBoxText>
                    <div className="message-container">
                        <div className="message-wrap">
                            {/* <AlertCircle /> */}
                            <p className="upper-message">데이터가 없습니다</p>
                        </div>
                        <p className="sub-text">검색 조건을 다시 확인해 주세요</p>
                    </div>
                </StyledEmptyBoxText>
            </StyledWrap>
        </StyledEmptyBox>
    );
};

const StyledEmptyBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    //height: 100%;
    flex-direction: column;
    background-color: #ffffff19!;
`;

const StyledWrap = styled.div`
    padding: 20px;
`;

const StyledEmptyBoxText = styled.div`
    text-align: center;
    color: white;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .message-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .sub-text {
            font-size: 14px;
        }
    }
    .message-wrap {
        display: flex;
        justify-content: center;
        flex: none;
        height: auto;
    }
    .upper-message {
        padding-left: 12px;
        line-height: 24px;
        font-size: 20px;
        margin-bottom: 10px;
    }
`;


export default EmptyBox;