import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userActions";
import MetaData from "../layout/MetaData";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateProfile = ({ history }) => {
     const [name, setname] = useState("");
     const [email, setemail] = useState("");
     const [avatar, setAvatar] = useState("");
     const [avatarRreview, setAvatarPreview] = useState("/images/avatar_default.jpg");

     const alert = useAlert();

     const dispatch = useDispatch();

     const { user } = useSelector((state) => state.auth);
     const { error, isUpdated, loading } = useSelector((state) => state.user);

     useEffect(() => {
          if (user) {
               setname(user.name);
               setemail(user.email);
               setAvatarPreview(user.avatar.url);
          }
          if (error) {
               alert.error(error);
               dispatch(clearErrors());
          }
          if (isUpdated) {
               dispatch(loadUser());
               history.push("/me");
               alert.success("Cập nhật tài khoản thành công.");
               dispatch({
                    type: UPDATE_USER_RESET,
               });
          }
     }, [dispatch, alert, error, history, isUpdated, user]);

     const submitHandler = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.set("name", name);
          formData.set("email", email);
          formData.set("avatar", avatar);
          dispatch(updateProfile(formData));
     };

     const onChange = (e) => {
          if (e.target.name === "avatar") {
               const reader = new FileReader();
               reader.onload = () => {
                    if (reader.readyState === 2) {
                         setAvatarPreview(reader.result);
                         setAvatar(reader.result);
                    }
               };
               reader.readAsDataURL(e.target.files[0]);
          }
     };

     return (
          <Fragment>
               <MetaData title={"Cập nhật thông tin"} />
               <div class="row wrapper">
                    <div class="col-10 col-lg-5">
                         <form
                              class="shadow-lg"
                              encType="multipart/form-data"
                              onSubmit={submitHandler}
                         >
                              <h1 class="mt-2 mb-5 text-center">Cập nhật thông tin tài khoản</h1>
                              <div class="form-group">
                                   <label htmlFor="email_field">Họ và Tên</label>
                                   <input
                                        type="name"
                                        id="name_field"
                                        class="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                   />
                              </div>
                              <div class="form-group">
                                   <label htmlFor="email_field">Email</label>
                                   <input
                                        type="email"
                                        id="email_field"
                                        class="form-control"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                   />
                              </div>
                              <div class="form-group">
                                   <label htmlFor="avatar_upload">Ảnh đại diện</label>
                                   <div class="d-flex align-items-center">
                                        <div>
                                             <figure class="avatar mr-3 item-rtl">
                                                  <img
                                                       src={avatarRreview}
                                                       class="rounded-circle"
                                                       alt="Avatar Preview"
                                                  />
                                             </figure>
                                        </div>
                                        <div class="custom-file">
                                             <input
                                                  type="file"
                                                  name="avatar"
                                                  class="custom-file-input"
                                                  id="customFile"
                                                  accept="image/*"
                                                  onChange={onChange}
                                             />
                                             <label class="custom-file-label" htmlFor="customFile">
                                                  Chọn ảnh
                                             </label>
                                        </div>
                                   </div>
                              </div>
                              <button
                                   type="submit"
                                   class="btn update-btn btn-block mt-4 mb-3"
                                   disabled={loading ? true : false}
                              >
                                   Cập nhật
                              </button>
                         </form>
                    </div>
               </div>
          </Fragment>
     );
};

export default UpdateProfile;
