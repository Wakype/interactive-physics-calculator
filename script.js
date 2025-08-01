// --- Logika Utama Aplikasi ---
const topicSelector = document.getElementById("topic-selector");
const calculatorContainer = document.getElementById("calculator-container");

const ICONS = {
  gerak: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18"/><path d="M4 14h10v-4H4v4Z"/><path d="M16 12h4m-2-2 2 2-2 2"/></svg>`,
  gelombang: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h3l3-9 4 18 3-9h3"/></svg>`,
  osilasi: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 4C9.5 4 9.5 6 12 6S14.5 8 12 8 9.5 10 12 10 14.5 12 12 12 9.5 14 12 14 14.5 16 12 16 9.5 18 12 18 14.5 20 12 20"/>
</svg>`,
  resonansi: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728m2.828 9.9a5 5 0 010-7.072" /></svg>`,
  doppler: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="12" r="1"/><path d="M10.5 12H14l2-2-2-2"/><circle cx="10"cy="12" r="4"/><circle cx="10" cy="12" r="7"/><circle cx="10" cy="12" r="10"/></svg>`,
};

function initApp() {
  if (topicSelector.value === "") {
    calculatorContainer.innerHTML = "";
    calculatorContainer.appendChild(createInitialPlaceholderElement());
  }

  updateTitleTheme();
}

function updateTitleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const title = document.getElementById("page-title");

  if (!title) return;

  title.classList.remove("text-gray-900", "text-white");
  title.classList.add(isDark ? "text-white" : "text-gray-900");
}

function createInitialPlaceholderElement() {
  const isDark = document.documentElement.classList.contains("dark");

  const wrapper = document.createElement("div");
  wrapper.className = `text-center p-8 rounded-lg shadow-md border transition-colors duration-300 ${
    isDark
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-gray-100 text-gray-900 border-gray-200"
  }`;

  const emoji = document.createElement("p");
  emoji.className = "text-3xl";
  emoji.textContent = "👋";

  const title = document.createElement("h3");
  title.className = "mt-2 text-lg font-medium";
  title.textContent = "Selamat Datang";

  const desc = document.createElement("p");
  desc.className = "mt-1 text-sm";
  desc.textContent = "Silahkan pilih topik sesuai materi";

  wrapper.appendChild(emoji);
  wrapper.appendChild(title);
  wrapper.appendChild(desc);
  return wrapper;
}

topicSelector.addEventListener("change", (event) => {
  const selectedTopic = event.target.value;
  displayCalculator(selectedTopic);
});

function displayCalculator(topic) {
  let content = "";
  switch (topic) {
    case "gerak":
      content = getGerakCalculatorHTML();
      break;
    case "gelombang":
      content = getGelombangCalculatorHTML();
      break;
    case "osilasi":
      content = getOsilasiCalculatorHTML();
      break;
    case "resonansi":
      content = getResonansiCalculatorHTML();
      break;
    case "doppler":
      content = getDopplerCalculatorHTML();
      break;
    default:
      calculatorContainer.innerHTML = "";
      calculatorContainer.appendChild(createInitialPlaceholderElement());
      return; // jangan lanjut render content
  }
  calculatorContainer.innerHTML = content;
}

function createCard(title, icon, content) {
  return `
                <div class="calculator-card rounded-lg p-6 shadow-md">
                    <h3 class="flex items-center text-xl font-bold mb-4">${icon} ${title}</h3>
                    ${content}
                </div>`;
}

// --- Fungsi HTML & Kalkulasi ---

function showResult(id, { value, unit, formula, note = "" }) {
  const el = document.getElementById(id);
  const colorClass = el.dataset.color || "indigo"; // Default color
  if (isNaN(value) || !isFinite(value)) {
    el.innerHTML = `<p class="font-bold text-red-400">Error: Hasil tidak valid. Periksa input Anda.</p>`;
  } else {
    el.innerHTML = `
                    <p class="text-sm text-gray-500 dark:text-gray-400">Menggunakan rumus: <span class="font-mono">${formula}</span></p>
                    <p class="text-lg mt-2">Hasil: <strong class="text-${colorClass}-600 dark:text-${colorClass}-400">${value} ${unit}</strong></p>
                    ${
                      note
                        ? `<p class="text-xs mt-1 text-gray-500 dark:text-gray-400">${note}</p>`
                        : ""
                    }
                `;
  }
  el.style.display = "block";
}

// 1. Gerak
function getGerakCalculatorHTML() {
  return [
    createCard(
      "Gerak Horizontal",
      ICONS.gerak,
      `
                    <div class="formula-box mb-4">Δx = v₀t + ½at²</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung jarak yang ditempuh benda dengan percepatan konstan dari keadaan diam (v₀ = 0).</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="gh-a" class="text-sm font-medium">Percepatan (a) [m/s²]</label><input type="number" id="gh-a" value="5" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="gh-t" class="text-sm font-medium">Waktu (t) [s]</label><input type="number" id="gh-t" value="10" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungGerakHorizontal()" class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="gh-result" data-color="indigo" class="result-box mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Gerak Vertikal ke Atas",
      ICONS.gerak,
      `
                    <div class="formula-box mb-4">v² = v₀² + 2aΔy</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung ketinggian maksimum yang dicapai saat benda dilempar ke atas (v akhir = 0).</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="gv-v0" class="text-sm font-medium">Kecepatan Awal (v₀) [m/s]</label><input type="number" id="gv-v0" value="20" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="gv-g" class="text-sm font-medium">Gravitasi (g) [m/s²]</label><input type="number" id="gv-g" value="9.81" step="0.01" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungGerakVertikal()" class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="gv-result" data-color="indigo" class="result-box mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Gerak Jatuh Bebas",
      ICONS.gerak,
      `
                    <div class="formula-box mb-4">Δy = v₀t + ½gt²</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung jarak jatuh benda dari keadaan diam (v₀ = 0).</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="gjb-t" class="text-sm font-medium">Waktu (t) [s]</label><input type="number" id="gjb-t" value="3" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="gjb-g" class="text-sm font-medium">Gravitasi (g) [m/s²]</label><input type="number" id="gjb-g" value="9.81" step="0.01" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungJatuhBebas()" class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="gjb-result" data-color="indigo" class="result-box mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500" style="display:none;"></div>
                `
    ),
  ].join("");
}
function hitungGerakHorizontal() {
  const a = parseFloat(document.getElementById("gh-a").value);
  const t = parseFloat(document.getElementById("gh-t").value);
  const result = 0.5 * a * t * t;
  showResult("gh-result", {
    value: result.toFixed(3),
    unit: "m",
    formula: "Δx = ½at²",
  });
}
function hitungGerakVertikal() {
  const v0 = parseFloat(document.getElementById("gv-v0").value);
  const g = parseFloat(document.getElementById("gv-g").value);
  const result = (v0 * v0) / (2 * g);
  showResult("gv-result", {
    value: result.toFixed(3),
    unit: "m",
    formula: "Δy = v₀² / 2g",
  });
}
function hitungJatuhBebas() {
  const t = parseFloat(document.getElementById("gjb-t").value);
  const g = parseFloat(document.getElementById("gjb-g").value);
  const result = 0.5 * g * t * t;
  showResult("gjb-result", {
    value: result.toFixed(3),
    unit: "m",
    formula: "Δy = ½gt²",
  });
}

// 2. Gelombang
function getGelombangCalculatorHTML() {
  return [
    createCard(
      "Frekuensi dari Persamaan Gelombang",
      ICONS.gelombang,
      `
                    <div class="formula-box mb-4">f = ω / 2π</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung frekuensi (f) dari frekuensi sudut (ω).</p>
                    <div><label for="pg-omega" class="text-sm font-medium">Frekuensi Sudut (ω) [rad/s]</label><input type="number" id="pg-omega" value="31.416" class="mt-1 block w-full rounded-md p-2"></div>
                    <small class="text-gray-500 dark:text-gray-400">Contoh: dari 10πt, ω ≈ 31.416</small>
                    <button onclick="hitungFrekuensiGelombang()" class="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="pg-result" data-color="teal" class="result-box mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 border-teal-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Intensitas dari Desibel",
      ICONS.gelombang,
      `
                    <div class="formula-box mb-4">I = I₀ ⋅ 10^(β/10)</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung intensitas bunyi (I) dari tingkat intensitasnya (β).</p>
                    <div><label for="ib-beta" class="text-sm font-medium">Tingkat Intensitas (β) [dB]</label><input type="number" id="ib-beta" value="140" class="mt-1 block w-full rounded-md p-2"></div>
                    <button onclick="hitungIntensitasBunyi()" class="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="ib-result" data-color="teal" class="result-box mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 border-teal-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Pembiasan Cahaya (Snellius)",
      ICONS.gelombang,
      `
                    <div class="formula-box mb-4">n₁ sin(θ₁) = n₂ sin(θ₂)</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung sudut bias (θ₂) saat cahaya berpindah medium.</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label for="pc-n1" class="text-sm font-medium">n₁</label><input type="number" id="pc-n1" value="1.00" step="0.01" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="pc-n2" class="text-sm font-medium">n₂</label><input type="number" id="pc-n2" value="1.33" step="0.01" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="pc-theta1" class="text-sm font-medium">θ₁ [derajat]</label><input type="number" id="pc-theta1" value="30" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungPembiasan()" class="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="pc-result" data-color="teal" class="result-box mt-4 p-4 bg-teal-50 dark:bg-teal-900/20 border-teal-500" style="display:none;"></div>
                `
    ),
  ].join("");
}
function hitungFrekuensiGelombang() {
  const omega = parseFloat(document.getElementById("pg-omega").value);
  const result = omega / (2 * Math.PI);
  showResult("pg-result", {
    value: result.toFixed(3),
    unit: "Hz",
    formula: "f = ω / 2π",
  });
}
function hitungIntensitasBunyi() {
  const beta = parseFloat(document.getElementById("ib-beta").value);
  const I0 = 1e-12;
  const result = I0 * Math.pow(10, beta / 10);
  showResult("ib-result", {
    value: result.toExponential(4),
    unit: "W/m²",
    formula: "I = I₀ ⋅ 10^(β/10)",
    note: `I₀ (ambang dengar) = 1.0 x 10⁻¹² W/m²`,
  });
}
function hitungPembiasan() {
  const n1 = parseFloat(document.getElementById("pc-n1").value);
  const n2 = parseFloat(document.getElementById("pc-n2").value);
  const theta1 = parseFloat(document.getElementById("pc-theta1").value);
  const theta1_rad = theta1 * (Math.PI / 180);
  const sin_theta2 = (n1 / n2) * Math.sin(theta1_rad);
  if (sin_theta2 > 1) {
    document.getElementById(
      "pc-result"
    ).innerHTML = `<p class="font-bold text-red-400">Error: Terjadi pemantulan internal total (sin θ₂ > 1).</p>`;
    document.getElementById("pc-result").style.display = "block";
    return;
  }
  const theta2_rad = Math.asin(sin_theta2);
  const result = theta2_rad * (180 / Math.PI);
  showResult("pc-result", {
    value: result.toFixed(3),
    unit: "derajat",
    formula: "θ₂ = asin((n₁/n₂)sin(θ₁))",
  });
}

// 3. Osilasi
function getOsilasiCalculatorHTML() {
  return [
    createCard(
      "Periode Sistem Massa-Pegas",
      ICONS.osilasi,
      `
                    <div class="formula-box mb-4">T = 2π √(m/k)</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung periode osilasi (T) dari sistem massa (m) dan pegas (k).</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="mp-k" class="text-sm font-medium">Konstanta Pegas (k) [N/m]</label><input type="number" id="mp-k" value="200" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="mp-m" class="text-sm font-medium">Massa (m) [kg]</label><input type="number" id="mp-m" value="0.5" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungOsilasiPegas()" class="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="mp-result" data-color="sky" class="result-box mt-4 p-4 bg-sky-50 dark:bg-sky-900/20 border-sky-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Frekuensi Bandul Sederhana",
      ICONS.osilasi,
      `
                    <div class="formula-box mb-4">f = (1/2π) √(g/L)</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung frekuensi osilasi (f) sebuah bandul sederhana.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="bs-L" class="text-sm font-medium">Panjang Tali (L) [m]</label><input type="number" id="bs-L" value="1.0" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="bs-g" class="text-sm font-medium">Gravitasi (g) [m/s²]</label><input type="number" id="bs-g" value="9.81" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungOsilasiBandul()" class="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="bs-result" data-color="sky" class="result-box mt-4 p-4 bg-sky-50 dark:bg-sky-900/20 border-sky-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Energi pada GHS",
      ICONS.osilasi,
      `
                    <div class="formula-box mb-4">E = ½ kA²</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung konstanta pegas (k) dari energi total (E) dan amplitudo (A).</p>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="eg-E" class="text-sm font-medium">Energi Total (E) [Joule]</label><input type="number" id="eg-E" value="25" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="eg-A" class="text-sm font-medium">Amplitudo (A) [m]</label><input type="number" id="eg-A" value="0.1" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungEnergiGHS()" class="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="eg-result" data-color="sky" class="result-box mt-4 p-4 bg-sky-50 dark:bg-sky-900/20 border-sky-500" style="display:none;"></div>
                `
    ),
  ].join("");
}
function hitungOsilasiPegas() {
  const k = parseFloat(document.getElementById("mp-k").value);
  const m = parseFloat(document.getElementById("mp-m").value);
  const omega = Math.sqrt(k / m);
  const result = (2 * Math.PI) / omega;
  showResult("mp-result", {
    value: result.toFixed(4),
    unit: "s",
    formula: "T = 2π / ω",
  });
}
function hitungOsilasiBandul() {
  const L = parseFloat(document.getElementById("bs-L").value);
  const g = parseFloat(document.getElementById("bs-g").value);
  const omega = Math.sqrt(g / L);
  const result = omega / (2 * Math.PI);
  showResult("bs-result", {
    value: result.toFixed(4),
    unit: "Hz",
    formula: "f = ω / 2π",
  });
}
function hitungEnergiGHS() {
  const E = parseFloat(document.getElementById("eg-E").value);
  const A = parseFloat(document.getElementById("eg-A").value);
  if (A === 0) {
    document.getElementById(
      "eg-result"
    ).innerHTML = `<p class="font-bold text-red-400">Error: Amplitudo tidak boleh nol.</p>`;
    document.getElementById("eg-result").style.display = "block";
    return;
  }
  const result = (2 * E) / (A * A);
  showResult("eg-result", {
    value: result.toFixed(2),
    unit: "N/m",
    formula: "k = 2E / A²",
  });
}

// 4. Resonansi
function getResonansiCalculatorHTML() {
  return [
    createCard(
      "Resonansi Fundamental Tali",
      ICONS.resonansi,
      `
                    <div class="formula-box mb-4">f₁ = v / 2L</div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung frekuensi resonansi fundamental pada tali.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="rt-L" class="text-sm font-medium">Panjang Tali (L) [m]</label><input type="number" id="rt-L" value="2" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="rt-v" class="text-sm font-medium">Cepat Rambat (v) [m/s]</label><input type="number" id="rt-v" value="400" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungResonansiTali()" class="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="rt-result" data-color="amber" class="result-box mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-500" style="display:none;"></div>
                `
    ),
    createCard(
      "Resonansi Nada Dasar Pipa Terbuka",
      ICONS.resonansi,
      `
                    <div class="formula-box mb-4">f₁ = v / 2L</div>
                     <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung frekuensi nada dasar pada pipa terbuka.</p>
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label for="rp-L" class="text-sm font-medium">Panjang Pipa (L) [m]</label><input type="number" id="rp-L" value="0.85" class="mt-1 block w-full rounded-md p-2"></div>
                        <div><label for="rp-v" class="text-sm font-medium">Kecepatan Suara (v) [m/s]</label><input type="number" id="rp-v" value="340" class="mt-1 block w-full rounded-md p-2"></div>
                    </div>
                    <button onclick="hitungResonansiPipa()" class="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                    <div id="rp-result" data-color="amber" class="result-box mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-500" style="display:none;"></div>
                `
    ),
  ].join("");
}
function hitungResonansiTali() {
  const L = parseFloat(document.getElementById("rt-L").value);
  const v = parseFloat(document.getElementById("rt-v").value);
  const result = v / (2 * L);
  showResult("rt-result", {
    value: result.toFixed(2),
    unit: "Hz",
    formula: "f₁ = v / λ₁",
    note: `Panjang gelombang fundamental (λ₁) adalah 2L.`,
  });
}
function hitungResonansiPipa() {
  const L = parseFloat(document.getElementById("rp-L").value);
  const v = parseFloat(document.getElementById("rp-v").value);
  const result = v / (2 * L);
  showResult("rp-result", {
    value: result.toFixed(2),
    unit: "Hz",
    formula: "f₁ = v / λ₁",
    note: `Panjang gelombang nada dasar (λ₁) adalah 2L.`,
  });
}

// 5. Efek Doppler
function getDopplerCalculatorHTML() {
  return createCard(
    "Efek Doppler",
    ICONS.doppler,
    `
                <div class="formula-box mb-4">f' = f (v ± vₒ) / (v ∓ vₛ)</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Menghitung pergeseran frekuensi akibat gerak relatif.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label for="dp-f" class="text-sm font-medium">Frekuensi Sumber (f) [Hz]</label><input type="number" id="dp-f" value="800" class="mt-1 block w-full rounded-md p-2"></div>
                    <div><label for="dp-v" class="text-sm font-medium">Kecepatan Suara (v) [m/s]</label><input type="number" id="dp-v" value="343" class="mt-1 block w-full rounded-md p-2"></div>
                    <div><label for="dp-vo" class="text-sm font-medium">Kecepatan Pengamat (vₒ) [m/s]</label><input type="number" id="dp-vo" value="30" class="mt-1 block w-full rounded-md p-2"></div>
                    <div><label for="dp-vs" class="text-sm font-medium">Kecepatan Sumber (vₛ) [m/s]</label><input type="number" id="dp-vs" value="40" class="mt-1 block w-full rounded-md p-2"></div>
                </div>
                <div class="mt-4">
                     <label for="dp-scenario" class="text-sm font-medium">Pilih Skenario Gerak</label>
                     <select id="dp-scenario" class="mt-1 block w-full rounded-md p-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                        <option value="s_approach_o_still">Sumber mendekati Pengamat diam</option>
                        <option value="s_recede_o_still">Sumber menjauhi Pengamat diam</option>
                        <option value="o_approach_s_still">Pengamat mendekati Sumber diam</option>
                        <option value="o_recede_s_still">Pengamat menjauhi Sumber diam</option>
                        <option value="both_approach">Saling mendekat</option>
                        <option value="both_recede">Saling menjauh</option>
                        <option value="s_chase_o" selected>Sumber mengejar Pengamat</option>
                        <option value="o_chase_s">Pengamat mengejar Sumber</option>
                     </select>
                </div>
                <button onclick="hitungDoppler()" class="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg">Hitung</button>
                <div id="dp-result" data-color="rose" class="result-box mt-4 p-4 bg-rose-50 dark:bg-rose-900/20 border-rose-500" style="display:none;"></div>
            `
  );
}
function hitungDoppler() {
  const f = parseFloat(document.getElementById("dp-f").value);
  const v = parseFloat(document.getElementById("dp-v").value);
  const vo = Math.abs(parseFloat(document.getElementById("dp-vo").value)); // Ambil nilai absolut
  const vs = Math.abs(parseFloat(document.getElementById("dp-vs").value));
  const scenario = document.getElementById("dp-scenario").value;

  let numerator, denominator, formula;

  switch (scenario) {
    case "s_approach_o_still":
      numerator = v;
      denominator = v - vs;
      formula = "f [v / (v - vₛ)]";
      break;
    case "s_recede_o_still":
      numerator = v;
      denominator = v + vs;
      formula = "f [v / (v + vₛ)]";
      break;
    case "o_approach_s_still":
      numerator = v + vo;
      denominator = v;
      formula = "f [(v + vₒ) / v]";
      break;
    case "o_recede_s_still":
      numerator = v - vo;
      denominator = v;
      formula = "f [(v - vₒ) / v]";
      break;
    case "both_approach":
      numerator = v + vo;
      denominator = v - vs;
      formula = "f [(v + vₒ) / (v - vₛ)]";
      break;
    case "both_recede":
      numerator = v - vo;
      denominator = v + vs;
      formula = "f [(v - vₒ) / (v + vₛ)]";
      break;
    case "s_chase_o":
      numerator = v - vo;
      denominator = v - vs;
      formula = "f [(v - vₒ) / (v - vₛ)]";
      break;
    case "o_chase_s":
      numerator = v + vo;
      denominator = v + vs;
      formula = "f [(v + vₒ) / (v + vₛ)]";
      break;
  }

  if (denominator === 0) {
    document.getElementById(
      "dp-result"
    ).innerHTML = `<p class="font-bold text-red-400">Error: Kecepatan relatif menyebabkan pembagian dengan nol (sonic boom).</p>`;
    document.getElementById("dp-result").style.display = "block";
    return;
  }

  const result = f * (numerator / denominator);
  showResult("dp-result", {
    value: result.toFixed(2),
    unit: "Hz",
    formula: formula,
    note: "vₒ dan vₛ adalah kelajuan (nilai selalu positif).",
  });
}

// --- LOGIKA TOGGLE TEMA ---
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const themeToggleBtn = document.getElementById("theme-toggle");

// Cek tema dari localStorage atau preferensi sistem
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
  themeToggleDarkIcon.classList.add("hidden");
  document.documentElement.classList.add("dark");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
  themeToggleLightIcon.classList.add("hidden");
  document.documentElement.classList.remove("dark");
}

initApp(); // jalankan setelah class dark ditetapkan

themeToggleBtn.addEventListener("click", function () {
  // Toggle ikon
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // Jika tema sudah ada di localStorage, toggle dan simpan
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }

  if (topicSelector.value === "") {
    calculatorContainer.innerHTML = "";
    calculatorContainer.appendChild(createInitialPlaceholderElement());
    updateTitleTheme();
  }
  updateTitleTheme();
});

function refreshPlaceholderIfNeeded() {
  if (topicSelector.value === "") {
    calculatorContainer.innerHTML = "";
    calculatorContainer.appendChild(createInitialPlaceholderElement());
  }
}

const htmlObserver = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.attributeName === "class") {
      refreshPlaceholderIfNeeded();
    }
  }
});

htmlObserver.observe(document.documentElement, { attributes: true });
