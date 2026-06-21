/// <reference types="vite/client" />
import {
  adminContract,
  contract as nonAdminContract,
} from '@57eme-regiment/auth-package';
import { initClient } from '@ts-rest/core';

export const wanAdminUserApi = initClient(adminContract.adminUsers, {
  baseUrl: import.meta.env.VITE_WANSHITONG_SERVICE_URL,
  credentials: 'include',
});

export const wanApi = initClient(nonAdminContract, {
  baseUrl: import.meta.env.VITE_WANSHITONG_SERVICE_URL,
  credentials: 'include',
});
