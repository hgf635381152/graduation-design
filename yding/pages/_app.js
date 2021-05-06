import App from 'next/app'
import 'antd/dist/antd.css'
import React from 'react'
import withRedux from './withRedux.js'
import { StoreContext } from 'redux-react-hook';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist'
import createMyStore from '../store/index.js'

const store = createMyStore();
export const persistor = persistStore(store)

class MyApp extends App {
    // App组件的getInitialProps比较特殊
    // 能拿到一些额外的参数
    // Component: 被包裹的组件
    static async getInitialProps(ctx) {
        const { Component } = ctx
        let pageProps = {}

        // 拿到Component上定义的getInitialProps
        if (Component.getInitialProps) {
            // 执行拿到返回结果`
            pageProps = await Component.getInitialProps(ctx)
        }

        // 返回给组件
        return {
            pageProps,
        }
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props
        return (
            <StoreContext.Provider value={reduxStore}>
                {/* 把pageProps解构后传递给组件 */}
                <PersistGate persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </StoreContext.Provider>
        )
    }
}

export default withRedux(MyApp)
