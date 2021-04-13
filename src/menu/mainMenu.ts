import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../edulink';
import state from '../state';
import functions from '../functions';
import menu from '.';

const methods = {
	mainMenu: async () => {
		if (Object.keys(state.user).length < 1) {
			const user = await edulink.getUser(state.credentials.username, state.credentials.password);
			if (!user.success) {
				console.log(chalk.redBright(user.error));
				menu.loginWithCredentials();
			} else {
				state.user = user;
			}
		}

		console.clear();
		console.log(chalk.cyan(figlet.textSync(`Welcome, ${functions.capitilise(state.user.user.forename)}!`)));
		const action = await prompts({
			type: 'select',
			name: 'value',
			message: 'Welcome! What would you like to do?',
			choices: [
				{ title: 'View Homeworks', value: 2 },
				{ title: 'Sign Out', value: 1 },
				{ title: 'Quit', value: 0 },
			],
		});
		switch (action.value) {
			case 0:
				console.clear();
				process.exit(0);
			case 1:
				functions.signOut();
				menu.init();
				break;
			case 2:
				menu.homeworkMainMenu();
				break;
		}
	},
};
export default methods;
