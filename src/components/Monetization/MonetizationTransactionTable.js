import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonetizationTransaction,
  monetizationSelector,
} from "../../features/Admin/MonetizationSlice";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { DataGrid } from "@mui/x-data-grid";
import {
  CustomToolbar,
  CustomPagination,
  QuickSearchToolbar,
} from "../../helpers/TableFunction";

function MonetizationTransactionTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonetizationTransaction(localStorage.getItem("token")));
  }, []);

  const { isFetching, isError, isSuccess, monetizationTransaction } =
    useSelector(monetizationSelector);
  const columns = [
    { field: "id", headerName: "SN", width: 65 },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "sentBy",
      headerName: "User",
      type: "string",
      width: 200,
      renderCell: ({ value }) => (
        <>
          {value.sentBy ? (
            <Link
              to={`/admin/artist/${value.sentBy._id}`}
              className="text-dark"
            >
              {value.sentBy.email}
            </Link>
          ) : (
            <span />
          )}
        </>
      ),
    },
    {
      field: "sentTo",
      headerName: "Receive User",
      type: "string",
      width: 200,
      renderCell: ({ value }) => (
        <>
          {value.sentTo ? (
            <Link
              to={`/admin/artist/${value.sentTo._id}`}
              className="text-dark"
            >
              {value.sentTo.email}
            </Link>
          ) : (
            <span />
          )}
        </>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "Number",
      width: 100,
      align: "center",
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      width: 100,
      align: "center",
    },
  ];
  const userList = monetizationTransaction.map((item, index) => {
    return {
      id: index + 1,
      date: item.date.slice(0, 10),
      sentBy: item,
      sentTo: item,
      amount: item.amount,
      type: item.type,
    };
  });

  return (
    // <div>
    //   <table className="table table-striped ">
    //     <thead>
    //       <tr>
    //         <th>Date</th>
    //         <th>User</th>
    //         <th>Amount</th>
    //         <th>Type</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {isSuccess ? (
    //         monetizationTransaction.map((data) => {
    //           return (
    //             <tr key={data._id}>
    //               <td>{data.date}</td>

    //               <td>
    //                 <Link
    //                   to={`/artist/${data.sentBy._id}`}
    //                   className="text-dark"
    //                 >
    //                   {data.sentBy.name}
    //                 </Link>
    //               </td>
    //               <td>{data.amount}</td>
    //               <td>{data.type}</td>
    //             </tr>
    //           );
    //         })
    //       ) : (
    //         <Rings />
    //       )}
    //     </tbody>
    //   </table>
    // </div>
    <>
      <div className="container-fluid" style={{}}>
        <DataGrid
          style={{ height: "55vh", width: "100%" }}
          sx={{
            boxShadow: 2,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: 15,
              letterSpacing: "0.5px",
              fontWeight: "500",
            },
          }}
          pagination
          rows={userList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          checkboxSelection={false}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
          }}
        />
      </div>
    </>
  );
}

export default MonetizationTransactionTable;
