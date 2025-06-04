import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory, IChartContext, IHistorical } from "../api";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


const ChartWrapper = styled.div`
    margin-bottom: 50px;
`;

interface ISeriesData {
    x: Date;
    y: number[];
}

function CryptoChart() {
    const isDark = useRecoilValue(isDarkAtom);
    const {coinId, tickersData} = useOutletContext<IChartContext>();
    const {isLoading, data: histData} = useQuery<IHistorical[]>(
        {
            queryKey: ["ohlcv", "coinId"], 
            queryFn: () => fetchCoinHistory(coinId),
            // refetchInterval: 10000,
        }
    );

    const seriesData:ISeriesData[] = histData?.map((value:IHistorical) => (
                                    {
                                        x: new Date(value.time_close * 1000),
                                        y: [parseFloat(value.open), parseFloat(value.high), parseFloat(value.low), parseFloat(value.close)]
                                    }
                                )) as ISeriesData[]
  
    return (
        <ChartWrapper>
            {isLoading ? 
                "Loading chart..." : (
                <ReactApexChart
                    type="candlestick"
                    series={[
                        {data: seriesData}
                    ]}
                    options={{    
                        chart: {
                            type: "candlestick",
                            height: 350,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        grid: {
                            show: false
                        },
                        title: {
                            text: tickersData.name,
                            margin: 10,
                            style:{
                                fontSize: "28px",
                                
                            }
                        },
                        xaxis: {
                            type: "datetime"
                        },
                        yaxis: {
                            title: {
                                text: "Unit: USD ($)",
                            },
                            tooltip: {
                                enabled: true
                            },
                            decimalsInFloat: 0,
                            labels: {
                                formatter: (value) => `$${value.toLocaleString()}`
                            },
                            axisTicks: {
                                show: true,
                            },
                        },
                        tooltip: {
                            custom: function({ seriesIndex, dataPointIndex, w }) {
                                        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                                        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                                        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                                        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                                        return (
                                        '<div class="apexcharts-tooltip-candlestick" style="padding: 8px; border-radius: 3px;">' +
                                        '<div>Open: <span class="value">' + o.toLocaleString() + '</span></div>' +
                                        '<div>High: <span class="value">' + h.toLocaleString() + '</span></div>' +
                                        '<div>Low: <span classagg class="value">' + l.toLocaleString() + '</span></div>' +
                                        '<div>Close: <span class="value">' + c.toLocaleString() + '</span></div>' +
                                        '</div>'
                                        );
                                    }
                        }
                    }}
                />
            )}
        </ChartWrapper>
    );
}

export default CryptoChart;