// src/mocks/browser.js
import { setupWorker } from 'msw';
import { aptRegisterHandlers } from './aptRegisterHandlers';
import { loginHandlers } from './loginHandlers';
import { boardHandlers } from './boardHandlers';
import { familyHandlers } from './familyHandlers';

export const worker = setupWorker(...loginHandlers, ...boardHandlers, ...familyHandlers, ...aptRegisterHandlers);

