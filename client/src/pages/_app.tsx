import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from "axios";
import {Provider} from "react-redux";
import wrapper from '../redux/store';

export default function App({ Component, ...rest }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  axios.defaults.withCredentials = true;
  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
    <Component {...props.pageProps} />
    </Provider>
    
  );
}
