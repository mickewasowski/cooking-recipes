export const validateInputValue = (input: string, type: string) => {
    if (!input) {
        return false;
    }
    switch (type) {
        case 'email': {
            return String(input)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }
        case 'fullName': {
            if (input.length < 5) {
                return false;
            }
            return true;
        }
        case 'password': {
            if (input.length < 8) {
                return false;
            }
            return String(input)
                .toLowerCase()
                .match(
                    /^(?=.*[0-9a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,20}$$/
                );
        }
        case 'newPassword': {
            if (input.length < 8) {
                return false;
            }
            return String(input)
                .toLowerCase()
                .match(
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                );
        }
    }
}