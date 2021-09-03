import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../../edulink';
import state from '../../state';
import menu from '..';
import functions from '../../functions';

import type { Homework, HomeworkDetails, Attachment } from '../../typings';

export default async function singleHomework(homework: Homework, isCurrentHomework: boolean) {
	console.clear();
	console.log(chalk.yellow(figlet.textSync(functions.capitilise(homework.subject))));

	let homeworkDetails: HomeworkDetails = await edulink.homeworkDetails(homework.id);

	let attachments: Attachment[] = [];
	for (const attachment of homework.attachments) {
		const attachmentDetails = await edulink.getAttachment(homework.id, attachment.id);
		attachment.url = attachmentDetails.url;
		attachments.push(attachment);
	}

	homeworkDetails.description = homeworkDetails.description.replace(/<br.?\/?>/gi, '\n\n').replace(/(<([^>]+)>)/gi, '');

	console.log(chalk.blue(homework.activity));
	console.log(`${homeworkDetails.description}\n`);
	console.log(`${chalk.blue('Set By:')} ${homework.set_by}`);
	console.log(`${chalk.blue('Due Date:')} ${homework.due_date} (${homework.due_text})`);
	console.log(`${chalk.blue('Status:')} ${homework.status}\n`);

	if (attachments.length) {
		console.log(chalk.blue('Attachments'));
		for (const attachment of attachments) {
			console.log(functions.link(attachment.filename, attachment.url ?? '') || `${chalk.cyan(`${attachment.filename}:`)} ${attachment.url}`);
		}
		console.log('\n');
	}

	const option = await prompts({
		type: 'select',
		name: 'value',
		message: 'Pick an option',
		choices: [
			{
				title: `Mark as ${homework.completed ? 'not done ❌' : 'done ✅'}`,
				value: 1,
			},
			{
				title: 'Go Back',
				value: 0,
			},
		],
	});

	switch (option.value) {
		case 0:
			menu.homework.current(isCurrentHomework);
			break;
		case 1:
			await edulink.changeCompletionStatus(homework.id, !homework.completed);
			state.homework = await edulink.getHomework();
			menu.homework.current(isCurrentHomework);
			break;
	}
}
