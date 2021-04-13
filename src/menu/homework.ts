import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../edulink';
import state from '../state';
import functions from '../functions';
import menu from '.';

const methods = {
	homeworkMainMenu: async () => {
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
				menu.mainMenu();
				break;
			case 1:
				methods.viewCurrentHomework();
		}
	},
	viewCurrentHomework: async () => {
		console.clear();
		console.log(chalk.yellow(figlet.textSync('Current Homework')));
		var currentHomeworks: any[] = ['Go Back'];
		var homeworkKey: any[] = [];

		state.homework.current.sort((a: any, b: any) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()); // sort homework by due date

		for (let i in state.homework.current) {
			const homework = state.homework.current[i];
			const name = `${homework.subject}: ${homework.activity} (${Math.round(
				Math.abs((Date.now() - new Date(homework.due_date).getTime()) / (1000 * 60 * 60 * 24))
			)} ${Math.round(Math.abs((Date.now() - new Date(homework.due_date).getTime()) / (1000 * 60 * 60 * 24))) == 1 ? 'day' : 'days'}) ${
				homework.completed ? '✅' : '❌'
			}`;

			currentHomeworks.push(name);
			homeworkKey.push(homework);
		}
		const selected = await prompts({
			type: 'select',
			name: 'value',
			message: 'Select a homework',
			choices: currentHomeworks,
		});
		if (selected.value == 0) {
			menu.mainMenu();
		} else {
			console.log(homeworkKey[selected.value - 1]);
		}
	},
};
export default methods;
