#!/usr/bin/env node

import state from './state';
import menu from './menu';

if (Object.keys(state.credentials).length < 1 || Object.keys(state.school).length < 1) {
	menu.init();
} else {
	menu.mainMenu();
}
