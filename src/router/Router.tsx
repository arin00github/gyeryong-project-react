import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from './Root'
import {RouterMenus} from './RouterMenus'
import { DATA_STATUS, SMART_CROSS_WALK } from "./constant";

const {VITE_BASE_URL} = import.meta.env


const router = createBrowserRouter(
    [
        {
            element: <Root />,
            children: RouterMenus,
        },
        {
            path: "/",
            element: <Navigate replace to={`${SMART_CROSS_WALK}/${DATA_STATUS}`} />,
        },
        {
            path: "*",
            element: <Navigate replace to={`${SMART_CROSS_WALK}/${DATA_STATUS}`} />,
        },
    ],
    { basename: VITE_BASE_URL },
);

export default router;