import App from "next/app";
import WithRedux from "./withRedux";
import { Provider } from "react-redux";
import { StoreContext } from 'redux-react-hook';

function MyApp({ Component, pageProps, ReduxStore }) {
    return (
        <StoreContext.Provider value={ReduxStore}>
            <Component {...pageProps} />
        </StoreContext.Provider>
    );
}

MyApp.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext);
    /* 获取store并初始化 */
    const store = appContext.ReduxStore;
    store.subscribe(() => {
        console.log("store change");
    });
    store.dispatch({
        type: "add"
    });
    return {
        ...appProps
    };
};
/* 使用WithRedux */
export default WithRedux(MyApp);