// src/mocks/browser.js
import { setupWorker } from 'msw';
import { loginHandlers } from './loginHandlers';
import { boardHandlers } from './boardHandlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...loginHandlers, ...boardHandlers);
