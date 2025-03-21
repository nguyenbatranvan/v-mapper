import { describe, expect, it } from "vitest";
import { toResponse } from "@/libs";
import { user, UserModel } from "../mocks/user-model";

describe("Test Nested Decorator", () => {
	it("should equal", () => {
		expect(toResponse(user, UserModel)).toEqual({
			name: "Alex",
			address: {
				city: "Cali",
				country: "Us",
				street: "...",
			},
			addressItems: [
				{
					city: "Cali",
					country: "Us",
					street: "...",
				},
				{
					city: "Cali2",
					country: "Us",
					street: "...",
				},
			],
		});
	});
});
