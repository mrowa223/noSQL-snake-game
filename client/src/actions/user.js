import axios from 'axios'

export const signup = async (email, username, password) => {
    try {
        const response = await axios.post('http://localhost:4000/api/auth/register', {
            email,
            username,
            password
        }) 

        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = async (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                username,
                password
            }) 
            
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }    
}

