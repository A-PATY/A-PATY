// src/mocks/browser.js
import { setupWorker } from 'msw';
import { loginHandlers } from './loginHandlers';
import { familyHandlers } from './familyHandlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...loginHandlers, ...familyHandlers);
