const fs = require("fs");
const path = require("path");
const vm = require("vm");

const MEMORY_DECAY_CONFIG_PATH = path.resolve(__dirname, "..", "..", "messages-memory-decay-config.js");

const DEFAULT_MEMORY_DECAY_CONFIG = {
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

function normalizeNumber(value, fallbackValue) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallbackValue;
}

function normalizePositiveInteger(value, fallbackValue) {
  return Math.max(1, Number.parseInt(String(value ?? fallbackValue), 10) || fallbackValue);
}

function normalizeStatus(value, fallbackValue) {
  const normalized = String(value || "").trim().toLowerCase();
  return ["active", "faint", "dormant", "archived", "superseded"].includes(normalized)
    ? normalized
    : fallbackValue;
}

function normalizeMemoryDecayConfig(source = {}) {
  const raw = source && typeof source === "object" ? source : {};
  return {
    meta: {
      algorithmVersion:
        String(raw?.meta?.algorithmVersion || DEFAULT_MEMORY_DECAY_CONFIG.meta.algorithmVersion).trim() ||
        DEFAULT_MEMORY_DECAY_CONFIG.meta.algorithmVersion,
      profile:
        String(raw?.meta?.profile || DEFAULT_MEMORY_DECAY_CONFIG.meta.profile).trim() ||
        DEFAULT_MEMORY_DECAY_CONFIG.meta.profile
    },
    statusThresholds: {
      activeMinActivation: normalizeNumber(
        raw?.statusThresholds?.activeMinActivation,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.activeMinActivation
      ),
      faintMinActivation: normalizeNumber(
        raw?.statusThresholds?.faintMinActivation,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.faintMinActivation
      ),
      faintMinImpression: normalizeNumber(
        raw?.statusThresholds?.faintMinImpression,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.faintMinImpression
      ),
      dormantMinImpression: normalizeNumber(
        raw?.statusThresholds?.dormantMinImpression,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.dormantMinImpression
      ),
      dormantMinStability: normalizeNumber(
        raw?.statusThresholds?.dormantMinStability,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.dormantMinStability
      ),
      archivedMaxActivation: normalizeNumber(
        raw?.statusThresholds?.archivedMaxActivation,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.archivedMaxActivation
      ),
      archivedMaxImpression: normalizeNumber(
        raw?.statusThresholds?.archivedMaxImpression,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.archivedMaxImpression
      ),
      archivedMinInactiveDays: normalizePositiveInteger(
        raw?.statusThresholds?.archivedMinInactiveDays,
        DEFAULT_MEMORY_DECAY_CONFIG.statusThresholds.archivedMinInactiveDays
      )
    },
    halfLifeDays: {
      relationship: normalizePositiveInteger(
        raw?.halfLifeDays?.relationship,
        DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.relationship
      ),
      preference: normalizePositiveInteger(
        raw?.halfLifeDays?.preference,
        DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.preference
      ),
      habit: normalizePositiveInteger(raw?.halfLifeDays?.habit, DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.habit),
      constraint: normalizePositiveInteger(
        raw?.halfLifeDays?.constraint,
        DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.constraint
      ),
      fact: normalizePositiveInteger(raw?.halfLifeDays?.fact, DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.fact),
      event: normalizePositiveInteger(raw?.halfLifeDays?.event, DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.event),
      scene: normalizePositiveInteger(raw?.halfLifeDays?.scene, DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.scene),
      default: normalizePositiveInteger(raw?.halfLifeDays?.default, DEFAULT_MEMORY_DECAY_CONFIG.halfLifeDays.default)
    },
    typeBias: {
      relationship: normalizeNumber(raw?.typeBias?.relationship, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.relationship),
      preference: normalizeNumber(raw?.typeBias?.preference, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.preference),
      habit: normalizeNumber(raw?.typeBias?.habit, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.habit),
      constraint: normalizeNumber(raw?.typeBias?.constraint, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.constraint),
      fact: normalizeNumber(raw?.typeBias?.fact, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.fact),
      event: normalizeNumber(raw?.typeBias?.event, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.event),
      scene: normalizeNumber(raw?.typeBias?.scene, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.scene),
      default: normalizeNumber(raw?.typeBias?.default, DEFAULT_MEMORY_DECAY_CONFIG.typeBias.default)
    },
    formula: {
      targetStabilityBase: normalizeNumber(
        raw?.formula?.targetStabilityBase,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.targetStabilityBase
      ),
      targetStabilityImportanceWeight: normalizeNumber(
        raw?.formula?.targetStabilityImportanceWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.targetStabilityImportanceWeight
      ),
      targetStabilityConfidenceWeight: normalizeNumber(
        raw?.formula?.targetStabilityConfidenceWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.targetStabilityConfidenceWeight
      ),
      targetStabilityEmotionWeight: normalizeNumber(
        raw?.formula?.targetStabilityEmotionWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.targetStabilityEmotionWeight
      ),
      targetStabilityReinforceWeight: normalizeNumber(
        raw?.formula?.targetStabilityReinforceWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.targetStabilityReinforceWeight
      ),
      impressionFloorBase: normalizeNumber(
        raw?.formula?.impressionFloorBase,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.impressionFloorBase
      ),
      impressionFloorImportanceWeight: normalizeNumber(
        raw?.formula?.impressionFloorImportanceWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.impressionFloorImportanceWeight
      ),
      impressionFloorEmotionWeight: normalizeNumber(
        raw?.formula?.impressionFloorEmotionWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.impressionFloorEmotionWeight
      ),
      impressionFloorReinforceWeight: normalizeNumber(
        raw?.formula?.impressionFloorReinforceWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.impressionFloorReinforceWeight
      ),
      coldPenaltyStartDays: normalizePositiveInteger(
        raw?.formula?.coldPenaltyStartDays,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.coldPenaltyStartDays
      ),
      coldPenaltyWindowDays: normalizePositiveInteger(
        raw?.formula?.coldPenaltyWindowDays,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.coldPenaltyWindowDays
      ),
      coldPenaltyMax: normalizeNumber(
        raw?.formula?.coldPenaltyMax,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.coldPenaltyMax
      ),
      recallBurstBase: normalizeNumber(
        raw?.formula?.recallBurstBase,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.recallBurstBase
      ),
      recallBurstHalfLifeDays: normalizePositiveInteger(
        raw?.formula?.recallBurstHalfLifeDays,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.recallBurstHalfLifeDays
      ),
      stabilityDriftRecent: normalizeNumber(
        raw?.formula?.stabilityDriftRecent,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.stabilityDriftRecent
      ),
      stabilityDriftCold: normalizeNumber(
        raw?.formula?.stabilityDriftCold,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.stabilityDriftCold
      ),
      stabilityRecentWindowDays: normalizePositiveInteger(
        raw?.formula?.stabilityRecentWindowDays,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.stabilityRecentWindowDays
      ),
      cueThresholdBase: normalizeNumber(
        raw?.formula?.cueThresholdBase,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.cueThresholdBase
      ),
      cueThresholdPositiveBiasBonus: normalizeNumber(
        raw?.formula?.cueThresholdPositiveBiasBonus,
        DEFAULT_MEMORY_DECAY_CONFIG.formula.cueThresholdPositiveBiasBonus
      )
    },
    recovery: {
      explicitReinforceActivationBase: normalizeNumber(
        raw?.recovery?.explicitReinforceActivationBase,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.explicitReinforceActivationBase
      ),
      explicitReinforceActivationImportanceWeight: normalizeNumber(
        raw?.recovery?.explicitReinforceActivationImportanceWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.explicitReinforceActivationImportanceWeight
      ),
      explicitReinforceStabilityBase: normalizeNumber(
        raw?.recovery?.explicitReinforceStabilityBase,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.explicitReinforceStabilityBase
      ),
      explicitReinforceStabilityEmotionWeight: normalizeNumber(
        raw?.recovery?.explicitReinforceStabilityEmotionWeight,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.explicitReinforceStabilityEmotionWeight
      ),
      promptRecallActivationBoost: normalizeNumber(
        raw?.recovery?.promptRecallActivationBoost,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.promptRecallActivationBoost
      ),
      promptRecallStabilityBoost: normalizeNumber(
        raw?.recovery?.promptRecallStabilityBoost,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.promptRecallStabilityBoost
      ),
      promptRecallMaxRecoveredStatus: normalizeStatus(
        raw?.recovery?.promptRecallMaxRecoveredStatus,
        DEFAULT_MEMORY_DECAY_CONFIG.recovery.promptRecallMaxRecoveredStatus
      )
    },
    legacyLocalRetentionBridge: {
      dayBoundaryMode:
        String(
          raw?.legacyLocalRetentionBridge?.dayBoundaryMode ||
            DEFAULT_MEMORY_DECAY_CONFIG.legacyLocalRetentionBridge.dayBoundaryMode
        ).trim() || DEFAULT_MEMORY_DECAY_CONFIG.legacyLocalRetentionBridge.dayBoundaryMode,
      scene: {
        meetsThresholdRetentionDays: normalizePositiveInteger(
          raw?.legacyLocalRetentionBridge?.scene?.meetsThresholdRetentionDays,
          DEFAULT_MEMORY_DECAY_CONFIG.legacyLocalRetentionBridge.scene.meetsThresholdRetentionDays
        ),
        belowThresholdRetentionDays: normalizePositiveInteger(
          raw?.legacyLocalRetentionBridge?.scene?.belowThresholdRetentionDays,
          DEFAULT_MEMORY_DECAY_CONFIG.legacyLocalRetentionBridge.scene.belowThresholdRetentionDays
        )
      },
      core: {
        meetsThresholdRetentionDays: normalizePositiveInteger(
          raw?.legacyLocalRetentionBridge?.core?.meetsThresholdRetentionDays,
          DEFAULT_MEMORY_DECAY_CONFIG.legacyLocalRetentionBridge.core.meetsThresholdRetentionDays
        ),
        belowThresholdRetentionDays: normalizePositiveInteger(
          raw?.legacyLocalRetentionBridge?.core?.belowThresholdRetentionDays,
          DEFAULT_MEMORY_DECAY_CONFIG.legacyLocalRetentionBridge.core.belowThresholdRetentionDays
        )
      }
    }
  };
}

let cachedConfig = null;
let cachedConfigMtimeMs = -1;

function loadMemoryDecayConfigFromBrowserFile() {
  const fileStat = fs.statSync(MEMORY_DECAY_CONFIG_PATH);
  if (cachedConfig && cachedConfigMtimeMs === fileStat.mtimeMs) {
    return cachedConfig;
  }
  const sourceCode = fs.readFileSync(MEMORY_DECAY_CONFIG_PATH, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(sourceCode, sandbox, {
    filename: MEMORY_DECAY_CONFIG_PATH
  });
  cachedConfig = normalizeMemoryDecayConfig(sandbox.window?.PulseMemoryDecayConfig || {});
  cachedConfigMtimeMs = fileStat.mtimeMs;
  return cachedConfig;
}

function getMemoryDecayConfig() {
  try {
    return loadMemoryDecayConfigFromBrowserFile();
  } catch (_error) {
    if (!cachedConfig) {
      cachedConfig = normalizeMemoryDecayConfig({});
      cachedConfigMtimeMs = -1;
    }
    return cachedConfig;
  }
}

module.exports = {
  DEFAULT_MEMORY_DECAY_CONFIG,
  getMemoryDecayConfig,
  normalizeMemoryDecayConfig
};
