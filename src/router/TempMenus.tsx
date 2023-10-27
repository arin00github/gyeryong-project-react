
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DATA_STATUS, MONITORING, SMART_BUS_INFO, SMART_CROSS_WALK, SMART_FINE_DUST, SMART_SAFE_ROAD } from "./constant";





type RouteType = {
    url: string;
    id: string;
    label: string;
};

const MENUS: RouteType[] = [
    /** 스마트 횡단 보도 메뉴 */
    {
        url: `${SMART_CROSS_WALK}/${MONITORING}`,
        label: "🚥 스마트 횡단 보도 모니터링",
        id: `${SMART_CROSS_WALK}-${MONITORING}`,
    },
    {
        url: `${SMART_CROSS_WALK}/${DATA_STATUS}`,
        label: "🚥 스마트 횡단 보도 데이터현황",
        id: `${SMART_CROSS_WALK}-${DATA_STATUS}`,
    },
    /** 스마트 미세 먼지 메뉴 */
    {
        url: `${SMART_FINE_DUST}/${MONITORING}`,
        label: "💨 스마트 미세 먼지 모니터링",
        id: `${SMART_FINE_DUST}-${MONITORING}`,
    },
    {
        url: `${SMART_FINE_DUST}/${DATA_STATUS}`,
        label: "💨 스마트 미세 먼지 데이터현황",
        id: `${SMART_FINE_DUST}-${DATA_STATUS}`,
    },
    /** 스마트 안심길 메뉴 */
    {
        url: `${SMART_SAFE_ROAD}/${MONITORING}`,
        label: "✅ 스마트 안심길 모니터링",
        id: `${SMART_SAFE_ROAD}-${MONITORING}`,
    },
    {
        url: `${SMART_SAFE_ROAD}/${DATA_STATUS}`,
        label: "✅ 스마트 안심길 데이터현황",
        id: `${SMART_SAFE_ROAD}-${DATA_STATUS}`,
    },
    /** 스마트 버스 정보 메뉴 */
    {
        url: `${SMART_BUS_INFO}/${MONITORING}`,
        label: "🚌 스마트 버스 정보 모니터링",
        id: `${SMART_BUS_INFO}-${MONITORING}`,
    },
    {
        url: `${SMART_BUS_INFO}/${DATA_STATUS}`,
        label: "🚌 스마트 버스 데이터현황",
        id: `${SMART_BUS_INFO}-${DATA_STATUS}`,
    },
];

const TempMenus = () => {
    const [buttonGroupHidden, setButtonGroupHidden] = useState<boolean>(true);

    const navigate = useNavigate();
    const changeMenu = (url: string) => {
        navigate(url);
    };

    const hideButtonGroup = () => {
        setButtonGroupHidden(!buttonGroupHidden);
    };

    const groups = [];
    for (let i = 0; i < MENUS.length; i += 2) {
        const group = MENUS.slice(i, i + 2);
        groups.push(group);
    }

    return (
        <MenuGroupWrapper>
            <MenuGroup hidden={buttonGroupHidden}>
                {groups.map((group, groupIndex) => (
                    <Row key={groupIndex}>
                        {group.map((menu: RouteType) => (
                            <Button key={menu.url} onClick={() => changeMenu(menu.url)}>
                                {menu.label}
                            </Button>
                        ))}
                    </Row>
                ))}
            </MenuGroup>
            <Button
                style={{
                    marginTop: "8px",
                    padding: "8px",
                    cursor: "pointer",
                    background: "rgb(59 50 50)",
                }}
                onClick={hideButtonGroup}
            >
                {buttonGroupHidden ? "👇👇 메뉴 보이기" : "👆👆 메뉴 숨기기"}
            </Button>
        </MenuGroupWrapper>
    );
};

const MenuGroupWrapper = styled.div`
    position: absolute;
    left: 65%;
    transform: translateX(-50%);
    top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const MenuGroup = styled.div<{ hidden: boolean }>`
    display: ${props => (props.hidden ? "none" : "flex")};
    flex-direction: column;
    gap: 8px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
`;

const Button = styled.button`
    padding: 4px 8px;
    width: 280px;
    background: rgb(21, 65, 161);
    color: #fff;
    border-radius: 8px;
`;
export default TempMenus;