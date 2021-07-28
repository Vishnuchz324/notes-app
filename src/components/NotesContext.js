import React, { useState, ueEffect, createContext } from "react";
import { useEffect } from "react";
export const NotesContext = createContext();

export const NotesProvider = (props) => {
	useEffect(() => {});
	const [notes, setNotes] = useState([]);
	return (
		<NotesContext.Provider value={[notes, setNotes]}>
			{props.children}
		</NotesContext.Provider>
	);
};
