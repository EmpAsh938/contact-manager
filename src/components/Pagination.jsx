import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function Pagination() {
    return (
        <div className="pagination">
            <p>Showing <span className="pagination_span">1</span> to <span className="pagination_span">10</span> of <span className="pagination_span">100</span> entries</p>
            <div>
                <button className="pagination_button">
                    <MdArrowBack />
                    <span>Previous</span>
                </button>
                <button className="pagination_button">
                    <span>Next</span>
                    <MdArrowForward />
                </button>
            </div>
        </div>
    )
}