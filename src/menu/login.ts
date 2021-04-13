import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../edulink';
import state from '../state';
import functions from '../functions';
import menu from '.';

const methods = {
	init: async () => {
		console.clear();
		console.log(chalk.blue(figlet.textSync('Edulink One CLI')));

		const option = await prompts({
			type: 'select',
			name: 'value',
			message: 'Welcome to the Edulink One CLI, what would you like to do?',
			choices: [
				{ title: 'Sign In', value: 0 },
				{ title: 'Exit', value: 1 },
			],
			initial: 0,
		});
		switch (option.value) {
			case 0:
				await methods.inputPostcode();
				break;
			case 1:
				console.clear();
				process.exit();
		}
	},

	inputPostcode: async () => {
		const postcode = await prompts({
			type: 'text',
			name: 'value',
			message: 'Insert your school postcode: ',
		});
		const schoolFromCode = await edulink.schoolFromCode(postcode.value);
		if (schoolFromCode.success) {
			state.school.fromCode = schoolFromCode.school;
			state.school.details = await edulink.SchoolDetails();
			functions.updateConfig('school');

			console.clear();
			console.log(chalk.magenta(figlet.textSync(state.school.details.establishment.name)));
			methods.loginWithCredentials();
		} else {
			console.log(chalk.redBright(schoolFromCode.error));
			methods.inputPostcode();
		}
	},

	loginWithCredentials: async () => {
		const credentials = await prompts([
			{ type: 'text', name: 'username', message: `What's your username? ` },
			{ type: 'password', name: 'password', message: `What's your password? ` },
		]);
		const user = await edulink.getUser(credentials.username, credentials.password);
		if (!user.success) {
			console.log(chalk.redBright(user.error));
			methods.loginWithCredentials();
		} else {
			state.credentials = credentials;
			functions.updateAllConfig();
			state.user = user;
			menu.mainMenu();
		}
	},
};

export default methods;
