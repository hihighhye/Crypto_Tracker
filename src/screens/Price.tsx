import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory, IChartContext, IHistorical, PriceData } from "../api";
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  ColGroupDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { useMemo } from "react";
import styled from "styled-components";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridWrapper = styled.div`
    height: 120px; // 580px;
    margin-bottom: 150px;
`;

const GridTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    padding-top: 10px;
`

const Caption = styled.div`
    display: flex;
    justify-content: right;
    margin: 0px 8px 8px 0px;
`;

const dateFormatter = (params: ValueFormatterParams): string => {
    return new Date(params.value * 1000).toISOString().split("T")[0];
    };

const currencyFormatter = (params: ValueFormatterParams): string => {
    return `$${parseFloat(params.value).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                })}`;
    };

const assignDTColor = (params:ValueGetterParams) => {
    return (params.data.quotes.USD.volume_24h_change_24h > 0) 
    ? {fontSize: "10px", color: "#e84118"} : {fontSize: "10px", color: "#00a8ff"}   
}

const assignTSColor = (params:ValueGetterParams) => {
    return (params.data.quotes.USD.market_cap_change_24h > 0) 
    ? {fontSize: "10px", color: "#e84118"} : {fontSize: "10px", color: "#00a8ff"}   
}

function Price() {
    const {coinId, tickersData} = useOutletContext<IChartContext>();
    
    const defaultColDef = useMemo<ColDef>(():ColDef => {
        return {
            cellStyle: {
                fontSize: "10px",
            }
        };
    }, []);

    /* 
    const {isLoading, data: histData} = useQuery<IHistorical[]>(
        {
            queryKey: ["grid", "ohlcv", "coinId"], 
            queryFn: () => fetchCoinHistory(coinId),
        }
    );

    const colDefs = useMemo<ColDef[]>(() => {
        return ([
            {
                headerName: "Date",
                valueGetter: (p: ValueGetterParams) => p.data.time_close,
                valueFormatter: dateFormatter,
                filter: true,
                width: 100,
            },
            {
                headerName: "OPEN",
                valueGetter: (p: ValueGetterParams) => p.data.open,
                valueFormatter: currencyFormatter,
                width: 90,
            },
            {
                headerName: "HIGH",
                valueGetter: (p: ValueGetterParams) => p.data.high,
                valueFormatter: currencyFormatter,
                width: 90,
            },
            {
                headerName: "LOW",
                valueGetter: (p: ValueGetterParams) => p.data.low,
                valueFormatter: currencyFormatter,
                width: 90,
            },
            {
                headerName: "CLOSE",
                valueGetter: (p: ValueGetterParams) => p.data.close,
                valueFormatter: currencyFormatter,
                width: 90,
            },
            {
                headerName: "Volume",
                valueGetter: (p: ValueGetterParams) => p.data.volume,
                valueFormatter: currencyFormatter,
                width: 100,
            },
        ])
    }, [])
    */

    const colDefs = useMemo<(ColDef | ColGroupDef)[]>(() => {
        return ([
            {
                headerName: "Date",
                headerStyle: { color: "white", backgroundColor: "#9c88ff" },
                valueGetter: (p: ValueGetterParams) => p.data.last_updated,
                valueFormatter: (e: ValueFormatterParams) => (e.value.split("T")[0]),
                filter: true,
                width: 100,
            },
            {
                headerName: "Daily Trading Value",
                headerStyle: { color: "white", backgroundColor: "#9c88ff" },
                children: [
                    {
                        headerName: "Price",
                        valueGetter: (p: ValueGetterParams) => p.data.quotes.USD.price,
                        valueFormatter: currencyFormatter,
                        width: 130,
                        headerStyle: { color: "white", backgroundColor: "#8c7ae6" },
                        cellStyle: assignDTColor
                    },
                    {
                        headerName: "Change(%)",
                        valueGetter: (p: ValueGetterParams) => p.data.quotes.USD.volume_24h_change_24h,
                        valueFormatter: (e: ValueFormatterParams) => `${e.value}%`,
                        width: 130,
                        headerStyle: { color: "white", backgroundColor: "#8c7ae6" },
                        cellStyle: assignDTColor
                    },
                    {
                        headerName: "Volume",
                        valueGetter: (p: ValueGetterParams) => p.data.quotes.USD.volume_24h,
                        valueFormatter: currencyFormatter,
                        width: 130,
                        headerStyle: { color: "white", backgroundColor: "#8c7ae6" },
                        cellStyle: assignDTColor
                    },
                ],
            },
            {    
                headerName: "Total Supply",
                headerStyle: { color: "white", backgroundColor: "#9c88ff" },
                children: [
                    {
                        headerName: "Market Cap",
                        valueGetter: (p: ValueGetterParams) => p.data.quotes.USD.market_cap,
                        valueFormatter: currencyFormatter,
                        width: 130,
                        headerStyle: { color: "white", backgroundColor: "#8c7ae6" },
                        cellStyle: assignTSColor
                    },
                    {
                        headerName: "Change(%)",
                        valueGetter: (p: ValueGetterParams) => p.data.quotes.USD.market_cap_change_24h,
                        valueFormatter: (e: ValueFormatterParams) => `${e.value}%`,
                        width: 130,
                        headerStyle: { color: "white", backgroundColor: "#8c7ae6" },
                        cellStyle: assignTSColor
                    },
                ]
            }
        ])
    }, [])

    return (     
        <GridWrapper>
            <GridTitle>{tickersData.name} - Daily Market Price</GridTitle>
            <Caption>( Unit: USD )</Caption>
            <AgGridReact 
                rowData={[tickersData]} 
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                rowHeight={25}
                headerHeight={35}
            />
        </GridWrapper>
    );
}

export default Price;