import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const ADD_FOSTER_URL = '/api/v1/fosters/add';

function inputValiation(props) {
	if (!props.photoFile || props.photoFile === '') {
		props.setSnackbarVariant('error');
		props.setSnackbarMessage('A foster photo is required');
		props.setSnackbarOpen(true);

		return false;
	} else if (!props.fosterName || props.fosterName === '') {
		props.setSnackbarVariant('error');
		props.setSnackbarMessage('A foster name is required');
		props.setSnackbarOpen(true);

		return false;
	} else if (!props.receivedDate || props.receivedDate === '') {
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

const AddFosterActions = (props) => {
	const handleAddFoster = async (event) => {
		if (event) {
			event.preventDefault();
			if (inputValiation(props)) {
				try {
					let formData = new FormData();
					formData.append('fosterName', props.fosterName);
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

					await fetch(ADD_FOSTER_URL, {
						method: 'POST',
						body: formData,
					});

					props.setSnackbarVariant('success');
					props.setSnackbarMessage(`${props.fosterName} has been added`);
					props.setSnackbarOpen(true);
					props.clearForm();
					props.fetchData();
				} catch (err) {
					props.setSnackbarVariant('error');
					props.setSnackbarMessage(err.message);
					props.setSnackbarOpen(true);
				}
			}
		}
	};

	return (
		<ButtonGroup>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				onClick={handleAddFoster}
			>
				Add Foster
			</Button>
		</ButtonGroup>
	);
};

export default AddFosterActions;
