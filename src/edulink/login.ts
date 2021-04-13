import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import state from '../state';

const methods = {
	schoolFromCode: async (postcode: string) => {
		return fetch('https://provisioning.edulinkone.com/?method=School.FromCode', {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
			},
			body: `{"jsonrpc":"2.0","method":"School.FromCode","params":{"code":"${postcode}"},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result);
	},
	SchoolDetails: function () {
		return fetch(`${state.school.fromCode.server}?method=EduLink.SchoolDetails`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.SchoolDetails',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.SchoolDetails","params":{"establishment_id":"${
				state.school.fromCode.school_id
			}","from_app":false},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result);
	},
	getUser: async (username: string, password: string) => {
		return fetch(`${state.school.fromCode.server}?method=EduLink.Login`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.Login',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.Login","params":{"from_app":false,"ui_info":{"format":2,"version":"0.5.153","git_sha":"bd4bd9ecc749884a2490c81d6f9169f09a9f3df1"},"fcm_token_old":"none","username":"${username}","password":"${password}","establishment_id":${
				state.school.fromCode.school_id
			}},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result);
	},
};

export default methods;
