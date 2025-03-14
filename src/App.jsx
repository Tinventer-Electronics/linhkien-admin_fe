import './styles/app.scss'
import '@ant-design/v5-patch-for-react-19';
import { Button, ConfigProvider } from 'antd'
import Routers from './routers/Routers'

function App() {

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#AD343E',
        fontFamily: 'Noto Sans, sans-serif',
        fontSize: 16
      }
    }}>
      <Routers/>
    </ConfigProvider>
  )
}

export default App
