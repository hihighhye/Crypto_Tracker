import { useDispatch } from "react-redux";
import { toggleMode } from "../themeSlice";

function Header() {
    const dispatch = useDispatch()

    return (
        <header>
            <button onClick={() => dispatch(toggleMode())}>Toggle Mode</button>
        </header>
    )
}

export default Header;