import axios from 'axios';
import serviceAxios from '@/utils/request';
import serverConfig from '@/utils/config';
import { getToken } from '@/utils/cache';

export const getProductList = data => {
    return serviceAxios({
        url: '/company/product/list',
        method: 'GET',
        params: data
    });
};
export const getMyItemsCount = data => {
    return serviceAxios({
        url: '/console/my_items_count',
        method: 'GET',
        params: data
    });
};

/**
 * 项目分页列表
 */
export const getProjectPageList = data => {
    return serviceAxios({
        url: '/company/project/page_list',
        method: 'GET',
        params: data
    });
};
/**
 * 新增项目
 */
export const projectCreate = data => {
    return serviceAxios({
        url: '/company/project/create',
        method: 'POST',
        data: data
    });
};
/**
 * 上传文件
 */
export const uploadFile2path = data => {
    return serviceAxios({
        url: '/comm/qiniu/upload/file2path',
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data'
        },
        data: data
    });
};

/**
 * 上传产品
 */
export const getProjectInfo = data => {
    return serviceAxios({
        url: '/company/project/info',
        method: 'GET',
        params: data
    });
};
/**
 * 产品详情
 */
export const getProductInfo = data => {
    return serviceAxios({
        url: '/company/product/info',
        method: 'GET',
        params: data
    });
};
/**
 * 下拉项目列表
 */
export const getOptionProjectList = data => {
    return serviceAxios({
        url: '/company/project/list',
        method: 'GET',
        params: data
    });
};
/**
 * 申请记录列表
 */
export const getApplyBackletterList = data => {
    return serviceAxios({
        url: '/console/apply_backletter/list',
        method: 'GET',
        params: data
    });
};
