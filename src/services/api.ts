export const globalData = async () => {
	try {
		const response = await fetch("https://api.covid19api.com/world/total");
		return await response.json();
	} catch (error) {
		return error;
	}
};

export const countries = async () => {
	try {
		const response = await fetch("https://api.covid19api.com/summary");
		return await response.json();
	} catch (error) {
		return error;
	}
};

export const country = async (country: string) => {
	try {
		const response = await fetch(
			"https://api.covid19api.com/country/" + country
		);
		return await response.json();
	} catch (error) {
		return error;
	}
};
