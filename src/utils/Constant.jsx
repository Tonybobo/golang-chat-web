export const API_VERSION = '/api';

const PROTOCOL = 'https://';
export const IP_PORT = 'go-chat.fly.dev';
//local
export const HOST = PROTOCOL + IP_PORT;

export const LOGIN_URL = HOST + API_VERSION + '/user/login';
export const REGISTER_URL = HOST + API_VERSION + '/user/register';
export const UPDATE_USER_URL = HOST + API_VERSION + '/edituser';
export const USER_URL = HOST + API_VERSION + '/user/';
export const UPLOAD_USER_AVATAR = HOST + API_VERSION + '/user/upload';
export const USER_NAME_URL = HOST + '/user/name';
export const USER_LIST_URL = HOST + '/user';
export const SEARCH_URL = HOST + API_VERSION + '/search/';

export const USER_FRIEND_URL = HOST + '/friend';
export const ADD_FRIEND_URL = HOST + API_VERSION + '/user/add';

export const MESSAGE_URL = HOST + API_VERSION + '/messages';

export const GROUP_LIST_URL = HOST + API_VERSION + '/group/';
export const GROUP_CREATE_URL = HOST + API_VERSION + '/group/save/';
export const GROUP_USER_URL = HOST + '/group/user/';
export const GROUP_JOIN_URL = HOST + API_VERSION + '/group/join/';
export const GROUP_UPLOAD_AVATAR_URL = HOST + API_VERSION + '/group/upload/';
export const GROUP_UPDATE_DETAIL = HOST + API_VERSION + '/group/edit/';

export const GROUP_MEMBER = HOST + API_VERSION + '/group/user/';

export const SIGNED_URL = HOST + API_VERSION + '/message/url';

export const AUDIO_ONLINE = 6; // 语音聊天
export const VIDEO_ONLINE = 7; // 视频聊天

export const DIAL_MEDIA_START = 10; // 拨打媒体开始占位符
export const DIAL_AUDIO_ONLINE = 11; // 语音聊天拨号
export const ACCEPT_AUDIO_ONLINE = 12; // 语音聊天接听
export const CANCELL_AUDIO_ONLINE = 13; // 语音聊天取消
export const REJECT_AUDIO_ONLINE = 14; // 语音聊天拒接

export const DIAL_VIDEO_ONLINE = 15; // 视频聊天拨号
export const ACCEPT_VIDEO_ONLINE = 16; // 视频聊天接听
export const CANCELL_VIDEO_ONLINE = 17; // 视频聊天取消
export const REJECT_VIDEO_ONLINE = 18; // 视频聊天拒接

export const DIAL_MEDIA_END = 20; // 拨打媒体结束占位符

export const MESSAGE_TRANS_TYPE = 'webrtc';
