import React, { useState, useContext, useEffect } from "react";
import NavBarComponent from "./NavBarComponent";
import NotesComponent from "./NotesComponent";
import AddNotes from "./AddNotes";
import AddLabels from "./AddLabels";
import axios from "axios";

function HomeComponent() {
	const [openNotes, setOpenNotes] = useState(false);
	const [openTags, setOpenTags] = useState(false);
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

	const handleOpen = (event) => {
		const name = event.currentTarget.name;

		if (name === "note") {
			setOpenNotes(true);
		} else if (name == "tag") {
			setOpenTags(true);
		}
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

	useEffect(() => {
		getData();
	}, [openNotes, openTags]);

	return (
		<>
			<NavBarComponent handleOpen={handleOpen} handleSubmit={handleSubmit} />
			<NotesComponent
				notes={notes}
				userID={userID}
				handleDelete={handleDelete}
			/>
			<AddNotes
				open={openNotes}
				handleClose={() => {
					setOpenNotes(false);
				}}
			/>
			<AddLabels
				open={openTags}
				handleClose={() => {
					setOpenTags(false);
				}}
			/>
		</>
	);
}

export default HomeComponent;
