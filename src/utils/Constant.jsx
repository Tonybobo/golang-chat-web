export const API_VERSION = '/api';

const PROTOCOL = 'http://';
export const IP_PORT = 'localhost:8888';
//local
export const HOST = PROTOCOL + IP_PORT;

export const LOGIN_URL = HOST + API_VERSION + '/user/login';
export const REGISTER_URL = HOST + API_VERSION + '/user/register';
export const USER_URL = HOST + API_VERSION + '/user/';
export const USER_NAME_URL = HOST + '/user/name';
export const USER_LIST_URL = HOST + '/user';
export const SEARCH_URL = HOST + API_VERSION + '/search/';

export const USER_FRIEND_URL = HOST + '/friend';

export const MESSAGE_URL = HOST + '/message';

export const GROUP_LIST_URL = HOST + '/group';
export const GROUP_USER_URL = HOST + '/group/user/';
export const GROUP_JOIN_URL = HOST + '/group/join/';
