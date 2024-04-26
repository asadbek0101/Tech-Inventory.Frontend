import "./assets/app-auth-container-layout.scss"
import { ReactNode } from "react"

interface Props{
    readonly children: ReactNode;
}

export default function AppAuthContainerLayout({
    children
}:Props){
    return (
        <div className="app-auth-container-layout">
            {children}
        </div>
    )
}