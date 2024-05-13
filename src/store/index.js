import { defineStore } from 'pinia';
import baseService from '@/utils/request';
import { removeCache } from '@/utils/cache';
import { CacheToken } from '@/constants';

export const useAppStore = defineStore('useAppStore', {
    state: () => ({
        state: {
            appIsReady: false,
            appIsLogin: false,
            user: {},
            count: {}
        }
    }),
    actions: {
        selectStep(val) {
            this.activeStep = val;
        },
        initApp() {
            return Promise.all([
                baseService.get('/console/who'), //用户信息
                baseService.get('/console/my_items_count') //个人中心
            ]).then(([user, count]) => {
                if (user.code === 0) {
                    this.updateState({
                        user: user.data.info || {},
                        count: count.data || {}
                    });
                }
            });
        },
        updateState(data) {
            Object.keys(data).forEach(x => {
                this.state[x] = data[x];
            });
        },
        //退出
        logout() {
            removeCache(CacheToken, true);
            this.updateState({
                user: {}
            });
        }
    }
});
