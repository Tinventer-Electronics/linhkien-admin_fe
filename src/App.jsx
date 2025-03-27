import './styles/app.scss';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import Routers from './routers/Routers';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#b22222',
                    fontFamily: 'Noto Sans, sans-serif',
                    fontSize: 16,
                },
            }}
        >
            <Provider store={store}>
                <Routers />
            </Provider>
        </ConfigProvider>
    );
}

export default App;
