import figlet from 'figlet';
import chalk from 'chalk';
import prompts from 'prompts';
import edulink from '../../edulink';
import state from '../../state';
import menu from '..';
import functions from '../../functions';

export default async function postcode() {
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
		menu.login.credentials();
	} else {
		console.log(chalk.redBright(schoolFromCode.error));
		menu.login.postcode();
	}
}
