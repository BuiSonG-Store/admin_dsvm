export const setSessionStorage = (user) => {
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('userGmail', user.gmail);
    sessionStorage.setItem('userPhoneNumber', user.phoneNumber);
    sessionStorage.setItem('token', user.token);
};
export const getSessionStorage = () => {
    return{
        name:sessionStorage.getItem('userName'),
        gmail:sessionStorage.getItem('userGmail'),
        phoneNumber:sessionStorage.getItem('userPhoneNumber'),
        token:sessionStorage.getItem('token'),
    };
};

export const removeUser = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userGmail');
    sessionStorage.removeItem('userPhoneNumber');
    sessionStorage.removeItem('token');
};
export const getUser = () => {
    return sessionStorage.getItem('userGmail');
};
