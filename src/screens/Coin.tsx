import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useParams, useMatch, useOutletContext, } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers, InfoData, PriceData } from "../api";
import { Helmet } from "react-helmet";
import { useContext } from "react";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 600px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    margin: 20px 0px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const BackBtn = styled.span`
    color: ${props => props.theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 40px;
    font-size: 20px;
`;

const Overview = styled.div`
    background-color: ${props => props.theme.cardBgColor};
    color: ${props => props.theme.textColor};
    padding: 20px 25px;
    border: solid 1px white;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const OverviewItem = styled.div`
    background-color: inherit;
    color: inherit;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 26px;
    min-width: 150px;
    span:first-child {
        font-size: 12px;
        padding-bottom: 10px;
    }
`;

const Description = styled.div`
    margin: 25px 0px;
    line-height: 1.2em;
    font-size: 16px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    background-color: ${props => props.theme.cardBgColor};
    padding: 7px 0px;
    border: solid 1px white;
    border-radius: 10px;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;

function Coin() {
    const {coinId} = useParams();
    const {state} = useLocation();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
        {
            queryKey: ["info", coinId], 
            queryFn: () => fetchCoinInfo(coinId ? coinId : "")
        }
    );
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
        {
            queryKey: ["tickers", coinId], 
            queryFn: () => fetchCoinTickers(coinId ? coinId : ""),
            // refetchInterval: 5000,
        }
    );
    /* 
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]);
    */
    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <BackBtn><Link to="/">&larr; Back</Link></BackBtn>
                <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>    
            </Header>
            {loading 
                ? <Loader>Loading...</Loader> 
                : (
                    <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>SYMBOL:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>PRICE (USD):</span>
                            <span>{tickersData ? 
                                    `$${parseFloat(tickersData.quotes.USD.price)
                                    .toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}` : ""}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>TOTAL SUPPLY:</span>
                            <span>{tickersData?.total_supply.toLocaleString()}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>MAX SUPPLY:</span>
                            <span>{tickersData?.max_supply.toLocaleString()}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}><Link to="chart">Chart</Link></Tab>
                        <Tab isActive={priceMatch !== null}><Link to="price">Price</Link></Tab>
                    </Tabs>
                    <Outlet context={{coinId, tickersData}} />
                    </>
                )
            }
        </Container>
    );
}

export default Coin;