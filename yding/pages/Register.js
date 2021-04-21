import React, { useState, useCallback } from 'react'
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css'
import '../styles/components/Register.scss'
import axios from 'axios';
import servicePath from '../config/api'


const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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
            url: servicePath.Register,
            data: dataProps,
            withCredentials: true
        })
        .then(
            res => {
                setIsLoading(false)
                if (res.data.type == '注册成功') {
                    // localStorage.setItem('openId', res.data.openId)
                    // props.history.push('/admin')
                    console.log('111111111111111', res.data)
                } else {
                    message.error('注册失败')
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
        <div className="register-div">
            <div className='register-title'>
                用户注册
            </div>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="userId"
                    rules={[{ required: true, message: '请输入用户名!' }]}
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
                        <Button type="primary" htmlType="submit" className='button-register'>
                            注册
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login