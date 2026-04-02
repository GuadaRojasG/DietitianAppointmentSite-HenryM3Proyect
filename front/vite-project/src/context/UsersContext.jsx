/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";

export const UsersContext = createContext({
    isLogged: false,
    myApp: [],
    registerUser: () => {},
    loginUser: () => {},
    logutUser: () => {},
    getUserAppointments: () => {},
    scheduleAppointment: () => {},
    cancelAppointment: () => {}
})

export const UsersProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("user")))
    const [myApp, setMyApp] = useState([])

    const registerUser = async (values) => {
        return await axios.post('http://localhost:3000/users/register', values)
    }

    const loginUser = async (values) => {
        const response = await axios.post('http://localhost:3000/users/login', values)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        setIsLogged(response.data.user)
        return response
    }

    const logoutUser = () => {
        setIsLogged(false)
    }

    const getUserAppointments = async () => {
        const response = await axios.get(`http://localhost:3000/users/${isLogged.id}`)
        setMyApp(response.data.user.appointments)
    }

    const scheduleAppointment = async (values) => {
        const appData = {
            ...values,
            userId: isLogged.id
        }
        await axios.post(`http://localhost:3000/appointments/schedule`, appData)
    }

    const cancelAppointment = async (id) => {
        try {
            await axios.put(`http://localhost:3000/appointments/cancel/${id}`)
            const newMyApp = myApp.map( (app) => {
                if (app.id === id) {
                    app.status = "Cancelado"
                    return app
                } else {
                    return app
                }
            })
            setMyApp(newMyApp)
        } catch (error) {
            return error
        }
    }

    const value = {
        isLogged,
        myApp,
        registerUser,
        loginUser,
        logoutUser,
        getUserAppointments,
        scheduleAppointment,
        cancelAppointment
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}