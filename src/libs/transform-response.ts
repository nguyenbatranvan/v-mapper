import {
	NESTED_METADATA_KEY,
	PICK_REQUEST_METADATA_KEY,
	PICK_RESPONSE_METADATA_KEY,
	TO_REQUEST_METADATA_KEY,
	TO_RESPONSE_METADATA_KEY,
	TRANSFORM_METADATA_KEY
} from "./define-symbols";

function transformData<T>(
	data: any,
	target: new () => T,
	direction: "request" | "response"
): T {
	const result = new target();
	const pickMetadataKey =
		direction === "request"
			? PICK_REQUEST_METADATA_KEY
			: PICK_RESPONSE_METADATA_KEY;
	const transformMetadataKey =
		direction === "request"
			? TO_REQUEST_METADATA_KEY
			: TO_RESPONSE_METADATA_KEY;
	const pickedFields = Reflect.getMetadata(pickMetadataKey, result) || [];

	for (const key of Object.keys(data)) {
		if (pickedFields.includes(key)) {
			let value = data[key];

			const nestedClass = Reflect.getMetadata(NESTED_METADATA_KEY, result, key);
			if (nestedClass) {
				if (Array.isArray(value)) {
					value = transformArrayData(value, nestedClass, direction);
				} else {
					value = transformData(value, nestedClass, direction);
				}
			} else {
				const transformBothFn = Reflect.getMetadata(
					TRANSFORM_METADATA_KEY,
					result,
					key
				);
				const specificFn = Reflect.getMetadata(
					transformMetadataKey,
					result,
					key
				);

				if (transformBothFn && specificFn) {
					console.warn(
						`Field ${key} has both @Transform and @${direction === "request" ? "ToRequest" : "ToResponse"}, using @Transform`
					);
				}

				const transformFn = transformBothFn || specificFn;
				if (transformFn) {
					value = transformFn(value);
				}
			}

			(result as any)[key] = value;
		}
	}

	return result;
}

function transformArrayData<T>(
	data: any[],
	target: new () => T,
	direction: "request" | "response"
): T[] {
	if (!Array.isArray(data)) {
		throw new Error("Input must be an array");
	}
	return data.map((item) => transformData(item, target, direction));
}

export function toRequest<T>(data: any | any[], target: new () => T): T | T[] {
	if (Array.isArray(data)) {
		return transformArrayData(data, target, "request");
	}
	return transformData(data, target, "request");
}

export function toResponse<T>(data: any | any[], target: new () => T): T | T[] {
	if (Array.isArray(data)) {
		return transformArrayData(data, target, "response");
	}
	return transformData(data, target, "response");
}
