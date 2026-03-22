export interface ISortVariant {
	id: number;
	label: string;
	value: string;
}

export const SortVariantsData: ISortVariant[] = [
	{
		id: 1,
		label: "По новизне (сначала новые)",
		value: "new"
	},
	{
		id: 2,
		label: "По новизне (сначала старые)",
		value: "old"
	},
	{
		id: 3,
		label: "По названию (От А до Я)",
		value: "min-name"
	},
	{
		id: 4,
		label: "По названию (От Я до А)",
		value: "max-name"
	},
	{
		id: 5,
		label: "По цене (сначала дешевле)",
		value: "min-price"
	},
	{
		id: 6,
		label: "По цене (сначала дороже)",
		value: "max-price"
	},
]