import {
	TO_REQUEST_METADATA_KEY,
	TO_RESPONSE_METADATA_KEY,
	TRANSFORM_METADATA_KEY
} from "./define-symbols";

type TParams<TField, TValue> = (value: TField, source: TValue) => any;

export function ToRequest<TField, TValue>(
	transformFn: TParams<TField, TValue>
) {
	return (target: any, propertyKey: string) => {
		Reflect.defineMetadata(
			TO_REQUEST_METADATA_KEY,
			transformFn,
			target,
			propertyKey
		);
	};
}

export function ToResponse<TField, TValue>(
	transformFn: TParams<TField, TValue>
) {
	return (target: any, propertyKey: string) => {
		Reflect.defineMetadata(
			TO_RESPONSE_METADATA_KEY,
			transformFn,
			target,
			propertyKey
		);
	};
}

export function Transform<TField, TValue>(
	transformFn: TParams<TField, TValue>
) {
	return (target: any, propertyKey: string) => {
		Reflect.defineMetadata(
			TRANSFORM_METADATA_KEY,
			transformFn,
			target,
			propertyKey
		);
	};
}
