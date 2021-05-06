import React, { useCallback, useRef, useState } from 'react'
import Login from './Login.js'
import Register from './Register.js'
import { useMappedState } from "redux-react-hook";
import 'antd/dist/antd.css'
import '../styles/components/Home.scss'


const mapState = (state) => ({
    uid: state.userId,
});

function Home() {

    const [isLogin, setIsLogin] = useState(true)
    const islogin = useRef(true)
    // const { uid } = useMappedState(mapState)
    let uid = sessionStorage.getItem('uId') 

    console.log(uid)

    const goRegister = useCallback(() => {
        islogin.current = !islogin.current
        setIsLogin(islogin.current)
    }, [])

    return (
        <>
            <div className='home-body'>
                <div className='home-header'>
                    <img src='/food.png' alt='图片丢失啦' width='60' height='60'/>
                    <div className='header-title'>易订</div>
                    <div className='header-row'></div>
                    <a className='header-bar'>
                        <img src='/about.png' alt='图片丢失啦' width='22' height='20'/>关于我们
                    </a>
                </div>
                <div className='home-content'>
                    {isLogin ? <Login uid={uid} /> : <Register goRegister={goRegister} />}
                    <a className='content-register' onClick={goRegister}>{isLogin ? '没有账号？点此注册' : '已有账号？点此登录'}</a>
                </div>
                <div className='home-footer'>
                    <div>
                        <div className='footer-text'>系统由 React+Node+Ant Desgin驱动</div>
                        <div> Copyright ©2021 东华理工hgf, All Rights Reserved. </div>
                    </div>
                </div>
                <img className='bg-img' src='/home.png' alt='图片丢失啦'/>
            </div>
        </>
    )
}

export default Home