import React, { useCallback, useEffect, useState } from 'react'
import '../styles/components/Main.scss'
import { useMappedState, useDispatch } from "redux-react-hook";
import { useRouter } from 'next/router'
import { Input, Select, Breadcrumb } from 'antd';
import servicePath from '../config/api'
import axios from 'axios';


const { Search } = Input;
const { Option } = Select;

const children = [];
const address = ['东湖区', '西湖区', '青云谱区', '青山湖区', '新建区', '红谷滩区']
for (let i = 0; i < 6; i++) {
    children.push(<Option key={address[i]}>{address[i]}</Option>);
}
const sort = ['火锅', '自助餐', '小吃快餐', '日韩料理', '西餐', '烧烤烤肉', '东北菜', '川湘菜', '江浙菜', '香锅烤鱼', '西北菜', '京菜鲁菜', '云贵菜', '海鲜', '素食', '其他美食']

const mapState = (state) => ({
    uid: state.userId,
    uname: state.userName,
    islogin: state.isLogin
});

function Main() {

    // const name = sessionStorage.getItem('uName')
    const router = useRouter()
    const { uid, uname, islogin } = useMappedState(mapState)
    const [ userName, setUserName ] = useState(uname)
    const [ area, setArea ] = useState('青山湖区')
    const [ breadcrumb, setBreadcrumb ] = useState('')
    const [ sortList, setSortList ] = useState(sort)
    const [ sortId, setSortId ] = useState(-1)
    const [ storeList, setStoreList ] = useState([])


    console.log(uid, uname, islogin)

    const handleChange = useCallback((value) => {
        console.log(value)
        setArea(value)
    }, [])

    const onSearch = useCallback((value) => {
        console.log(value)
    }, [])

    const selectSort = useCallback((index) => {
        setSortId(index)
        setBreadcrumb(sort[index])
    }, [])

    const selectAll = useCallback(() => {
        setSortId(-1)
        setBreadcrumb('')
    }, [])

    const toUser = useCallback(() => {
        console.log('user')
    }, [])

    const toOut = useCallback(() => {
        console.log('out')
    }, [])

    const getStoreList = useCallback((area, breadcrumb) => {
        axios({
            method: 'post',
            url: servicePath.getStoreList,
            data: { area: area, sort: breadcrumb },
            withCredentials: true
        })
        .then(
            res => {
                if (res.data.type) {
                    console.log('111111111111111', res.data)
                    setStoreList(res.data.storelist)
                } else {
                    console.log('暂无商家')
                }
            }
        )
    }, [])

    useEffect(() => {
        if (!islogin) {
            // router.replace('/')
        }
    }, [])

    useEffect(() => {
        console.log(area, breadcrumb)
        getStoreList(area, breadcrumb)
    }, [area, breadcrumb])

    return (
        <div className='main-body'>
            <div className='main-top'>
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
            <div className='main-search'>
                <img className='search-img' src='/food.png' alt='图片丢失啦' width='60' height='60'/>
                <div className='search-title'>易订</div>
                <div className='title-text'>· 美食</div>
                <div className='search-input'>
                    <Search placeholder="搜索商家" onSearch={onSearch} enterButton />
                </div>
            </div>
            <div className='main-breadcrumb'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>易订</Breadcrumb.Item>
                    <Breadcrumb.Item>美食</Breadcrumb.Item>
                    <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='main-content'>
                <div className='content-left'>
                    <div className='store-sort'>
                        <div className='sort-left'>
                            分类
                        </div>
                        <div className={sortId == -1 ? 'sort-middle select-sort' : 'sort-middle'} onClick={selectAll}>
                            全部
                        </div>
                        <div className='sort-right'>
                            {
                                sortList.map((item, index) => {
                                    let i = index
                                    return (
                                        <div className='sort-li' key={item}>
                                            <a className={sortId == index ? 'li-on select-sort' : 'li-on'} onClick={() => { selectSort(index)}}>{item}</a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='store-list'>
                        <div className='list-title'>
                            默认
                        </div>
                        {
                            storeList?.map((item, index) => {
                                return (
                                    <div className='store-item' key={item.storeId}>
                                        <img className='item-img' src={item.img} width={220} height={125} />
                                        <div className='store-info'>
                                            <div className='info-name'>
                                                {item.storename}
                                            </div>
                                            <div className='info-score'>
                                                评分<img className='img-star' src='/star.png' width={14} height={14} /> {item.score}分
                                            </div>
                                            <div className='info-address'>
                                                {item.address}
                                            </div>
                                            <div className='info-average'>
                                                人均 ￥{item.average}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='content-right'>
                    <div className='rec-title'>
                        猜你喜欢
                    </div>
                    <div className='rec-item'>
                        <img className='item-img' src='https://p1.meituan.net//biztone/163415968_1617077055621.jpeg@188w_106h_1e_1c' width={210} height={115} />
                        <div className='item-name'>
                            古乐牛香·鲜牛肉牛杂火锅（系马桩总店）
                        </div>
                        <div className='item-price'>
                            ￥<span className='price-num'>85.0</span>
                        </div>
                    </div>
                    <div className='rec-item'>
                        <img className='item-img' src='https://p1.meituan.net//biztone/163415968_1617077055621.jpeg@188w_106h_1e_1c' width={210} height={115} />
                        <div className='item-name'>
                            古乐牛香·鲜牛肉牛杂火锅（系马桩总店）
                        </div>
                        <div className='item-price'>
                            ￥<span className='price-num'>85.0</span>
                        </div>
                    </div>
                    <div className='rec-item'>
                        <img className='item-img' src='https://p1.meituan.net//biztone/163415968_1617077055621.jpeg@188w_106h_1e_1c' width={210} height={115} />
                        <div className='item-name'>
                            古乐牛香·鲜牛肉牛杂火锅（系马桩总店）
                        </div>
                        <div className='item-price'>
                            ￥<span className='price-num'>85.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Main