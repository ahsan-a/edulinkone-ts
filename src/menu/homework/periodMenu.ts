import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import state from '../../state';
import menu from '..';
import functions from '../../functions';

import type { Homework } from '../../typings';

export default async function current(isCurrentHomework: boolean) {
	console.clear();
	const homeworkTimePeriod = isCurrentHomework ? 'current' : 'past';
	console.log(chalk.yellow(figlet.textSync(`${functions.capitilise(homeworkTimePeriod)} Homework`)));

	let homeworkChoices: prompts.Choice[] = [{ title: 'Go Back', value: 0 }];

	if (isCurrentHomework) {
		state.homework.current.sort((a: Homework, b: Homework) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
	} else {
		state.homework.past.sort((a: Homework, b: Homework) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());
	}

	state.homework[homeworkTimePeriod].forEach((homework: Homework) => {
		homeworkChoices.push({
			title: `${homework.subject}: ${homework.activity} (${homework.due_text}) ${homework.completed ? '✅' : '❌'}`,
			value: homework,
		});
	});

	const homework = await prompts({
		type: 'select',
		name: 'value',
		message: 'Select a homework',
		choices: homeworkChoices,
	});

	switch (homework.value) {
		case 0:
			menu.homework.main();
			break;
		default:
			menu.homework.singleHomework(homework.value, isCurrentHomework);
	}
}
