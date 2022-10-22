import { LOGIN_ROUTE, CHAT_ROUTE, USERS_ROUTE } from "./utils/consts";
import Login from './components/Login'
import Chat from './components/Chat'
import Users from "./components/Users";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRoutes = [
    {
        chat: {
            path: CHAT_ROUTE,
            Component: Chat
        },
        users: {
            path: USERS_ROUTE,
            Component: Users
        }
    }
]