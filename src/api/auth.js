import serviceAxios from '@/utils/request';

export const login = data => {
    return serviceAxios({
        url: '/console/auth/login',
        method: 'get',
        params: data
    });
};
export const register = data => {
    return serviceAxios({
        url: '/console/register',
        method: 'post',
        data
    });
};
export const userInfo = data => {
    return serviceAxios({
        url: '/console/who',
        method: 'post',
        data
    });
};
