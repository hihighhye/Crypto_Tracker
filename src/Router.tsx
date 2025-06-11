import { createBrowserRouter } from "react-router-dom";

import NotFound from "./screens/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import Root from "./Root";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";
import Price from "./screens/Price";
import CryptoChart from "./screens/CryptoChart";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "Crypto_Tracker/",
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
                        element: <CryptoChart />
                    }
                ]
            },
        ],
        errorElement: <NotFound />
    }
])

export default Router;
