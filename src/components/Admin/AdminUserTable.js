import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminSelector,
  fetchUsersDetails,
} from "../../features/Admin/AdminSlice";
import { Rings } from "react-loader-spinner";
import { DataGrid } from "@mui/x-data-grid";
import {
  CustomToolbar,
  CustomPagination,
  QuickSearchToolbar,
} from "../../helpers/TableFunction";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminUserTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, users, isFetching } = useSelector(adminSelector);

  useEffect(() => {
    dispatch(fetchUsersDetails({ token: localStorage.getItem("token") }));
  }, []);

  const handleSuspend = (e, { id }) => {
    console.log(id);
    e.preventDefault();
    const suspendUser = async () => {
      try {
        const url = `http://localhost:3000/admin/user/suspend/${id}`;
        console.log(url);
        const is_suspended = e.target.checked;
        const token = localStorage.getItem("token");
        const response = await axios.put(
          url,
          {
            is_suspended: is_suspended,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("this line 1", response);
      } catch (error) {
        console.log("this line 2", error);
      }
      notifyWarn();
    };
    suspendUser();
  };

  const handleDeleteUser = ({ id }) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const deleteUser = async () => {
        try {
          const url = `http://localhost:3000/admin/user/delete/${id}`;
          console.log(url);
          const token = localStorage.getItem("token");
          const response = await axios.post(
            url,
            {},
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log("this line 1", response);
        } catch (error) {
          console.log("this line 2", error);
        }
        notifyError();
      };
      deleteUser();
    }
  };

  const notifyWarn = () =>
    toast.warning(`One user suspension status changed`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = () =>
    toast.error(`One New User Deleted`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const columns = [
    { field: "id", headerName: "SN", width: 65 },
    { field: "fullname",
    headerName: "FullName",
    type: "string",
    width: 200,
    renderCell: ({ value }) => (
      <>
          <Link
            to={`/admin/artist/${value._id}`}
            className="text-dark"
          >
            {value.name}
          </Link>
      </>
    ),
  },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 200,
      renderCell: ({ value }) => (
        <>

            <Link
              to={`/admin/artist/${value._id}`}
              className="text-dark"
            >
              {value.email}
            </Link>
 
        </>
      ),
    },
    {
      field: "uploads",
      headerName: "Uploads",
      type: "Number",
      width: 100,
      align: "center",
    },
    {
      field: "playlists",
      headerName: "Playlist",
      type: "string",
      width: 100,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 200,
      renderCell: ({ value }) => (
        <>
          {value.is_authenticated ? (
            <span className="badge badge-success">
              <span className="material-symbols-rounded mr-1">
                verified_user
              </span>
              Authenticated
            </span>
          ) : (
            <span />
          )}
          {value.is_verified ? (
            <span className="badge badge-info">
              <span className="material-symbols-rounded mr-1 f-20">
                verified
              </span>
              Verified
            </span>
          ) : (
            <span />
          )}
        </>
      ),
    },
    {
      field: "action",
      headerName: "Suspended",
      width: 100,
      sortable: false,
      align: "center",
      renderCell: ({ value }) => (
        <span>
          {!value.is_authenticated ? (
            <button
              type="button"
              className="btn btn-sm material-symbols-rounded bg-danger"
              onClick={() => {
                handleDeleteUser({ id: value._id });
              }}
            >
              delete_forever
            </button>
          ) : (
            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={value.is_suspended}
                onClick={(e) => handleSuspend(e, { id: value._id })}
              />
              <span className="slider round"></span>
            </label>
          )}
        </span>
      ),
    },
  ];

  const userList = users.map((item, index) => {
    return {
      id: index + 1,
      fullname: item,
      email: item,
      uploads: item.musics,
      playlists: item.playlists,
      status: item,
      action: item,
    };
  });

  return (
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

export default AdminUserTable;
