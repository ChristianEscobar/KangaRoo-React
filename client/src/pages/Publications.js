import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavBar from '../components/NavBar/NavBar';
import KangaBabyImage from '../images/publications/kanga_baby.jpg';
import Grid from '@material-ui/core/Grid/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0',
	},
	media: {
		paddingTop: '100%',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(-90deg)',
	},
}));

const Publications = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<NavBar />
			<Grid container className={classes.root} spacing={1}>
				<Grid item>
					<Card>
						<CardMedia
							className={classes.media}
							image={KangaBabyImage}
							title="Baby KangaRoo"
						/>
						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								There have been several articles written about Kanga and her
								fosters.... check them out!
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<IconButton aria-label="add to favorites">
								<FavoriteIcon />
							</IconButton>
							<IconButton aria-label="share">
								<ShareIcon />
							</IconButton>
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
				<Grid item>
					<Slide direction="right" in={expanded} mountOnEnter unmountOnExit>
					<Card className={classes.root}>
				<CardContent>
					<Typography paragraph>
						<ul>
							<li>
								<a href="http://9gag.com/gag/a5P9gMO" target="_blank">
									http://9gag.com/...
								</a>
							</li>
							<li>
								<a
									href="http://radioalice.cbslocal.com/2015/05/08/meet-the-adorable-sf-special-needs-kitty-who-hops-like-a-kangaroo/"
									target="_blank"
								>
									http://radioalice.cbslocal.com/...
								</a>
							</li>
							<li>
								<a
									href="http://3milliondogs.com/friends/kanga-may-hop-like-a-kangaroo-but-her-heart-is-all-cat"
									target="_blank"
								>
									http://3milliondogs.com/friends/...
								</a>
							</li>
							<li>
								<a href="http://www.catdumb.com/kanga-roo-cat/" target="_blank">
									http://www.catdumb.com/kanga-roo-cat/...
								</a>
							</li>
							<li>
								<a
									href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.thedodo.com%2Fshe-may-hop-like-a-kangaroo-but-shes-100-kitty-1120330706.html&h=ATP5HL_HWnVWsmbJlQYgqMoZFdG3SnCy6utBZJ1mTLqLvxI31e8SfJsTaH55QGbV_3wXjxV3Ewkkj5fsf581QLqff45p6QUtfn37vlaw1yLbA0SQw2peecIaaYPnk6gr0_mMMMpqatnpUdWk4H9N33ghxxzxWw"
									target="_blank"
								>
									https://www.thedodo.com/...
								</a>
							</li>
							<li>
								<a
									href="http://lovemeow.com/2014/06/kanga-the-kitty-with-short-front-legs/"
									target="_blank"
								>
									http://lovemeow.com/2014/...
								</a>
							</li>
							<li>
								<a
									href="http://lovemeow.com/2015/05/kangaroo-cat-all-grown-up/"
									target="_blank"
								>
									http://lovemeow.com/2015/...
								</a>
							</li>
							<li>
								<a
									href="http://karapaia.livedoor.biz/archives/52191556.html"
									target="_blank"
								>
									http://karapaia.livedoor.biz/...
								</a>
							</li>
							<li>
								<a
									href="http://www.animalslook.com/kanga-roo-the-bravest-little-kitty-8-pictures/"
									target="_blank"
								>
									http://www.animalslook.com/...
								</a>
							</li>
							<li>
								<a
									href="http://iheartcats.com/kitten-born-with-tiny-front-legs-has-nothing-but-love-to-give/"
									target="_blank"
								>
									http://iheartcats.com/...
								</a>
							</li>
							<li>
								<a
									href="http://www.lovemeow.com/mini-kitten-with-kangaroo-arms-finds-love-from-another-cat-just-like-h-2398706199.html"
									target="_blank"
								>
									http://www.lovemeow.com/mini-kitten/...
								</a>
							</li>
							<li>
								<a
									href="http://www.lovemeow.com/kanga-roo-kitten-hops-her-way-into-her-rescuers-arms-now-3-years-later-2483461182.html?from=homer"
									target="_blank"
								>
									http://www.lovemeow.com/kanga-roo-kitten-hops/...
								</a>
							</li>
							<li>
								<a
									href="http://www.lovemeow.com/kitten-with-bunny-paws-steals-everyones-heart-with-her-spirit-2-months-after-rescue-2491139937.html"
									target="_blank"
								>
									http://www.lovemeow.com/kitten-with-bunny-paws/...
								</a>
							</li>
							<li>
								<a
									href="https://www.happiest.net/2017/10/30/unwanted-kitten-nearly-put-sleep-3-years-later-shes-unrecognisable/?utm_source=homerblindcat&utm_medium=Affiliate&utm_campaign=homerblindcat"
									target="_blank"
								>
									https://www.happiest.net/2017/...
								</a>
							</li>
							<li>
								<a
									href="https://meow.af/meet-the-special-needs-cat-who-helps-take-care-of-adorably-different-foster-kittens/"
									target="_blank"
								>
									https://meow.af/meet-the-special-needs/...
								</a>
							</li>
							<li>
								<a
									href="https://animalchannel.co/kanga-roo-cat/?utm_source=BC1&utm_medium=facebook&utm_campaign=BC1"
									target="_blank"
								>
									https://animalchannel.co/kanga-roo-cat/...
								</a>
							</li>
						</ul>
					</Typography>
				</CardContent>
			</Card>
					</Slide>
				</Grid>
			</Grid>
		</div>
	);
};

export default Publications;
