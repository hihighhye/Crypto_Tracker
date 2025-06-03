import { useQuery } from "@tanstack/react-query";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins, ICoin } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 470px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin: 10px 0px;
    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>({queryKey: ["allCoins"], queryFn: fetchCoins});
    /*
    const [coins, setCoins] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async() => {
            
            setCoins(json.slice(0, 100));
            setLoading(false);
            console.log(coins);
        })();
        
    }, [])
    */
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>    
            </Header>
            {isLoading ? (<Loader>Loading...</Loader>) : 
                (<CoinsList>
                    {data?.slice(0, 100).map((coin:ICoin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{"name": coin.name}}>
                                <Img 
                                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} 
                                />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>)
            }
        </Container>
    );
}

export default Coins;