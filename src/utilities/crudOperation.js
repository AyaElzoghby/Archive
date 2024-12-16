import api from "./api";
import { handleDropdownFormat } from "./functions";

export const get = async (url = "", params = {}) => {
	// console.log("fetching dataddddddddddd");
	try {
		const response = await api.get(
			url +
				"?" +
				Object.keys(params)
					.map((key) => `${key}=${params[key]}`)
					.join("&")
		);
		return response.data;
	} catch (err) {
		return Promise.reject(err);
	}
};

export const post = async (url = "", params = {}, data = {}) => {
	console.log(data);
	try {
		const response = await api.post(
			url +
				"?" +
				Object.keys(params)
					.map((key) => `${key}=${params[key]}`)
					.join("&"),
			data
		);
		return true;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
};

export const put = async (url = "", params = {}, data = {}) => {
	try {
		const response = await api.put(
			url +
				"?" +
				Object.keys(params)
					.map((key) => `${key}=${params[key]}`)
					.join("&"),
			data
		);
		return true;
	} catch (err) {
		return Promise.reject(err);
	}
};

export const Delete = async (url = "", params = {}) => {
	try {
		const response = await api.delete(
			url +
				"?" +
				Object.keys(params)
					.map((key) => `${key}=${params[key]}`)
					.join("&")
		);
		return true;
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getDropDownData = async (spName, params = {}, key, value) => {
	try {
		const response = await api.get(
			`/table/filter?sp=${spName}` +
				Object.keys(params)
					.map((key) => `&${key}=${params[key]}`)
					.join("")
		);
		return handleDropdownFormat(response.data.data, key, value);
	} catch (err) {
		return Promise.reject(err);
	}
};
