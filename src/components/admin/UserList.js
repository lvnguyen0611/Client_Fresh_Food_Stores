import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userActions";
import Sidebar from "./Sidebar";
import { ADNIN_DELETE_USER_REST } from "../../constants/userConstants";

const UserList = ({ history }) => {
     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, users } = useSelector((state) => state.allUsers);
     const { isDeleted } = useSelector((state) => state.user);

     useEffect(() => {
          dispatch(getAllUsers());
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (isDeleted) {
               alert.success("Thành công");
               history.push("/admin/users");
               dispatch({
                    type: ADNIN_DELETE_USER_REST,
               });
          }
     }, [dispatch, alert, error, isDeleted, history]);

      const deleteUserHandler = (id) => {
           dispatch(deleteUser(id));
      };

     const setUsers = () => {
          const data = {
               columns: [
                    {
                         label: "Mã tài khoản",
                         field: "id",
                         sort: "asc",
                    },
                    {
                         label: "Tên người dùng",
                         field: "name",
                         sort: "asc",
                    },
                    {
                         label: "Email",
                         field: "email",
                         sort: "asc",
                    },
                    {
                         label: "Phân quyền",
                         field: "role",
                         sort: "asc",
                    },
                    {
                         label: "Thao tác",
                         field: "action",
                    },
               ],
               rows: [],
          };
          users.forEach((user) => {
               data.rows.push({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    action: (
                         <Fragment>
                              <Link
                                   to={`/admin/user/${user._id}`}
                                   className="btn btn-primary py-1 px-2"
                              >
                                   <i className="fa fa-pencil"></i>
                              </Link>
                              <button
                                   className="btn btn-danger py-1 px-2 ml-2"
                                   onClick={() => deleteUserHandler(user._id)}
                              >
                                   <i className="fa fa-trash"></i>
                              </button>
                         </Fragment>
                    ),
               });
          });
          return data;
     };
     return (
          <Fragment>
               <MetaData title="Admin - Người dùng" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <h2 className="mt-4">
                                   <i className="fa fa-users"></i> Tất cả tài khoản người dùng
                              </h2>
                              {loading ? (
                                   <Loader />
                              ) : (
                                   <MDBDataTableV5
                                        data={setUsers()}
                                        className="px-3"
                                        striped
                                        hover
                                        small
                                        searchTop
                                        searchBottom={false}
                                        barReverse
                                   />
                              )}
                         </Fragment>
                    </div>
               </div>
          </Fragment>
     );
};

export default UserList;
