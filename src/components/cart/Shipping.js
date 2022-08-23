import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { saveShipingInfo } from "../../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = ({ history }) => {

     const dispatch = useDispatch();
     const { shippingInfo } = useSelector((state) => state.cart);
     const [address, setAddress] = useState(shippingInfo.address);
     const [city, setCity] = useState(shippingInfo.city);
     const [district, setDistrict] = useState(shippingInfo.district);
     const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
     const [commune, setCommune] = useState(shippingInfo.commune);
     const [dateShip, setDateShip] = useState(shippingInfo.dateShip);

     const submitHandler = (e) => {
          e.preventDefault();
          dispatch(
               saveShipingInfo({
                    address,
                    commune,
                    district,
                    city,
                    phoneNo,
                    dateShip,
               })
          );
          history.push("/order/confirm");
     };

     return (
          <Fragment>
               <MetaData title="Thông tin mua hàng" />
               <CheckoutSteps shipping />
               <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                         <form className="shadow-lg shipping-form" onSubmit={submitHandler}>
                              <h1 className="mb-4 text-center">Thông Tin Giao Hàng</h1>
                              <div className="form-group">
                                   <label htmlFor="address_field">Địa chỉ</label>
                                   <input
                                        type="text"
                                        id="address_field"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="commune_field">Xã(Phường)</label>
                                   <input
                                        type="text"
                                        id="commune_field"
                                        className="form-control"
                                        value={commune}
                                        onChange={(e) => setCommune(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="district_field">Huyện(Quận)</label>
                                   <input
                                        type="text"
                                        id="district_field"
                                        className="form-control"
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="city_field">Tỉnh(Thành phố)</label>
                                   <input
                                        type="text"
                                        id="city_field"
                                        className="form-control"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="country_field">Số điện thoại</label>
                                   <input
                                        type="text"
                                        id="phoneno_field"
                                        className="form-control"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label htmlFor="country_field">Dự kiến nhận hàng:</label>
                                   <input
                                        type="datetime-local"
                                        id="dateship_field"
                                        className="form-control"
                                        value={dateShip}
                                        onChange={(e) => setDateShip(e.target.value)}
                                        required
                                   />
                              </div>

                              <button
                                   id="shipping_btn"
                                   type="submit"
                                   className="btn btn-block py-3"
                              >
                                   Tiếp Tục
                              </button>
                         </form>
                    </div>
               </div>
          </Fragment>
     );
};

export default Shipping;
