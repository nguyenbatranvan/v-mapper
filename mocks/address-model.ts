import { Pick, ToRequest, ToResponse, Transform } from "@/libs";

export class AddressModel {
	@Pick()
	street: string;
	@Pick()
	city: string;
	state?: string;
	postalCode: string;
	@Pick()
	country: string;
}

export class AddressModelToRequest extends AddressModel {
	@Pick()
	@ToResponse<string, AddressModel>((value, source) => {
		return `${value.toUpperCase() + source.street}toResponse`;
	})
	@ToRequest<string, AddressModel>((value, source) => {
		return `${value.toUpperCase() + source.street}toRequest`;
	})
	declare city: string;
}

export class AddressModelTransform extends AddressModel {
	@Pick()
	@ToResponse<string, AddressModel>((value, source) => {
		return `${value.toUpperCase() + source.street}toResponse`;
	})
	@ToRequest<string, AddressModel>((value, source) => {
		return `${value.toUpperCase() + source.street}toRequest`;
	})
	@Transform<string, AddressModel>((value, source) => {
		return value.toUpperCase() + source.street;
	})
	declare city: string;
}

export const address: AddressModel = {
	city: "Cali",
	country: "Us",
	postalCode: "111",
	street: "...",
	state: "online",
};

export const addressItems: AddressModel[] = [
	{
		city: "Cali",
		country: "Us",
		postalCode: "111",
		street: "...",
		state: "online",
	},
	{
		city: "Cali2",
		country: "Us",
		postalCode: "111",
		street: "...",
		state: "online",
	},
];
