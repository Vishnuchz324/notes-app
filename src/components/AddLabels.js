import React, { useRef, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useEffect } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./AddLabels.css";

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const useStyles = makeStyles({
	title: {
		textAlign: "center",
	},
	formInput: {
		margin: "15px 0",
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function AddLabels({ userID, open, handleClose }) {
	const classes = useStyles();
	const [tags, setTags] = useState("");
	const [title, setTitle] = useState("");
	const [render, setRender] = useState(false);

	const getData = async () => {
		await axios
			.get(`http://127.0.0.1:5000/tags/${userID}/get_tags`)
			.then(function (response) {
				console.log(response.data);
				setTags(response.data);
			});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios({
			method: "POST",
			headers: { "content-type": "application/json" },
			url: `http://127.0.0.1:5000/tags/${userID}/create`,
			data: {
				tag: title,
			},
		})
			.then((response) => {})
			.catch((e) => {
				console.log(e);
			});
		setRender(!render);
	};

	const handleDelete = async (tagID) => {
		await axios
			.get(`http://127.0.0.1:5000/tags/${userID}/delete/${tagID}`)
			.then(function (response) {
				console.log(response);
			});
		setRender(!render);
	};

	useEffect(async () => {
		getData();
	}, [open, render]);

	const Tag = ({ tag, tagID }) => {
		return (
			<div className='tag'>
				{tag}
				<IconButton
					style={{ marginRight: "10px" }}
					aria-label='account of current user'
					aria-controls='menu-appbar'
					aria-haspopup='true'
					color='inherit'
					onClick={() => {
						handleDelete(tagID);
					}}
				>
					<HighlightOffIcon />
				</IconButton>
			</div>
		);
	};

	return (
		<Dialog
			fullWidth
			onClose={handleClose}
			aria-labelledby='customized-dialog-title'
			open={open}
		>
			<DialogTitle
				className={classes.title}
				id='customized-dialog-title'
				onClose={handleClose}
			>
				Add Label
			</DialogTitle>
			<DialogContent dividers>
				{tags ? (
					<div className='tags-container'>
						{tags.map(([id, tag]) => {
							return <Tag tag={tag} tagID={id} />;
						})}
					</div>
				) : (
					<div></div>
				)}
				<FormControl fullWidth className={classes.formInput} variant='outlined'>
					<InputLabel required htmlFor='outlined-adornment-amount'>
						Title
					</InputLabel>
					<OutlinedInput
						value={title}
						autoFocus
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						id='outlined-adornment-amount'
						labelWidth={40}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					autoFocus
					name='tag'
					onClick={handleSubmit}
					color='primary'
				>
					Create Tag
				</Button>
			</DialogActions>
		</Dialog>
	);
}
