import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import EditFoster from '../EditFoster/EditFoster';

const DELETE_URL = '/api/v1/fosters/delete';

const PhotoActions = (props) => {
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
			props.fetchData();
		} catch (error) {
			alert(error.message);
			console.log(error);
		}
	}

	return (
		<div>
			<ButtonGroup
				variant="contained"
				color="primary"
				aria-label="contained primary button group"
			>
				<Button onClick={handleEdit}>Edit</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</ButtonGroup>

			<EditFoster
				awskey={props.awskey}
				showDialog={edit}
				fosterName={props.fosterName}
				agency={props.agency}
				received={props.received}
				adopted={props.adopted}
				setEdit={setEdit}
			/>
		</div>
	);
};

export default PhotoActions;
