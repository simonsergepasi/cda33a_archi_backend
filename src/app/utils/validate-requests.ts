import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

const validationError = async (input: any) : Promise<ValidationError[] | false> => {
    const errors = await validate(input, {
        validationError: {target: true}
    })

    if(errors.length) return errors;

    return false;
}

// CreateConferenceDTO
export const RequestValidator = async <T>(typeDTO: ClassConstructor<T>, body: any) : Promise<{errors: boolean | string, input: T}> => {
    const input = plainToClass(typeDTO, body);
    const errors = await validationError(input)

    if(errors) {
        const errorMessage = errors.map(error => (Object as any).values(error.constraints)).join(', ');
        return {errors: errorMessage, input}
    }

    return {errors: false, input}
}