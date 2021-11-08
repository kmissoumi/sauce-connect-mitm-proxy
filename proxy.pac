function FindProxyForURL(url, host) {

  // >> route sauce connect traffic directly through localhost
  if (shExpMatch(host, "api.*.saucelabs.com") ||
      shExpMatch(host, "ondemand.*.saucelabs.com") ||
      shExpMatch(host, "saucelabs.com") ||
      shExpMatch(host, "app.saucelabs.com") ||
      shExpMatch(host, "*.saucelabs.com") ||
      shExpMatch(host, "*.miso.saucelabs.com") ||
      shExpMatch(host, "*.tunnels.saucelabs.com")) {
    return "DIRECT";
  }

  // systemUnderTest (SUT) connections << testTraffic
  return "PROXY localhost:8180";
}
