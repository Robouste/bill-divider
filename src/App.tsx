import { Add } from "@mui/icons-material";
import { Button, Card, CardActions, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";
import { useEffect, useState } from "react";
import "./App.scss";
import EditDialog from "./edit-dialog/EditDialog";
import PersonList from "./person-list/PersonList";
import { Person } from "./person.model";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: blue,
		secondary: cyan,
	},
});

function App() {
	const [persons, setPersons] = useState([
		new Person("Gillou"),
		new Person("Py"),
		new Person("Nibor"),
		new Person("Tetelle"),
		new Person("Tritrid"),
		new Person("Brix"),
		new Person("Mom's"),
		new Person("El padre"),
	]);

	const [dialogOpened, setDialogOpened] = useState(false);
	const [total, setTotal] = useState(0);

	const handleClickOpen = () => {
		setDialogOpened(true);
	};

	const handleClose = (p: Person[] | null) => {
		setDialogOpened(false);

		if (p) {
			setPersons(p);
		}
	};

	const handleButtonClick = () => {
		console.log(persons);
	};

	useEffect(() => {
		setTotal(persons.map((person) => person.debt).reduce((total, current) => total + current));
	}, [persons, dialogOpened]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline enableColorScheme>
				<div className="content">
					<Card className="card">
						<PersonList persons={persons} />
						<CardActions className="card-action-area">
							<Button variant="outlined" onClick={handleClickOpen} startIcon={<Add />}>
								Add
							</Button>
							<span>Total: {total.toLocaleString("fr")}€</span>
						</CardActions>
					</Card>
				</div>
				<Button onClick={handleButtonClick}>Test</Button>
				<EditDialog persons={persons} open={dialogOpened} onClose={handleClose}></EditDialog>
			</CssBaseline>
		</ThemeProvider>
	);
}

export default App;
