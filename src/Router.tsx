import { createBrowserRouter } from "react-router-dom";

import NotFound from "./screens/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import Root from "./Root";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";
import Price from "./screens/Price";
import Chart from "./screens/Chart";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Coins />,
                errorElement: <ErrorComponent />
            },
            {
                path: ":coinId",
                element: <Coin />,
                children: [
                    {
                        path: "price",
                        element: <Price />
                    },
                    {
                        path: "chart",
                        element: <Chart />
                    }
                ]
            },
        ],
        errorElement: <NotFound />
    }
])

export default Router;
