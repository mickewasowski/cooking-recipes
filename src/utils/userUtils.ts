

export const emailSignIn = (data) => {
    //console.log(data)
    return fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((res) => res.json());
}