import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./NotesComponent.css";

function NotesComponent({ notes, handleDelete, userID }) {
	const [open, setOpen] = useState(false);
	const [dialogProps, setDialogProps] = useState(null);


	const promptDelete = (title, noteID) => {
		setDialogProps({ title: title, noteID: noteID });
		setOpen(true);
	};



	const handleClose = () => {
		setOpen(false);
	};

	function DialogBox() {
		if (!dialogProps) return <div></div>;
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete the note {dialogProps.title}
					</DialogContentText>
					<DialogContentText id='alert-dialog-description'>
						<strong>{dialogProps.title}</strong>
					</DialogContentText>
				</DialogContent>
				<DialogActions style={{ padding: "20px" }}>
					<Button onClick={handleClose} color='primary'>
						cancel
					</Button>
					<Button
						onClick={() => {
							handleDelete(dialogProps.noteID, handleClose);
						}}
						variant='contained'
						style={{ backgroundColor: "red", color: "white" }}
						autoFocus
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	function Note({ noteID, title, body }) {
		if (title.length == 0) return <div></div>;
		return (
			<div className='note'>
				<div className='note-content'>
					<h4 className='note-title'>{title}</h4>
					<div className='note-tags'>
						<p className='note-tags__tag'>first</p>
						<p className='note-tags__tag'>second</p>
						<p className='note-tags__tag'>third</p>
					</div>
				</div>
				<div className='note-icon'>
					<IconButton
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						color='inherit'
					>
						<VisibilityIcon />
					</IconButton>
					<IconButton
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						color='inherit'
						onClick={() => {
							promptDelete(title, noteID);
						}}
					>
						<DeleteOutlineIcon />
					</IconButton>
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			{notes.map(([id, title, body]) => {
				return <Note key={id} noteID={id} title={title} body={body} />;
			})}
			<DialogBox />
		</div>
	);
}

export default NotesComponent;
