(function initPulsePrivacyAllowlistDefaults() {
  if (Array.isArray(window.PulsePrivacyAllowlistDefaults)) {
    return;
  }

  window.PulsePrivacyAllowlistDefaults = Object.freeze([]);
})();
