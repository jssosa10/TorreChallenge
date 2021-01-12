import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
        flexBasis: 300,
        maxWidth: 300,
        margin: 10,
        border: '1px solid #D3D936',
        backgroundColor: '#222326'
    },
    title: {
        color: '#9EA0A3',
    },
    subheader: {
        color: '#9EA0A3',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        color: '#D3D936',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Candidate = (props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label={props.candidate.username} src={props.candidate.picture}className={classes.avatar} />
                }
                classes={{title: classes.title, subheader: classes.subheader}}
                title={props.candidate.name}
                subheader={props.candidate.username}
            />
            <CardContent style={{color: '#9EA0A3'}}>
                <Typography variant="body2" component="p">
                   {props.candidate.professionalHeadline}
                </Typography>
                <Typography>Match Index:</Typography>
                <Rating name="half-rating-read" defaultValue={props.candidate.match_index*5.0} precision={0.1} readOnly />

            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Skills"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent style={{color: '#9EA0A3'}}>
                    <Typography paragraph>Skills:</Typography>
                    <ul>
                        {props.candidate.skills.map((skill)=>{
                            return(<li><Typography>{skill.name}</Typography></li>)
                        })}
                    </ul>
                </CardContent>
            </Collapse>
        </Card>
    );
}
export default Candidate;