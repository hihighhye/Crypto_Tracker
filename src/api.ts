const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`)
    .then((res) => res.json());
}

export function fetchCoinInfo(coinId:string) {
    return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((res) => res.json());
}

export function fetchCoinTickers(coinId:string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then((res) => res.json());
}

export function fetchCoinHistory(coinId:string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7;
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
    .then((res) => res.json());
}

export interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

export interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

export interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: string;
            volume_24h: number;
            volume_24h_change_24h: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_15m: number;
            percent_change_30m: number;
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_1y: number;
            ath_price: number;
            ath_date: number;
            percent_from_price_ath: number;
        }
    }
}

export interface IHistorical {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

export interface IChartContext {
    coinId: string;
    tickersData: PriceData;
    isDark: boolean;
}