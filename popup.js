document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('statusText');
  const statusDiv = document.getElementById('statusDiv');
  const countrySelect = document.getElementById('countrySelect');

  // Mevcut durumu arka plandan sorgula ve ekrana yaz
  chrome.storage.local.get(['vpnActive', 'selectedCountry'], (data) => {
    if (data.vpnActive) {
      statusText.innerText = "AKTİF";
      statusDiv.classList.add('connected');
      countrySelect.value = data.selectedCountry || 'de';
    }
  });

  // Bağlan Butonu
  document.getElementById('connectBtn').addEventListener('click', () => {
    const country = countrySelect.value;
    chrome.runtime.sendMessage({ action: "connect", country: country }, (response) => {
      statusText.innerText = "AKTİF";
      statusDiv.classList.add('connected');
    });
  });

  // Bağlantıyı Kes Butonu
  document.getElementById('disconnectBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "disconnect" }, (response) => {
      statusText.innerText = "KAPALI";
      statusDiv.classList.remove('connected');
    });
  });
});