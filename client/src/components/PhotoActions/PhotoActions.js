import React, { useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import EditFoster from '../EditFoster/EditFoster';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

const DELETE_URL = '/api/v1/fosters/delete';

const PhotoActions = (props) => {
	const [edit, setEdit] = useState(false);
	const [deleting, setDeleting] = useState(false);

	function handleEdit(e) {
		setEdit(true);
	}

	const handleDeleteCancel = () => {
		setDeleting(false);
	};

	async function handleDeleteOK(e) {
		try {
			const body = {
				Key: props.awskey,
			};
			const response = await fetch(DELETE_URL, {
				method: 'delete',
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json' },
			});
			setDeleting(false);
			props.setSnackbarVariant('success');
			props.setSnackbarMessage(`${props.fosterName} has been deleted`);
			props.setSnackbarOpen(true);
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
				<Button onClick={setDeleting}>Delete</Button>
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
			<ConfirmationDialog
				showDialog={deleting}
				title="Delete Foster?"
				contentText={`Are you sure you want to delete ${props.fosterName}?`}
				handleOK={handleDeleteOK}
				handleCancel={handleDeleteCancel}
			/>
			;
		</div>
	);
};

export default PhotoActions;
