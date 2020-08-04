import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import EditFoster from '../EditFoster/EditFoster';

const DELETE_URL = '/api/v1/fosters/delete';

const PhotoOptions = (props) => {
	const [edit, setEdit] = React.useState(false);

	function handleEdit(e) {
		e.preventDefault();
		console.log(props.awskey);
		setEdit(true);
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

	if (edit) {
		return <EditFoster />;
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
