import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
    return (
        <div>
            <Header />
            <main className="mx-5">
                <Outlet />
            </main>
        </div>
    );
}
