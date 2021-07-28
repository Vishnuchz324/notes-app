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

	function Tags({ noteID }) {
		const [tags, setTags] = useState([]);
		const [loading, setLoading] = useState(true);
		useEffect(async () => {
			await axios
				.get(`http://127.0.0.1:5000/notes/${userID}/get_notes_tags/${noteID}`)
				.then(function (response) {
					setTags(response.data);
					setLoading(false);
				});
		}, [loading]);
		return (
			<div className='note-tags'>
				{tags.map((tag) => {
					return <p className='note-tags__tag'>{tag}</p>;
				})}
			</div>
		);
	}

	function Note({ noteID, title, body }) {
		const [visisble, setVisible] = useState(false);
		if (title.length == 0) return <div></div>;
		return (
			<div className='note'>
				<div className='note-header'>
					<h4 className='note-title'>{title}</h4>
					<div className='note-icon'>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
							onClick={() => {
								setVisible(!visisble);
							}}
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
				<div className='note-content'>
					<Tags noteID={noteID} />
					{visisble && <p>{body}</p>}
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
