import { createBrowserRouter } from "react-router-dom";

import NotFound from "./screens/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import Root from "./Root";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";


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
                element: <Coin />
            },
        ],
        errorElement: <NotFound />
    }
])

export default Router;
