import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface IChartContext {
    coinId: string;
}

function Chart() {
    const {coinId} = useOutletContext<IChartContext>();
    const {isLoading, data} = useQuery({queryKey: ["ohlcv", "coinId"], queryFn: () => fetchCoinHistory(coinId)});
    console.log(data)
    return <h1>Chart</h1>;
}

export default Chart;