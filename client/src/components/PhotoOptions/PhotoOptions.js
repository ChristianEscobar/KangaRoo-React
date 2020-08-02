import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const PhotoOptions = () => {
	return (
		<ButtonGroup
			variant="contained"
			color="primary"
			aria-label="contained primary button group"
		>
			<Button>Edit</Button>
			<Button>Delete</Button>
		</ButtonGroup>
	);
};

export default PhotoOptions;
