import type { ReactNode } from "react";
import "../../styles/styleLayout.css";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
    showHeader?: boolean;
}

export default function Layout({ children, showHeader=true }: LayoutProps) {
    return (
        <div className="layout">
            {showHeader && <Header />}
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
}
