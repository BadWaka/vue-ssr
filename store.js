import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 假定我们有一个可以返回 Promise 的通用 API（请忽略此 API 具体实现细节）
import {
    fetchItem
} from './api';
export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem({
                commit
            }, id) {
                return fetchItem(id).then(item => {
                    commit('setItem', {
                        id,
                        item
                    });
                });
            }
        },
        mutations: {
            setItem(state, {
                id,
                item
            }) {
                Vue.set(state.items, id, item);
            }
        }
    });
};