/// <reference types="vite/client" />
import { adminUsersContract, contract as nonAdminContract, } from '@57eme-regiment/auth-contracts';
import { initClient } from '@ts-rest/core';
export const wanAdminUserApi = initClient(adminUsersContract, {
    baseUrl: import.meta.env.VITE_WANSHITONG_SERVICE_URL,
    credentials: 'include',
});
export const wanApi = initClient(nonAdminContract, {
    baseUrl: import.meta.env.VITE_WANSHITONG_SERVICE_URL,
    credentials: 'include',
});
