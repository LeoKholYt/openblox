import { Identifier } from "typeforge";

export type ChallengeActionType = "Generic"
export type ChallengeType = "twostepverification" | "chef" | "";
export type ChallengeMetadata = {
  challengeId: string;
  actionType?: ChallengeActionType;
  rememberDevice?: boolean;
  userId?: Identifier;
  verificationToken?: string;
};

export type RawChallengeMetadataBase = {
  challengeId: string,
  userId: Identifier,
  sharedParameters: ChallengeSharedParameters
}

export type RawChallengeMetadata = RawChallengeMetadataBase &{
  actionType: ChallengeActionType,
  rememberDevice: boolean,
  verificationToken: string,
  shouldShowRememberDeviceCheckbox: boolean,
  sessionCookie: string,
  requestPath: string,
  requestMethod: string,
  bodyTranslationKey?: string
}

export type ChallengeSharedParameters = {
  shouldAnalyze: boolean,
  genericChallengeId: string,
  useContinueMode: boolean,
  renderNativeChallenge: boolean,
  delayParameters: null
}

export type PrettifiedChallengeMetadata = {
  challengeId: string,
  userId: Identifier,
  rememberDevice: boolean,
}

export type RawChallengeContinueData = {
  challengeId: string,
  challengeType: ChallengeType,
  challengeMetadata: string,
}

export type PrettifiedChallengeContinueData<T extends ChallengeType = ChallengeType> = {
  challengeId: string;
  challengeType: T;
  challengeMetadata: T extends "" ? {} : RawChallengeMetadata;
};
