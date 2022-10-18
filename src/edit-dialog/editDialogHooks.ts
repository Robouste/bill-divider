import { ChangeEvent, useEffect, useState } from "react";
import { Person } from "../person.model";

interface EditDialogHooks {
	amount: number | undefined;
	split: number | undefined;
	article: string;
	articleError: string;
	isValid: boolean;
	handleListOnChange: (persons: Person[]) => void;
	handleArticleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleInputOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleAdd: () => void;
	handleClose: () => void;
}

export function useEditDialog(persons: Person[], onClose: (persons: Person[] | null) => void): EditDialogHooks {
	const [amount, setAmount] = useState<number | undefined>(0);
	const [split, setSplit] = useState<number | undefined>(0);
	const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);
	const [article, setArticle] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [articleError, setArticleError] = useState("");

	const handleListOnChange = (persons: Person[]) => {
		setSelectedPersons(persons);
	};

	const handleArticleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if (persons.some((p) => p.details.some((d) => d.name === value.trim()))) {
			setArticleError("Already exists");
		} else {
			setArticleError("");
		}

		setArticle(value);
	};

	const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);
		setAmount(value);
	};

	const handleClose = () => {
		close(null);
	};

	const handleAdd = () => {
		selectedPersons.forEach((p) =>
			p.details.push({
				name: article,
				amount: split!,
				share: 100 / selectedPersons.length,
			})
		);

		close(persons);
	};

	const close = (p: Person[] | null): void => {
		onClose(p);
		setArticle("");
		setAmount(0);
		setArticleError("");
	};

	useEffect(() => {
		setSplit(amount ? amount / selectedPersons.length : 0);
		setIsValid(!!amount && amount > 0 && selectedPersons.length > 0 && article.trim().length > 0);
	}, [amount, selectedPersons, article]);

	return {
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
	};
}
