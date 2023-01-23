import { createAction } from '@reduxjs/toolkit';

export const audioCall = createAction('panel/audioCall');
export const receiveAudioCall = createAction('panel/receiveAudioCall');
export const receiveVideoCall = createAction('panel/receiveVideoCall');
