import state from './state';
import menu from './menu';

if (
	!(Object.keys(state.credentials).length && Object.keys(state.school).length)
) {
	menu.login.init();
} else {
	menu.main.mainMenu();
}
