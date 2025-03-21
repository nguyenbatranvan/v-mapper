export const utilsMap = <T, TItem = T>(
	data: T,
	mapFn: (item: TItem) => TItem,
): TItem | TItem[] => {
	if (Array.isArray(data)) {
		return data.map(mapFn);
	}
	// @ts-ignore
	return mapFn(data);
};
