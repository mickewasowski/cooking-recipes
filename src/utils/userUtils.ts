import { UserSignIn, UserRegisterStart, UserEditStart } from '../store/user/user.types';

export const emailSignIn = (data: UserSignIn): Promise<EmailSignInResponse> => {
    return fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => {
        throw new Error(error.message);
    });
}

export const registerUser = (data: UserRegisterStart): Promise<RegisterResponse> => {
    return fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => {
        throw new Error(error.message);
    });
}

export const updateUserData = (data: UserEditStart): Promise<EditUserResponse> => {
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
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => {
        throw new Error(error.message);
    });
}

type UserObjectLoginOrEditResponse = {
    id: string;
    email: string;
    fullName: string;
    token: string;
}

type EmailSignInResponse = {
    success: boolean;
    user?: UserObjectLoginOrEditResponse;
    message?: string;
}

type UserRegisterObjectResponse = {
    email: string;
    fullName: string;
}

type RegisterResponse = {
    success: boolean;
    user?: UserRegisterObjectResponse;
    message?: string;
}

type EditUserResponse = {
    success: boolean;
    user?: UserObjectLoginOrEditResponse;
    message?: string;
}
