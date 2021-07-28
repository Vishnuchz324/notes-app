import React, { useState, useContext, useEffect } from "react";
import NavBarComponent from "./NavBarComponent";
import NotesComponent from "./NotesComponent";
import AddNotes from "./AddNotes";
import AddLabels from "./AddLabels";
import axios from "axios";

function HomeComponent({ userID, userName, handleLogout }) {
	const [openNotes, setOpenNotes] = useState(false);
	const [openTags, setOpenTags] = useState(false);
	const [filter, setFilter] = useState(false);
	const [notes, setNotes] = useState([]);
	const getData = async () => {
		await axios
			.get(`http://127.0.0.1:5000/notes/${userID}/get`)
			.then(function (response) {
				setNotes(response.data);
			});
	};
	const filterData = async (search) => {
		await axios
			.get(`http://127.0.0.1:5000/notes/${userID}/serach/${search}`)
			.then(function (response) {
				setNotes(response.data);
			});
	};

	const handleSubmit = (search) => {
		search.length != 0 ? filterData(search) : getData();
		setFilter(!filter);
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

	useEffect(() => {}, [filter]);

	useEffect(() => {
		getData();
	}, [openNotes, openTags]);

	return (
		<>
			<NavBarComponent
				handleOpen={handleOpen}
				userName={userName}
				handleSubmit={handleSubmit}
				handleLogout={handleLogout}
			/>
			<NotesComponent
				notes={notes}
				userID={userID}
				handleDelete={handleDelete}
			/>
			<AddNotes
				open={openNotes}
				userID={userID}
				handleClose={() => {
					setOpenNotes(false);
				}}
			/>
			<AddLabels
				open={openTags}
				userID={userID}
				handleClose={() => {
					setOpenTags(false);
				}}
			/>
		</>
	);
}

export default HomeComponent;
