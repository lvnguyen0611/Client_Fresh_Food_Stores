import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
     const dispatch = useDispatch();
     const alert = useAlert();
     const [email, setEmail] = useState('');
     const { error, message, loading } = useSelector((state) => state.forgotPassword);

     useEffect(() => {
         document.getElementById("chat").style.display = "none";
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (message) {
               alert.success(message);
          }
        
     }, [dispatch, alert, error, message]);
     const submitHandler = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set('email', email);
          dispatch(forgotPassword(formData));
     };

     return (
        <Fragment>
            <MetaData title="Quên mật khẩu"/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Quên Mật Khẩu</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Nhập Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )   
};

export default ForgotPassword;
