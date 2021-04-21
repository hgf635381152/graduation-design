import React from 'react'
import Login from './Login.js'
import Register from './Register.js'
import 'antd/dist/antd.css'
import '../styles/components/Index.scss'


function Index() {
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
                    {<Register />}
                    <a className='content-register'>{'没有账号？点此注册'}</a>
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

export default Index