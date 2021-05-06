import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/components/Store.scss'
import { useMappedState, useDispatch } from "redux-react-hook";
import { useRouter } from 'next/router'
import { Input, Select, Breadcrumb, Button } from 'antd';
import servicePath from '../config/api'
import axios from 'axios';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';


const { Search } = Input;
const { Option } = Select;

const children = [];
const address = ['东湖区', '西湖区', '青云谱区', '青山湖区', '新建区', '红谷滩区']
for (let i = 0; i < 6; i++) {
    children.push(<Option key={address[i]}>{address[i]}</Option>);
}


const mapState = (state) => ({
    uid: state.userId,
    uname: state.userName,
    islogin: state.isLogin
});

function Store() {

    const name = sessionStorage.getItem('uName')
    const isLogin = sessionStorage.getItem('isLogin')
    const router = useRouter()
    const { uid, uname, islogin } = useMappedState(mapState)
    const [ userName, setUserName ] = useState(name)
    const [ area, setArea ] = useState('青山湖区')
    const [ breadcrumb, setBreadcrumb ] = useState('')
    const [ storeInfo, setStoreInfo ] = useState([])
    const [ likeList, setLikeList ] = useState([])
    const [ commentList, setCommentList ] = useState([])
    const [ menuNum, setMenuNum ] = useState([])
    const [ price, setPrice ] = useState(0)
    const menu = useRef([])
    const sum = useRef(0)


    // console.log(uid, uname, islogin, router.query.id)

    const handleChange = useCallback((value) => {
        console.log(value)
        setArea(value)
    }, [])

    const onSearch = useCallback((value) => {
        console.log(value)
    }, [])

    const toUser = useCallback(() => {
        console.log('user')
    }, [])

    const toOut = useCallback(() => {
        console.log('out')
    }, [])

    const minNum = useCallback((index, num) => {
        let i = menu.current[index]
        if (i <= 0) return
        menu.current[index] = i - 1
        setMenuNum([...menu.current])
        sum.current = sum.current - parseInt(num) 
        setPrice(sum.current)
    }, [])

    const maxNum = useCallback((index, num) => {
        let i = menu.current[index]
        menu.current[index] = i + 1
        setMenuNum([...menu.current])
        sum.current = sum.current + parseInt(num) 
        setPrice(sum.current)
    }, [])

    const getStoreDetail = useCallback((area, breadcrumb) => {
        axios({
            method: 'post',
            url: servicePath.getStoreDetail,
            data: { id: router.query.id },
            withCredentials: true
        })
        .then(
            res => {
                if (res.data.type) {
                    menu.current = []
                    console.log('此商家数据', res.data.info)
                    setStoreInfo(res.data.info)
                    res.data.info[0]?.menu?.map((item) => {
                        menu.current.push(0)
                    })
                    setMenuNum(menu.current)
                } else {
                    console.log('暂无商家')
                }
            }
        )
    }, [])

    const getLikeList = useCallback((area, breadcrumb) => {
        axios({
            method: 'post',
            url: servicePath.getLikeList,
            data: { area: area, sort: breadcrumb },
            withCredentials: true
        })
        .then(
            res => {
                if (res.data.type) {
                    console.log('猜你喜欢', res.data)
                    setLikeList(res.data.likelist)
                } else {
                    console.log('暂无商家')
                }
            }
        )
    }, [])

    const getCommentList = useCallback(() => {
        axios({
            method: 'post',
            url: servicePath.getCommentList,
            data: { id: router.query.id },
            withCredentials: true
        })
        .then(
            res => {
                if (res.data.type) {
                    console.log('评论列表', res.data)
                    setCommentList(res.data.commentlist)
                } else {
                    console.log('暂无商家')
                }
            }
        )
    }, [])

    useEffect(() => {
        if (!isLogin) {
            router.replace('/')
        }
        getStoreDetail()
        getLikeList()
        getCommentList()
    }, [])

    return (
        <div className='store-body'>
            <div className='store-top'>
                <div className='top-address'>地区：</div>
                <div className='top-select'>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue='青山湖区'
                        onChange={handleChange}
                    >
                        {children}
                    </Select>
                </div>
                <div className='top-user'>
                    <a className='top-name' onClick={toUser}>{userName}</a>
                    <a className='top-out' onClick={toOut}>退出</a>
                </div>
            </div>
            <div className='store-search'>
                <img className='search-img' src='/food.png' alt='图片丢失啦' width='60' height='60'/>
                <div className='search-title'>易订</div>
                <div className='title-text'>· 美食</div>
                <div className='search-input'>
                    <Search placeholder="搜索商家" onSearch={onSearch} enterButton />
                </div>
            </div>
            <div className='store-breadcrumb'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>易订</Breadcrumb.Item>
                    <Breadcrumb.Item>美食</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='store-detail'>
                <div className='store-info'>
                    <div className='info-top'>
                        <div className='top-name'>
                            {storeInfo[0]?.storename}
                        </div>
                        <div className='top-score'>
                            评分<img className='img-star' src='/star.png' width={15} height={15} /> {storeInfo[0]?.score}分 人均￥{storeInfo[0]?.average}
                        </div>
                    </div>
                    <div className='info-middle'>
                        <p>地址：{storeInfo[0]?.address}</p>
                        <p>电话：{storeInfo[0]?.tele}</p>
                        <p>营业时间：周一至周日 10:30-23:00</p>
                    </div>
                    <div className='info-bottom'>
                        <img className='img-wifi' src='/wifi.png' width={28} height={24} />
                        提供wifi
                    </div>
                </div>
                <div className='store-img'>
                    <img className='info-img' src={storeInfo[0]?.img} width={380} height={214} />
                </div>
            </div>
            <div className='store-dish'>
                <div className='store-left'>
                    <div className='dish-title'>
                        菜单
                    </div>
                    <div className='dish-sort'>
                        <div className='dish-tab'>
                            <div className='tab-one'>项目</div>
                            <div className='tab-two'>单价</div>
                            <div className='tab-three'>数量</div>
                            <div className='tab-four'>总价</div>
                        </div>
                        {
                            storeInfo[0]?.menu?.map((item, index) => {
                                return (
                                    <div className='dish-info' key={index}>
                                        <div className='info-one'>{item[0]}</div>
                                        <div className='info-two'>￥{item[1]}</div>
                                        <div className='info-three'>
                                            <div className='info-num num-icon' onClick={() => {minNum(index, item[1])}}><MinusOutlined className={menuNum[index] > 0 ? '' :'icon-min'} /></div>
                                            <div className='info-num'>{menuNum[index]}</div>
                                            <div className='info-num num-icon' onClick={() => {maxNum(index, item[1])}}><PlusOutlined /></div>
                                        </div>
                                        <div className='info-four'>￥{item[1] * menuNum[index]}</div>
                                    </div>
                                )
                            })
                        }
                        <div className='dish-pay'>
                            应付金额: <span className='pay-num'>￥{price}</span>
                        </div>
                        <div className='pay-commit'>
                            <Button disabled={price > 0 ? false : true} type="primary" className='commit-btn' >提交订单</Button>
                        </div>
                    </div>
                    <div className='comment-title'>
                        {commentList?.length}条网友评价
                    </div>
                    <div className='store-comment'>
                        {
                            commentList?.map((item) => {
                                return (
                                    <div className='comment-item' key={item._id}>
                                        <div className='comment-left'>
                                            <img className='left-img' src='./head.png' width={60} height={60} />
                                        </div>
                                        <div className='comment-right'>
                                            <div className='right-name'>
                                                {item.username}
                                            </div>
                                            <div className='right-score'>
                                                {
                                                    [0,0,0,0,0].map((Item, index) => {
                                                        return (
                                                            <img className='img-star' key={index} src={index < item.score ? './star.png' : './star_empty.png'} width={14} height={14} />
                                                        )
                                                    })
                                                }
                                                <div className='right-time'>
                                                    {item.time}
                                                </div>
                                            </div>
                                            <div className='right-text'>
                                                {item.text}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='store-right'>
                    <div className='rec-title'>
                        猜你喜欢
                    </div>
                    {
                        likeList?.map((item, index) => {
                            return (
                                <div className='rec-item' key={item.storeId}>
                                    <img className='item-img' src={item.img} width={210} height={115} />
                                    <div className='item-name'>
                                        {item.storename}
                                    </div>
                                    <div className='item-price'>
                                        ￥<span className='price-num'>{item.average}.0</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Store