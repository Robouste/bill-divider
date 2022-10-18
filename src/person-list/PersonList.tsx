import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Fragment, useEffect, useState } from "react";
import { Person } from "../person.model";
import "./PersonList.scss";

interface PersonListProps {
	persons: Person[];
	selectMode?: boolean;
	onSelectionChange?: (selected: Person[]) => void;
}

export default function PersonList({ persons, selectMode, onSelectionChange }: PersonListProps): JSX.Element {
	const [selected, setSelected] = useState<Person[]>([]);
	const [allSelected, setAllSelected] = useState(false);
	const [showMore, setShowMore] = useState<boolean[]>(persons.map((p) => false));

	const handleItemClick = (person: Person) => {
		if (!selectMode) {
			const newShowMore = [...showMore];
			const index = persons.indexOf(person);
			newShowMore[index] = !newShowMore[index];
			setShowMore(newShowMore);

			return;
		}

		const currentIndex = selected.indexOf(person);
		const newSelected = [...selected];

		if (currentIndex === -1) {
			newSelected.push(person);
		} else {
			newSelected.splice(currentIndex, 1);
		}

		setSelected(newSelected);
		onSelectionChange!(newSelected);
	};

	const handleSelectAllClick = () => {
		if (allSelected) {
			setSelected([]);
			onSelectionChange!([]);
		} else {
			setSelected([...persons]);
			onSelectionChange!([...persons]);
		}
	};

	useEffect(() => {
		setAllSelected(selected.length === persons.length);

		return () => {
			setAllSelected(false);
		};
	}, [selected, persons]);

	const items = persons.map((person, index) => (
		<Fragment key={person.name}>
			<ListItem
				secondaryAction={
					selectMode ? (
						<Checkbox
							edge="end"
							checked={selected.indexOf(person) !== -1}
							onChange={() => handleItemClick(person)}
						/>
					) : null
				}
				disablePadding
			>
				<ListItemButton onClick={() => handleItemClick(person)}>
					<div className="list-item">
						<span>{person.name}</span>
						{!selectMode && <span>{person.debt.toLocaleString("fr")}€</span>}
					</div>
					{!selectMode && <>{showMore[index] ? <ExpandLess /> : <ExpandMore />}</>}
				</ListItemButton>
			</ListItem>
			{!selectMode && (
				<Collapse in={showMore[index]} timeout="auto" unmountOnExit>
					<List dense sx={{ width: "100%" }}>
						{person.details.map((detail) => (
							<ListItem
								className="sub-list-item"
								key={detail.name + index + new Date().getMilliseconds()}
							>
								<span>
									{detail.name} ({detail.share.toLocaleString("fr")}%)
								</span>
								<span>{detail.amount.toLocaleString("fr")}€</span>
							</ListItem>
						))}
					</List>
				</Collapse>
			)}
		</Fragment>
	));

	return (
		<>
			<List dense sx={{ width: "100%" }}>
				{selectMode && (
					<ListItem
						className="check-all"
						disablePadding
						secondaryAction={<Checkbox edge="end" checked={allSelected} onChange={handleSelectAllClick} />}
					>
						<ListItemButton onClick={handleSelectAllClick}>&nbsp;</ListItemButton>
					</ListItem>
				)}
				{items}
			</List>
		</>
	);
}
