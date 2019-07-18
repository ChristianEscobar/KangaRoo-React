import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import FosterCard from '../FosterCard/FosterCard';
import useFetch from './hooks';

const AllFosters = () => {
	const [data, loading] = useFetch('/api/v1/fosters');
	console.log(data.docs);
	return (
		<>
			//{' '}
			{loading ? (
				'Loading...'
			) : (
				<Grid container spacing={3}>
					{data.docs.map((dataObj, index) => (
						<Grid key={index} item xs={3}>
							<FosterCard
								cardPhotoURL={dataObj.imageUrl}
								fosterName={dataObj.fosterName}
								received={dataObj.receivedDate}
								agency={dataObj.fromAgency}
								adopted={dataObj.adoptedDate}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default AllFosters;
