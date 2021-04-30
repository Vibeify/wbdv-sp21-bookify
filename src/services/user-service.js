const USERS_URL = "http://localhost:4000/api/users"

const register = (credentials) => {
  return fetch(`${USERS_URL}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
}

const profile = () => {
  return fetch(`${USERS_URL}/profile`, {
    method: "POST",
    credentials: "include"
  }).then(response => response.json())
}

const login = () => {

}

const logout = () => {

}

export default {
  register,
  profile,
  login,
  logout
}