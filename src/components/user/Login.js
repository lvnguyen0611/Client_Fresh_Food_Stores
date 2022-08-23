import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Login = ({ history, location }) => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const alert = useAlert();
     const dispatch = useDispatch();
     const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

     const redirect = location.search ? location.search.split("=")[1] : "/";

     useEffect(() => {
          document.getElementById("chat").style.display = "none";
          if (error) {
               alert.show("Tài khoản hoặc mật khẩu không đúng");
               dispatch(clearErrors());
          }
          if (isAuthenticated) {
               history.push(redirect);
          }
     }, [dispatch, alert, isAuthenticated, error, history, redirect]);

     const submitHandler = (e) => {
          e.preventDefault();
          dispatch(login(email, password));
     };

     return (
          <Fragment>
               {loading ? (
                    <Loader />
               ) : (
                    <Fragment>
                         <MetaData title={"Đăng nhập"} />
                         <div className="row wrapper mb-5">
                              <div className="col-10 col-lg-5">
                                   <form className="shadow-lg" onSubmit={submitHandler}>
                                        <h1 className="mb-3 mx-auto text-center">Đăng Nhập</h1>
                                        <div className="form-group">
                                             <label htmlFor="email_field">Email</label>
                                             <input
                                                  type="email"
                                                  id="email_field"
                                                  className="form-control"
                                                  value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                             />
                                        </div>
                                        <div className="form-group">
                                             <label htmlFor="password_field">Mật khẩu</label>
                                             <input
                                                  type="password"
                                                  id="password_field"
                                                  className="form-control"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                             />
                                        </div>
                                        <Link to="/password/forgot" className="float-right mb-4">
                                             Quên mật khẩu?
                                        </Link>
                                        <button
                                             id="login_button"
                                             type="submit"
                                             className="btn btn-block py-3"
                                        >
                                             Đăng Nhập
                                        </button>
                                        <Link to="/register" className="float-right mt-3">
                                             Đăng kí
                                        </Link>
                                   </form>
                              </div>
                         </div>
                    </Fragment>
               )}
          </Fragment>
     );
};
export default Login;
