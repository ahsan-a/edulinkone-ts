import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../../edulink';
import state from '../../state';
import menu from '..';
import functions from '../../functions';

export default async function main() {
	console.clear();
	console.log(chalk.yellow(figlet.textSync('Homework')));

	if (Object.keys(state.homework).length < 1) {
		state.homework = await edulink.getHomework();
	}
	const viewHomeworkType = await prompts({
		type: 'select',
		name: 'value',
		message: 'What homeworks would you like to view?',
		choices: [
			{ title: 'Current Homeworks', value: 1 },
			{ title: 'Past Homeworks', value: 2 },
			{ title: 'Go Back', value: 0 },
		],
	});
	switch (viewHomeworkType.value) {
		case 0:
			menu.main.mainMenu();
			break;
		case 1:
			menu.homework.current(true);
			break;
		case 2:
			menu.homework.current(false);
			break;
	}
}
