#!/usr/bin/env node

import state from './state';
import menu from './menu';

if (Object.keys(state.credentials).length < 1 || Object.keys(state.school).length < 1) {
	console.log('work');
	menu.login.init();
} else {
	console.log('not work');
}

//how come no node_module folder
//should be in root
