import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-teal-900">
            <h1 className="text-white">Checkpoint : frontend</h1>
            <Link to="/">Countries</Link>
        </header>
    );
}
