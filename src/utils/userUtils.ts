

export const emailSignIn = (data) => {
    return fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((res) => res.json());
}

export const registerUser = (data) => {
    return fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((res) => res.json());
}

export const updateUserData = (data) => {
    const userData = {
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        newPassword: data.newPassword
    }
    return fetch("http://localhost:5000/api/user", {
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data.token}`
        },
        body: JSON.stringify(userData)
    }).then((res) => res.json());
}
