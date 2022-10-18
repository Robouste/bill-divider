export class Person {
	public details: Detail[] = [];

	public get debt(): number {
		return this.details.length > 0
			? this.details.map((d) => d.amount).reduce((total, current) => total + current)
			: 0;
	}

	constructor(public name: string) {}
}

export interface Detail {
	name: string;
	amount: number;
	share: number;
}
