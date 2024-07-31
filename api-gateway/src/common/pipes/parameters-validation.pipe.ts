import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isNotEmpty } from "class-validator";
import { isObjectIdOrHexString } from "mongoose";

export class ValidationParametersPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        if (typeof value === 'object') {
            for (const objId of Object.values(value)) {

                verifyObjectId(objId);

                return value
            }
        }

        verifyObjectId(value);

        return value;
    }
}

const verifyObjectId = (value: unknown) => {
    if (!isNotEmpty(value) || !isObjectIdOrHexString(value)) {
        throw new BadRequestException('Value received is not an ObjectID or was not send')
    }
}