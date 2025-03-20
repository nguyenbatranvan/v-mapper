import "reflect-metadata";
import {
	PICK_REQUEST_METADATA_KEY,
	PICK_RESPONSE_METADATA_KEY
} from "@/libs/define-symbols";

export const Pick = () => (target: any, propertyKey: string) => {
	const pickedRequestFields =
		Reflect.getMetadata(PICK_REQUEST_METADATA_KEY, target) || [];
	const pickedResponseFields =
		Reflect.getMetadata(PICK_RESPONSE_METADATA_KEY, target) || [];
	Reflect.defineMetadata(
		PICK_REQUEST_METADATA_KEY,
		[...pickedRequestFields, propertyKey],
		target
	);
	Reflect.defineMetadata(
		PICK_RESPONSE_METADATA_KEY,
		[...pickedResponseFields, propertyKey],
		target
	);
};
export const PickRequest = () => (target: any, propertyKey: string) => {
	const pickedFields =
		Reflect.getMetadata(PICK_REQUEST_METADATA_KEY, target) || [];
	Reflect.defineMetadata(
		PICK_REQUEST_METADATA_KEY,
		[...pickedFields, propertyKey],
		target
	);
};

export const PickResponse = () => (target: any, propertyKey: string) => {
	const pickedFields =
		Reflect.getMetadata(PICK_RESPONSE_METADATA_KEY, target) || [];
	Reflect.defineMetadata(
		PICK_RESPONSE_METADATA_KEY,
		[...pickedFields, propertyKey],
		target
	);
};
