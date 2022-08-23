import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
     return (
          <div>
               <div className="sidebar-wrapper">
                    <nav id="sidebar">
                         <ul className="list-unstyled components">
                              <li>
                                   <Link to="/dashboard">
                                        <i className="fas fa-tachometer-alt"></i>Dashboard
                                   </Link>
                              </li>

                              <li>
                                   <a
                                        href="#productSubmenu"
                                        data-toggle="collapse"
                                        aria-expanded="false"
                                        className="dropdown-toggle"
                                   >
                                        <i className="fa fa-product-hunt"></i> Quản Lí Sản Phẩm
                                   </a>
                                   <ul className="collapse list-unstyled" id="productSubmenu">
                                        <li>
                                             <Link to="/admin/products">
                                                  <i className="fas fa-clipboard-list"></i> Tất Cả
                                                  Sản Phẩm
                                             </Link>
                                        </li>

                                        <li>
                                             <Link to="/admin/product">
                                                  <i className="fa fa-plus"></i>Thêm sản phẩm
                                             </Link>
                                        </li>
                                   </ul>
                              </li>

                              <li>
                                   <Link to="/admin/orders">
                                        <i className="fa fa-shopping-basket"></i> Đặt Hàng
                                   </Link>
                              </li>

                              <li>
                                   <Link to="/admin/users">
                                        <i className="fa fa-users"></i> Người Dùng
                                   </Link>
                              </li>

                              <li>
                                   <Link to="/admin/reviews">
                                        <i className="fa fa-star"></i> Đánh Giá
                                   </Link>
                              </li>
                              <li>
                                   <Link to="/admin/buying">
                                        <i class="fas fa-shopping-cart"></i> Quản lí bán hàng
                                   </Link>
                              </li>
                         </ul>
                    </nav>
               </div>
          </div>
     );
};

export default Sidebar;
