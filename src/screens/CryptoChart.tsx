import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import Chart from "react-apexcharts";

interface IChartContext {
    coinId: string;
}

interface IHistorical {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

function CryptoChart() {
    const {coinId} = useOutletContext<IChartContext>();
    const {isLoading, data} = useQuery<IHistorical[]>({queryKey: ["ohlcv", "coinId"], queryFn: () => fetchCoinHistory(coinId)});
    console.log(data)
    return (
        <div>
            {isLoading ? 
                "Loading chart..." : (
                <Chart 
                    type="line"
                    series={[
                        {
                            name: "close price",
                            data: data?.map(price => parseFloat(price.close)) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark"
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false
                        },
                        stroke: {
                            curve: "smooth",
                            width: 3,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default CryptoChart;