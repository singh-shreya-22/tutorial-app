
export class AuthenticationError extends Error {
    statusCode: number;
    name: string;
    exceptionMessage?: string;
    constructor(message: string, name: string, statusCode: number, exceptionMessage?: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        if(exceptionMessage)
            this.exceptionMessage = exceptionMessage;
        else
            this.exceptionMessage = message;
    }
}

export class BadRequestError extends AuthenticationError {
    constructor(message: string) {
        super(message, "BadRequestError", 400);
    }
}

export class DatabaseError extends AuthenticationError {
    constructor(message: string, exceptionMessage: string) {
        super(message, "DatabaseError", 500, exceptionMessage);
    }
}