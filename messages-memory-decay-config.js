window.PulseMemoryDecayConfig = {
  meta: {
    algorithmVersion: "v1",
    profile: "balanced"
  },
  statusThresholds: {
    activeMinActivation: 0.58,
    faintMinActivation: 0.22,
    faintMinImpression: 0.18,
    dormantMinImpression: 0.08,
    dormantMinStability: 0.28,
    archivedMaxActivation: 0.12,
    archivedMaxImpression: 0.08,
    archivedMinInactiveDays: 45
  },
  halfLifeDays: {
    relationship: 18,
    preference: 21,
    habit: 18,
    constraint: 21,
    fact: 12,
    event: 8,
    scene: 4,
    default: 10
  },
  typeBias: {
    relationship: 0.12,
    preference: 0.15,
    habit: 0.1,
    constraint: 0.1,
    fact: 0.03,
    event: 0,
    scene: -0.08,
    default: 0
  },
  formula: {
    targetStabilityBase: 0.18,
    targetStabilityImportanceWeight: 0.22,
    targetStabilityConfidenceWeight: 0.18,
    targetStabilityEmotionWeight: 0.16,
    targetStabilityReinforceWeight: 0.18,
    impressionFloorBase: 0.04,
    impressionFloorImportanceWeight: 0.18,
    impressionFloorEmotionWeight: 0.14,
    impressionFloorReinforceWeight: 0.16,
    coldPenaltyStartDays: 30,
    coldPenaltyWindowDays: 60,
    coldPenaltyMax: 0.25,
    recallBurstBase: 0.1,
    recallBurstHalfLifeDays: 2,
    stabilityDriftRecent: 0.0008,
    stabilityDriftCold: 0.0025,
    stabilityRecentWindowDays: 14,
    cueThresholdBase: 0.55,
    cueThresholdPositiveBiasBonus: 0.1
  },
  recovery: {
    explicitReinforceActivationBase: 0.28,
    explicitReinforceActivationImportanceWeight: 0.1,
    explicitReinforceStabilityBase: 0.06,
    explicitReinforceStabilityEmotionWeight: 0.04,
    promptRecallActivationBoost: 0.08,
    promptRecallStabilityBoost: 0.015,
    promptRecallMaxRecoveredStatus: "faint"
  },
  legacyLocalRetentionBridge: {
    dayBoundaryMode: "exclude_target_day",
    scene: {
      meetsThresholdRetentionDays: 7,
      belowThresholdRetentionDays: 3
    },
    core: {
      meetsThresholdRetentionDays: 365000,
      belowThresholdRetentionDays: 30
    }
  }
};
