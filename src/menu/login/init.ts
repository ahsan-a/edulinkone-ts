import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import menu from '..';

export default async function init() {
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
			menu.login.postcode();
			break;
		case 1:
			console.clear();
			process.exit();
	}
}
