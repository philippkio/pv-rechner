// pv_rechner.js
(function() {
  // Inject Bootstrap CSS
  const bsLink = document.createElement('link');
  bsLink.rel = 'stylesheet';
  bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
  document.head.appendChild(bsLink);

  // Inject custom styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      background: #f3f4f6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 2rem;
    }
    .canvas-container {
      max-width: 900px;
      margin: auto;
    }
    .section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      padding: 2rem;
      margin-bottom: 2rem;
    }
    .kpi {
      font-size: 1.8rem;
      font-weight: bold;
      color: #111;
    }
    .kpi-sub {
      font-size: 0.95rem;
      color: #555;
    }
  `;
  document.head.appendChild(style);

  // Load Chart.js
  const chartScript = document.createElement('script');
  chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  document.head.appendChild(chartScript);

  chartScript.onload = () => {
    // Build HTML structure
    const container = document.createElement('div');
    container.className = 'canvas-container';
    container.innerHTML = `
      <div class="section text-center">
        <h2>PV Rechner</h2>
        <p class="mb-4">Wie hoch ist Ihr aktueller Stromverbrauch?</p>
        <div class="d-flex flex-column align-items-center gap-3">
          <input type="range" id="verbrauchSlider" min="1000" max="15000" step="100" value="10000" class="form-range w-75">
          <div class="d-flex align-items-center gap-2">
            <input type="number" id="verbrauchInput" value="10000" class="form-control form-control-lg w-auto" style="min-width:150px;">
            <span class="fs-5">kWh / Jahr</span>
          </div>
        </div>
      </div>

      <div class="section bg-success bg-opacity-10">
        <h4>Einsparpotenzial</h4>
        <div class="row text-center">
          <div class="col-md-4">
            <div class="kpi text-dark" id="ersparnis1">–</div>
            <div class="kpi-sub">im 1. Jahr</div>
          </div>
          <div class="col-md-4">
            <div class="kpi text-success" id="ersparnis20">–</div>
            <div class="kpi-sub">nach 20 Jahren</div>
          </div>
          <div class="col-md-4">
            <div class="kpi text-dark" id="breakEven">–</div>
            <div class="kpi-sub">Break-even</div>
          </div>
        </div>
      </div>

      <div class="section bg-light">
        <h4>Technische Auslegung</h4>
        <div class="row text-center">
          <div class="col-md-4">
            <div class="kpi" id="kwp">–</div>
            <div class="kpi-sub">PV-Leistung</div>
          </div>
          <div class="col-md-4">
            <div class="kpi" id="module">–</div>
            <div class="kpi-sub">Module</div>
          </div>
          <div class="col-md-4">
            <div class="kpi" id="speicher">–</div>
            <div class="kpi-sub">Speichergröße</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h4>Ersparnis über 30 Jahre</h4>
        <canvas id="ersparnisChart" height="250"></canvas>
      </div>

      <div class="section bg-warning bg-opacity-10">
        <h4>Investitionskosten</h4>
        <div class="row text-center">
          <div class="col-md-4">
            <div class="kpi text-dark" id="pvKosten">–</div>
            <div class="kpi-sub">PV-Anlage (inkl. Montage)</div>
          </div>
          <div class="col-md-4">
            <div class="kpi text-dark" id="speicherKosten">–</div>
            <div class="kpi-sub">Speicher (inkl. Montage)</div>
          </div>
          <div class="col-md-4">
            <div class="kpi fw-bold" id="gesamtKosten" style="color:rgba(255,206,86,1)">–</div>
            <div class="kpi-sub">Gesamtkosten</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    // Formatter
    function formatDE(num) {
      return num.toLocaleString('de-DE');
    }

    // Calculation logic
    function berechne(verbrauch) {
      document.getElementById('verbrauchSlider').value = verbrauch;
      document.getElementById('verbrauchInput').value = verbrauch;

      const kwp = +(verbrauch / 1000 * 1.4).toFixed(1);
      const module = Math.ceil(kwp / 0.460);
      const speicher = Math.ceil(verbrauch / 1000 * 1.6);

      const pvKosten = Math.round(1500 + kwp * 1000);
      const speicherKosten = 1500 + speicher * 400;
      const gesamt = pvKosten + speicherKosten;

      const prodJahr = 1000 * kwp;
      const eigen = prodJahr * 0.53;
      const einspeisung = prodJahr * 0.47;
      const ersparnisJahr = eigen * 0.35 + einspeisung * 0.079;

      let ersparnis20 = 0;
      let strompreis = 0.35;
      let breakEven = null;
      let kumuliert = -gesamt;

      for (let i = 1; i <= 20; i++) {
        const e = eigen * strompreis + einspeisung * 0.079;
        ersparnis20 += e;
        kumuliert += e;
        if (breakEven === null && kumuliert > 0) breakEven = i;
        strompreis *= 1.035;
      }

      document.getElementById('kwp').innerText = kwp + ' kWp';
      document.getElementById('module').innerText = module + ' Stk';
      document.getElementById('speicher').innerText = speicher + ' kWh';
      document.getElementById('ersparnis1').innerText = formatDE(Math.round(ersparnisJahr)) + ' €';
      document.getElementById('ersparnis20').innerText = formatDE(Math.round(ersparnis20)) + ' €';
      document.getElementById('breakEven').innerText = breakEven ? breakEven + ' Jahre' : '–';
      document.getElementById('pvKosten').innerText = formatDE(pvKosten) + ' €';
      document.getElementById('speicherKosten').innerText = formatDE(speicherKosten) + ' €';
      document.getElementById('gesamtKosten').innerText = formatDE(gesamt) + ' €';

      zeichneChart(gesamt, ersparnisJahr);
    }

    // Chart drawing
    let chart;
    function zeichneChart(investition, jahr1Ersparnis) {
      if (chart) chart.destroy();
      const daten = [];
      let kumuliert = -investition;

      for (let i = 1; i <= 30; i++) {
        const wert = jahr1Ersparnis * Math.pow(1.035, i - 1);
        kumuliert += wert;
        daten.push({
          jahr: i,
          wert: kumuliert.toFixed(0),
          farbe: i <= 20
            ? (kumuliert < 0 ? 'rgba(255,206,86,0.7)' : 'rgba(40,167,69,0.6)')
            : 'rgba(150,150,150,0.5)'
        });
      }

      const ctx = document.getElementById('ersparnisChart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: daten.map(d => 'Jahr ' + d.jahr),
          datasets: [{
            data: daten.map(d => d.wert),
            backgroundColor: daten.map(d => d.farbe)
          }]
        },
        options: {
          animation: { duration: 1000, easing: 'easeOutQuart' },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: val => formatDE(val) + ' €' }
            },
            x: { grid: { display: false } }
          },
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => formatDE(ctx.raw) + ' €' } }
          },
          responsive: true
        }
      });
    }

    // Event listeners
    document.getElementById('verbrauchSlider').addEventListener('input', e => berechne(e.target.value));
    document.getElementById('verbrauchInput').addEventListener('input', e => berechne(e.target.value));
    // Initial run
    berechne(10000);
  };
})();
