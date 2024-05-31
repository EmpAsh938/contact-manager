import Navbar from "./components/Navbar";
import Actions from "./components/Actions";
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

export default function App() {
    return (
        <main>

            {/* navbar */}
            <Navbar />

            {/* filtering & sorting */}
            <Actions />

            {/* Searching */}
            <Search />

            {/* listing table */}
            <Table />

            {/* pagination */}
            <Pagination />

        </main>
    )
}