import { AxiosResponse } from "axios"
import { filter, forEach } from "p-iteration"

export class ThrottledError extends Error {
  statusCode: number
  errors: any[]
  response: AxiosResponse<any, any>
  
  constructor(res: AxiosResponse<any, any>) {
    const errors = res?.data.errors

    super(errors[0].message ?? "Too many requests")
    this.name = "ThrottledError"
    this.statusCode = 429
    this.errors = errors
    this.response = res
  }
}

export class AuthorizationDeniedError extends Error {
  statusCode: number
  errors: any[]
  response: AxiosResponse<any, any>
  
  constructor(res: AxiosResponse<any, any>) {
    const errors = res?.data.errors

    super(errors[0].message)
    this.name = "AuthorizationDeniedError"
    this.statusCode = 401
    this.errors = errors,
    this.response = res
  }
}

export class InvalidRequestDataError extends Error {
  statusCode: number
  errors: any[]
  response: AxiosResponse<any, any>
  
  constructor(res: AxiosResponse<any, any>) {
    const errors = res?.data.errors

    super(errors[0].message ?? "Authorization has been denied for this request.")
    this.name = "InvalidRequestDataError"
    this.statusCode = res?.status ?? NaN
    this.errors = errors
    this.response = res
  }
}

export class UnexpectedError extends Error {
  error: any

  constructor(error: unknown) {
    super("An unexpected error has occured.")
    this.name = "UnexpectedError"
    this.error = error
  }
}

const ApiErrors = [ThrottledError, AuthorizationDeniedError, InvalidRequestDataError, UnexpectedError]

export const IsApiError = async (error:unknown) => {
  try {
    await forEach(ApiErrors, async entry => { if (error instanceof entry) throw new Error('Break') })
    return false
  } catch {
    return true
  }
}