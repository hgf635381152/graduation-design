import React, { useState, useCallback } from 'react'
import { Form, Input, Button, message, Select } from 'antd';
import 'antd/dist/antd.css'
import '../styles/components/Register.scss'
import { useDispatch } from "redux-react-hook";
import axios from 'axios';
import servicePath from '../config/api'


const { Option } = Select;

const children = [];
const dish = ['川菜', '鲁菜', '粤菜', '苏菜', '浙菜', '闽菜', '湘菜', '徽菜', '其他']
for (let i = 0; i < 9; i++) {
    children.push(<Option key={dish[i]}>{dish[i]}</Option>);
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }, 
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};


function Register(props) {
    const { goRegister } = props
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const toRegister = useCallback((dataProps) => {
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
                        message.success(`注册成功, 您的账号为${res.data.id}, 请谨记`)
                        console.log('111111111111111', res.data)
                        dispatch({ type: 'userLogin', payload: res.data.id })
                        goRegister()
                    } else {
                        message.error('注册失败')
                    }
                }
            )
    }, [])

    const onFinish = useCallback((values) => {
        console.log('Success:', values);
        toRegister(values)
    }, [])

    const onFinishFailed = useCallback((errorInfo) => {
        console.log('Failed:', errorInfo);
    }, [])

    const handleChange = useCallback((value) => {
        console.log(value)
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
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input maxLength={10} allowClear={true} />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password maxLength={16} allowClear={true} />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认密码!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一样!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '邮箱格式不合法!',
                        },
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="taste"
                    label="菜系偏好"
                    rules={[{ required: true, message: '请选择菜系!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="请选择菜系"
                        onChange={handleChange}
                    >
                        {children}
                    </Select>
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

export default Register