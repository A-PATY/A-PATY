// src/mocks/browser.js
import { setupWorker } from 'msw';
import { aptRegisterHandlers } from './aptRegisterHandlers';
import { loginHandlers } from './loginHandlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...loginHandlers, ...aptRegisterHandlers);
