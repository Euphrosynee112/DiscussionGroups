window.PulseMemoryRetentionConfig = {
  dayBoundaryMode: "exclude_target_day",
  scene: {
    meetsThresholdRetentionDays: 7,
    belowThresholdRetentionDays: 3
  },
  core: {
    meetsThresholdRetentionDays: 365000,
    belowThresholdRetentionDays: 30
  }
};
