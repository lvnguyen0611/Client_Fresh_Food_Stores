import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions';


export const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector( state => state.auth)
  const { cartItems } = useSelector( state => state.cart)

  const logoutHandler =() => {
    dispatch(logout());
    alert.success('Đăng xuất thành công.')
  }

  return (
       <Fragment>
            <nav className="navbar navbar-light navbar">
                 <Link className="navbar-color-text" to="../">
                      <img src="../images/cuahangthucpham.png" width="40" height="40" alt="logo" />
                      Cửa Hàng Thực Phẩm
                 </Link>
                 <Route render={({ history }) => <Search history={history} />} />
                 <Link className="gio" to="/cart">
                      <img src="../images/giohang.png" width="50" height="50" alt="logo" />
                      <span className="ml-1" id="cart_count">
                           {cartItems.length}
                      </span>
                 </Link>

                 {user ? (
                      <div className="dropdown d-inline profile">
                           <Link
                                to="#!"
                                className="btn-profile dropdown-toggle text-white"
                                type="button"
                                id="dropDownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                           >
                                <figure className="avatar avatar-nav">
                                     <img
                                          src={user.avatar && user.avatar.url}
                                          alt={user && user.name}
                                          className="rounded-circle"
                                     />
                                     <span className="nav-username">{user && user.name}</span>
                                </figure>
                           </Link>
                           <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                                {user && user.role !== "admin" ? (
                                     <Link className="dropdown-item" to="/orders/me">
                                          Lịch Sử
                                     </Link>
                                ) : (
                                     <Link className="dropdown-item" to="/dashboard">
                                          Quản Lí
                                     </Link>
                                )}
                                <Link className="dropdown-item" to="/me">
                                     Thông tin cá nhân
                                </Link>
                                <Link
                                     className="dropdown-item text-danger"
                                     to="/"
                                     onClick={logoutHandler}
                                >
                                     Đăng xuất
                                </Link>
                           </div>
                      </div>
                 ) : (
                      !loading && (
                           <Link to="/login" className="navbar-brand">
                                Đăng nhập
                           </Link>
                      )
                 )}
            </nav>
       </Fragment>
  );
};
export default Header;
