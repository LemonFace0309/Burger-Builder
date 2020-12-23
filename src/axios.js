import axios from 'axios'

const orderInstance = axios.create({
    baseURL: 'https://react-my-burger-hehe-default-rtdb.firebaseio.com/',
    timeout: 2000,
})

export default orderInstance;