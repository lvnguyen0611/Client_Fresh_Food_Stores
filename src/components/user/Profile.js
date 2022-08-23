import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

function Profile() {
    const { user, loading } = useSelector(state => state.auth)

    useEffect(() => {
        document.getElementById("chat").style.display = "none";
    },[])

    return (
         <Fragment>
              {loading ? (
                   <Loader />
              ) : (
                   <Fragment>
                        <MetaData title={"Thông tin cá nhân"} />
                        <h2 className="mt-4 ml-4 text-bold">Thông tin tài khoản</h2>
                        <div className="row justify-content-around mt-5 user-info">
                             <div className="col-12 col-md-3">
                                  <figure className="avatar avatar-profile">
                                       <img
                                            className="rounded-circle img-fluid"
                                            src={user.avatar.url}
                                            alt={user.avatar.name}
                                       />
                                  </figure>
                                  <Link
                                       to="/me/update"
                                       id="edit_profile"
                                       className="btn btn-primary btn-block my-5"
                                  >
                                       Chỉnh sửa tài khoản
                                  </Link>
                             </div>
                             <div className="col-12 col-md-5">
                                  <table className="table-profile table-responsive">
                                       <tr>
                                            <td className="text-bold">Họ và Tên:</td>
                                            <td>{user.name}</td>
                                       </tr>
                                       <tr>
                                            <td className="text-bold">Email:</td>
                                            <td>{user.email}</td>
                                       </tr>
                                       <tr>
                                            <td className="text-bold">Ngày tham gia:</td>
                                            <td>{String(user.createdAt).substring(0, 10)}</td>
                                       </tr>
                                  </table>
                                  {user.role !== "admin" && (
                                       <Link
                                            to="/orders/me"
                                            className="btn btn-danger btn-block mt-5"
                                       >
                                            Lịch sử đặt hàng
                                       </Link>
                                  )}
                                  <Link
                                       to="/password/update"
                                       className="btn btn-primary btn-block mt-3"
                                  >
                                       Đổi mật khẩu
                                  </Link>
                             </div>
                        </div>
                   </Fragment>
              )}
         </Fragment>
    );
}

export default Profile
