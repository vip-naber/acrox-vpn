chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "connect") {
    let proxyConfig;

    // Yüksek hızlı kurumsal veri merkezlerinden çekilen güvenli IP omurgası
    const secureHighSpeedPool = {
      "de": { host: "109.230.199.66", port: 3128 },
      "us": { host: "45.79.221.240", port: 80 },
      "gb": { host: "178.62.91.22", port: 3128 },
      "nl": { host: "213.108.109.19", port: 80 },
      "fr": { host: "51.15.166.111", port: 3128 },
      "sg": { host: "139.59.245.109", port: 8080 },
      "ca": { host: "198.50.163.192", port: 3128 },
      "jp": { host: "210.140.10.33", port: 8080 },
      "au": { host: "103.4.116.54", port: 80 },
      "in": { host: "139.59.88.135", port: 8080 },
      "ch": { host: "178.238.232.185", port: 80 },
      "se": { host: "193.180.113.218", port: 80 },
      "it": { host: "95.141.34.18", port: 80 },
      "es": { host: "80.28.212.132", port: 8080 },
      "pl": { host: "178.212.214.22", port: 8080 },
      "fi": { host: "95.175.99.110", port: 80 },
      "no": { host: "46.21.97.14", port: 3128 },
      "dk": { host: "185.72.244.155", port: 80 },
      "at": { host: "193.239.232.22", port: 80 },
      "ie": { host: "54.72.20.11", port: 80 },
      "be": { host: "134.58.253.11", port: 80 },
      "kr": { host: "211.234.118.66", port: 80 }
    };

    const selectedProxy = secureHighSpeedPool[request.country] || secureHighSpeedPool["de"];

    proxyConfig = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: selectedProxy.host,
          port: selectedProxy.port
        },
        bypassList: ["localhost", "127.0.0.1"]
      }
    };

    chrome.proxy.settings.set({ value: proxyConfig, scope: "regular" }, () => {
      chrome.storage.local.set({ vpnActive: true, selectedCountry: request.country });
      sendResponse({ status: "connected" });
    });
    return true;

  } else if (request.action === "disconnect") {
    // Proxy zincirini sıfırla, yerel internete kayıpsız dön
    chrome.proxy.settings.clear({ scope: "regular" }, () => {
      chrome.storage.local.set({ vpnActive: false });
      sendResponse({ status: "disconnected" });
    });
    return true;
  }
});