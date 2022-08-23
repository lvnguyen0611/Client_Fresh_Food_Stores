import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, clearErrors, deleteOrders } from "../../actions/orderActions";
import Sidebar from "./Sidebar";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
     const formatPrice = new Intl.NumberFormat("de");
     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, orders } = useSelector((state) => state.allOrder);
     const { isDeleted } = useSelector((state) => state.order);

     useEffect(() => {
          dispatch(getAllOrder());
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if(isDeleted) {
               alert.success('Thành công')
               history.push("/admin/orders")
               dispatch({
                    type: DELETE_ORDER_RESET
               })
          }
     }, [dispatch, alert, error, isDeleted, history]);

     const deleteOrderHandler = (id) => {
          dispatch(deleteOrders(id));
     }

     const setOrders = () => {
          const data = {
               columns: [
                    {
                         label: "Mã Đặt Hàng",
                         field: "id",
                         sort: "asc",
                    },
                    {
                         label: "Số Lượng Sản Phẩm",
                         field: "mumOfItems",
                         sort: "asc",
                    },
                    {
                         label: "Tổng tiền",
                         field: "amount",
                         sort: "asc",
                    },
                    {
                         label: "Trạng thái",
                         field: "status",
                         sort: "asc",
                    },
                    {
                         label: "Thao tác",
                         field: "action",
                    },
               ],
               rows: [],
          };
          orders.forEach((order) => {
               data.rows.push({
                    id: order._id,
                    mumOfItems: order.orderItems.length,
                    amount: formatPrice.format(order.totalPrice),
                    status:
                         order.orderStatus && String(order.orderStatus).includes("Thành công") ? (
                              <p style={{ color: "green" }}>{order.orderStatus}</p>
                         ) : (
                              <p style={{ color: "red" }}>{order.orderStatus}</p>
                         ),
                    action: (
                         <Fragment>
                              <Link
                                   to={`/admin/order/${order._id}`}
                                   className="btn btn-primary py-1 px-2"
                              >
                                   <i className="fa fa-eye"></i>
                              </Link>
                              <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
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
               <MetaData title="Admin - Đặt hàng" />
               <div className="row">
                    <div className="col-12 col-md-2">
                         <Sidebar />
                    </div>
                    <div className="col-12 col-md-10">
                         <Fragment>
                              <h2 className="mt-4">
                                   <i className="fa fa-shopping-basket"></i>Tất cả đơn hàng
                              </h2>
                              {loading ? (
                                   <Loader />
                              ) : (
                                   <MDBDataTableV5
                                        data={setOrders()}
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

export default OrderList;
