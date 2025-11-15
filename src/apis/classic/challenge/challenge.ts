import { Identifier, ArrayNonEmptyIfConst } from "typeforge";
import { ApiMethod, createApiGroup } from "../../apiGroup";
import { ChallengeMetadata, ChallengeType, PrettifiedChallengeContinueData, RawChallengeContinueData } from "./challenge.types";

const { createApiMethod } = createApiGroup({ name: "ClassicChallenge", baseUrl: "https://apis.roblox.com/challenge" })


/**
 * Continue
 * @category Continue
 * @endpoint POST /v1/continue
 * 
 * @param groupId The id of the group to payout from.
 * @param recipients 
 * @param payoutType
 * @param customHeaders
 * 
 * @example 
 * @exampleData 
 * @exampleRawBody 
 */
export const continueChallenge = createApiMethod(async (
  { challengeId, challengeMetadata, challengeType }: { challengeId: string, challengeMetadata: ChallengeMetadata, challengeType: ChallengeType }
): ApiMethod<RawChallengeContinueData, PrettifiedChallengeContinueData> => ({
  method: "POST",
  path: `/v1/continue`,
  body: { 
    challengeId,
    challengeMetadata: JSON.stringify(challengeMetadata),
    challengeType
  },
  name: "continueChallenge",

  formatRawDataFn: (data) => {
    return {
      ...data,
      challengeMetadata: data.challengeMetadata !== "" ? JSON.parse(data.challengeMetadata) as ChallengeMetadata : {}
    }
  }
}))
//////////////////////////////////////////////////////////////////////////////////
