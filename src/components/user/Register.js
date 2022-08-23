import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../../actions/userActions'
import MetaData from '../layout/MetaData'

const Register = ({ history }) => {

    const [ user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = user;
    const [ avatar, setAvatar ] = useState();
    const [ avatarRreview, setAvatarPreview ] = useState('/images/avatar_default.jpg');
    const alert = useAlert();
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {
        if(isAuthenticated) {
            history.push('/')
        }
        if( error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error , history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(register(formData))
    }

    const onChange = e => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2 ) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            <MetaData title={'Đăng kí tài khoản'}/>
                <div className="row wrapper mb-5">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                            <h1 className="mb-3">Đăng kí tài khoản</h1>

                    <div className="form-group">
                        <label for="email_field">Họ và Tên</label>
                        <input
                            type="name"
                            id="name_field" 
                            className="form-control" 
                            name='name'
                            value={name}
                            onChange={onChange}/>
                    </div>
                    <div className="form-group">
                    <label for="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={onChange}
                    />
                    </div>
                    <div className="form-group">
                    <label for="password_field">Mật khẩu</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        name='password'
                        value={password}
                        onChange={onChange}
                    />
                    </div>
                    <div className='form-group'>
                    <label for='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarRreview}
                                    className='rounded-circle'
                                    alt='Avatar Rreview'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept="images/*"
                                onChange={onChange}
                            />
                            <label className='custom-file-label' for='customFile'>
                                Thêm ảnh
                            </label>
                        </div>
                    </div>
                </div>
                    <button
                    id="register_button"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={loading ? true: false}
                    >
                    Đăng kí
                    </button>
                </form>
                </div>
            </div>
        </Fragment>
    )
}
export default Register
