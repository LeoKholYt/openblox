import { Identifier, ArrayNonEmptyIfConst } from "typeforge";
import { ApiMethod, createApiGroup } from "../../apiGroup";
import { ChallengeMetadata, ChallengeType, PrettifiedChallengeContinueData, RawChallengeContinueData } from "./challenge.types";

const { createApiMethod } = createApiGroup({ name: "ClassicChallenge", baseUrl: "https://apis.roblox.com/challenge" })


/**
 * Continue
 * @category Continue
 * @endpoint POST /v1/continue
 * 
 * @param challengeId
 * @param challengeMetadata 
 * @param challengeType
 * 
 * @example 
 * @exampleData 
 * @exampleRawBody {"challengeId":"41af6d61-fd4c-4bd3-986d-45230e9c4057","challengeType":"twostepverification","challengeMetadata":"{\"userId\":\"2819370426\", \"challengeId\":\"b94c9fb7-f623-4a4e-9f08-43620aae5250\", \"shouldShowRememberDeviceCheckbox\":false, \"rememberDevice\":false, \"sessionCookie\":\"\", \"verificationToken\":\"\", \"actionType\":\"Generic\", \"requestPath\":\"/v1/groups/{groupId}/payouts\", \"requestMethod\":\"POST\", \"sharedParameters\":{\"shouldAnalyze\":false, \"genericChallengeId\":\"\", \"useContinueMode\":false, \"renderNativeChallenge\":false, \"delayParameters\":null}}"}
 */
export const continueChallenge = createApiMethod(async (
  { challengeId, challengeMetadata, challengeType, challengeID }: { challengeId?: string, challengeMetadata: ChallengeMetadata, challengeType: ChallengeType, challengeID?: string }
): ApiMethod<RawChallengeContinueData, PrettifiedChallengeContinueData> => ({
  method: "POST",
  path: `/v1/continue`,
  body: { 
    challengeId,
    challengeID,
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
