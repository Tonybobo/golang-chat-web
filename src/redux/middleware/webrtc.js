import { createAction } from '@reduxjs/toolkit';

export const audioCall = createAction('panel/audioCall');

export const receiveAudioCall = createAction('panel/receiveAudioCall');
export const rejectAudioCall = createAction('panel/rejectAudioCall');
export const receiveVideoCall = createAction('panel/receiveVideoCall');
export const rejectVideoCall = createAction('panel/rejectVideoCall');

export const answerAudioCall = createAction('panel/answerAudioCall');

export const setCallAccepted = createAction('panel/callAccepted');

export const leaveCall = createAction('panel/leaveCall');

export const calling = createAction('panel/calling');
