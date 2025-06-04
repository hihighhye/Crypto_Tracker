import { useDispatch } from "react-redux";
import { toggleMode } from "../themeSlice";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { Link, useMatch } from "react-router-dom";


const Navigator = styled.div`
    height: 60px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 15px;
    background-color: ${props => props.theme.headerBgColor};
    box-shadow: 0 5px 5px -8px #333;
`;

const BackBtn = styled.div`
    grid-column: 1;
    color: ${props => props.theme.textColor};
    display: flex;
    align-self: center;
    font-size: 18px;
`;

const CircleDeco = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${props => props.theme.textColor};
`;

const RightCircleDeco = styled(CircleDeco)`
    margin-left: 8px;
`;

const LeftCircleDeco = styled(CircleDeco)`
    margin-right: 8px;
`;

const ToggleBtn = styled.button`
    grid-column: 2;
    justify-self: right;
    width: 120px;
    height: 30px;
    border-radius: 30px;
    border: 1px solid white;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.cardBgColor};
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

function Header() {
    const isDark = useAppSelector(state => state.theme.isDark);
    const dispatch = useDispatch();
    const homeMatch = useMatch("/");

    return (
        <Navigator>
            {!homeMatch ? (<BackBtn><Link to="/">&larr; Back</Link></BackBtn>) : null}
            {isDark ? (
                <ToggleBtn onClick={() => dispatch(toggleMode())}>
                    <span>Light Mode</span><RightCircleDeco />
                </ToggleBtn>
                ) : (
                <ToggleBtn onClick={() => dispatch(toggleMode())}>
                    <LeftCircleDeco /><span>Dark Mode</span>
                </ToggleBtn>
                )
            }
        </Navigator>
    )
}

export default Header;