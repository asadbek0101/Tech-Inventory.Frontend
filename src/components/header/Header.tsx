import "./assets/header.scss";
import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";

interface Props{
    readonly onChangeMenu: () => void;
    readonly onChangeLogout: () => void;
}

export default function Header({
    onChangeMenu,
    onChangeLogout
}:Props){
    return (
        <header>
            <MenuButton onClick={onChangeMenu}/>
            <LogoutButton onClick={onChangeLogout}/>
        </header>
    )
}