import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../../edulink';
import state from '../../state';
import menu from '..';
import functions from '../../functions';

export default async function credentials(recalling = false) {
	if (!recalling) {
		console.clear();
		console.log(
			chalk.magenta(figlet.textSync(state.school.details.establishment.name))
		);
	}
	const credentials = await prompts([
		{ type: 'text', name: 'username', message: `What's your username? ` },
		{ type: 'password', name: 'password', message: `What's your password? ` },
	]);
	const user = await edulink.getUser(
		credentials.username,
		credentials.password
	);
	if (!user.success) {
		console.log(chalk.redBright(user.error));
		menu.login.credentials(true);
	} else {
		state.credentials = credentials;
		functions.updateAllConfig();
		state.user = user;

		menu.main.mainMenu();
	}
}
