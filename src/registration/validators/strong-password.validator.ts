import {
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: string): boolean {
        // Allowing longer passwords, with a mix of lowercase, uppercase, numbers, and special characters
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[\w!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
        return strongPasswordRegex.test(password);
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Password is not strong enough ,Password must be at least 12 digit, Allowing with a mix of lowercase, uppercase, numbers, and special characters';
    }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsStrongPasswordConstraint,
        });
    };
}