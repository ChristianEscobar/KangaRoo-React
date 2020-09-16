const extractLettersForAvatar = (fosterName) => {
	if (!fosterName.toLowerCase().includes(' and ')) {
		return fosterName[0];
	}

	const startIndex = fosterName.toLowerCase().indexOf(' and ');
	return `${fosterName[0]}&${fosterName.charAt(startIndex + 5)}`;
};

module.exports = {
	extractLettersForAvatar,
};
