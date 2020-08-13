import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const ConfirmationDialog = (props) => {
	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="xs"
			aria-labelledby="confirmation-dialog-title"
			open={props.showDialog}
		>
			<DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
			<DialogContent>Test</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={props.handleCancel} color="primary">
					Cancel
				</Button>
				<Button onClick={props.handleOK} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

ConfirmationDialog.propTypes = {
	showDialog: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	handleOK: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
