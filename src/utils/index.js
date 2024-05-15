import { debounce, DebouncedFunc, DebounceSettings } from 'lodash';
import dayjs from 'dayjs';

export const getFileName = url => {
    let filename = url.substring(url.lastIndexOf('/') + 1); // 获取文件名
    return filename;
};

export const getfilesize = size => {
    //把字节转换成正常文件大小
    if (!size) return '';
    var num = 1024.0; //byte
    if (size < num) return size + 'B';
    if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB'; //kb
    if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + 'MB'; //M
    if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
    return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
};

//文件的下载
export const downloadFile = URL => {
    let x = new XMLHttpRequest();
    x.open('GET', URL, true);
    x.responseType = 'blob';
    x.onload = function (e) {
        let url = window.URL.createObjectURL(x.response);
        let a = document.createElement('a');
        a.href = url;
        a.download = getFileName(URL); //下载后的文件名
        a.click();
    };
    x.send();
};

/**
 * 获取对象下的字段值
 * @param record {}
 * @param key 'a.b.c'
 * @param defaultValue
 * @returns
 */
export const getValueByKeys = (record, key, defaultValue) => {
    const keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
        record = record[keys[i]] || (i === keys.length - 1 ? defaultValue : {});
    }
    return record || defaultValue;
};

/**
 * 数组转对象
 * @param {*} rs 集合
 * @param {*} key 需要转换目标key的名称
 */
export const arrayToObject = (rs, key, render) => {
    const o = {};
    rs.forEach(x => {
        o[typeof key === 'function' ? key(x) : x[key]] = render ? render(x) : x;
    });
    return o;
};

/**
 * 数组转换格式
 * @param rs
 * @param render
 * @returns
 */
export const arrayToKeyValueArray = (rs, render) => {
    return rs.map(x => (render ? render(x) : typeof x === 'object' ? x : { label: x, value: x }));
};

/**
 * 是否只null和undefined值
 * @param vl
 * @returns
 */
export const isNullOrUndefined = vl => {
    return vl === null || typeof vl === 'undefined';
};

/**
 * 是否外链
 * @param path
 * @returns
 */
export const isExternalLink = path => {
    return /^(https?:|\/\/|mailto:|tel:|^{{\s?ApiUrl\s?}})/.test(path);
};

/**
 * 复制
 * @param value
 */
export const copyToClipboard = value => {
    const transfer = document.createElement('textarea');
    document.body.appendChild(transfer);
    transfer.value = value;
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();
    document.body.removeChild(transfer);
};

/**
 * 检查是否有权限
 * @param permission
 * @param key
 * @returns
 */
export const checkPermission = (permission, key) => {
    return permission.includes(key);
};

/**
 * 获取uuid
 */
export const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

/**
 * 邮箱
 * @param {*} s
 */
export const isEmail = s => {
    return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
};

/**
 * 手机号码
 * @param {*} s
 */
export const isMobile = s => {
    return /^1[0-9]{10}$/.test(s);
};

/**
 * 电话号码
 * @param {*} s
 */
export const isPhone = s => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * URL地址
 * @param {*} s
 */
export const isURL = s => {
    return /^http[s]?:\/\/.*/.test(s);
};

/**
 * 正整数
 * @param {*} s
 */
export const isNumber = s => {
    return /^\+?[1-9][0-9]*$/.test(s);
};

/**
 * 获取字典数据列表
 * @param dictType  字典类型
 */
export const getDictDataList = (list, dictType) => {
    const type = list.find(element => element.dictType === dictType);
    if (type) {
        return type.dataList;
    }
    return [];
};

/**
 * 获取字典名称
 * @param dictType  字典类型
 * @param dictValue  字典值
 */
export const getDictLabel = (list, dictType, dictValue) => {
    const type = list.find(element => element.dictType === dictType);
    if (type) {
        const val = type.dataList.find(element => element.dictValue === dictValue + '');
        if (val) {
            return val.dictLabel;
        }
        return dictValue;
    }
    return dictValue;
};

/**
 * 获取svg图标(id)列表
 */
export const getIconList = () => {
    const rs = [];
    const list = document.querySelectorAll('svg symbol');
    for (let i = 0; i < list.length; i++) {
        rs.push(list[i].id);
    }
    return rs;
};

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export const treeDataTranslate = (data, id, pid) => {
    const res = [];
    const temp = {};
    id = id || 'id';
    pid = pid || 'pid';
    for (let i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i];
    }
    for (let k = 0; k < data.length; k++) {
        if (!temp[data[k][pid]] || data[k][id] === data[k][pid]) {
            res.push(data[k]);
            continue;
        }
        if (!temp[data[k][pid]].children) {
            temp[data[k][pid]].children = [];
        }
        temp[data[k][pid]].children.push(data[k]);
        data[k]._level = (temp[data[k][pid]]._level || 0) + 1;
    }
    return res;
};

/**
 * 全局组件安装
 * @param component
 * @param alias
 * @returns
 */
export const withInstall = (component, alias) => {
    const comp = component;
    comp.install = app => {
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component;
};

/**
 * 节流函数 `created() {this.dataFormSubmitHandle = useDebounce(this.dataFormSubmitHandle);}`
 * @param fn
 * @param wait
 * @returns
 */
export const useDebounce = (fn, wait, options) => {
    return debounce(fn, wait ?? 1000, {
        leading: true,
        trailing: false,
        ...options
    });
};

/**
 * 金额转换除以10000
 */
export const moneyFormat = (value, unit = '') => {
    if (value === undefined || value === null) {
        return '';
    }
    if (typeof value === 'string') {
        value = value.replace(/,/g, '');
    }
    value = Number(value);
    if (isNaN(value)) {
        return '';
    }
    if (value === 0) {
        return '0';
    }
    value = value / 100;
    return value.toFixed(2) + unit;
};

/**
 * 时间转换 年月日时分秒
 */
export const timeFormat = date => {
    return dayjs(date * 1000).format('YYYY-MM-DD HH:mm:ss'); // display
};
