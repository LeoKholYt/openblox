import { Identifier } from "typeforge";
import { ApiMethod, createApiGroup } from "../../apiGroup";
import { RawRegisterData, SubmitParams } from "./rotatingClientService.types";

const { createApiMethod } = createApiGroup({ name: "ClassicRotatingClientService", baseUrl: "https://apis.roblox.com/rotating-client-service" })

/**
 * 
 * @endpoint GET /v1/prelude/latest
 * 
 * @example 
 * @exampleData 
 * @exampleRawBody
 */
export const latestPrelude = createApiMethod(async (): ApiMethod<string> => ({
  method: "GET",
  path: `/v1/prelude/latest`,
  name: "latestPrelude"
}))

/**
 * Returns javaScript challenge code for the given challenge ID and identifier.
 * 
 * @endpoint GET /v1/fetch
 * 
 * @example 
 * @exampleData 
 * @exampleRawBody InVzZSBzdHJpY3QiOygoKT0+eyhmdW5jdGlvbihfMHgzMzZkMWIsXzB4NTY2YmRkKXt2YXIgXzB4NTg2NDg5PWEwXzB4MmM2MSxfMHgzYzU1YjU9XzB4MzM2ZDFiKCk7d2hpbGUoISFbXSl7dHJ5e3ZhciBfMHgzOGQzMmQ9LXBhcnNlSW50 (...)
 */
export const fetchChallenge = createApiMethod(async (
  { challengeId, identifier }: { challengeId: string, identifier: string }
): ApiMethod<string, string> => ({
  method: "GET",
  path: `/v1/fetch`,
  searchParams: { challengeId, identifier },
  name: "fetchChallenge",

  formatRawDataFn: (data: string) => Buffer.from(data, 'base64').toString('utf-8')
}))


/**
 * 
 * @endpoint POST /v1/register
 * 
 * @param publicKey
 * @param nonce
 * 
 * @example 
 * @exampleData {"robloxApiKeyBase64":"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFdTBFb2RUaFVsUEF5YjAwcUhhK3REb3FkRmpPMAo4S0JlZUxaT3E5VlJ3Q0xyNUxySzdkQlRabmtaVGtVUkY4NWVVNVgwaVQyOEViOVMxdnFSaVpBYnlnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t","robloxSignature":"qqcseNR5OuxPOv+tK8ybCIvB6KqH59DxXZ34YP3E6o0j5YJtKPOgZh2pne+0hsbnWNFHUrRQUEgrMCadpLOEtA=="}
 * @exampleRawBody {"robloxApiKeyBase64":"LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFdTBFb2RUaFVsUEF5YjAwcUhhK3REb3FkRmpPMAo4S0JlZUxaT3E5VlJ3Q0xyNUxySzdkQlRabmtaVGtVUkY4NWVVNVgwaVQyOEViOVMxdnFSaVpBYnlnPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t","robloxSignature":"qqcseNR5OuxPOv+tK8ybCIvB6KqH59DxXZ34YP3E6o0j5YJtKPOgZh2pne+0hsbnWNFHUrRQUEgrMCadpLOEtA=="}
 */
export const register = createApiMethod(async (
  { publicKey, nonce }: { publicKey: string, nonce: string }
): ApiMethod<RawRegisterData> => ({
  method: "POST",
  path: `/v1/register`,
  body: { 
    key: publicKey,
    identifier: nonce
  },
  name: "register",
}))


/**
 * 
 * @endpoint POST /v1/submit
 * 
 * @param challengeId
 * @param params
 * @param payloadV2
 * @param userId
 * 
 * @example 
 * @exampleData
 * @exampleRawBody
 */
export const submit = createApiMethod(async (
  { challengeId, params, payloadV2, userId, browserTrackerId }: { challengeId: string, params: SubmitParams, payloadV2: string, userId: Identifier, browserTrackerId?: string }
): ApiMethod<unknown> => ({
  method: "POST",
  path: `/v1/submit`,
  body: { 
    challengeId,
    params,
    payloadV2,
    userId,
    btid: browserTrackerId
  },
  name: "submit",
}))