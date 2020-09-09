import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import KangaRoseImage from '../images/home/kanga_rose.jpg';

function Home() {
	return (
		<div>
			<NavBar />
			<div>
				<img src={KangaRoseImage}></img>
			</div>
		</div>
	);
}

export default Home;
