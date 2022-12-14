import axios from "axios";
import Cookies from "cookies-js";

// 'access-token' => 'access-token',
// 'client' => 'client',
// 'expiry' => 'expiry',
// 'uid' => 'uid',
// token-type' => 'token-type'

const authHeaders = () => {
	let result = {};
	if(Cookies.get('access-token')) {
		result = {
			'access-token': Cookies.get('access-token'),
			'client': Cookies.get('client'),
			'uid': Cookies.get('uid'),
			'expiry': Cookies.get('expiry'),
			'token-type': Cookies.get('token-type'),
		}
	}

	return result
}

export const setAuthHeaders = (response) => {
	let result = false;
	if(response.headers['access-token']) {
		['access-token', 'client', 'uid', 'expiry', 'token-type'].forEach(header => Cookies.set(header, response.headers[header]));
		result = true;
	}

	return result;
}

export const destroyAuth = () => {
  ['access-token', 'client', 
   'uid', 'expiry', 'name',
   'token-type', 'user_id', 
   'email', 'password'].forEach(header => Cookies.expire(header));
}

export async function authRequest(type, url, params = {}, extraHeaders = {}) {
	return new Promise((resolve, reject) => {
		// do the request and save the headers after it's done
		const headers = {...authHeaders(), ...extraHeaders}
		axios({
			method: type,
			url,
			headers,
			data: params,
		}).then(response => {
			const success = setAuthHeaders(response);
			if(success) {
				resolve(response);
			} else {
				reject(new Error('Not Authenticated'))
			}
		}).catch(error => reject(error));
	});
}

