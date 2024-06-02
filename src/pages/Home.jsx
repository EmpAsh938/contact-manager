import Navbar from "../components/Navbar";
import Actions from "../components/Actions";
import Search from "../components/Search";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useGlobalContext } from "../context";
import { useEffect } from "react";

export default function Home() {

    const { loadContacts } = useGlobalContext();

    useEffect(() => {
        loadContacts();


    }, [])

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