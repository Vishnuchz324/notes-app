import React, { useState, useEffect } from "react";
import NavBarComponent from "./NavBarComponent";
import NotesComponent from "./NotesComponent";
import TransitionsModal from "./TransitionsModal";
import axios from "axios";

function HomeComponent() {
	const [open, setOpen] = useState(false);
	const [notes, setNotes] = useState([]);
	const [userID, setUserID] = useState(1);

	const getData = async () => {
		await axios
			.get(`http://127.0.0.1:5000/notes/${userID}/get`)
			.then(function (response) {
				setNotes(response.data);
			});
	};

	const handleSubmit = (search) => {
		console.table(search);
	};

	const handleDelete = async (noteID, close) => {
		await axios
			.get(`http://127.0.0.1:5000/notes/${userID}/delete/${noteID}`)
			.then(function (response) {
				console.log(response);
			});
		getData();
		close();
	};

	const handleOpen = () => {
		setOpen(true);
	};

	useEffect(async () => {
		getData();
	}, [open]);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<NavBarComponent handleOpen={handleOpen} handleSubmit={handleSubmit} />
			<NotesComponent
				notes={notes}
				userID={userID}
				handleDelete={handleDelete}
			/>
			<TransitionsModal open={open} handleClose={handleClose} />
		</div>
	);
}

export default HomeComponent;
