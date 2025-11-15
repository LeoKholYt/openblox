export type ChallengeType = "twostepverification" | "chef" | "";
export type ChallengeMetadata = { challengeId: string, actionType: "Generic", rememberDevice: boolean, verificationToken?: string }

export type RawChallengeContinueData = {
  challengeId: string,
  challengeType: ChallengeType,
  challengeMetadata: string,
}

export type PrettifiedChallengeContinueData<T extends ChallengeType = ChallengeType> = {
  challengeId: string;
  challengeType: T;
  challengeMetadata: T extends "" ? {} : ChallengeMetadata;
};
