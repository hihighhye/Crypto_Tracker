import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";


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

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const LinkMain = styled.span`
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        font-size: 24px;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }

`;


function Coin() {
    const {coinId} = useParams();
    const [loading, setLoading] = useState(true);
    const {state} = useLocation();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
        })();
    }, []);
    return (
        <Container>
            <Header>
                <Title>{state?.name || "~ Wrong Acess ~"}</Title>    
            </Header>
            {state 
            ? (loading 
                ? <Loader>Loading...</Loader> 
                : null
            ) 
            : <LinkMain><Link to={"/"}>Go to Main &rarr;</Link></LinkMain>}
        </Container>
    );
}

export default Coin;