import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateUser, getUserDetails } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import { ADNIN_UPDATE_USER_RESET } from "../../constants/userConstants";
import Sidebar from "./Sidebar";

const UpdateUser = ({ match, history }) => {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [role, setRole] = useState("");

     const alert = useAlert();
     const dispatch = useDispatch();

     const { isUpdated, error } = useSelector((state) => state.user);
     const { user } = useSelector((state) => state.userDetails);

     const userId = match.params.id;

     useEffect(() => {
          if (user && user._id !== userId) {
               dispatch(getUserDetails(userId));
          } else {
               setName(user.name);
               setEmail(user.email);
               setRole(user.role);
          }

          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }

          if (isUpdated) {
               alert.success("Cập nhật hành công !");
               history.push("/admin/users");
               dispatch({
                    type: ADNIN_UPDATE_USER_RESET,
               });
          }
     },[alert, dispatch, isUpdated, error, history, user, userId]);

     const submitHandler = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("name", name);
          formData.set("email", email);
          formData.set("role", role);
          dispatch(updateUser(user._id, formData));
     };

     return (
          <Fragment>
               <MetaData title="Update User" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <div className="row wrapper">
                                   <div className="col-10 col-lg-5">
                                        <form className="shadow-lg" onSubmit={submitHandler}>
                                             <h1 className="mt-2 mb-5">Cập Nhật Người Dùng</h1>

                                             <div className="form-group">
                                                  <label Forhtml="name_field">Tên</label>
                                                  <input
                                                       type="name"
                                                       id="name_field"
                                                       className="form-control"
                                                       name="name"
                                                       value={name}
                                                       onChange={(e) => setName(e.target.value)}
                                                  />
                                             </div>

                                             <div className="form-group">
                                                  <label Forhtml="email_field">Email</label>
                                                  <input
                                                       type="email"
                                                       id="email_field"
                                                       className="form-control"
                                                       name="email"
                                                       value={email}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                  />
                                             </div>

                                             <div className="form-group">
                                                  <label Forhtml="role_field">Quyền</label>

                                                  <select
                                                       id="role_field"
                                                       className="form-control"
                                                       name="role"
                                                       value={role}
                                                       onChange={(e) => setRole(e.target.value)}
                                                  >
                                                       <option value="user">user</option>
                                                       <option value="admin">admin</option>
                                                  </select>
                                             </div>

                                             <button
                                                  type="submit"
                                                  className="btn btn-block mt-4 mb-3"
                                             >
                                                  Cập nhật
                                             </button>
                                        </form>
                                   </div>
                              </div>
                         </Fragment>
                    </div>
               </div>
          </Fragment>
     );
};

export default UpdateUser;
