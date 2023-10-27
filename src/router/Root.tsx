import styled from "styled-components";
import TempMenus from "./TempMenus";
import { Outlet } from "react-router-dom";



const Root = () => {
    return (
        <RootContainer>
            {import.meta.env.MODE === 'development' && <TempMenus />}
            <Outlet />
        </RootContainer>
    )
}


const RootContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #1d2329;
    overflow: hidden;
`;

export default Root;