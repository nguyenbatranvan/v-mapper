import { describe, expect, it } from "vitest";
import { toResponse } from "@/libs";
import { address, addressItems, AddressModel } from "../mocks/address-model";
import { utilsMap } from "../mocks/utils-map";

const mapFn = (item: AddressModel) => {
	delete item.postalCode;
	delete item.state;
	return item;
};
describe("Test Pick Decorator", () => {
	it("With Object", () => {
		const data = toResponse(address, AddressModel);
		expect(data).toEqual(utilsMap(address, mapFn));
	});

	it("With Array", () => {
		const data = toResponse(addressItems, AddressModel);
		expect(data).toEqual(
			utilsMap<AddressModel[], AddressModel>(addressItems, mapFn),
		);
	});
});
