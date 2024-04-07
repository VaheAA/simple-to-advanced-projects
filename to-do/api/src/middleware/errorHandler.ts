import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  console.log(err)
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware
