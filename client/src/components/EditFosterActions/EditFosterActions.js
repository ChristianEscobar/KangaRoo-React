import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const UPDATE_FOSTER_URL = '/api/v1/fosters/update';

function inputValidation(props) {
	if (!props.receivedDate || props.receivedDate === '') {
		props.setSnackbarVariant('error');
		props.setSnackbarMessage('A received date is required');
		props.setSnackbarOpen(true);

		return false;
	} else if (!props.adoptionAgency || props.adoptionAgency === '') {
		props.setSnackbarVariant('error');
		props.setSnackbarMessage('An adoption agency is required');
		props.setSnackbarOpen(true);

		return false;
	}

	return true;
}

const EditFosterActions = (props) => {
	const handleUpdate = async (event) => {
		if (event) {
			event.preventDefault();
			if (inputValidation(props)) {
				try {
					let formData = new FormData();
					formData.append('docAwsKey', props.docAwsKey);
					formData.append('fosterName', props.fosterName);
					formData.append('imageAwsKey', props.imageAwsKey);
					formData.append('adoptionAgency', props.adoptionAgency);
					formData.append(
						'receivedDate',
						moment(props.receivedDate).format('MM/DD/YYYY')
					);
					if (!props.adoptedDateChecked) {
						formData.append('adoptedDate', '');
					} else {
						formData.append(
							'adoptedDate',
							moment(props.adoptedDate).format('MM/DD/YYYY')
						);
					}
					formData.append('facebook', props.facebook);
					formData.append('instagram', props.instagram);
					formData.append('comments', props.comments);
					formData.append('photo', props.photoFile);

					const response = await fetch(UPDATE_FOSTER_URL, {
						method: 'PUT',
						body: formData,
					});

					if (!response.ok) {
						throw new Error(
							'Error encountered while attempting to update details'
						);
					}

					props.setSnackbarVariant('success');
					props.setSnackbarMessage(`${props.fosterName} has been updated`);
					props.setSnackbarOpen(true);
					props.setEdit(false);
					props.fetchData();
				} catch (err) {
					props.setSnackbarVariant('error');
					props.setSnackbarMessage(err.message);
					props.setSnackbarOpen(true);
				}
			}
		} else {
			props.setSnackbarVariant('error');
			props.setSnackbarMessage(
				'Something went wrong while attempting to update details.'
			);
			props.setSnackbarOpen(true);
		}
	};

	return (
		<ButtonGroup>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				onClick={handleUpdate}
			>
				Update Foster
			</Button>
		</ButtonGroup>
	);
};

export default EditFosterActions;
