import { Identifier, ArrayNonEmptyIfConst } from "typeforge";
import { ApiMethod, createApiGroup } from "../../apiGroup";
import { RawAuthenticatorVerifyData } from "./twostepverification.types";

const { createApiMethod } = createApiGroup({ name: "ClassicTwoStepVerification", baseUrl: "https://twostepverification.roblox.com" })


/**
 * 2FA Authenticator Verify
 * @category Challenges
 * @endpoint POST /v1/users/{senderId}/challenges/authenticator/verify
 * 
 * @param senderId The id of the user sending the request.
 * @param challengeId The challenge id recieved from the api method requiring the 2FA.
 * @param code The 2FA verification code.
 * @param actionType "Generic" by default
 * 
 * @example const { data: verificationToken } = await ClassicTwoStepVerification.authenticatorVerify({ senderId, challengeId, code: generate2FACode() })
 * @exampleData "xvXfi6QL2ES02y8OrnmtGw"
 * @exampleRawBody { "verificationToken": "xvXfi6QL2ES02y8OrnmtGw" }
 */
export const authenticatorVerify = createApiMethod(async <UserId extends Identifier>(
  { senderId, challengeId, code, actionType = "Generic" }: { senderId: UserId, challengeId: string, code: string, actionType?: "Generic" }
): ApiMethod<RawAuthenticatorVerifyData, string> => ({
  method: "POST",
  path: `/v1/users/${senderId}/challenges/authenticator/verify`,
  body: { 
    actionType,
    challengeId,
    code
  },
  name: "authenticatorVerify",

  formatRawDataFn: (data) => data.verificationToken
}))
//////////////////////////////////////////////////////////////////////////////////
