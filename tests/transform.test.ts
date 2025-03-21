import { describe, expect, it } from "vitest";
import { toRequest, toResponse } from "@/libs";
import {
	address,
	addressItems,
	AddressModel,
	AddressModelTransform,
} from "../mocks/address-model";
import { utilsMap } from "../mocks/utils-map";

const fn = (item: AddressModel) => {
	const clone = { ...item };
	delete clone.postalCode;
	delete clone.state;
	clone.city = clone.city.toUpperCase() + clone.street;
	return clone;
};
describe("Test Transform", () => {
	it("With Object", () => {
		expect(toResponse(address, AddressModelTransform)).toEqual(
			utilsMap(address, fn),
		);
		expect(toRequest(address, AddressModelTransform)).toEqual(
			utilsMap(address, fn),
		);
	});

	it("With Array", () => {
		expect(toResponse(addressItems, AddressModelTransform)).toEqual(
			utilsMap(addressItems, fn),
		);
		expect(toRequest(addressItems, AddressModelTransform)).toEqual(
			utilsMap(addressItems, fn),
		);
	});
});
