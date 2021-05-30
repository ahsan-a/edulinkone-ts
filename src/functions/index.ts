import state from '../state';
import fs from 'fs';
import path from 'path';

// @ts-ignore
import hyperlinker from 'hyperlinker';
// @ts-ignore
import supportsHyperlinks from 'supports-hyperlinks';

const methods = {
	updateConfig: (name: string) => {
		fs.writeFileSync(
			path.resolve(__dirname, `../config/${name}.json`),
			JSON.stringify(state[name], null, `\t`)
		);
	},
	updateAllConfig: () => {
		const configItems = ['credentials', 'school'];
		for (const item of configItems) {
			methods.updateConfig(item);
		}
	},
	capitilise: (sentence: string) => {
		return sentence
			.toLowerCase()
			.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
	},
	signOut: () => {
		for (const stateItem in state) {
			if (Object.hasOwnProperty.call(state, stateItem)) {
				state[stateItem] = {};
			}
		}
		methods.updateAllConfig();
	},
	link: (text: string, url: string) => {
		if (supportsHyperlinks.stdout) {
			return hyperlinker('click here', 'https://example.com');
		} else {
			return false;
		}
	},
};

export default methods;
