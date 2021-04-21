import React, { useState, useCallback } from 'react'
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css'
import '../styles/components/Login.scss'
import axios from 'axios';
import servicePath from '../config/api'


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

function Login() {

    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = (dataProps) => {
        setIsLoading(true)
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
                    // localStorage.setItem('openId', res.data.openId)
                    // props.history.push('/admin')
                    console.log('111111111111111', res.data)
                } else {
                    message.error('账号或密码错误')
                }
            }
        )
    }

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
                >
                    <Input maxLength={10} allowClear={true} />
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