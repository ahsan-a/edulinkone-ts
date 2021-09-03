import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../../edulink';
import state from '../../state';
import menu from '..';

export default async function main() {
	console.clear();
	console.log(chalk.magentaBright(figlet.textSync('Timetable')));

	const timetable = await edulink.getTimetable();
	if (!timetable.success) {
		console.log(chalk.redBright(`ERROR: ${timetable.error}`));
		process.exit(1);

		// const viewHomeworkType = await prompts({
		// 	type: 'select',
		// 	name: 'value',
		// 	message: 'What homeworks would you like to view?',
		// 	choices: [
		// 		{ title: 'Current Homeworks', value: 1 },
		// 		{ title: 'Past Homeworks', value: 2 },
		// 		{ title: 'Go Back', value: 0 },
		// 	],
		// });
		// switch (viewHomeworkType.value) {
		// 	case 0:
		// 		menu.main.mainMenu();
		// 		break;
		// 	case 1:
		// 		menu.homework.current(true);
		// 		break;
		// 	case 2:
		// 		menu.homework.current(false);
		// 		break;
	}
}
