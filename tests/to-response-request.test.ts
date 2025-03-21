import { describe, expect, it } from "vitest";
import { toRequest, toResponse } from "@/libs";
import {
	address,
	addressItems,
	AddressModel,
	AddressModelToRequest,
} from "../mocks/address-model";
import { utilsMap } from "../mocks/utils-map";

const response = "toResponse";
const request = "toRequest";

const fnResponse = (type: string) => (item: AddressModel) => {
	const clone = { ...item };
	delete clone.postalCode;
	delete clone.state;
	const city = item.city;
	clone.city = `${city.toUpperCase()}...${type}`;
	return clone;
};

describe("Test ToResponse", () => {
	it("With Object", () => {
		expect(toResponse(address, AddressModelToRequest)).toEqual(
			utilsMap(address, fnResponse(response)),
		);
	});

	it("With Array", () => {
		expect(toResponse(addressItems, AddressModelToRequest)).toEqual(
			utilsMap(addressItems, fnResponse(response)),
		);
	});
});

describe("Test toRequest", () => {
	it("With Object", () => {
		expect(toRequest(address, AddressModelToRequest)).toEqual(
			utilsMap(address, fnResponse(request)),
		);
	});

	it("With Array", () => {
		expect(toRequest(addressItems, AddressModelToRequest)).toEqual(
			utilsMap(addressItems, fnResponse(request)),
		);
	});
});
