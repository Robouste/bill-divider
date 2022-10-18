import { Add, Euro } from "@mui/icons-material";
import { Button, DialogActions, DialogContent, DialogTitle, InputAdornment, Slide, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref } from "react";
import PersonList from "../person-list/PersonList";
import { Person } from "../person.model";
import "./EditDialog.scss";
import { useEditDialog } from "./editDialogHooks";

interface DialogProps {
	persons: Person[];
	open: boolean;
	onClose: (persons: Person[] | null) => void;
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog(props: DialogProps): JSX.Element {
	const { onClose, open, persons } = props;

	const {
		amount,
		split,
		article,
		articleError,
		isValid,
		handleListOnChange,
		handleArticleChange,
		handleInputOnChange,
		handleAdd,
		handleClose,
	} = useEditDialog(persons, onClose);

	return (
		<Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
			<DialogTitle>
				<div className="title">
					<span>Add new amount</span>
					<span className="split">Split: {split?.toLocaleString("fr")}</span>
				</div>
			</DialogTitle>
			<DialogContent>
				<PersonList persons={persons} selectMode={true} onSelectionChange={handleListOnChange} />
				<TextField
					autoFocus
					fullWidth
					label="Article"
					type="text"
					error={articleError.length > 0}
					helperText={articleError}
					variant="filled"
					value={article}
					margin="normal"
					onChange={handleArticleChange}
				></TextField>
				<TextField
					fullWidth
					label="Amount"
					type="number"
					variant="filled"
					margin="normal"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Euro></Euro>
							</InputAdornment>
						),
					}}
					value={amount}
					onChange={handleInputOnChange}
				></TextField>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAdd} startIcon={<Add />} disabled={!isValid}>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}
