// src/mocks/browser.js
import { setupWorker } from 'msw';
import { aptRegisterHandlers } from './aptRegisterHandlers';
import { boardHandlers } from './boardHandlers';
import { familyHandlers } from './familyHandlers';
import { userHandlers } from './userHandlers';

export const worker = setupWorker(
  ...userHandlers,
  ...boardHandlers,
  ...familyHandlers,
  ...aptRegisterHandlers,
);
