import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useState } from "react";

export default function NavBarComponent({ handleOpen, handleSubmit }) {
	const classes = useStyles();
	const [search, setSearch] = useState("");
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Toolbar className={classes.starterSection}>
						<Typography className={classes.title} variant='h6' noWrap>
							Notes
						</Typography>
						<IconButton
							className={classes.addIcon}
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
							onClick={handleOpen}
						>
							<AddCircleOutlineIcon />
						</IconButton>
					</Toolbar>
					<Toolbar className={classes.searchSection}>
						<div className={classes.search}>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
						</div>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
							onclick={handleSubmit(search)}
						>
							<SearchIcon />
						</IconButton>
					</Toolbar>
					<Toolbar className={classes.profileSection}>
						<Typography className={classes.username} variant='subtitle1' noWrap>
							name
						</Typography>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
					</Toolbar>
				</Toolbar>
			</AppBar>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "red",
	},
	starterSection: {
		flexGrow: 1,
	},
	searchSection: {
		flexGrow: 2,
	},
	profileSection: {
		flexGrow: 1,
		justifyContent: "flex-end",
	},
	// start section
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	addIcon: {
		margin: theme.spacing(0, 3),
	},
	// search section
	search: {
		flexGrow: 1,
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		pointerEvents: "none",
	},
	keyIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
		},
	},
	// profile section
	username: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
}));