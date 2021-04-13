import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import state from '../state';

const methods = {
	getHomework: async () => {
		return fetch(`${state.school.fromCode.server}?method=EduLink.Homework`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				authorization: `Bearer ${state.user.authtoken}`,
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.Homework',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.Homework","params":{"format":2},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result.homework);
	},
};

export default methods;
