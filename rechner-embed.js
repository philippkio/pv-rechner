(function() {
  const html = `
<div class="container mx-auto px-1 py-5 max-w-lg">
<header class="mb-6 text-center">
<h1 class="text-2xl sm:text-4xl font-bold text-primary mb-2">PV-Rechner für Hausbesitzer</h1>
<p class="text-sm sm:text-base text-gray-700">Berechnen Sie Kosten, Amortisationszeit und Einsparungen Ihrer Photovoltaikanlage</p>
</header>
<div class="bg-white rounded-lg shadow-lg p-2 sm:p-4 mb-4">
<h2 class="text-lg sm:text-xl font-semibold text-primary mb-4">Ihre Angaben</h2>
<form class="space-y-6" id="pv-form">
<!-- Personen im Haushalt -->
<div class="form-group">
<label class="block text-gray-700 font-medium mb-3">Personen im Haushalt</label>
<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
<button class="option-button border-2 border-gray-300 rounded-lg py-1 px-1 font-medium transition-all hover:bg-gray-50" data-value="2" type="button">2</button>
<button class="option-button border-2 border-gray-300 rounded-lg py-1 px-1 font-medium transition-all hover:bg-gray-50" data-value="3" type="button">3</button>
<button class="option-button border-2 border-gray-300 rounded-lg py-1 px-1 font-medium transition-all hover:bg-gray-50" data-value="5" type="button">5</button>
<button class="option-button border-2 border-gray-300 rounded-lg py-1 px-1 font-medium transition-all hover:bg-gray-50" data-value="other" type="button">Andere</button>
</div>
<div class="mt-3 hidden" id="custom-household-container">
<input class="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" id="custom-household" max="20" min="1" placeholder="Anzahl Personen" type="number"/>
</div>
<input id="household-size" type="hidden" value="2"/>
</div>
<!-- Zusätzliche Features -->
<div class="space-y-3">
<!-- Wärmepumpe -->
<div class="feature-card border-2 border-gray-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50" data-feature="heat-pump">
<input class="hidden" id="heat-pump" type="checkbox"/>
<div class="flex items-center">
<div class="flex-shrink-0 mr-3">
<!-- Externes AVIF-Bild anstelle des SVG-Icons -->
<img alt="Wärmepumpe Icon" class="h-12 w-12" src="https://cdn.prod.website-files.com/676838aa8ac4cfe47892bb23/67e7e4085ee8ee79251225ec_WP.avif"/>
</div>
<div>
<h3 class="font-medium">Wärmepumpe</h3>
<p class="text-sm text-gray-500">+3.500 kWh/Jahr</p>
</div>
</div>
</div>
<!-- Elektroauto -->
<div class="feature-card border-2 border-gray-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50" data-feature="electric-car">
<input class="hidden" id="electric-car" type="checkbox"/>
<div class="flex items-center">
<div class="flex-shrink-0 mr-3">
<!-- AVIF-Bild anstelle des SVG-Icons -->
<img alt="Elektroauto Icon" class="h-12 w-12" src="https://cdn.prod.website-files.com/676838aa8ac4cfe47892bb23/67e7e4075ee8ee79251225bb_eauto_png_transpartent_right_size.avif"/>
</div>
<div>
<h3 class="font-medium">Elektroauto</h3>
<p class="text-sm text-gray-500"> +3.000 kWh/Jahr, ca. 15.000 km Fahrleistung</p>
</div>
</div>
</div>
<!-- OR divider -->
<div class="relative flex py-5 items-center">
<div class="flex-grow border-t border-gray-300"></div>
<span class="flex-shrink mx-4 text-gray-600 font-bold">ODER</span>
<div class="flex-grow border-t border-gray-300"></div>
</div>
<!-- Jährlicher Stromverbrauch -->
<div class="form-group">
<label class="block text-gray-700 font-medium mb-2" for="power-consumption">
                        Jährlicher Stromverbrauch (kWh) <span class="text-gray-500 text-sm">(optional)</span>
</label>
<input class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" id="power-consumption" inputmode="numeric" placeholder="Automatische Schätzung, wenn leer" type="number"/>
<div class="hidden text-secondary text-sm mt-1" id="consumption-error">
                        Bitte geben Sie einen gültigen Stromverbrauch ein (&gt; 0)
                    </div>
</div>
<!-- Erweiterte Einstellungen -->
<div class="form-group">
<button class="w-full text-left text-gray-700 font-medium py-2 px-0 hover:text-primary focus:outline-none flex items-center justify-between" id="toggle-advanced-settings" type="button">
<span>
<svg class="h-5 w-5 inline-block mr-2" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
                            Erweiterte Einstellungen
                        </span>
<svg class="h-5 w-5 transform rotate-0 transition-transform" fill="currentColor" id="advanced-settings-arrow" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill-rule="evenodd"></path>
</svg>
</button>
<div class="hidden space-y-6 mt-2" id="advanced-settings">
<!-- Aktueller Strompreis -->
<div class="form-group">
<label class="block text-gray-700 font-medium mb-2" for="electricity-price-slider">
                                Aktueller Strompreis pro Kilowattstunde (€/kWh)
                                <button class="ml-2 text-gray-400 hover:text-primary focus:outline-none" id="electricity-price-info-btn" type="button">
<svg class="h-5 w-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fill-rule="evenodd"></path>
</svg>
</button>
</label>
<div class="flex items-center space-x-3">
<input class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" id="electricity-price-slider" max="0.99" min="0.20" step="0.01" type="range" value="0.41"/>
<span class="text-primary font-medium w-16 text-right" id="electricity-price-value">0,41 €</span>
</div>
</div>
<!-- Jährliche Strompreissteigerung -->
<div class="form-group">
<label class="block text-gray-700 font-medium mb-2" for="price-increase-slider">
                                Jährliche Strompreissteigerung (%)
                                <button class="ml-2 text-gray-400 hover:text-primary focus:outline-none" id="price-increase-info-btn" type="button">
<svg class="h-5 w-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fill-rule="evenodd"></path>
</svg>
</button>
</label>
<div class="flex items-center space-x-3">
<input class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" id="price-increase-slider" max="15" min="0" step="0.1" type="range" value="3.9"/>
<span class="text-primary font-medium w-16 text-right" id="price-increase-value">3,9 %</span>
</div>
</div>
<!-- Electricity Price Info Modal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="electricity-price-info-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Aktueller Strompreis</h3>
<button class="text-gray-500 hover:text-gray-700" id="close-electricity-price-info">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<p class="text-gray-700">
                                    Der Ø Preis für Strom is rund 42 Cent pro Kilowattstunde (kWh) in Deutschland (April 2025). Ihr Preis kann abweichen. Für eine genauere Rechnung können Sie den Preis aus Ihrer letzten Stromrechnung oder dem Schreiben zur Strompreiserhöhung verwenden.
                                    Quelle: <a class="text-primary hover:underline" href="https://www.bundesnetzagentur.de/DE/Vportal/Energie/PreiseAbschlaege/Tarife-table.html#:~:text=Wie%20setzt%20sich%20der%20Strompreis,zwischen%202.500%20und%205.000%20kWh%20." target="_blank">Bundesnetzagentur</a>
</p>
</div>
</div>
<!-- Price Increase Info Modal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="price-increase-info-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Jährliche Strompreissteigerung</h3>
<button class="text-gray-500 hover:text-gray-700" id="close-price-increase-info">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<p class="text-gray-700">
                                   
                                    Strom wird mit der Zeit teurer. In den letzten 10 Jahren stieg der Preis um ca. 3% pro Jahr, in den letzten 25 Jahren sogar um rund 7,4%. Wir rechnen hier mit 3,9% Anstieg pro Jahr für die Zukunft.
Quelle: Strom-Report.<br/><br/>
                                    Quelle: <a class="text-primary hover:underline" href="https://strom-report.com/strompreisentwicklung/" target="_blank">strom-report.com</a>
</p>
</div>
</div>
<!-- Batteriespeicher -->
<div class="form-group">
<div class="feature-card border-2 border-gray-300 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50 active" data-feature="battery-storage" title="Ein Batteriespeicher speichert Ihren Solarstrom für späteren Verbrauch, z.B. am Abend. Vorteile:
- Erhöht Ihren Ø-Eigenverbrauch von 35% auf 65%, d.h. mehr selbst erzeugten Strom nutzen
- Mehr Unabhängigkeit vom Stromnetz
- Ermöglicht Notstromversorgung bei Stromausfall
Kosten: Ca. 25% der PV-Anlage, aber langfristig erhöhter Eigenverbrauch und damit höhere Einsparung. Aufgrund gesunkener Speicherkosten lohnt sich die Investition in den meisten Fällen.">
<input checked="" class="hidden" id="battery-storage" type="checkbox"/>
<div class="flex items-center">
<div class="flex-shrink-0 mr-3">
<!-- Externes AVIF-Bild anstelle des SVG-Icons -->
<img alt="Batteriespeicher Icon" class="h-12 w-12" src="https://cdn.prod.website-files.com/676838aa8ac4cfe47892bb23/67e7e69210ab90a9690b693f_Speicher.avif"/>
</div>
<div class="relative">
<h3 class="font-medium inline-flex items-center">
                                            Batteriespeicher
                                            <button class="ml-2 text-gray-400 hover:text-primary focus:outline-none" id="battery-info-btn" type="button">
<svg class="h-5 w-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" fill-rule="evenodd"></path>
</svg>
</button>
</h3>
<p class="text-sm text-gray-500">Erhöht Ø Autarkie von 35% auf 65%</p>
<!-- Info Modal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="battery-info-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Batteriespeicher</h3>
<button class="text-gray-500 hover:text-gray-700" id="close-battery-info">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<p class="text-gray-700">
                                                    Ein Batteriespeicher speichert Ihren Solarstrom für späteren Verbrauch, z.B. am Abend. Vorteile:<br/><br/>
                                                    - Erhöht Ihren Eigenverbrauch von 35% auf 65%<br/>
                                                    - Mehr Unabhängigkeit vom Stromnetz<br/>
                                                    - Ermöglicht Notstromversorgung bei Stromausfall<br/><br/>
                                                    Kosten: Ca. 25% der PV-Anlage, aber langfristig erhöhter Eigenverbrauch und damit höhere Einsparung. Aufgrund gesunkener Speicherkosten lohnt sich die Investition in den meisten Fällen.
                                                </p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Berechnen Button -->
<div class="form-group mt-8">
<button class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded-md transition-colors text-lg" id="calculate-btn" type="submit">
                        Berechnen
                    </button>
</div>
</form>
</div>
<!-- Ergebnisse -->
<div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 hidden" id="results">
<h2 class="text-lg sm:text-xl font-semibold text-primary mb-4">Ihre Ergebnisse</h2>
<style>
                .category-title {
                    font-weight: 600;
                    color: #0C4426;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    padding-bottom: 0.25rem;
                    border-bottom: 2px solid #0C442633;
                }
                .result-category {
                    margin-bottom: 1.5rem;
                }
            </style>
<!-- 1. Technische Daten -->
<div class="result-category">
<h3 class="category-title">Größe Ihrer PV-Anlage</h3>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Empfohlene PV-Leistung</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="pv-power">0,0</span> kWp</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="pv-power-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Anzahl Module</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="module-count">0</span> Stück</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="module-count-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Jährliche Produktion</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="annual-production">0</span> kWh</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="annual-production-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg hidden" id="battery-result">
<div>
<h3 class="text-gray-600 text-sm mb-1">Passende Größe Batteriespeicher</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="battery-size">0,00</span> kWh</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="battery-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
<!-- 3. Finanzielle Ergebnisse -->
<div class="result-category">
<h3 class="category-title">Mögliche Einsparung durch PV</h3>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Ersparnis Jahr 1</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="annual-savings">0</span> €</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="savings-year1-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Ersparnis über 30 Jahre</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="total-savings">0</span> €</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="savings-total-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
<!-- 4. Kennzahlen zur Wirtschaftlichkeit -->
<div class="result-category">
<h3 class="category-title">Wirtschaftlichkeit Ihrer PV-Anlage</h3>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<!-- Hervorgehobener Gesamtpreis -->
<div class="result-card bg-primary/10 p-4 rounded-lg border-2 border-primary">
<div>
<h3 class="text-gray-700 text-sm mb-1 font-semibold">Ihr Gesamtpreis</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="total-cost">0</span> €</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="total-cost-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Amortisationszeit</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="payback-time">0</span> Jahre</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="amortization-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">Ø jährliche Gesamtrendite</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="total-return-rate">0,0</span> %</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="total-return-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
<div class="result-card bg-gray-50 p-4 rounded-lg">
<div>
<h3 class="text-gray-600 text-sm mb-1">PV-Stromgestehungskosten</h3>
<p class="text-xl sm:text-2xl font-bold text-primary"><span id="electricity-production-cost">0,00</span> €/kWh</p>
<!-- Zur Rechnung Button -->
<button class="text-primary text-sm font-medium hover:underline flex items-center mt-1 calculation-btn" data-target="production-cost-calculation-modal">
<span>Zur Rechnung</span>
<svg class="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
</div>
</div>
<!-- 5. Grafische Darstellung -->
<div class="result-category">
<div class="chart-container" style="height:350px; margin-bottom:10px;">
<h3 class="text-lg font-semibold text-primary mb-2">Ersparnis über 30 Jahre</h3>
<canvas id="savings-chart" style="margin-top:1px;"></canvas>
</div>
</div>
</div>
</div>
<script>
        /**
         * Main initialization function for PV calculator
         * Sets up event listeners and initial state
         */
        document.addEventListener('DOMContentLoaded', () => {
            // DOM element shortcuts
            /** @function Get element by ID */
            const $ = id => document.getElementById(id);
            /** @function Get all matching elements */
            const $$ = selector => document.querySelectorAll(selector);
            
            const els = {
                form: $('pv-form'),
                household: {
                    size: $('household-size'),
                    buttons: $$('.option-button'),
                    customContainer: $('custom-household-container'),
                    customInput: $('custom-household')
                },
                features: {
                    cards: $$('.feature-card'),
                    heatPump: $('heat-pump'),
                    electricCar: $('electric-car'),
                    battery: $('battery-storage')
                },
                consumption: {
                    input: $('power-consumption'),
                    error: $('consumption-error')
                },
                price: {
                    slider: $('electricity-price-slider'),
                    valueDisplay: $('electricity-price-value'),
                    increaseSlider: $('price-increase-slider'),
                    increaseValueDisplay: $('price-increase-value')
                },
                results: {
                    section: $('results'),
                    battery: $('battery-result'),
                    pvPower: $('pv-power'),
                    moduleCount: $('module-count'),
                    batterySize: $('battery-size'),
                    totalCost: $('total-cost'),
                    annualSavings: $('annual-savings'),
                    totalSavings: $('total-savings'),
                    paybackTime: $('payback-time'),
                    calculateBtn: $('calculate-btn')
                },
                advancedSettings: {
                    button: $('toggle-advanced-settings'),
                    container: $('advanced-settings'),
                    arrow: $('advanced-settings-arrow')
                }
            };
            
            // Chart & Formatters
            let chart = null;
            const fmt = {
                euro: new Intl.NumberFormat('de-DE', {maximumFractionDigits:0}),
                energy: new Intl.NumberFormat('de-DE', {minimumFractionDigits:1,maximumFractionDigits:1}),
                battery: new Intl.NumberFormat('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2})
            };
            
            /**
             * Base electricity consumption map (kWh/year per household size)
             * @constant {Object} baseConsumptionMap
             */
            const baseConsumptionMap = {1:2000, 2:3000, 3:4000, 4:5000};
            
            /**
             * Gets base electricity consumption based on household size
             * @param {number} people - Number of people in household
             * @returns {number} Estimated base consumption in kWh/year
             */
            const getBaseConsumption = people => baseConsumptionMap[people] || 6000;
            
            /**
             * Updates the consumption estimate placeholder based on current selections
             * @function updateConsumptionEstimate
             */
            const updateConsumptionEstimate = () => {
                const people = parseInt(els.household.size.value) || 2;
                let additionalConsumption = 0;
                if(els.features.heatPump.checked) additionalConsumption += 3500;
                if(els.features.electricCar.checked) additionalConsumption += 3000;
                
                els.consumption.input.placeholder = \`Schätzung: ${fmt.euro.format(getBaseConsumption(people) + additionalConsumption)} kWh\`;
            };
            
            const clearPowerConsumption = () => {
                els.consumption.input.value = '';
                updateConsumptionEstimate();
            };
            
            // Event listeners
            els.household.buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    els.household.buttons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const value = this.dataset.value;
                    if(value === 'other') {
                        els.household.customContainer.classList.remove('hidden');
                        els.household.customInput.focus();
                    } else {
                        els.household.customContainer.classList.add('hidden');
                        els.household.size.value = value;
                        clearPowerConsumption();
                    }
                });
            });
            
            els.household.customInput.addEventListener('input', function() {
                if(this.value) {
                    els.household.size.value = this.value;
                    clearPowerConsumption();
                }
            });
            
            els.features.cards.forEach(card => {
                card.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const feature = this.dataset.feature;
                    const checkbox = $(feature);
                    checkbox.checked = !checkbox.checked;
                    
                    if(feature === 'heat-pump' || feature === 'electric-car') {
                        clearPowerConsumption();
                    }
                });
            });
            
            /**
             * Event handler for manual power consumption input
             * Resets the top selection fields when user enters a value manually
             */
            els.consumption.input.addEventListener('input', function() {
                if(this.value && parseFloat(this.value) > 0) {
                    // Clear error message
                    els.consumption.error.classList.add('hidden');
                    
                    // Reset household size buttons
                    els.household.buttons.forEach(b => b.classList.remove('active'));
                    els.household.customContainer.classList.add('hidden');
                    els.household.size.value = '';
                    
                    // Reset feature cards (heat pump and electric car)
                    els.features.cards.forEach(card => {
                        const feature = card.dataset.feature;
                        if(feature === 'heat-pump' || feature === 'electric-car') {
                            card.classList.remove('active');
                            $(feature).checked = false;
                        }
                    });
                }
            });
            
            els.form.addEventListener('submit', e => {
                e.preventDefault();
                
                if(els.consumption.input.value && parseFloat(els.consumption.input.value) <= 0) {
                    els.consumption.error.classList.remove('hidden');
                    return;
                }
                
                els.consumption.error.classList.add('hidden');
                
                // Loading state
                const originalText = els.results.calculateBtn.textContent;
                els.results.calculateBtn.textContent = 'Berechne...';
                els.results.calculateBtn.disabled = true;
                
                setTimeout(() => {
                    const results = calculatePV();
                    displayResults(results);
                    els.results.section.classList.remove('hidden');
                    els.results.calculateBtn.textContent = originalText;
                    els.results.calculateBtn.disabled = false;
                    els.results.section.scrollIntoView({behavior:'smooth'});
                }, 300);
            });

            // Event listener for electricity price slider
            els.price.slider.addEventListener('input', function() {
                const price = parseFloat(this.value);
                // Use German locale formatting for the price display
                els.price.valueDisplay.textContent = \`${price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €\`;
            });

            // Event listener for price increase slider
            els.price.increaseSlider.addEventListener('input', function() {
                const increase = parseFloat(this.value);
                // Use German locale formatting for the percentage display
                els.price.increaseValueDisplay.textContent = \`${increase.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %\`;
            });

            // Event listener for advanced settings toggle
            const toggleAdvancedSettings = document.getElementById('toggle-advanced-settings');
            const advancedSettings = document.getElementById('advanced-settings');
            const advancedSettingsArrow = document.getElementById('advanced-settings-arrow');
            
            if (toggleAdvancedSettings && advancedSettings && advancedSettingsArrow) {
                toggleAdvancedSettings.onclick = function() {
                    advancedSettings.classList.toggle('hidden');
                    advancedSettingsArrow.classList.toggle('rotate-180');
                };
            }
            
            /**
             * Main PV system calculation function
             * @function calculatePV
             * @returns {Object} Calculation results including:
             *   - pvPower: Recommended system size in kWp
             *   - moduleCount: Number of solar modules
             *   - batterySize: Recommended battery storage in kWh
             *   - totalCost: Estimated system cost in €
             *   - annualSavings: First year savings in €
             *   - totalSavings: 20-year cumulative savings in €
             *   - amortizationYear: Payback period in years
             *   - yearlyData: Array of yearly savings data
             */
            const calculatePV = () => {
                // Consumption calculation
                const people = parseInt(els.household.size.value) || 2;
                let additionalConsumption = 0;
                if(els.features.heatPump.checked) additionalConsumption += 3500;
                if(els.features.electricCar.checked) additionalConsumption += 3000;
                
                const totalConsumption = els.consumption.input.value 
                    ? parseFloat(els.consumption.input.value) 
                    : getBaseConsumption(people) + additionalConsumption;
                
                // PV power and modules
                const pvPower = Math.max(4, totalConsumption * 1.2 / 1000);
                const moduleCount = Math.ceil(pvPower * 1000 / 460);
                
                // Battery calculation
                const hasBattery = els.features.battery.checked;
                const batterySize = hasBattery ? Math.max(5, pvPower * 1.2) : 0;
                const batteryCost = hasBattery ? 1500 + (batterySize * 350) : 0;
                
                // System costs
                const pvCost = 5000 + (pvPower * 1000);
                const totalCost = pvCost + batteryCost;
                
                // Production and self-consumption
                const annualProduction = pvPower * 950;
                const selfConsumptionRate = hasBattery ? 0.65 : 0.32;
                const selfConsumption = Math.min(annualProduction * selfConsumptionRate, totalConsumption);
                const surplus = annualProduction - selfConsumption;
                
                // Yearly savings calculation
                const yearlyData = [];
                let cumulativeSavings = 0;
                let cumulativeSavingsFromSelfConsumption = 0; // Added
                let cumulativeFeedInIncome = 0; // Added
                let amortizationYear = null;
                // Use the price from the slider, converting its string value to a float
                let electricityPrice = parseFloat(els.price.slider.value);
                const feedInTariff = 0.0794;
                const calculationYears = 30; // Define calculation years
                
                for(let year = 1; year <= calculationYears; year++) { // Loop to 30
                    const savingsFromSelfConsumption = selfConsumption * electricityPrice;
                    const feedInIncome = surplus * feedInTariff;
                    const yearlyBenefit = savingsFromSelfConsumption + feedInIncome;
                    
                    cumulativeSavings += yearlyBenefit;
                    
                    // Only set amortization year if not already set
                    if(cumulativeSavings >= totalCost && amortizationYear === null) {
                        amortizationYear = year;
                    }
                    
                    yearlyData.push({
                        year,
                        electricityPrice,
                        savingsFromSelfConsumption,
                        feedInIncome,
                        yearlyBenefit,
                        cumulativeSavings,
                        cumulativeSavingsFromSelfConsumption,
                        cumulativeFeedInIncome
                    });
                    
                    // Calculate price increase factor from slider value (percentage)
                    const priceIncreaseFactor = 1 + (parseFloat(els.price.increaseSlider.value) / 100);
                    electricityPrice *= priceIncreaseFactor;
                }
                
                // If amortizationYear is still null after 20 years, estimate it
                if (amortizationYear === null) {
                    if (cumulativeSavings <= 0 || totalCost <= 0) {
                        // Edge case - no savings or no cost
                        amortizationYear = ">30";
                    } else {
                        // Calculate a rough estimate for how many more years it would take
                        // by using the average annual savings over the last few years
                        const lastYearsSavings = yearlyData.slice(-5).reduce((sum, year) => sum + year.yearlyBenefit, 0) / 5;
                        
                        if (lastYearsSavings <= 0) {
                            // If there are no savings in the last years, it will never amortize
                            amortizationYear = ">30";
                        } else {
                            // Calculate how much more savings are needed
                            const remainingCost = totalCost - cumulativeSavings;
                            // Estimate how many more years at current rate
                            const extraYears = Math.ceil(remainingCost / lastYearsSavings);
                            
                            if (extraYears > 10) {
                                amortizationYear = ">30";
                            } else {
                                amortizationYear = 20 + extraYears;
                            }
                        }
                    }
                }
                
                // Gesamtrendite berechnen (einfache Methode)
                const totalReturnRate = (cumulativeSavings / totalCost) / calculationYears * 100;
                
                // Kapitalrendite (ROI) berechnen
                const capitalROI = (cumulativeSavings - totalCost) / totalCost / calculationYears * 100;
                
                // Stromgestehungskosten berechnen
                const electricityProductionCost = totalCost / (calculationYears * 950 * pvPower);
                
                return {
                    pvPower,
                    moduleCount,
                    batterySize,
                    totalCost,
                    annualSavings: yearlyData[0].yearlyBenefit,
                    totalSavings: cumulativeSavings,
                    amortizationYear,
                    yearlyData,
                    totalReturnRate,
                    capitalROI,
                    electricityProductionCost,
                    annualProduction
                };
            };
            
            // Display results
            const displayResults = results => {
                els.results.pvPower.textContent = fmt.energy.format(results.pvPower);
                els.results.moduleCount.textContent = results.moduleCount;
                
                if(els.features.battery.checked) {
                    els.results.battery.classList.remove('hidden');
                    els.results.batterySize.textContent = fmt.battery.format(results.batterySize);
                } else {
                    els.results.battery.classList.add('hidden');
                }
                
                els.results.totalCost.textContent = fmt.euro.format(results.totalCost);
                els.results.annualSavings.textContent = fmt.euro.format(results.annualSavings);
                els.results.totalSavings.textContent = fmt.euro.format(results.totalSavings);
                
                // Handle different formats for amortization year
                els.results.paybackTime.textContent = results.amortizationYear;
                
                // Neue Werte anzeigen
                document.getElementById('total-return-rate').textContent = fmt.energy.format(results.totalReturnRate);
                // Kapitalrendite (ROI) wurde entfernt
                document.getElementById('electricity-production-cost').textContent = fmt.battery.format(results.electricityProductionCost);
                document.getElementById('annual-production').textContent = Math.round(results.annualProduction).toLocaleString('de-DE');
                
                // Update chart
                const ctx = $('savings-chart').getContext('2d');
                if(chart) chart.destroy();
                
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: results.yearlyData.map(d => d.year),
                        datasets: [
                            {
                                label: 'Kumulierte Ersparnis',
                                data: results.yearlyData.map((d, i) => {
                                    const cumulative = results.yearlyData
                                        .slice(0, i + 1)
                                        .reduce((sum, yd) => sum + yd.yearlyBenefit, 0) - results.totalCost;
                                    return cumulative;
                                }),
                                backgroundColor: ctx => {
                                    const value = ctx.raw;
                                    return value < 0 ? '#cfd1cf' : '#04b329'; // farben
                                },
                                stack: 'savings',
                            }
                        ]
                    },
                    options: {
                        animation: {
                            duration: 1000,
                            easing: 'easeOutQuart'
                        },
                        responsive: true,
                        maintainAspectRatio: false, // Allow chart to determine its own aspect ratio
                        layout: {
                            padding: {
                                top: 10,
                                bottom: 10,
                                left: -20, // Apply negative padding to shift chart area left
                                right: 0
                            }
                        },
                        plugins: {
                            // Title removed as requested
                            legend: {
                                position: 'top',
                                labels: {
                                    font: {size: 14, color: '#000000'}, // Black text
                                    padding: 10,
                                    boxWidth: 5,
                                    usePointStyle: true,
                                    pointStyle: 'rect',
                                    generateLabels: function(chart) {
                                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                        const labels = original.call(this, chart);
                                        return labels.map(label => {
                                            return {
                                                ...label,
                                                fillStyle: '#4CAF50' // Green background
                                            };
                                        });
                                    }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => {
                                        const year = context.dataIndex + 1;
                                        const data = results.yearlyData[context.dataIndex];
                                        const netPosition = context.raw;
                                        
                                        let lines = [
                                            \`Jahr ${year}: ${fmt.euro.format(netPosition)} €\`,
                                            \`Stromkostenersparnis: ${fmt.euro.format(data.savingsFromSelfConsumption)} €\`,
                                            \`Einspeisevergütung: ${fmt.euro.format(data.feedInIncome)} €\`,
                                            \`Gesamtersparnis dieses Jahr: ${fmt.euro.format(data.yearlyBenefit)} €\`,
                                            year === 1 ? \`Anfangsinvestition: ${fmt.euro.format(results.totalCost)} €\` : ''
                                        ].filter(Boolean);
                                        
                                        return lines;
                                    }
                                }
                            },
                            zoom: {
                                pan: { enabled: true, mode: 'xy' },
                                zoom: {
                                    wheel: { enabled: true },
                                    pinch: { enabled: true },
                                    mode: 'xy'
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {display: true, text: 'Jahr'},
                                stacked: true, // Enable stacking on X-axis
                                ticks: {font: {size: 12}, autoSkip: true} // Ensure all year labels are shown
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: '',
                                    color: '#4CAF50',
                                    font: {weight: 'normal'}
                                },
                                stacked: false, // Enable stacking on Y-axis
                                ticks: {
                                    // Format labels in thousands of Euros (k €)
                                    callback: value => {
                                        if (value === 0) return '0 €';
                                        const thousands = value / 1000;
                                        // Use a simple number format for thousands, no decimals needed here
                                        return \`${thousands.toLocaleString('de-DE', { maximumFractionDigits: 0 })}k €\`; // Restored space before €
                                    },
                                    font: {size: 12}, // Restore original font size for Y-axis labels
                                    padding: 0 // Reduce padding between axis line and labels
                                }
                            }
                        }
                    }
                });
            };
            
            // Battery info modal handlers
            const batteryInfoBtn = document.getElementById('battery-info-btn');
            const batteryInfoModal = document.getElementById('battery-info-modal');
            const closeBatteryInfo = document.getElementById('close-battery-info');
            
            if (batteryInfoBtn && batteryInfoModal && closeBatteryInfo) {
                batteryInfoBtn.onclick = function() {
                    batteryInfoModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                };
                
                closeBatteryInfo.onclick = function() {
                    batteryInfoModal.classList.add('hidden');
                    document.body.style.overflow = '';
                };
                
                batteryInfoModal.onclick = function(e) {
                    if (e.target === this) {
                        this.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                };
            }
            
            // Electricity price info modal handlers
            const electricityPriceInfoBtn = document.getElementById('electricity-price-info-btn');
            const electricityPriceInfoModal = document.getElementById('electricity-price-info-modal');
            const closeElectricityPriceInfo = document.getElementById('close-electricity-price-info');
            
            if (electricityPriceInfoBtn && electricityPriceInfoModal && closeElectricityPriceInfo) {
                electricityPriceInfoBtn.onclick = function() {
                    electricityPriceInfoModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                };
                
                closeElectricityPriceInfo.onclick = function() {
                    electricityPriceInfoModal.classList.add('hidden');
                    document.body.style.overflow = '';
                };
                
                electricityPriceInfoModal.onclick = function(e) {
                    if (e.target === this) {
                        this.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                };
            }
            
            // Price increase info modal handlers
            const priceIncreaseInfoBtn = document.getElementById('price-increase-info-btn');
            const priceIncreaseInfoModal = document.getElementById('price-increase-info-modal');
            const closePriceIncreaseInfo = document.getElementById('close-price-increase-info');
            
            if (priceIncreaseInfoBtn && priceIncreaseInfoModal && closePriceIncreaseInfo) {
                priceIncreaseInfoBtn.onclick = function() {
                    priceIncreaseInfoModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                };
                
                closePriceIncreaseInfo.onclick = function() {
                    priceIncreaseInfoModal.classList.add('hidden');
                    document.body.style.overflow = '';
                };
                
                priceIncreaseInfoModal.onclick = function(e) {
                    if (e.target === this) {
                        this.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                };
            }

            // Funktionen für Berechnungserklärungen
            // Update Calculation Explanations mit aktuellen Berechnungswerten
            function updateCalculationExplanations(results) {
                // PV-Leistung Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE PV-LEISTUNG BERECHNUNG ANPASSEN
                document.getElementById('pv-calc-consumption').textContent = results.consumption.toLocaleString('de-DE');
                document.getElementById('pv-calc-result').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                
                // Anzahl Module Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE MODULANZAHL BERECHNUNG ANPASSEN
                document.getElementById('module-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('module-calc-result').textContent = results.moduleCount;
                
                // Batteriespeicher Erklärung (nur wenn Batterie gewählt)
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE BATTERIESPEICHER BERECHNUNG ANPASSEN
                if (document.getElementById('battery-storage').checked) {
                    document.getElementById('battery-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                    document.getElementById('battery-calc-result').textContent = results.batterySize.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                }
                
                // Ihr Gesamtpreis
                //  Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE Ihr Gesamtpreis
                // BERECHNUNG ANPASSEN
                document.getElementById('cost-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('cost-calc-battery').textContent = results.batterySize.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                document.getElementById('cost-calc-result').textContent = results.totalCost.toLocaleString('de-DE');
                
                // Ersparnis Jahr 1 Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE ERSPARNIS JAHR 1 BERECHNUNG ANPASSEN
                const annualProduction = results.pvPower * 950;
                const selfConsumptionRate = document.getElementById('battery-storage').checked ? 65 : 32;
                const electricityPrice = parseFloat(document.getElementById('electricity-price-slider').value);
                
                document.getElementById('savings1-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('savings1-calc-production').textContent = annualProduction.toLocaleString('de-DE');
                document.getElementById('savings1-calc-selfuse').textContent = selfConsumptionRate;
                document.getElementById('savings1-calc-selfconsumption').textContent = (annualProduction * selfConsumptionRate / 100).toLocaleString('de-DE');
                document.getElementById('savings1-calc-price').textContent = electricityPrice.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                document.getElementById('savings1-calc-result').textContent = results.annualSavings.toLocaleString('de-DE');
                
                // Ersparnis über 30 Jahre Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE ERSPARNIS ÜBER 30 JAHRE BERECHNUNG ANPASSEN
                const priceIncrease = parseFloat(document.getElementById('price-increase-slider').value);
                document.getElementById('savings-total-calc-increase').textContent = priceIncrease.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('savings-total-calc-year1').textContent = results.annualSavings.toLocaleString('de-DE');
                document.getElementById('savings-total-calc-result').textContent = results.totalSavings.toLocaleString('de-DE');
                
                // Amortisationszeit Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE AMORTISATIONSZEIT BERECHNUNG ANPASSEN
                document.getElementById('amortization-calc-investment').textContent = results.totalCost.toLocaleString('de-DE');
                document.getElementById('amortization-calc-savings').textContent = results.annualSavings.toLocaleString('de-DE');
                document.getElementById('amortization-calc-increase').textContent = priceIncrease.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('amortization-calc-result').textContent = results.amortizationYear.toString();
                
                // Gesamtrendite Erklärung
                document.getElementById('total-return-calc-savings').textContent = results.totalSavings.toLocaleString('de-DE');
                document.getElementById('total-return-calc-investment').textContent = results.totalCost.toLocaleString('de-DE');
                document.getElementById('total-return-calc-result').textContent = results.totalReturnRate.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                
                // Kapitalrendite (ROI) Erklärung wurde entfernt
                
                // Stromgestehungskosten Erklärung
                const totalProduction = 30 * 950 * results.pvPower;
                document.getElementById('production-cost-calc-investment').textContent = results.totalCost.toLocaleString('de-DE');
                document.getElementById('production-cost-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('production-cost-calc-production').textContent = (950 * results.pvPower).toLocaleString('de-DE');
                document.getElementById('production-cost-calc-total-production').textContent = totalProduction.toLocaleString('de-DE');
                document.getElementById('production-cost-calc-result').textContent = results.electricityProductionCost.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                
                // Jährliche Produktion Erklärung
                document.getElementById('production-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('production-calc-result').textContent = results.annualProduction.toLocaleString('de-DE');
            }

            // Initialisierung der Modal-Funktionalität
            function initCalculationModals() {
                console.log("Initializing calculation modals..."); // Debug-Ausgabe
                
                // Event-Handler für alle Berechnung-Buttons
                const calculationButtons = document.querySelectorAll('.calculation-btn');
                console.log("Found " + calculationButtons.length + " calculation buttons"); // Debug-Ausgabe
                
                calculationButtons.forEach(btn => {
                    console.log("Button target: " + btn.dataset.target); // Debug-Ausgabe
                    btn.addEventListener('click', function(e) {
                        e.preventDefault(); // Verhindere Standard-Button-Verhalten
                        const targetModal = document.getElementById(this.dataset.target);
                        console.log("Clicked button for modal: " + this.dataset.target); // Debug-Ausgabe
                        
                        if (targetModal) {
                            console.log("Found target modal, showing it"); // Debug-Ausgabe
                            targetModal.classList.remove('hidden');
                            document.body.style.overflow = 'hidden';
                        } else {
                            console.log("Target modal not found: " + this.dataset.target); // Debug-Ausgabe
                        }
                    });
                });
                
                // Event-Handler für Modal-Schließen-Buttons
                const closeButtons = document.querySelectorAll('.close-modal');
                console.log("Found " + closeButtons.length + " close buttons"); // Debug-Ausgabe
                
                closeButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault(); // Verhindere Standard-Button-Verhalten
                        // Finde das übergeordnete Modal des Schließen-Buttons
                        const modal = this.closest('[id$="-calculation-modal"]');
                        console.log("Clicked close button, modal found: " + (modal !== null)); // Debug-Ausgabe
                        
                        if (modal) {
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    });
                });
                
                // Schließen des Modals durch Klick auf Hintergrund
                const modals = document.querySelectorAll('[id$="-calculation-modal"]');
                console.log("Found " + modals.length + " modals for background click"); // Debug-Ausgabe
                
                modals.forEach(modal => {
                    modal.addEventListener('click', function(e) {
                        if (e.target === this) {
                            console.log("Background click detected on modal: " + this.id); // Debug-Ausgabe
                            this.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    });
                });
            }

            // Direkter Ansatz: Füge einen Event-Listener zum Formular hinzu, der nach der Berechnung ausgeführt wird
            els.form.addEventListener('submit', function(e) {
                // Warte kurz, bis die Berechnung abgeschlossen ist
                setTimeout(function() {
                    // Hole die Ergebnisse direkt aus den DOM-Elementen
                    const results = {
                        pvPower: parseFloat(els.results.pvPower.textContent.replace(',', '.')),
                        moduleCount: parseInt(els.results.moduleCount.textContent),
                        batterySize: parseFloat(els.results.batterySize.textContent.replace(',', '.')),
                        totalCost: parseInt(els.results.totalCost.textContent.replace('.', '').replace(' €', '')),
                        annualSavings: parseInt(els.results.annualSavings.textContent.replace('.', '').replace(' €', '')),
                        totalSavings: parseInt(els.results.totalSavings.textContent.replace('.', '').replace(' €', '')),
                        amortizationYear: els.results.paybackTime.textContent,
                        consumption: els.consumption.input.value ? parseFloat(els.consumption.input.value) :
                            (parseInt(els.household.size.value) || 2) * 1000 +
                            (els.features.heatPump.checked ? 3500 : 0) +
                            (els.features.electricCar.checked ? 3000 : 0),
                        // Fehlende Werte für die Modals hinzufügen
                        totalReturnRate: parseFloat(document.getElementById('total-return-rate').textContent.replace(',', '.')),
                        electricityProductionCost: parseFloat(document.getElementById('electricity-production-cost').textContent.replace(',', '.')),
                        annualProduction: parseInt(document.getElementById('annual-production').textContent.replace('.', ''))
                    };
                    
                    // Aktualisiere die Berechnungserklärungen
                    updateCalculationExplanations(results);
                    
                    // Initialisiere die Modal-Funktionalität
                    initCalculationModals();
                    validateModalsAndButtons();
                }, 500);
            }, { passive: true });
            
            // Sofort die Modal-Funktionalität initialisieren, unabhängig von der Berechnung
            // Dies stellt sicher, dass die Buttons funktionieren, auch wenn keine Berechnung durchgeführt wurde
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                    console.log("Initializing modals immediately...");
                    initCalculationModals();
                    validateModalsAndButtons();
                    
                    // Direkter Event-Listener für alle Berechnung-Buttons
                    document.querySelectorAll('.calculation-btn').forEach(function(btn) {
                        // Entferne alle bestehenden Event-Listener
                        const clone = btn.cloneNode(true);
                        btn.parentNode.replaceChild(clone, btn);
                        
                        // Füge neuen Event-Listener hinzu
                        clone.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const targetId = this.dataset.target;
                            const targetModal = document.getElementById(targetId);
                            console.log("Direct click on button for modal: " + targetId);
                            if (targetModal) {
                                targetModal.classList.remove('hidden');
                                document.body.style.overflow = 'hidden';
                            }
                        });
                    });
                    
                    // Direkter Event-Listener für alle Schließen-Buttons
                    document.querySelectorAll('.close-modal').forEach(function(btn) {
                        // Entferne alle bestehenden Event-Listener
                        const clone = btn.cloneNode(true);
                        btn.parentNode.replaceChild(clone, btn);
                        
                        // Füge neuen Event-Listener hinzu
                        clone.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const modal = this.closest('[id$="-calculation-modal"]');
                            if (modal) {
                                modal.classList.add('hidden');
                                document.body.style.overflow = '';
                            }
                        });
                    });
                    
                    // Direkter Event-Listener für Hintergrund-Klicks
                    document.querySelectorAll('[id$="-calculation-modal"]').forEach(function(modal) {
                        // Entferne alle bestehenden Event-Listener
                        const clone = modal.cloneNode(true);
                        modal.parentNode.replaceChild(clone, modal);
                        
                        // Füge neuen Event-Listener hinzu
                        clone.addEventListener('click', function(e) {
                            if (e.target === this) {
                                this.classList.add('hidden');
                                document.body.style.overflow = '';
                            }
                        });
                        
                        // Füge Event-Listener für Schließen-Buttons im geklonten Modal hinzu
                        clone.querySelectorAll('.close-modal').forEach(function(btn) {
                            btn.addEventListener('click', function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                clone.classList.add('hidden');
                                document.body.style.overflow = '';
                            });
                        });
                    });
                }, 100);
            });

            // Vereinfachte Funktion zum Initialisieren der Modals und Buttons
            function validateModalsAndButtons() {
                console.log("Setting up direct event handlers for modals and buttons...");
                
                // Direkte Event-Handler für alle Berechnung-Buttons
                document.querySelectorAll('.calculation-btn').forEach(btn => {
                    const targetId = btn.dataset.target;
                    const targetModal = document.getElementById(targetId);
                    
                    // Entferne bestehende Event-Listener
                    btn.removeEventListener('click', btn.clickHandler);
                    
                    // Definiere neuen Event-Handler
                    btn.clickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Button clicked: " + targetId);
                        if (targetModal) {
                            targetModal.classList.remove('hidden');
                            document.body.style.overflow = 'hidden';
                        } else {
                            console.error("Target modal not found: " + targetId);
                        }
                    };
                    
                    // Füge Event-Handler hinzu
                    btn.addEventListener('click', btn.clickHandler);
                });
                
                // Direkte Event-Handler für alle Schließen-Buttons
                document.querySelectorAll('.close-modal').forEach(btn => {
                    // Entferne bestehende Event-Listener
                    btn.removeEventListener('click', btn.clickHandler);
                    
                    // Definiere neuen Event-Handler
                    btn.clickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = this.closest('[id$="-calculation-modal"]');
                        if (modal) {
                            console.log("Closing modal: " + modal.id);
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    };
                    
                    // Füge Event-Handler hinzu
                    btn.addEventListener('click', btn.clickHandler);
                });
                
                // Direkte Event-Handler für Hintergrund-Klicks
                document.querySelectorAll('[id$="-calculation-modal"]').forEach(modal => {
                    // Entferne bestehende Event-Listener
                    modal.removeEventListener('click', modal.clickHandler);
                    
                    // Definiere neuen Event-Handler
                    modal.clickHandler = function(e) {
                        if (e.target === this) {
                            console.log("Background click on modal: " + this.id);
                            this.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    };
                    
                    // Füge Event-Handler hinzu
                    modal.addEventListener('click', modal.clickHandler);
                });
            }

            // Initialize
            els.household.buttons[0].click();
            updateConsumptionEstimate();
            
            // Verzögerung hinzufügen, um sicherzustellen, dass alle DOM-Elemente geladen sind
            setTimeout(function() {
                initCalculationModals(); // Initialisiere die Berechnungsmodals
                console.log("Calculation modals initialized"); // Debug-Ausgabe
                
                // Validiere Modals und Buttons und füge direkte Event-Listener hinzu
                validateModalsAndButtons();
            }, 500);
        });
    </script>
<!-- Modals für Berechnungserklärungen -->
<!-- PV-Leistung Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="pv-power-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Empfohlene PV-Leistung</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<!-- HIER KÖNNEN SIE DEN TEXT FÜR DIE PV-LEISTUNG BERECHNUNG ANPASSEN -->
<p class="mb-4">Die empfohlene PV-Leistung wird berechnet aus:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">PV-Leistung = MAX(4, Stromverbrauch × 1,2 ÷ 1000)</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>Stromverbrauch: <span id="pv-calc-consumption">0</span> kWh/Jahr</li>
<li>Faktor: 1,2 (für optimale Anlagengröße)</li>
<li>Umrechnung von Jahresverbrauch in Kilowatt: ÷ 1000</li>
<li>Mindestgröße: 4 kWp</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="pv-calc-result">0,0</span> kWp</p>
</div>
<p class="text-sm italic">Hinweis: Die Empfehlung basiert auf Ihrem angegebenen Stromverbrauch und stellt sicher, dass die Anlage ausreichend dimensioniert ist.</p>
</div>
</div>
</div>
<!-- Anzahl Module Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="module-count-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Anzahl Module</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<!-- HIER KÖNNEN SIE DEN TEXT FÜR DIE MODULANZAHL BERECHNUNG ANPASSEN -->
<p class="mb-4">Die Anzahl der benötigten PV-Module wird berechnet aus:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">Anzahl Module = AUFRUNDEN(PV-Leistung × 1000 ÷ Modulleistung)</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>PV-Leistung: <span id="module-calc-power">0,0</span> kWp</li>
<li>Umrechnung von kW in W: × 1000</li>
<li>Modulleistung: 460 W (Standard-Modulleistung)</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="module-calc-result">0</span> Module</p>
</div>
<p class="text-sm italic">Hinweis: Die Berechnung wird aufgerundet, um sicherzustellen, dass die gewünschte Gesamtleistung erreicht wird.</p>
</div>
</div>
</div>
<!-- Batteriespeicher Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="battery-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Batteriespeicher</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<!-- HIER KÖNNEN SIE DEN TEXT FÜR DIE BATTERIESPEICHER BERECHNUNG ANPASSEN -->
<p class="mb-4">Die empfohlene Batteriespeichergröße wird berechnet aus:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">Batteriespeicher = MAX(5, PV-Leistung × 1,2)</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>PV-Leistung: <span id="battery-calc-power">0,0</span> kWp</li>
<li>Faktor: 1,2 (für optimale Speicherkapazität)</li>
<li>Mindestgröße: 5 kWh</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="battery-calc-result">0,00</span> kWh</p>
</div>
<p class="text-sm italic">Hinweis: Die empfohlene Batteriegröße beträgt 120% der PV-Leistung, um einen optimalen Eigenverbrauch zu gewährleisten, mindestens jedoch 5 kWh.</p>
</div>
</div>
</div>
<!-- Ihr Gesamtpreis Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="total-cost-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Ihr Gesamtpreis</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<p class="mb-4 font-semibold">So berechnen sich der Gesamtpreis Ihrer Solaranlage:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-semibold mb-2">1. Solaranlage</p>
<ul class="list-disc pl-5 space-y-1">
<li><strong>Grundpreis: 5.000 €</strong> – für Planung, Anschluss, Wechselrichter, Montagematerial und Installation</li>
<li><strong>+ 1.000 € pro kWp Leistung</strong> – für Solarmodule und deren Montage</li>
<li>Ihre Anlage: <span id="cost-calc-power">0,0</span> kWp</li>
<li>→ Teilkosten: 5.000 € + (<span id="cost-calc-power-again">0,0</span> × 1.000 €)</li>
</ul>
</div>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-semibold mb-2">2. Stromspeicher (optional)</p>
<ul class="list-disc pl-5 space-y-1">
<li><strong>Grundpreis: 1.500 €</strong> – für Einbau, Steuerungstechnik und Systemeinbindung</li>
<li><strong>+ 350 € pro kWh Speicherkapazität</strong> – für die Batterie selbst inkl. Elektronik</li>
<li>Ihr Speicher: <span id="cost-calc-battery">0,00</span> kWh</li>
<li>→ Teilkosten: 1.500 € + (<span id="cost-calc-battery-again">0,00</span> × 350 €)</li>
</ul>
</div>
<div class="bg-gray-100 p-3 rounded mb-4">
<p class="font-semibold">Ihr Gesamtpreis:</p>
<p class="text-lg mt-1">Solaranlage + Speicher + Installation + Anmeldung = <span class="text-primary font-bold" id="cost-calc-result">0</span> €</p>
</div>
<p class="text-sm italic">Hinweis: Die Kosten setzen sich aus festen Grundpreisen und den gewählten Leistungsgrößen für Solaranlage und Speicher zusammen.</p>
</div>
</div>
<!-- Ersparnis Jahr 1 Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="savings-year1-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Ersparnis Jahr 1</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<!-- HIER KÖNNEN SIE DEN TEXT FÜR DIE ERSPARNIS JAHR 1 BERECHNUNG ANPASSEN -->
<p class="mb-4">Die Ersparnis im ersten Jahr wird berechnet aus:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">Ersparnis Jahr 1 = (Jahresproduktion × Eigenverbrauchsrate × Strompreis) + ((Jahresproduktion - Eigenverbrauch) × Einspeisevergütung)</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>PV-Leistung: <span id="savings1-calc-power">0,0</span> kWp</li>
<li>Jahresproduktion: <span id="savings1-calc-production">0</span> kWh (950 kWh/kWp)</li>
<li>Eigenverbrauchsrate: <span id="savings1-calc-selfuse">0</span>%</li>
<li>Eigenverbrauch: <span id="savings1-calc-selfconsumption">0</span> kWh</li>
<li>Strompreis: <span id="savings1-calc-price">0,00</span> €/kWh</li>
<li>Einspeisevergütung: 0,0794 €/kWh</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="savings1-calc-result">0</span> €</p>
</div>
<p class="text-sm italic">Hinweis: Die Ersparnis setzt sich zusammen aus vermiedenen Stromkosten durch Eigenverbrauch und Einspeiseerlösen für den nicht selbst verbrauchten Strom.</p>
</div>
</div>
</div>
<!-- Ersparnis über 30 Jahre Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="savings-total-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Ersparnis über 30 Jahre</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<!-- HIER KÖNNEN SIE DEN TEXT FÜR DIE ERSPARNIS ÜBER 30 JAHRE BERECHNUNG ANPASSEN -->
<p class="mb-4">Die Ersparnis über 30 Jahre wird berechnet als Summe der jährlichen Ersparnisse unter Berücksichtigung von:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>Jährliche Strompreissteigerung: <span id="savings-total-calc-increase">0,0</span>%</li>
<li>Ersparnis Jahr 1: <span id="savings-total-calc-year1">0</span> €</li>
<li>Betrachtungszeitraum: 30 Jahre</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="savings-total-calc-result">0</span> €</p>
</div>
<p class="text-sm italic">Hinweis: In dieser Berechnung wird die jährliche Strompreissteigerung berücksichtigt, was zu steigenden Ersparnissen in den Folgejahren führt.</p>
</div>
</div>
</div>
<!-- Amortisationszeit Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="amortization-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Amortisationszeit</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<!-- HIER KÖNNEN SIE DEN TEXT FÜR DIE AMORTISATIONSZEIT BERECHNUNG ANPASSEN -->
<p class="mb-4">Die Amortisationszeit ist der Zeitpunkt, an dem die kumulierten Ersparnisse die Investitionskosten übersteigen:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>Investitionskosten: <span id="amortization-calc-investment">0</span> €</li>
<li>Jährliche Ersparnis (Jahr 1): <span id="amortization-calc-savings">0</span> €</li>
<li>Jährliche Strompreissteigerung: <span id="amortization-calc-increase">0,0</span>%</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="amortization-calc-result">0</span> Jahre</p>
</div>
<p class="text-sm italic">Hinweis: Die Amortisationszeit ist der Punkt, an dem sich Ihre Investition vollständig durch die erzielten Ersparnisse refinanziert hat.</p>
</div>
</div>
</div>
<!-- Gesamtrendite Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="total-return-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Gesamtrendite</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<p class="mb-4">Die Gesamtrendite zeigt, wie viel Prozent Ihres investierten Kapitals Sie jährlich zurückerhalten:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">Gesamtrendite = (Gesamtersparnis ÷ Investition) ÷ 30 Jahre × 100%</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>Gesamtersparnis über 30 Jahre: <span id="total-return-calc-savings">0</span> €</li>
<li>Investitionskosten: <span id="total-return-calc-investment">0</span> €</li>
<li>Betrachtungszeitraum: 30 Jahre</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="total-return-calc-result">0,0</span> %</p>
</div>
<p class="text-sm italic">Hinweis: Diese Berechnung zeigt die durchschnittliche jährliche Rendite auf Ihr eingesetztes Kapital über die gesamte Laufzeit der PV-Anlage.</p>
</div>
</div>
</div>
<!-- Kapitalrendite (ROI) Berechnungsmodal wurde entfernt -->
<!-- Stromgestehungskosten Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="production-cost-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Stromgestehungskosten</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<p class="mb-4">Die Stromgestehungskosten zeigen, wie viel Sie pro kWh selbst erzeugten Strom bezahlen:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">Stromgestehungskosten = Investition ÷ (30 Jahre × 950 kWh/kWp × PV-Leistung)</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>Ihr Gesamtpreis: <span id="production-cost-calc-investment">0</span> €</li>
<li>PV-Leistung: <span id="production-cost-calc-power">0,0</span> kWp</li>
<li>Jährliche Produktion: <span id="production-cost-calc-production">0</span> kWh (950 kWh/kWp)</li>
<li>Betrachtungszeitraum: 30 Jahre</li>
<li>Gesamtproduktion: <span id="production-cost-calc-total-production">0</span> kWh</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="production-cost-calc-result">0,00</span> €/kWh</p>
</div>
<p class="text-sm italic">Hinweis: Diese Berechnung zeigt, wie viel eine selbst erzeugte Kilowattstunde Strom kostet. Zum Vergleich: Der aktuelle Strompreis liegt bei ca. 0,41 €/kWh.</p>
</div>
</div>
</div>
<!-- Jährliche Produktion Berechnungsmodal -->
<div class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="annual-production-calculation-modal">
<div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
<div class="flex justify-between items-start mb-4">
<h3 class="text-lg font-semibold text-primary">Berechnung: Jährliche Produktion</h3>
<button class="close-modal text-gray-500 hover:text-gray-700">
<svg class="h-6 w-6" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<div class="text-gray-700 calculation-modal-content">
<p class="mb-4">Die jährliche Stromproduktion Ihrer PV-Anlage wird berechnet aus:</p>
<div class="bg-gray-50 p-3 rounded mb-4">
<p class="font-mono">Jährliche Produktion = PV-Leistung × 950 kWh/kWp</p>
<p class="mt-2">Mit Ihren Werten:</p>
<ul class="list-disc pl-5 mt-1 space-y-1">
<li>PV-Leistung: <span id="production-calc-power">0,0</span> kWp</li>
<li>Spezifischer Ertrag: 950 kWh/kWp</li>
</ul>
<p class="mt-3 font-medium">Ergebnis: <span class="text-primary" id="production-calc-result">0</span> kWh</p>
</div>
<p class="text-sm italic">Hinweis: Der spezifische Ertrag von 950 kWh/kWp ist ein Durchschnittswert für Berlin. Die tatsächliche Produktion kann je nach Dachausrichtung (Süd, Ost, West), Dachneigung und lokalen Wetterbedingungen stark variieren. Südausrichtung mit optimaler Neigung kann bis zu 15% mehr Ertrag bringen, während Ost-West-Ausrichtungen etwa 10-15% weniger produzieren.</p>
</div>
</div>
</div>
`;

  const container = document.getElementById("rechner-container");
  if (container) {
    container.innerHTML = html;

    // Berechnungslogik aus index.html
tailwind.config={theme:{extend:{colors:{'primary':'#0C4426','secondary':'#EE3E22'}}}}

        /**
         * Main initialization function for PV calculator
         * Sets up event listeners and initial state
         */
        document.addEventListener('DOMContentLoaded', () => {
            // DOM element shortcuts
            /** @function Get element by ID */
            const $ = id => document.getElementById(id);
            /** @function Get all matching elements */
            const $$ = selector => document.querySelectorAll(selector);
            
            const els = {
                form: $('pv-form'),
                household: {
                    size: $('household-size'),
                    buttons: $$('.option-button'),
                    customContainer: $('custom-household-container'),
                    customInput: $('custom-household')
                },
                features: {
                    cards: $$('.feature-card'),
                    heatPump: $('heat-pump'),
                    electricCar: $('electric-car'),
                    battery: $('battery-storage')
                },
                consumption: {
                    input: $('power-consumption'),
                    error: $('consumption-error')
                },
                price: {
                    slider: $('electricity-price-slider'),
                    valueDisplay: $('electricity-price-value'),
                    increaseSlider: $('price-increase-slider'),
                    increaseValueDisplay: $('price-increase-value')
                },
                results: {
                    section: $('results'),
                    battery: $('battery-result'),
                    pvPower: $('pv-power'),
                    moduleCount: $('module-count'),
                    batterySize: $('battery-size'),
                    totalCost: $('total-cost'),
                    annualSavings: $('annual-savings'),
                    totalSavings: $('total-savings'),
                    paybackTime: $('payback-time'),
                    calculateBtn: $('calculate-btn')
                },
                advancedSettings: {
                    button: $('toggle-advanced-settings'),
                    container: $('advanced-settings'),
                    arrow: $('advanced-settings-arrow')
                }
            };
            
            // Chart & Formatters
            let chart = null;
            const fmt = {
                euro: new Intl.NumberFormat('de-DE', {maximumFractionDigits:0}),
                energy: new Intl.NumberFormat('de-DE', {minimumFractionDigits:1,maximumFractionDigits:1}),
                battery: new Intl.NumberFormat('de-DE', {minimumFractionDigits:2,maximumFractionDigits:2})
            };
            
            /**
             * Base electricity consumption map (kWh/year per household size)
             * @constant {Object} baseConsumptionMap
             */
            const baseConsumptionMap = {1:2000, 2:3000, 3:4000, 4:5000};
            
            /**
             * Gets base electricity consumption based on household size
             * @param {number} people - Number of people in household
             * @returns {number} Estimated base consumption in kWh/year
             */
            const getBaseConsumption = people => baseConsumptionMap[people] || 6000;
            
            /**
             * Updates the consumption estimate placeholder based on current selections
             * @function updateConsumptionEstimate
             */
            const updateConsumptionEstimate = () => {
                const people = parseInt(els.household.size.value) || 2;
                let additionalConsumption = 0;
                if(els.features.heatPump.checked) additionalConsumption += 3500;
                if(els.features.electricCar.checked) additionalConsumption += 3000;
                
                els.consumption.input.placeholder = `Schätzung: ${fmt.euro.format(getBaseConsumption(people) + additionalConsumption)} kWh`;
            };
            
            const clearPowerConsumption = () => {
                els.consumption.input.value = '';
                updateConsumptionEstimate();
            };
            
            // Event listeners
            els.household.buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    els.household.buttons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const value = this.dataset.value;
                    if(value === 'other') {
                        els.household.customContainer.classList.remove('hidden');
                        els.household.customInput.focus();
                    } else {
                        els.household.customContainer.classList.add('hidden');
                        els.household.size.value = value;
                        clearPowerConsumption();
                    }
                });
            });
            
            els.household.customInput.addEventListener('input', function() {
                if(this.value) {
                    els.household.size.value = this.value;
                    clearPowerConsumption();
                }
            });
            
            els.features.cards.forEach(card => {
                card.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const feature = this.dataset.feature;
                    const checkbox = $(feature);
                    checkbox.checked = !checkbox.checked;
                    
                    if(feature === 'heat-pump' || feature === 'electric-car') {
                        clearPowerConsumption();
                    }
                });
            });
            
            /**
             * Event handler for manual power consumption input
             * Resets the top selection fields when user enters a value manually
             */
            els.consumption.input.addEventListener('input', function() {
                if(this.value && parseFloat(this.value) > 0) {
                    // Clear error message
                    els.consumption.error.classList.add('hidden');
                    
                    // Reset household size buttons
                    els.household.buttons.forEach(b => b.classList.remove('active'));
                    els.household.customContainer.classList.add('hidden');
                    els.household.size.value = '';
                    
                    // Reset feature cards (heat pump and electric car)
                    els.features.cards.forEach(card => {
                        const feature = card.dataset.feature;
                        if(feature === 'heat-pump' || feature === 'electric-car') {
                            card.classList.remove('active');
                            $(feature).checked = false;
                        }
                    });
                }
            });
            
            els.form.addEventListener('submit', e => {
                e.preventDefault();
                
                if(els.consumption.input.value && parseFloat(els.consumption.input.value) <= 0) {
                    els.consumption.error.classList.remove('hidden');
                    return;
                }
                
                els.consumption.error.classList.add('hidden');
                
                // Loading state
                const originalText = els.results.calculateBtn.textContent;
                els.results.calculateBtn.textContent = 'Berechne...';
                els.results.calculateBtn.disabled = true;
                
                setTimeout(() => {
                    const results = calculatePV();
                    displayResults(results);
                    els.results.section.classList.remove('hidden');
                    els.results.calculateBtn.textContent = originalText;
                    els.results.calculateBtn.disabled = false;
                    els.results.section.scrollIntoView({behavior:'smooth'});
                }, 300);
            });

            // Event listener for electricity price slider
            els.price.slider.addEventListener('input', function() {
                const price = parseFloat(this.value);
                // Use German locale formatting for the price display
                els.price.valueDisplay.textContent = `${price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
            });

            // Event listener for price increase slider
            els.price.increaseSlider.addEventListener('input', function() {
                const increase = parseFloat(this.value);
                // Use German locale formatting for the percentage display
                els.price.increaseValueDisplay.textContent = `${increase.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
            });

            // Event listener for advanced settings toggle
            const toggleAdvancedSettings = document.getElementById('toggle-advanced-settings');
            const advancedSettings = document.getElementById('advanced-settings');
            const advancedSettingsArrow = document.getElementById('advanced-settings-arrow');
            
            if (toggleAdvancedSettings && advancedSettings && advancedSettingsArrow) {
                toggleAdvancedSettings.onclick = function() {
                    advancedSettings.classList.toggle('hidden');
                    advancedSettingsArrow.classList.toggle('rotate-180');
                };
            }
            
            /**
             * Main PV system calculation function
             * @function calculatePV
             * @returns {Object} Calculation results including:
             *   - pvPower: Recommended system size in kWp
             *   - moduleCount: Number of solar modules
             *   - batterySize: Recommended battery storage in kWh
             *   - totalCost: Estimated system cost in €
             *   - annualSavings: First year savings in €
             *   - totalSavings: 20-year cumulative savings in €
             *   - amortizationYear: Payback period in years
             *   - yearlyData: Array of yearly savings data
             */
            const calculatePV = () => {
                // Consumption calculation
                const people = parseInt(els.household.size.value) || 2;
                let additionalConsumption = 0;
                if(els.features.heatPump.checked) additionalConsumption += 3500;
                if(els.features.electricCar.checked) additionalConsumption += 3000;
                
                const totalConsumption = els.consumption.input.value 
                    ? parseFloat(els.consumption.input.value) 
                    : getBaseConsumption(people) + additionalConsumption;
                
                // PV power and modules
                const pvPower = Math.max(4, totalConsumption * 1.2 / 1000);
                const moduleCount = Math.ceil(pvPower * 1000 / 460);
                
                // Battery calculation
                const hasBattery = els.features.battery.checked;
                const batterySize = hasBattery ? Math.max(5, pvPower * 1.2) : 0;
                const batteryCost = hasBattery ? 1500 + (batterySize * 350) : 0;
                
                // System costs
                const pvCost = 5000 + (pvPower * 1000);
                const totalCost = pvCost + batteryCost;
                
                // Production and self-consumption
                const annualProduction = pvPower * 950;
                const selfConsumptionRate = hasBattery ? 0.65 : 0.32;
                const selfConsumption = Math.min(annualProduction * selfConsumptionRate, totalConsumption);
                const surplus = annualProduction - selfConsumption;
                
                // Yearly savings calculation
                const yearlyData = [];
                let cumulativeSavings = 0;
                let cumulativeSavingsFromSelfConsumption = 0; // Added
                let cumulativeFeedInIncome = 0; // Added
                let amortizationYear = null;
                // Use the price from the slider, converting its string value to a float
                let electricityPrice = parseFloat(els.price.slider.value);
                const feedInTariff = 0.0794;
                const calculationYears = 30; // Define calculation years
                
                for(let year = 1; year <= calculationYears; year++) { // Loop to 30
                    const savingsFromSelfConsumption = selfConsumption * electricityPrice;
                    const feedInIncome = surplus * feedInTariff;
                    const yearlyBenefit = savingsFromSelfConsumption + feedInIncome;
                    
                    cumulativeSavings += yearlyBenefit;
                    
                    // Only set amortization year if not already set
                    if(cumulativeSavings >= totalCost && amortizationYear === null) {
                        amortizationYear = year;
                    }
                    
                    yearlyData.push({
                        year,
                        electricityPrice,
                        savingsFromSelfConsumption,
                        feedInIncome,
                        yearlyBenefit,
                        cumulativeSavings,
                        cumulativeSavingsFromSelfConsumption,
                        cumulativeFeedInIncome
                    });
                    
                    // Calculate price increase factor from slider value (percentage)
                    const priceIncreaseFactor = 1 + (parseFloat(els.price.increaseSlider.value) / 100);
                    electricityPrice *= priceIncreaseFactor;
                }
                
                // If amortizationYear is still null after 20 years, estimate it
                if (amortizationYear === null) {
                    if (cumulativeSavings <= 0 || totalCost <= 0) {
                        // Edge case - no savings or no cost
                        amortizationYear = ">30";
                    } else {
                        // Calculate a rough estimate for how many more years it would take
                        // by using the average annual savings over the last few years
                        const lastYearsSavings = yearlyData.slice(-5).reduce((sum, year) => sum + year.yearlyBenefit, 0) / 5;
                        
                        if (lastYearsSavings <= 0) {
                            // If there are no savings in the last years, it will never amortize
                            amortizationYear = ">30";
                        } else {
                            // Calculate how much more savings are needed
                            const remainingCost = totalCost - cumulativeSavings;
                            // Estimate how many more years at current rate
                            const extraYears = Math.ceil(remainingCost / lastYearsSavings);
                            
                            if (extraYears > 10) {
                                amortizationYear = ">30";
                            } else {
                                amortizationYear = 20 + extraYears;
                            }
                        }
                    }
                }
                
                // Gesamtrendite berechnen (einfache Methode)
                const totalReturnRate = (cumulativeSavings / totalCost) / calculationYears * 100;
                
                // Kapitalrendite (ROI) berechnen
                const capitalROI = (cumulativeSavings - totalCost) / totalCost / calculationYears * 100;
                
                // Stromgestehungskosten berechnen
                const electricityProductionCost = totalCost / (calculationYears * 950 * pvPower);
                
                return {
                    pvPower,
                    moduleCount,
                    batterySize,
                    totalCost,
                    annualSavings: yearlyData[0].yearlyBenefit,
                    totalSavings: cumulativeSavings,
                    amortizationYear,
                    yearlyData,
                    totalReturnRate,
                    capitalROI,
                    electricityProductionCost,
                    annualProduction
                };
            };
            
            // Display results
            const displayResults = results => {
                els.results.pvPower.textContent = fmt.energy.format(results.pvPower);
                els.results.moduleCount.textContent = results.moduleCount;
                
                if(els.features.battery.checked) {
                    els.results.battery.classList.remove('hidden');
                    els.results.batterySize.textContent = fmt.battery.format(results.batterySize);
                } else {
                    els.results.battery.classList.add('hidden');
                }
                
                els.results.totalCost.textContent = fmt.euro.format(results.totalCost);
                els.results.annualSavings.textContent = fmt.euro.format(results.annualSavings);
                els.results.totalSavings.textContent = fmt.euro.format(results.totalSavings);
                
                // Handle different formats for amortization year
                els.results.paybackTime.textContent = results.amortizationYear;
                
                // Neue Werte anzeigen
                document.getElementById('total-return-rate').textContent = fmt.energy.format(results.totalReturnRate);
                // Kapitalrendite (ROI) wurde entfernt
                document.getElementById('electricity-production-cost').textContent = fmt.battery.format(results.electricityProductionCost);
                document.getElementById('annual-production').textContent = Math.round(results.annualProduction).toLocaleString('de-DE');
                
                // Update chart
                const ctx = $('savings-chart').getContext('2d');
                if(chart) chart.destroy();
                
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: results.yearlyData.map(d => d.year),
                        datasets: [
                            {
                                label: 'Kumulierte Ersparnis',
                                data: results.yearlyData.map((d, i) => {
                                    const cumulative = results.yearlyData
                                        .slice(0, i + 1)
                                        .reduce((sum, yd) => sum + yd.yearlyBenefit, 0) - results.totalCost;
                                    return cumulative;
                                }),
                                backgroundColor: ctx => {
                                    const value = ctx.raw;
                                    return value < 0 ? '#cfd1cf' : '#04b329'; // farben
                                },
                                stack: 'savings',
                            }
                        ]
                    },
                    options: {
                        animation: {
                            duration: 1000,
                            easing: 'easeOutQuart'
                        },
                        responsive: true,
                        maintainAspectRatio: false, // Allow chart to determine its own aspect ratio
                        layout: {
                            padding: {
                                top: 10,
                                bottom: 10,
                                left: -20, // Apply negative padding to shift chart area left
                                right: 0
                            }
                        },
                        plugins: {
                            // Title removed as requested
                            legend: {
                                position: 'top',
                                labels: {
                                    font: {size: 14, color: '#000000'}, // Black text
                                    padding: 10,
                                    boxWidth: 5,
                                    usePointStyle: true,
                                    pointStyle: 'rect',
                                    generateLabels: function(chart) {
                                        const original = Chart.defaults.plugins.legend.labels.generateLabels;
                                        const labels = original.call(this, chart);
                                        return labels.map(label => {
                                            return {
                                                ...label,
                                                fillStyle: '#4CAF50' // Green background
                                            };
                                        });
                                    }
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: context => {
                                        const year = context.dataIndex + 1;
                                        const data = results.yearlyData[context.dataIndex];
                                        const netPosition = context.raw;
                                        
                                        let lines = [
                                            `Jahr ${year}: ${fmt.euro.format(netPosition)} €`,
                                            `Stromkostenersparnis: ${fmt.euro.format(data.savingsFromSelfConsumption)} €`,
                                            `Einspeisevergütung: ${fmt.euro.format(data.feedInIncome)} €`,
                                            `Gesamtersparnis dieses Jahr: ${fmt.euro.format(data.yearlyBenefit)} €`,
                                            year === 1 ? `Anfangsinvestition: ${fmt.euro.format(results.totalCost)} €` : ''
                                        ].filter(Boolean);
                                        
                                        return lines;
                                    }
                                }
                            },
                            zoom: {
                                pan: { enabled: true, mode: 'xy' },
                                zoom: {
                                    wheel: { enabled: true },
                                    pinch: { enabled: true },
                                    mode: 'xy'
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {display: true, text: 'Jahr'},
                                stacked: true, // Enable stacking on X-axis
                                ticks: {font: {size: 12}, autoSkip: true} // Ensure all year labels are shown
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: '',
                                    color: '#4CAF50',
                                    font: {weight: 'normal'}
                                },
                                stacked: false, // Enable stacking on Y-axis
                                ticks: {
                                    // Format labels in thousands of Euros (k €)
                                    callback: value => {
                                        if (value === 0) return '0 €';
                                        const thousands = value / 1000;
                                        // Use a simple number format for thousands, no decimals needed here
                                        return `${thousands.toLocaleString('de-DE', { maximumFractionDigits: 0 })}k €`; // Restored space before €
                                    },
                                    font: {size: 12}, // Restore original font size for Y-axis labels
                                    padding: 0 // Reduce padding between axis line and labels
                                }
                            }
                        }
                    }
                });
            };
            
            // Battery info modal handlers
            const batteryInfoBtn = document.getElementById('battery-info-btn');
            const batteryInfoModal = document.getElementById('battery-info-modal');
            const closeBatteryInfo = document.getElementById('close-battery-info');
            
            if (batteryInfoBtn && batteryInfoModal && closeBatteryInfo) {
                batteryInfoBtn.onclick = function() {
                    batteryInfoModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                };
                
                closeBatteryInfo.onclick = function() {
                    batteryInfoModal.classList.add('hidden');
                    document.body.style.overflow = '';
                };
                
                batteryInfoModal.onclick = function(e) {
                    if (e.target === this) {
                        this.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                };
            }
            
            // Electricity price info modal handlers
            const electricityPriceInfoBtn = document.getElementById('electricity-price-info-btn');
            const electricityPriceInfoModal = document.getElementById('electricity-price-info-modal');
            const closeElectricityPriceInfo = document.getElementById('close-electricity-price-info');
            
            if (electricityPriceInfoBtn && electricityPriceInfoModal && closeElectricityPriceInfo) {
                electricityPriceInfoBtn.onclick = function() {
                    electricityPriceInfoModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                };
                
                closeElectricityPriceInfo.onclick = function() {
                    electricityPriceInfoModal.classList.add('hidden');
                    document.body.style.overflow = '';
                };
                
                electricityPriceInfoModal.onclick = function(e) {
                    if (e.target === this) {
                        this.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                };
            }
            
            // Price increase info modal handlers
            const priceIncreaseInfoBtn = document.getElementById('price-increase-info-btn');
            const priceIncreaseInfoModal = document.getElementById('price-increase-info-modal');
            const closePriceIncreaseInfo = document.getElementById('close-price-increase-info');
            
            if (priceIncreaseInfoBtn && priceIncreaseInfoModal && closePriceIncreaseInfo) {
                priceIncreaseInfoBtn.onclick = function() {
                    priceIncreaseInfoModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                };
                
                closePriceIncreaseInfo.onclick = function() {
                    priceIncreaseInfoModal.classList.add('hidden');
                    document.body.style.overflow = '';
                };
                
                priceIncreaseInfoModal.onclick = function(e) {
                    if (e.target === this) {
                        this.classList.add('hidden');
                        document.body.style.overflow = '';
                    }
                };
            }

            // Funktionen für Berechnungserklärungen
            // Update Calculation Explanations mit aktuellen Berechnungswerten
            function updateCalculationExplanations(results) {
                // PV-Leistung Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE PV-LEISTUNG BERECHNUNG ANPASSEN
                document.getElementById('pv-calc-consumption').textContent = results.consumption.toLocaleString('de-DE');
                document.getElementById('pv-calc-result').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                
                // Anzahl Module Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE MODULANZAHL BERECHNUNG ANPASSEN
                document.getElementById('module-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('module-calc-result').textContent = results.moduleCount;
                
                // Batteriespeicher Erklärung (nur wenn Batterie gewählt)
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE BATTERIESPEICHER BERECHNUNG ANPASSEN
                if (document.getElementById('battery-storage').checked) {
                    document.getElementById('battery-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                    document.getElementById('battery-calc-result').textContent = results.batterySize.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                }
                
                // Ihr Gesamtpreis
                //  Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE Ihr Gesamtpreis
                // BERECHNUNG ANPASSEN
                document.getElementById('cost-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('cost-calc-battery').textContent = results.batterySize.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                document.getElementById('cost-calc-result').textContent = results.totalCost.toLocaleString('de-DE');
                
                // Ersparnis Jahr 1 Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE ERSPARNIS JAHR 1 BERECHNUNG ANPASSEN
                const annualProduction = results.pvPower * 950;
                const selfConsumptionRate = document.getElementById('battery-storage').checked ? 65 : 32;
                const electricityPrice = parseFloat(document.getElementById('electricity-price-slider').value);
                
                document.getElementById('savings1-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('savings1-calc-production').textContent = annualProduction.toLocaleString('de-DE');
                document.getElementById('savings1-calc-selfuse').textContent = selfConsumptionRate;
                document.getElementById('savings1-calc-selfconsumption').textContent = (annualProduction * selfConsumptionRate / 100).toLocaleString('de-DE');
                document.getElementById('savings1-calc-price').textContent = electricityPrice.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                document.getElementById('savings1-calc-result').textContent = results.annualSavings.toLocaleString('de-DE');
                
                // Ersparnis über 30 Jahre Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE ERSPARNIS ÜBER 30 JAHRE BERECHNUNG ANPASSEN
                const priceIncrease = parseFloat(document.getElementById('price-increase-slider').value);
                document.getElementById('savings-total-calc-increase').textContent = priceIncrease.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('savings-total-calc-year1').textContent = results.annualSavings.toLocaleString('de-DE');
                document.getElementById('savings-total-calc-result').textContent = results.totalSavings.toLocaleString('de-DE');
                
                // Amortisationszeit Erklärung
                // HIER KÖNNEN SIE DIE TEXTE FÜR DIE AMORTISATIONSZEIT BERECHNUNG ANPASSEN
                document.getElementById('amortization-calc-investment').textContent = results.totalCost.toLocaleString('de-DE');
                document.getElementById('amortization-calc-savings').textContent = results.annualSavings.toLocaleString('de-DE');
                document.getElementById('amortization-calc-increase').textContent = priceIncrease.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('amortization-calc-result').textContent = results.amortizationYear.toString();
                
                // Gesamtrendite Erklärung
                document.getElementById('total-return-calc-savings').textContent = results.totalSavings.toLocaleString('de-DE');
                document.getElementById('total-return-calc-investment').textContent = results.totalCost.toLocaleString('de-DE');
                document.getElementById('total-return-calc-result').textContent = results.totalReturnRate.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                
                // Kapitalrendite (ROI) Erklärung wurde entfernt
                
                // Stromgestehungskosten Erklärung
                const totalProduction = 30 * 950 * results.pvPower;
                document.getElementById('production-cost-calc-investment').textContent = results.totalCost.toLocaleString('de-DE');
                document.getElementById('production-cost-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('production-cost-calc-production').textContent = (950 * results.pvPower).toLocaleString('de-DE');
                document.getElementById('production-cost-calc-total-production').textContent = totalProduction.toLocaleString('de-DE');
                document.getElementById('production-cost-calc-result').textContent = results.electricityProductionCost.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                
                // Jährliche Produktion Erklärung
                document.getElementById('production-calc-power').textContent = results.pvPower.toLocaleString('de-DE', {minimumFractionDigits: 1, maximumFractionDigits: 1});
                document.getElementById('production-calc-result').textContent = results.annualProduction.toLocaleString('de-DE');
            }

            // Initialisierung der Modal-Funktionalität
            function initCalculationModals() {
                console.log("Initializing calculation modals..."); // Debug-Ausgabe
                
                // Event-Handler für alle Berechnung-Buttons
                const calculationButtons = document.querySelectorAll('.calculation-btn');
                console.log("Found " + calculationButtons.length + " calculation buttons"); // Debug-Ausgabe
                
                calculationButtons.forEach(btn => {
                    console.log("Button target: " + btn.dataset.target); // Debug-Ausgabe
                    btn.addEventListener('click', function(e) {
                        e.preventDefault(); // Verhindere Standard-Button-Verhalten
                        const targetModal = document.getElementById(this.dataset.target);
                        console.log("Clicked button for modal: " + this.dataset.target); // Debug-Ausgabe
                        
                        if (targetModal) {
                            console.log("Found target modal, showing it"); // Debug-Ausgabe
                            targetModal.classList.remove('hidden');
                            document.body.style.overflow = 'hidden';
                        } else {
                            console.log("Target modal not found: " + this.dataset.target); // Debug-Ausgabe
                        }
                    });
                });
                
                // Event-Handler für Modal-Schließen-Buttons
                const closeButtons = document.querySelectorAll('.close-modal');
                console.log("Found " + closeButtons.length + " close buttons"); // Debug-Ausgabe
                
                closeButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault(); // Verhindere Standard-Button-Verhalten
                        // Finde das übergeordnete Modal des Schließen-Buttons
                        const modal = this.closest('[id$="-calculation-modal"]');
                        console.log("Clicked close button, modal found: " + (modal !== null)); // Debug-Ausgabe
                        
                        if (modal) {
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    });
                });
                
                // Schließen des Modals durch Klick auf Hintergrund
                const modals = document.querySelectorAll('[id$="-calculation-modal"]');
                console.log("Found " + modals.length + " modals for background click"); // Debug-Ausgabe
                
                modals.forEach(modal => {
                    modal.addEventListener('click', function(e) {
                        if (e.target === this) {
                            console.log("Background click detected on modal: " + this.id); // Debug-Ausgabe
                            this.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    });
                });
            }

            // Direkter Ansatz: Füge einen Event-Listener zum Formular hinzu, der nach der Berechnung ausgeführt wird
            els.form.addEventListener('submit', function(e) {
                // Warte kurz, bis die Berechnung abgeschlossen ist
                setTimeout(function() {
                    // Hole die Ergebnisse direkt aus den DOM-Elementen
                    const results = {
                        pvPower: parseFloat(els.results.pvPower.textContent.replace(',', '.')),
                        moduleCount: parseInt(els.results.moduleCount.textContent),
                        batterySize: parseFloat(els.results.batterySize.textContent.replace(',', '.')),
                        totalCost: parseInt(els.results.totalCost.textContent.replace('.', '').replace(' €', '')),
                        annualSavings: parseInt(els.results.annualSavings.textContent.replace('.', '').replace(' €', '')),
                        totalSavings: parseInt(els.results.totalSavings.textContent.replace('.', '').replace(' €', '')),
                        amortizationYear: els.results.paybackTime.textContent,
                        consumption: els.consumption.input.value ? parseFloat(els.consumption.input.value) :
                            (parseInt(els.household.size.value) || 2) * 1000 +
                            (els.features.heatPump.checked ? 3500 : 0) +
                            (els.features.electricCar.checked ? 3000 : 0),
                        // Fehlende Werte für die Modals hinzufügen
                        totalReturnRate: parseFloat(document.getElementById('total-return-rate').textContent.replace(',', '.')),
                        electricityProductionCost: parseFloat(document.getElementById('electricity-production-cost').textContent.replace(',', '.')),
                        annualProduction: parseInt(document.getElementById('annual-production').textContent.replace('.', ''))
                    };
                    
                    // Aktualisiere die Berechnungserklärungen
                    updateCalculationExplanations(results);
                    
                    // Initialisiere die Modal-Funktionalität
                    initCalculationModals();
                    validateModalsAndButtons();
                }, 500);
            }, { passive: true });
            
            // Sofort die Modal-Funktionalität initialisieren, unabhängig von der Berechnung
            // Dies stellt sicher, dass die Buttons funktionieren, auch wenn keine Berechnung durchgeführt wurde
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                    console.log("Initializing modals immediately...");
                    initCalculationModals();
                    validateModalsAndButtons();
                    
                    // Direkter Event-Listener für alle Berechnung-Buttons
                    document.querySelectorAll('.calculation-btn').forEach(function(btn) {
                        // Entferne alle bestehenden Event-Listener
                        const clone = btn.cloneNode(true);
                        btn.parentNode.replaceChild(clone, btn);
                        
                        // Füge neuen Event-Listener hinzu
                        clone.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const targetId = this.dataset.target;
                            const targetModal = document.getElementById(targetId);
                            console.log("Direct click on button for modal: " + targetId);
                            if (targetModal) {
                                targetModal.classList.remove('hidden');
                                document.body.style.overflow = 'hidden';
                            }
                        });
                    });
                    
                    // Direkter Event-Listener für alle Schließen-Buttons
                    document.querySelectorAll('.close-modal').forEach(function(btn) {
                        // Entferne alle bestehenden Event-Listener
                        const clone = btn.cloneNode(true);
                        btn.parentNode.replaceChild(clone, btn);
                        
                        // Füge neuen Event-Listener hinzu
                        clone.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const modal = this.closest('[id$="-calculation-modal"]');
                            if (modal) {
                                modal.classList.add('hidden');
                                document.body.style.overflow = '';
                            }
                        });
                    });
                    
                    // Direkter Event-Listener für Hintergrund-Klicks
                    document.querySelectorAll('[id$="-calculation-modal"]').forEach(function(modal) {
                        // Entferne alle bestehenden Event-Listener
                        const clone = modal.cloneNode(true);
                        modal.parentNode.replaceChild(clone, modal);
                        
                        // Füge neuen Event-Listener hinzu
                        clone.addEventListener('click', function(e) {
                            if (e.target === this) {
                                this.classList.add('hidden');
                                document.body.style.overflow = '';
                            }
                        });
                        
                        // Füge Event-Listener für Schließen-Buttons im geklonten Modal hinzu
                        clone.querySelectorAll('.close-modal').forEach(function(btn) {
                            btn.addEventListener('click', function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                clone.classList.add('hidden');
                                document.body.style.overflow = '';
                            });
                        });
                    });
                }, 100);
            });

            // Vereinfachte Funktion zum Initialisieren der Modals und Buttons
            function validateModalsAndButtons() {
                console.log("Setting up direct event handlers for modals and buttons...");
                
                // Direkte Event-Handler für alle Berechnung-Buttons
                document.querySelectorAll('.calculation-btn').forEach(btn => {
                    const targetId = btn.dataset.target;
                    const targetModal = document.getElementById(targetId);
                    
                    // Entferne bestehende Event-Listener
                    btn.removeEventListener('click', btn.clickHandler);
                    
                    // Definiere neuen Event-Handler
                    btn.clickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Button clicked: " + targetId);
                        if (targetModal) {
                            targetModal.classList.remove('hidden');
                            document.body.style.overflow = 'hidden';
                        } else {
                            console.error("Target modal not found: " + targetId);
                        }
                    };
                    
                    // Füge Event-Handler hinzu
                    btn.addEventListener('click', btn.clickHandler);
                });
                
                // Direkte Event-Handler für alle Schließen-Buttons
                document.querySelectorAll('.close-modal').forEach(btn => {
                    // Entferne bestehende Event-Listener
                    btn.removeEventListener('click', btn.clickHandler);
                    
                    // Definiere neuen Event-Handler
                    btn.clickHandler = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const modal = this.closest('[id$="-calculation-modal"]');
                        if (modal) {
                            console.log("Closing modal: " + modal.id);
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    };
                    
                    // Füge Event-Handler hinzu
                    btn.addEventListener('click', btn.clickHandler);
                });
                
                // Direkte Event-Handler für Hintergrund-Klicks
                document.querySelectorAll('[id$="-calculation-modal"]').forEach(modal => {
                    // Entferne bestehende Event-Listener
                    modal.removeEventListener('click', modal.clickHandler);
                    
                    // Definiere neuen Event-Handler
                    modal.clickHandler = function(e) {
                        if (e.target === this) {
                            console.log("Background click on modal: " + this.id);
                            this.classList.add('hidden');
                            document.body.style.overflow = '';
                        }
                    };
                    
                    // Füge Event-Handler hinzu
                    modal.addEventListener('click', modal.clickHandler);
                });
            }

            // Initialize
            els.household.buttons[0].click();
            updateConsumptionEstimate();
            
            // Verzögerung hinzufügen, um sicherzustellen, dass alle DOM-Elemente geladen sind
            setTimeout(function() {
                initCalculationModals(); // Initialisiere die Berechnungsmodals
                console.log("Calculation modals initialized"); // Debug-Ausgabe
                
                // Validiere Modals und Buttons und füge direkte Event-Listener hinzu
                validateModalsAndButtons();
            }, 500);
        });
    
  }
})();