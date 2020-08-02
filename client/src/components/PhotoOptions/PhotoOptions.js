import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const DELETE_URL = '/api/v1/fosters/delete';

const PhotoOptions = (props) => {
	function handleEdit(e) {
		e.preventDefault();
		console.log(props.awskey);
	}

	async function handleDelete(e) {
		e.preventDefault();
		try {
			const body = {
				Key: props.awskey,
			};
			const response = await fetch(DELETE_URL, {
				method: 'delete',
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			});
			alert(response);
		} catch (error) {
			alert(error.message);
			console.log(error);
		}
	}

	return (
		<ButtonGroup
			variant="contained"
			color="primary"
			aria-label="contained primary button group"
		>
			<Button onClick={handleEdit}>Edit</Button>
			<Button onClick={handleDelete}>Delete</Button>
		</ButtonGroup>
	);
};

export default PhotoOptions;
