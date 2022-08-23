import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import MetaData from "../layout/MetaData";

const NewPassword = ({ history, match }) => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const [password, setPassword] = useState("");
     const [ConfirmPassword, setConfirmPassword] = useState("");
     const { error, success } = useSelector((state) => state.forgotPassword);

     useEffect(() => {
          document.getElementById("chat").style.display = "none";
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (success) {
               alert.success("Đổi mật khẩu thành công");
               history.push("/login");
          }
     }, [dispatch, alert, error, success, history]);

     const submitHandler = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("password", password);
          formData.set("confirmPassword", ConfirmPassword);
          dispatch(resetPassword(match.params.token, formData));
     };
     return (
          <Fragment>
              <MetaData title="Lấy lại mật khẩu"/>
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg" onSubmit={submitHandler}>
                              <h1 className="mb-3">Lấy lại mật khẩu</h1>
                              <div className="form-group">
                                   <label htmlFor="password_field">Mật khẩu mới </label>
                                   <input 
                                        type="password" 
                                        id="password_field" 
                                        className="form-control" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                </div>
                                <div className="form-group">
                                   <label htmlFor="confirm_password_field">Nhập lại mật khẩu</label>
                                   <input 
                                        type="password" 
                                        id="confirm_password_field" 
                                        className="form-control" 
                                        value={ConfirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                              </div>
                              <button id="new_password_button" type="submit" className="btn btn-block py-3">
                                   Tạo mới
                              </button>
                         </form>
                    </div>
               </div>
          </Fragment>
     );
};
export default NewPassword;
