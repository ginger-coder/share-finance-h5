const baseURL =
    import.meta.env.VITE_NODE_ENV === 'development'
        ? import.meta.env.VITE_APP_BASE_API
        : import.meta.env.VITE_APP_BASE_URL + '' + import.meta.env.VITE_APP_BASE_API;
const serverConfig = {
    baseURL, // 请求基础地址,可根据环境自定义
    useTokenAuthorization: true // 是否开启 token 认证
};
console.log('import.meta.env', import.meta.env);
export default serverConfig;
