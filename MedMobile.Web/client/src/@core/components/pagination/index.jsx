import React, { memo } from "react";
import ReactPaginate from "react-paginate";

const CustomPagination = ({ onPageChange, forcePage, total, rowsPerPage }) => {
  const count = Number((total / rowsPerPage).toFixed(0));

  return (
    <ReactPaginate
      nextLabel=""
      breakLabel="..."
      previousLabel=""
      forcePage={forcePage}
      pageCount={count || 1}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      onPageChange={onPageChange}
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      nextClassName="page-item next"
      previousLinkClassName="page-link"
      previousClassName="page-item prev"
      containerClassName="pagination react-paginate justify-content-end p-1"
    />
  );
};
export default memo(CustomPagination);
