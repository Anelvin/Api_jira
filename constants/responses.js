import { StatusCodes } from "http-status-codes";

async function unauthorized(){
    return {
        message: 'Unauthorized',
        code: StatusCodes.UNAUTHORIZED
    }
}

async function internalServerError(){
    return {
        message: 'Internal server error',
        code: StatusCodes.INTERNAL_SERVER_ERROR
    }
}

async function statusOk(data){
    return {
        data,
        code: StatusCodes.OK
    }
}

export {
    unauthorized,
    internalServerError,
    statusOk
}