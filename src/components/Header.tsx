import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

function Header() {
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);

    return (
        <header>
            <button onClick={toggleDarkAtom}>Toggle Mode</button>
        </header>
    )
}

export default Header;