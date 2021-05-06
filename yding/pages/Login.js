import React, { useState, useCallback } from 'react'
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router'
import { useDispatch } from "redux-react-hook";
import 'antd/dist/antd.css'
import '../styles/components/Login.scss'
import axios from 'axios';
import servicePath from '../config/api'


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

function Login(props) {

    const { uid } = props
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const checkLogin = useCallback((dataProps) => {
        setIsLoading(true)
        console.log(dataProps)
        axios({
            method: 'post',
            url: servicePath.Login,
            data: dataProps,
            withCredentials: true
        })
        .then(
            res => {
                setIsLoading(false)
                if (res.data.type == '登录成功') {
                    console.log('111111111111111', res.data)
                    dispatch({ type: 'userLogin', payload: { userId: res.data.id, userName: res.data.name, isLogin: true }})
                    router.push('/Main')
                    sessionStorage.setItem('isLogin', true)
                    sessionStorage.setItem('uName', res.data.name)
                    sessionStorage.setItem('uId', res.data.id)
                } else {
                    message.error('账号或密码错误')
                }
            }
        )
    }, [])

    const onFinish = useCallback((values) => {
        console.log('Success:', values);
        checkLogin(values)
    }, [])

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, [])

    return (
        <div className="login-div">
            <div className='login-title'>
                用户登录
            </div>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="账号"
                    name="userId"
                    rules={[{ required: true, message: '请输入账号!' }]}
                    initialValue={uid}
                >
                    <Input maxLength={10} allowClear={true} defaultValue={uid} />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password  maxLength={16} allowClear={true} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <div className='form-button'>   
                        <Button type="primary" htmlType="submit" className='button-login'>
                            登录
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login