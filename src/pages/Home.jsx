import Navbar from "../components/Navbar";
import Actions from "../components/Actions";
import Search from "../components/Search";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function Home() {

    const { loadContacts } = useGlobalContext();
    const data = useLoaderData();

    useEffect(() => {
        loadContacts(data.id);


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