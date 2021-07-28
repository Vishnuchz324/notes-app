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
		margin: "10px 0",
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

export default function AddNotes({ open, handleClose }) {
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(body.current);
		await axios({
			method: "POST",
			headers: { "content-type": "application/json" },
			url: "http://127.0.0.1:5000/notes/1/create",
			data: {
				title: title,
				body: body,
			},
		})
			.then((response) => {})
			.catch((e) => console.log(e.response));
		handleClose();
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
				Add Note
			</DialogTitle>
			<DialogContent dividers>
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
				<FormControl fullWidth className={classes.formInput} variant='outlined'>
					<InputLabel htmlFor='outlined-adornment-amount'>Body</InputLabel>
					<OutlinedInput
						value={body}
						onChange={(e) => {
							setBody(e.target.value);
						}}
						multiline
						rows='4'
						id='outlined-adornment-amount'
						labelWidth={40}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					autoFocus
					onClick={handleSubmit}
					color='primary'
					name='note'
				>
					Create Note
				</Button>
			</DialogActions>
		</Dialog>
	);
}
