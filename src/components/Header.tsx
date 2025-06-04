interface IHeaderProps {
    toggleDark: () => void;
}

function Header({toggleDark}:IHeaderProps) {

    return (
        <header>
            <button onClick={toggleDark}>Toggle Mode</button>
        </header>
    )
}

export default Header;