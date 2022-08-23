import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword} from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = ({ history }) => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const [oldPassword, setOldPassword] = useState("");
     const [password, setpassword] = useState("");
     const { error, isUpdated, loading } = useSelector((state) => state.user);
     useEffect(() => {
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (isUpdated) { 
               history.push("/")
               alert.success("Đổi mật khẩu thành công.")
               dispatch({
                    type: UPDATE_PASSWORD_RESET,
               });
          }
     }, [dispatch,isUpdated, alert, error, history ]);

     const submitHandler = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("oldPassword", oldPassword);
          formData.set("password", password);
          dispatch(updatePassword(formData))
     }
    return (
     <Fragment>
          <MetaData title="Đổi mật khẩu" />
          <div className="row wrapper">
               <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                         <h1 className="mt-2 mb-5 text-center">Dổi Mật Khẩu</h1>
                         <div className="form-group">
                              <label htmlFor="old_password_field">Mật khẩu củ</label>
                              <input 
                                    type="password" 
                                    id="old_password_field" 
                                    className="form-control" 
                                    value={oldPassword} 
                                    onChange={ (e) => setOldPassword(e.target.value) } 
                              />
                         </div>

                         <div className="form-group">
                              <label htmlFor="new_password_field">Mật khẩu mới</label>
                              <input 
                                    type="password" 
                                    id="new_password_field" 
                                    className="form-control" 
                                    value={password} 
                                    onChange={ (e) => setpassword(e.target.value) }
                              />
                         </div>

                         <button
                            type="submit" 
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false}
                        >
                              Đổi mật khẩu
                         </button>
                    </form>
               </div>
          </div>
     </Fragment>
    )
}
export default UpdatePassword;
