import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory, IChartContext, IHistorical } from "../api";
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { useMemo } from "react";
import styled from "styled-components";

ModuleRegistry.registerModules([AllCommunityModule]);

const GridWrapper = styled.div`
    height: 580px;
    margin-bottom: 50px;
`;

const Caption = styled.div`
    display: flex;
    justify-content: right;
    margin: 0px 8px 8px 0px;
`;

function Price() {
    const {coinId, tickersData} = useOutletContext<IChartContext>();
   
    
     
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
                width: 100,
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
                width: 90,
            },
        ])
    }, [])

    return (
        <div>
            {isLoading ? 
                "Loading chart..." : (
                    <GridWrapper>
                        <Caption>( Unit: USD )</Caption>
                        <AgGridReact 
                            rowData={histData} 
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            rowHeight={25}
                            headerHeight={35}
                        />
                    </GridWrapper>
            )}
        </div>
    );
}

export default Price;