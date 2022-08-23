import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

function ListOrders() {
     const formatPrice = new Intl.NumberFormat("de");
     const alert = useAlert();
     const dispatch = useDispatch();
     const { loading, error, orders } = useSelector((state) => state.myOrders);

     useEffect(() => {
          dispatch(myOrders());
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
     }, [dispatch, alert, error]);

     const setOrders = () => {
          const data = {
               columns: [
                    {
                         label: "Mã đơn hàng",
                         field: "id",
                         sort: "asc",
                         width: "20%",
                    },
                    {
                         label: "Số lượng",
                         field: "mumOfItems",
                         sort: "asc",
                         width: "20%",
                    },
                    {
                         label: "Tổng thanh toán",
                         field: "amount",
                         sort: "asc",
                         width: "20%",
                    },
                    {
                         label: "Trạng thái",
                         field: "status",
                         sort: "asc",
                         width: "20%",
                    },
                    {
                         label: "Thao tác",
                         field: "action",
                         sort: "asc",
                         width: "20%",
                    },
               ],
               rows: [],
          };
          orders.forEach((order) => {
               data.rows.push({
                    id: order._id,
                    mumOfItems: order.orderItems.length,
                    amount: `${formatPrice.format(order.totalPrice)}`,
                    status:
                         order.orderStatus && String(order.orderStatus).includes("Delivered") ? (
                              <p style={{ color: "green" }}>{order.orderStatus}</p>
                         ) : (
                              <p style={{ color: "red" }}>{order.orderStatus}</p>
                         ),
                    action: (
                         <Link to={`/order/${order._id}`} className="btn btn-primary">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   width="17"
                                   height="17"
                                   fill="currentColor"
                                   class="bi bi-eye"
                                   viewBox="0 0 16 16"
                              >
                                   <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                   <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                              </svg>
                         </Link>
                    ),
               });
          });
          return data;
     };
     // --------------------------------------------------------------------
     return (
          <Fragment>
               <MetaData title={"Lịch sử đặt hàng"} />
               <h2 className="mt-5 text-center mb-5">Đã đặt hàng</h2>
               {loading ? (
                    <Loader />
               ) : (
                    <MDBDataTableV5
                         data={setOrders()}
                         className="px-3 text-center"
                         striped
                         hover
                         small
                         searchTop
                         searchBottom={false}
                         barReverse
                         responsive
                    />
               )}
          </Fragment>
     );
}
export default ListOrders;
