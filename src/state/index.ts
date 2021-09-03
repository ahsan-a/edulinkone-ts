import fs from 'fs';
import path from 'path';

interface Establishment {
	id: number;
	idp_login: {};
	idp_only: boolean;
	logo: string;
	name: string;
}

interface State {
	[index: string]: any;
	school: {
		details: {
			establishment: Establishment;
		};
		fromCode: {
			school_id: number;
			server: string;
		};
	};
	credentials: {
		username: string;
		password: string;
	};
	user: any;
	homework: any;
}

const state = {
	school: {},
	credentials: {},
	user: {},
	homework: {},
} as State;

// create a folder for our config if that doesn't exists
if (!fs.existsSync(path.resolve(__dirname, '../config'))) fs.mkdirSync(path.resolve(__dirname, '../config'));

try {
	state.credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/credentials.json'), 'utf8'));
	state.school = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/school.json'), 'utf8'));
} catch {
	fs.writeFileSync(path.resolve(__dirname, '../config/credentials.json'), '{}');

	// @ts-ignore
	state.credentials = {};

	fs.writeFileSync(path.resolve(__dirname, '../config/school.json'), '{}');
	// @ts-ignore
	state.school = {};
}

export default state;
