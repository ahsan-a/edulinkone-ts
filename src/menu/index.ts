import login from './login';
import mainMenu from './mainMenu';
import homework from './homework';

const menu = { ...login, ...mainMenu, ...homework };

export default menu;
