import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function UploadImage(props) {
	return (
		<Container>
			<Row>
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Select a photo for upload</Form.Label>
						<Form.Control type="file" placeholder="Enter email" />
						<Form.Text className="text-muted">
							Photo must be of size X by X
						</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Row>
		</Container>
	);
}

export default UploadImage;
