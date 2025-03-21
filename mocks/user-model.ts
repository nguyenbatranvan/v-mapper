import { Nested, Pick } from "@/libs";
import { address, addressItems, AddressModel } from "./address-model.ts";

export class UserModel {
	@Pick()
	name: string;
	weight: number;
	old: number;

	@Pick()
	@Nested(AddressModel)
	address: AddressModel;

	@Pick()
	@Nested(AddressModel)
	addressItems: AddressModel[];
}

export const user: UserModel = {
	name: "Alex",
	weight: 74,
	old: 24,
	address,
	addressItems,
};
