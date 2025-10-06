import type { ReactNode } from "react";
import "../../styles/Layout.css";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
    hideHeader?: boolean;
}

export default function Layout({ children, hideHeader }: LayoutProps) {
    return (
        <div className="layout">
            {/* Affiche le Header seulement si hideHeader n'est pas true */}
            {!hideHeader && <Header />}

            <main className="main">{children}</main>

            <Footer />
        </div>
    );
}
