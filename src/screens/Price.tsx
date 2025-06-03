import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  RowSelectionOptions,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { useMemo } from "react";
import styled from "styled-components";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridWrapper = styled.div`
    height: 600px;
    margin-bottom: 50px;
`;

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

function Price() {
    const {coinId} = useOutletContext<IChartContext>();
   
    const {isLoading, data: histData} = useQuery<IHistorical[]>(
        {
            queryKey: ["grid", "ohlcv", "coinId"], 
            queryFn: () => fetchCoinHistory(coinId),
        }
    );

    const dateFormatter = (params: ValueFormatterParams): string => {
        return new Date(params.value * 1000).toISOString().split("T")[0];
        };

    const currencyFormatter = (params: ValueFormatterParams): string => {
        return `$${parseFloat(params.value).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                    })}`;
        };

    const defaultColDef = useMemo<ColDef>(():ColDef => {
        return {
            width: 90,
            cellStyle: {
                fontSize: "10px",
            }
        };
    }, []);

    const colDefs = useMemo<ColDef[]>(() => {
        return ([
            {
                headerName: "Date",
                valueGetter: (p: ValueGetterParams) => p.data.time_close,
                valueFormatter: dateFormatter,
                filter: true,
            },
            {
                headerName: "OPEN",
                valueGetter: (p: ValueGetterParams) => p.data.open,
                valueFormatter: currencyFormatter,
            },
            {
                headerName: "HIGH",
                valueGetter: (p: ValueGetterParams) => p.data.high,
                valueFormatter: currencyFormatter,
            },
            {
                headerName: "LOW",
                valueGetter: (p: ValueGetterParams) => p.data.low,
                valueFormatter: currencyFormatter,
            },
            {
                headerName: "CLOSE",
                valueGetter: (p: ValueGetterParams) => p.data.close,
                valueFormatter: currencyFormatter,
            },
            {
                headerName: "Volume",
                valueGetter: (p: ValueGetterParams) => p.data.volume,
            },
        ])
    }, [])
  
    return (
        <div>
            {isLoading ? 
                "Loading chart..." : (
                    <GridWrapper>
                        <AgGridReact 
                            rowData={histData} 
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            rowHeight={25}
                        />
                    </GridWrapper>
            )}
        </div>
    );
}

export default Price;