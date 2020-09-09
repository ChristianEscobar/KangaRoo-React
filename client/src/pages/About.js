import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PapaAndMamaImage from '../images/about/papa_and_mama.jpg';
import SkittlesImage from '../images/about/skittles.jpg';
import BrandonImage from '../images/about/brandon.jpg';
import BrownieImage from '../images/about/brownie.jpg';
import KangaImage from '../images/about/kanga.jpg';
import HectorImage from '../images/about/hector.jpg';
import AboutImage from '../components/AboutImage/AboutImage';
import AboutText from '../components/AboutText/AboutText';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const papaAndMamaText = `We are the humans behind the scenes that provide you with a daily inside look into the lives of these loveable furry kids.`;

const skittlesText = `Skittles, a domestic short-haired tabby, was three years old when we adopted her from the San Francisco SPCA in September of 2008.  Skittles's shelter name was Savannah and 
she was found in an open wire cage with her two kittens along the road in Knights Landing (Yolo County).  

When we first went to the SFSPCA, we were looking for our lost cat.
Then, a shelter volunteer asked us if we wanted to meet a really sweet cat, and we said "sure!".  We went into the catio she was staying in and sat down on the floor.
She ran up to us and started purring and kneading.  We looked at each other and said, "we are bringing her home".  And the rest is history...`;

const brandonText = `Brandon, a Flat-Coat retriever mixed with Springer Spaniel, was 4 months old when we rescued him from a family member in December of 2007.
Supposedly, Brandon and Brownie share the same Mom and Dad, but we have not confirmed this with a DNA test.`;

const brownieText = `Brownie, a Flat-Coat retriever mixed with Springer Spaniel, was 6 months old when we rescued him from a family member in December of 2009.
Supposedly, Brandon and Brownie share the same Mom and Dad, but we have not confirmed this with a DNA test.`;

const kangaText = `Kanga Roo was brought into a vet clinic in far Northern California.  She was brought to the clinic for euthanasia at about 4 weeks old.  
The person that found her (Cheryl) contacted Saving Grace Rescue (Amber) a few weeks later because they have taken other special babies 
from her before.

We saw a video of her on 5/29/14 and fell in love with her.  We contacted SGR and because she was a petite girl, it took her a few more 
weeks to be 2 lbs, the weight necessary for spaying surgery.  She was spayed on 6/27/14 and we brought her home on 6/28/14.  
She has radial hypoplasia / radial agencies but that does not stop her from living life like any normal cat.`;

const hectorText = `Hector, an orange tabby, was approximately 4 weeks old when he was found with a maggot infested tail in Stockton, California in April of 2015.

He was brought to Saving Grace Rescue and we picked him up on May 3rd of 2015 to foster him.  He bonded with Kanga Roo over nineteen days of fostering and we decided to make him a part of our clan on May 21st of 2015.`;

const About = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<NavBar />
			<br />
			<br />
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
					<AboutImage image={PapaAndMamaImage} />
				</Grid>
				<Grid item xs>
					<AboutText text={papaAndMamaText}></AboutText>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
					<AboutImage image={SkittlesImage} />
				</Grid>
				<Grid item xs>
					<AboutText text={skittlesText}></AboutText>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
					<AboutImage image={BrandonImage} />
				</Grid>
				<Grid item xs>
					<AboutText text={brandonText}></AboutText>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
					<AboutImage image={BrownieImage} />
				</Grid>
				<Grid item xs>
					<AboutText text={brownieText}></AboutText>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
					<AboutImage image={KangaImage} />
				</Grid>
				<Grid item xs>
					<AboutText text={kangaText}></AboutText>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs></Grid>
				<Grid item xs={4}>
					<AboutImage image={HectorImage} />
				</Grid>
				<Grid item xs>
					<AboutText text={hectorText}></AboutText>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
		</div>
	);
};

export default About;
