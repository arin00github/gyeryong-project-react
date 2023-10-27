import BusInfoDataPage from "../pages/busInfoPages/BusInfoDataPage";
import BusInfoMonitorPage from "../pages/busInfoPages/BusInfoMonitorPage";
import CrossWalkDataPage from "../pages/crossWalkPages/CrossWalkDataPage";
import CrossWalkMonitorPage from "../pages/crossWalkPages/CrossWalkMonitorPage";
import FineDustDataPage from "../pages/fineDustPages/FineDustDataPage";
import FineDustMonitorPage from "../pages/fineDustPages/FineDustMonitorPage";
import SafeRoadDataPage from "../pages/safeRoadPages/SafeRoadDataPage";
import SafeRoadMonitorPage from "../pages/safeRoadPages/SafeRoadMonitorPage";
import { DATA_STATUS, MONITORING, SMART_BUS_INFO, SMART_CROSS_WALK, SMART_FINE_DUST, SMART_SAFE_ROAD } from "./constant";

export const RouterMenus = [
    {
        path: `${SMART_CROSS_WALK}/${MONITORING}`,
        element: <CrossWalkMonitorPage />
    }, {
        path: `${SMART_CROSS_WALK}/${DATA_STATUS}`,
        element: <CrossWalkDataPage />
    },
    {
        path: `${SMART_FINE_DUST}/${MONITORING}`,
        element: <FineDustMonitorPage />
    }, {
        path: `${SMART_FINE_DUST}/${DATA_STATUS}`,
        element: <FineDustDataPage />
    },
    {
        path: `${SMART_SAFE_ROAD}/${MONITORING}`,
        element: <SafeRoadMonitorPage />
    }, {
        path: `${SMART_SAFE_ROAD}/${DATA_STATUS}`,
        element: <SafeRoadDataPage />
    },
    {
        path: `${SMART_BUS_INFO}/${MONITORING}`,
        element: <BusInfoMonitorPage />
    }, {
        path: `${SMART_BUS_INFO}/${DATA_STATUS}`,
        element: <BusInfoDataPage />
    },
    
]