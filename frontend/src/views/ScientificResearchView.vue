<script setup lang="ts">
import { computed, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { useTheme } from '@/composables/useTheme'
import FireSeverityChart from '@/components/research/FireSeverityChart.vue'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip)

interface Experiment {
  number: string
  short: string
  name: string
  score: number
  method: string
  question: string
  finding: string
  outcome: string
  selected?: boolean
}

// Notebook: Final Model Improvement Experiments — held-out test R² on log1p(target).
const experiments: Experiment[] = [
  {
    number: '01',
    short: 'Ensemble',
    name: 'Initial ensemble',
    score: 0.2302,
    method: '70% HistGradientBoosting + 30% Random Forest',
    question: 'Can two complementary tree-based regressors establish a strong reference model?',
    finding: 'The ensemble provided the reference performance for subsequent experiments.',
    outcome: 'Reference established',
  },
  {
    number: '02',
    short: 'XGBoost',
    name: 'Baseline XGBoost',
    score: 0.2356,
    method: 'Initial XGBoost regression configuration',
    question: 'Can gradient-boosted trees outperform the ensemble on the same held-out records?',
    finding: 'XGBoost modestly improved test R² from 0.2302 to 0.2356.',
    outcome: 'Small improvement',
  },
  {
    number: '03',
    short: 'Optimized',
    name: 'Optimized XGBoost',
    score: 0.2451,
    method: 'Optuna search: 150 trials using five-fold cross-validation',
    question: 'Can carefully tuned hyperparameters improve unseen-data performance?',
    finding:
      'The strongest overall log-scale test R², MAE (0.8240) and RMSE (1.0320) among the displayed configurations. Selected for the application.',
    outcome: 'Selected research model',
    selected: true,
  },
  {
    number: '04',
    short: 'Tail-aware',
    name: 'Tail-aware XGBoost',
    score: 0.2355,
    method: 'Extra training weight for rare high-severity fires',
    question: 'Does emphasizing large fires address the severe underprediction problem?',
    finding:
      'Predictions increased for some severe-fire groups, but overall log-scale test performance fell relative to optimized XGBoost.',
    outcome: 'Not retained',
  },
  {
    number: '05',
    short: 'Interactions',
    name: 'Environmental interactions',
    score: 0.237,
    method: 'Six additional temperature, humidity, wind, soil and vegetation interactions',
    question: 'Do engineered combinations of environmental variables improve generalization?',
    finding:
      'The six additional features increased the input count from 44 to 50, without improving test performance.',
    outcome: 'Not retained',
  },
  {
    number: '06',
    short: 'Top 20',
    name: 'Top-20 feature model',
    score: 0.2428,
    method: 'Selected 20 predictors instead of the original 44',
    question: 'Could a smaller, simpler feature set predict unseen fire areas more accurately?',
    finding: 'The reduced model came close but remained below the optimized 44-feature model.',
    outcome: 'Not retained',
  },
]

const selectedIndex = ref(2)
const active = computed(() => experiments[selectedIndex.value]!)
const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
const palette = computed(() => ({
  text: isDark.value ? '#e7eef8' : '#102238',
  muted: isDark.value ? '#a2b4ca' : '#62758d',
  grid: isDark.value ? 'rgba(162,180,202,.17)' : 'rgba(98,117,141,.17)',
  teal: isDark.value ? '#2dd4bf' : '#008f87',
  orange: isDark.value ? '#fb923c' : '#ea6c23',
}))

const experimentChart = computed<ChartData<'line'>>(() => ({
  labels: experiments.map((item) => item.short),
  datasets: [
    {
      label: 'Log-scale test R²',
      data: experiments.map((item) => item.score),
      borderColor: palette.value.teal,
      backgroundColor: palette.value.teal,
      borderWidth: 2.5,
      pointRadius: experiments.map((_, i) => (i === selectedIndex.value ? 9 : 5)),
      pointHoverRadius: 10,
      pointBackgroundColor: experiments.map((item, i) =>
        item.selected || i === selectedIndex.value ? palette.value.orange : palette.value.teal,
      ),
      pointBorderColor: experiments.map((_, i) =>
        i === selectedIndex.value ? palette.value.text : palette.value.teal,
      ),
      pointBorderWidth: experiments.map((_, i) => (i === selectedIndex.value ? 2 : 0)),
      tension: 0.22,
      fill: false,
    },
  ],
}))

const experimentOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 250 },
  onClick: (_event, elements) => {
    if (elements.length && elements[0]) selectedIndex.value = elements[0].index
  },
  interaction: { mode: 'nearest', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        title: (items) => experiments[items[0]?.dataIndex ?? 0]?.name ?? '',
        label: (context) => `Test R² (log scale): ${Number(context.parsed.y).toFixed(4)}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: palette.value.muted, maxRotation: 0, autoSkip: false, font: { size: 11 } },
    },
    y: {
      min: 0.2,
      max: 0.26,
      grid: { color: palette.value.grid },
      border: { display: false, dash: [4, 5] },
      ticks: { color: palette.value.muted, stepSize: 0.01, callback: (v) => Number(v).toFixed(2) },
      title: { display: true, text: 'Held-out R² · log scale', color: palette.value.muted },
    },
  },
}))
</script>

<template>
  <div class="research-page">
    <!-- Scientific editorial cover -->
    <header class="research-hero">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="eyebrow">
        <i class="pi pi-book" aria-hidden="true"></i> SCIENTIFIC RESEARCH
        <span class="eyebrow-dot">/</span> MESOGEOS · 2006–2022
      </div>

      <div class="hero-main">
        <div class="hero-copy">
          <p class="chapter-kicker">
            FIELD NOTES <span class="chapter-rule"></span> RESEARCH SERIES 01
          </p>
          <h1>Understanding the limits of <em>wildfire burned-area prediction.</em></h1>
          <p class="hero-lead">
            A visual investigation of the data, experiments and evidence behind our wildfire model —
            including why its estimates struggle with rare, extreme events.
          </p>
        </div>
        <aside class="hero-question">
          <div class="question-symbol" aria-hidden="true">
            <i class="pi pi-question-circle"></i>
          </div>
          <p class="tiny-label">THE RESEARCH QUESTION</p>
          <p class="question-text">
            How accurately can environmental and geographical observations estimate the eventual
            burned area of a wildfire?
          </p>
          <p class="question-note">
            An experimental study of predictive performance, not an operational fire forecast.
          </p>
        </aside>
      </div>

      <div class="hero-metadata" aria-label="Research dataset summary">
        <div class="metadata-item">
          <span class="metadata-value">11,303</span
          ><span class="metadata-label">Model-ready observations</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-value">44</span
          ><span class="metadata-label">Predictive features</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-value">9,042</span
          ><span class="metadata-label">Training observations</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-value">2,261</span
          ><span class="metadata-label">Held-out test observations</span>
        </div>
      </div>
    </header>

    <!-- Chapter one -->
    <section class="research-chapter" aria-labelledby="severity-title">
      <div class="chapter-header">
        <div class="chapter-index">01 <span>/</span> FINDING</div>
        <div class="chapter-intro">
          <p class="tiny-label accent-teal">THE EXTREME-FIRE PROBLEM</p>
          <h2 id="severity-title">Why the largest fires are underestimated</h2>
          <p>
            Across the held-out observations, the optimized XGBoost model's predicted burned areas
            do not rise as steeply as the observed burned areas. Grouping events by their actual
            size makes this systematic limitation visible.
          </p>
        </div>
      </div>

      <div class="research-panel">
        <div class="panel-heading">
          <div>
            <p class="tiny-label">FIGURE 01 · SEVERITY RESPONSE</p>
            <h3>Observed versus predicted burned area</h3>
          </div>
          <span class="figure-tag"
            ><i class="pi pi-chart-line" aria-hidden="true"></i> INTERACTIVE FIGURE</span
          >
        </div>
        <div class="figure-body"><FireSeverityChart /></div>
        <div class="finding-layout">
          <aside class="finding-numbers">
            <p class="tiny-label accent-orange">THE EXTREME GROUP · &gt;10,000 HA</p>
            <div class="finding-measure">
              <span>16,223 <small>ha</small></span>
              <p>Mean actual burned area</p>
            </div>
            <div class="finding-separator" aria-hidden="true"></div>
            <div class="finding-measure is-teal">
              <span>610 <small>ha</small></span>
              <p>Mean model estimate</p>
            </div>
            <p class="mini-note">
              Group averages from the optimized XGBoost experiments; rounded for display.
            </p>
          </aside>
          <article class="finding-analysis">
            <p class="tiny-label accent-teal">
              <i class="pi pi-search" aria-hidden="true"></i> SCIENTIFIC INTERPRETATION
            </p>
            <h3>Prediction error grows markedly with fire severity.</h3>
            <p>
              The smallest group (30–100 ha) is overestimated on average: its observed mean is 58.14
              ha, versus a predicted mean of 144.35 ha. For progressively larger observed fires,
              this relationship reverses and the magnitude of underprediction increases.
            </p>
            <p>
              For events exceeding 10,000 ha, the observed mean is approximately 16,223 ha, whereas
              the model predicts only 610 ha on average. This is evidence of poor extreme-fire
              magnitude estimation, not evidence that the model always underpredicts.
            </p>
            <div class="interpretation-note">
              <i class="pi pi-info-circle" aria-hidden="true"></i
              ><span
                ><strong>What we cannot conclude:</strong> these comparisons do not identify a
                proven cause. Rare severe events, skewed target values and incomplete historical
                context are plausible explanations requiring further research.</span
              >
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Chapter two: graphical experiment pathway -->
    <section class="research-chapter" aria-labelledby="experiment-title">
      <div class="chapter-header">
        <div class="chapter-index">02 <span>/</span> EXPERIMENTS</div>
        <div class="chapter-intro">
          <p class="tiny-label accent-teal">MODEL SELECTION LABORATORY</p>
          <h2 id="experiment-title">How we tested alternatives</h2>
          <p>
            Rather than assuming one algorithm would solve the problem, we tested a series of
            modelling choices. Follow the connected experiment pathway, then select any stage to
            explore its method, question and result.
          </p>
        </div>
      </div>

      <div class="research-panel experiment-panel">
        <div class="panel-heading">
          <div>
            <p class="tiny-label">FIGURE 02 · EXPERIMENT PATHWAY</p>
            <h3>Six modelling approaches, one selected result</h3>
          </div>
          <span class="figure-tag"
            ><i class="pi pi-chart-scatter" aria-hidden="true"></i> TEST R² · LOG SCALE</span
          >
        </div>
        <div class="experiment-content">
          <div class="experiment-plot">
            <div class="plot-topline">
              <span>Held-out test performance</span
              ><span>Higher R² is better · same log-target scale</span>
            </div>
            <div class="plot-canvas">
              <Line :key="theme" :data="experimentChart" :options="experimentOptions" />
            </div>
            <p class="plot-footnote">
              Points show the notebook's held-out R² scores. Connecting lines indicate experiment
              order, <strong>not</strong> a continuous improvement trend. Select a plotted point or
              stage below.
            </p>
          </div>

          <div class="pathway-label">
            <span class="tiny-label">EXPERIMENT FLOW</span
            ><span class="flow-hint"
              >SELECT A STAGE TO INVESTIGATE <i class="pi pi-arrow-right" aria-hidden="true"></i
            ></span>
          </div>
          <div class="experiment-flow" aria-label="Choose a modelling experiment">
            <button
              v-for="(item, index) in experiments"
              :key="item.number"
              type="button"
              class="flow-step"
              :class="{
                'flow-step-active': selectedIndex === index,
                'flow-step-winner': item.selected,
              }"
              :aria-pressed="selectedIndex === index"
              @click="selectedIndex = index"
            >
              <span class="flow-node"
                ><span>{{ item.number }}</span></span
              >
              <span class="flow-step-title">{{ item.short }}</span>
              <span class="flow-step-score">{{ item.score.toFixed(4) }}</span>
              <span v-if="item.selected" class="flow-selected"
                ><i class="pi pi-check-circle" aria-hidden="true"></i> SELECTED</span
              >
              <span v-else class="flow-step-status">{{ item.outcome }}</span>
            </button>
          </div>
        </div>

        <div class="experiment-detail" aria-live="polite">
          <div class="experiment-detail-header">
            <div>
              <p class="tiny-label accent-orange">EXPERIMENT {{ active.number }} / 06</p>
              <h3>{{ active.name }}</h3>
              <p class="detail-method">{{ active.method }}</p>
            </div>
            <div class="score-highlight">
              <span>TEST R² · LOG SCALE</span><strong>{{ active.score.toFixed(4) }}</strong>
            </div>
          </div>
          <div class="detail-columns">
            <div>
              <p class="tiny-label">RESEARCH QUESTION</p>
              <p>{{ active.question }}</p>
            </div>
            <div>
              <p class="tiny-label">WHAT THE EXPERIMENT SHOWED</p>
              <p>{{ active.finding }}</p>
            </div>
          </div>
          <div class="detail-outcome">
            <i
              :class="active.selected ? 'pi pi-check-circle' : 'pi pi-info-circle'"
              aria-hidden="true"
            ></i
            >{{ active.outcome }}
            <span>· Results refer to the log-transformed target, not hectare-scale R².</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="research-footer">
      <div class="footer-icon"><i class="pi pi-shield" aria-hidden="true"></i></div>
      <div>
        <h2>Research evidence, not an operational forecast</h2>
        <p>
          The optimized model achieved a held-out test R² of 0.2451 on the log-transformed target.
          Performance measured in actual hectares is substantially weaker and must be reported
          separately. This application documents an experimental research model, not a validated
          system for wildfire emergency decisions.
        </p>
        <p class="source-line">
          Source: Final Model Improvement Experiments notebook · Mesogeos-based project dataset.
          Historical enrichment investigated separately and is not represented as a completed model
          upgrade.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.research-page {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  padding-bottom: 4rem;
  color: var(--wi-text);
  min-width: 0;
}
.research-hero,
.research-panel,
.research-footer {
  background: var(--wi-surface);
  border: 1px solid var(--wi-border);
}

.research-hero {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: clamp(24px, 3.5vw, 44px);

  /* Fixed dark scientific background in both themes */
  background-color: #0b1b2d;
  background-image:
    linear-gradient(
      90deg,
      rgba(7, 22, 38, 0.98) 0%,
      rgba(7, 22, 38, 0.94) 38%,
      rgba(7, 22, 38, 0.85) 65%,
      rgba(7, 22, 38, 0.68) 100%
    ),
    url('/scientific-research-background.png');

  background-position: center, center;
  background-size: cover;
  background-repeat: no-repeat;

  border-color: rgba(148, 163, 184, 0.25);
  color: #edf4fc;
}

.hero-glow {
  display: none;
}
.eyebrow,
.tiny-label,
.chapter-kicker {
  font-size: 11px;
  line-height: 1.6;
  font-weight: 750;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.eyebrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 11px;
  color: var(--wi-text-muted);
}
.eyebrow i,
.accent-orange {
  color: #fb923c;
}
.eyebrow-dot {
  opacity: 0.4;
}
.accent-teal {
  color: #2dd4bf;
}
.hero-main {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.75fr);
  align-items: center;
  gap: clamp(28px, 4vw, 62px);
  margin-top: 34px;
}
.hero-copy,
.hero-question {
  min-width: 0;
}
.chapter-kicker {
  color: #2dd4bf;
  display: flex;
  align-items: center;
  gap: 14px;
}
.chapter-rule {
  display: inline-block;
  height: 1px;
  width: 35px;
  background: currentColor;
  opacity: 0.5;
}
.hero-copy h1 {
  font-size: clamp(30px, 3.15vw, 47px);
  line-height: 1.13;
  font-weight: 800;
  letter-spacing: -0.035em;
  max-width: 750px;
  margin: 16px 0 0;
}
.hero-copy h1 em {
  font-style: normal;
  color: #fb923c;
}
.hero-lead {
  max-width: 670px;
  font-size: 15px;
  line-height: 1.85;
  color: var(--wi-text-muted);
  margin-top: 21px;
}
.hero-question {
  border-left: 2px solid #f97316;
  padding: 7px 0 7px 24px;
}
.question-symbol {
  font-size: 24px;
  color: #fb923c;
  margin-bottom: 14px;
}
.hero-question .tiny-label {
  color: #fb923c;
}
.question-text {
  font-size: clamp(16px, 1.45vw, 20px);
  font-weight: 650;
  line-height: 1.55;
  margin-top: 12px;
}
.question-note {
  color: var(--wi-text-muted);
  font-size: 12px;
  line-height: 1.7;
  margin-top: 16px;
}
.hero-metadata {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--wi-border);
  margin-top: 35px;
  padding-top: 23px;
  gap: 14px;
}
.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding-left: 18px;
  border-left: 1px solid var(--wi-border);
}
.metadata-item:first-child {
  border-left: 0;
  padding-left: 0;
}
.metadata-value {
  font-size: 22px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.metadata-label {
  color: var(--wi-text-muted);
  font-size: 11px;
  line-height: 1.5;
}
.research-chapter {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}
.chapter-header {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  column-gap: 24px;
  align-items: start;
}
.chapter-index {
  color: #fb923c;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.12em;
  white-space: nowrap;
  padding-top: 8px;
}
.chapter-index span {
  opacity: 0.5;
  margin: 0 8px;
}
.chapter-intro {
  max-width: 850px;
}
.chapter-intro h2 {
  font-size: clamp(25px, 2.3vw, 34px);
  font-weight: 780;
  line-height: 1.2;
  letter-spacing: -0.025em;
  margin: 9px 0 15px;
}
.chapter-intro > p:last-child {
  color: var(--wi-text-muted);
  font-size: 14px;
  line-height: 1.85;
}
.research-panel {
  overflow: hidden;
  border-radius: 23px;
  min-width: 0;
}
.panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 30px;
  border-bottom: 1px solid var(--wi-border);
}
.panel-heading h3 {
  font-size: 20px;
  font-weight: 730;
  margin-top: 7px;
  letter-spacing: -0.02em;
}
.panel-heading .tiny-label {
  color: var(--wi-text-muted);
}
.figure-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #2dd4bf;
  background: rgba(45, 212, 191, 0.07);
  border: 1px solid rgba(45, 212, 191, 0.18);
  border-radius: 30px;
  padding: 9px 13px;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.07em;
}
.figure-body {
  padding: 24px 30px 30px;
}
.finding-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.68fr) minmax(0, 1.32fr);
  border-top: 1px solid var(--wi-border);
}
.finding-numbers {
  padding: 30px;
  border-right: 1px solid var(--wi-border);
}
.finding-measure {
  margin-top: 23px;
}
.finding-measure span {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.finding-measure small {
  font-size: 15px;
  font-weight: 500;
}
.finding-measure p {
  font-size: 12px;
  line-height: 1.6;
  color: var(--wi-text-muted);
  margin-top: 4px;
}
.finding-measure.is-teal span {
  color: #2dd4bf;
}
.finding-separator {
  height: 1px;
  background: var(--wi-border);
  margin-top: 24px;
}
.mini-note {
  font-size: 11px;
  line-height: 1.7;
  color: var(--wi-text-muted);
  margin-top: 24px;
}
.finding-analysis {
  padding: 30px 34px;
  min-width: 0;
}
.finding-analysis h3 {
  font-size: 20px;
  font-weight: 740;
  letter-spacing: -0.015em;
  line-height: 1.4;
  margin-top: 10px;
}
.finding-analysis > p:not(.tiny-label) {
  font-size: 13px;
  line-height: 1.85;
  color: var(--wi-text-muted);
  margin-top: 14px;
}
.interpretation-note {
  display: flex;
  gap: 12px;
  margin-top: 21px;
  padding: 14px 16px;
  border-left: 2px solid #2dd4bf;
  background: rgba(45, 212, 191, 0.055);
  border-radius: 0 9px 9px 0;
  color: var(--wi-text-muted);
  font-size: 12px;
  line-height: 1.75;
}
.interpretation-note i {
  flex: none;
  color: #2dd4bf;
  margin-top: 3px;
}
.interpretation-note strong {
  color: var(--wi-text);
}
.experiment-content {
  padding: 26px 30px 30px;
}
.experiment-plot {
  background: var(--wi-surface-alt);
  border: 1px solid var(--wi-border);
  border-radius: 18px;
  padding: 19px 18px 15px;
}
.plot-topline {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--wi-text-muted);
  font-size: 12px;
}
.plot-canvas {
  position: relative;
  width: 100%;
  height: 285px;
  margin-top: 18px;
}
.plot-footnote {
  font-size: 11px;
  color: var(--wi-text-muted);
  line-height: 1.7;
  margin-top: 12px;
}
.pathway-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 29px 0 14px;
}
.flow-hint {
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--wi-text-muted);
}
.experiment-flow {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  position: relative;
}
.experiment-flow::before {
  content: '';
  position: absolute;
  left: 5%;
  right: 5%;
  top: 21px;
  height: 2px;
  background: linear-gradient(90deg, #2dd4bf, #fb923c, #2dd4bf);
  opacity: 0.45;
  pointer-events: none;
}
.flow-step {
  appearance: none;
  position: relative;
  z-index: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  min-height: 155px;
  border: 1px solid var(--wi-border);
  border-radius: 14px;
  background: var(--wi-surface);
  color: var(--wi-text);
  padding: 11px 8px 13px;
  cursor: pointer;
  transition:
    transform 0.18s,
    border-color 0.18s,
    background 0.18s;
}
.flow-step:hover {
  transform: translateY(-3px);
  border-color: #2dd4bf;
}
.flow-step:focus-visible {
  outline: 2px solid #fb923c;
  outline-offset: 3px;
}
.flow-step-active {
  border-color: #fb923c;
  background: rgba(249, 115, 22, 0.085);
}
.flow-node {
  display: grid;
  place-items: center;
  border: 2px solid #2dd4bf;
  background: var(--wi-surface);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  flex: none;
  color: var(--wi-text);
  font-size: 11px;
  font-weight: 800;
}
.flow-step-active .flow-node,
.flow-step-winner .flow-node {
  border-color: #fb923c;
  color: #fb923c;
}
.flow-step-title {
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  line-height: 1.35;
  margin-top: 11px;
}
.flow-step-score {
  font-size: 17px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  margin-top: 6px;
}
.flow-selected,
.flow-step-status {
  font-size: 9px;
  text-align: center;
  letter-spacing: 0.02em;
  line-height: 1.4;
  margin-top: auto;
  padding-top: 9px;
  color: var(--wi-text-muted);
}
.flow-selected {
  color: #fb923c;
  font-weight: 800;
}
.experiment-detail {
  background: var(--wi-surface-alt);
  border-top: 1px solid var(--wi-border);
  padding: 28px 30px;
}
.experiment-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.experiment-detail-header h3 {
  font-size: 23px;
  font-weight: 750;
  letter-spacing: -0.025em;
  margin-top: 8px;
}
.detail-method {
  color: var(--wi-text-muted);
  font-size: 12px;
  margin-top: 7px;
  line-height: 1.6;
}
.score-highlight {
  text-align: right;
  flex: none;
}
.score-highlight span {
  color: var(--wi-text-muted);
  font-size: 10px;
  letter-spacing: 0.07em;
  display: block;
}
.score-highlight strong {
  display: block;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.035em;
  margin-top: 5px;
  color: #fb923c;
  font-variant-numeric: tabular-nums;
}
.detail-columns {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  margin-top: 26px;
  border-top: 1px solid var(--wi-border);
  padding-top: 22px;
}
.detail-columns .tiny-label {
  color: #2dd4bf;
}
.detail-columns p:last-child {
  font-size: 13px;
  line-height: 1.85;
  margin-top: 10px;
  color: var(--wi-text-muted);
}
.detail-outcome {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;
  margin-top: 22px;
  color: var(--wi-text);
  font-size: 12px;
  font-weight: 700;
}
.detail-outcome i {
  color: #fb923c;
}
.detail-outcome span {
  font-weight: 400;
  color: var(--wi-text-muted);
}
.research-footer {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  border-radius: 21px;
  padding: 26px 30px;
}
.footer-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  background: rgba(249, 115, 22, 0.11);
  color: #fb923c;
  border-radius: 12px;
}
.research-footer h2 {
  font-size: 17px;
  font-weight: 750;
}
.research-footer p {
  font-size: 13px;
  line-height: 1.8;
  color: var(--wi-text-muted);
  margin-top: 9px;
}
.research-footer .source-line {
  font-size: 11px;
}
@media (max-width: 1120px) {
  .hero-main {
    grid-template-columns: minmax(0, 1fr) minmax(230px, 0.7fr);
    gap: 26px;
  }
  .hero-copy h1 {
    font-size: 36px;
  }
  .experiment-flow {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .experiment-flow::before {
    display: none;
  }
  .flow-step {
    min-height: 126px;
  }
}
@media (max-width: 760px) {
  .research-page {
    gap: 2.5rem;
  }
  .hero-main {
    grid-template-columns: 1fr;
  }
  .hero-copy h1 {
    font-size: clamp(29px, 7vw, 40px);
  }
  .hero-question {
    margin-top: 5px;
  }
  .hero-metadata {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 20px;
  }
  .metadata-item:nth-child(3) {
    border-left: 0;
    padding-left: 0;
  }
  .chapter-header {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .chapter-index {
    padding-top: 0;
  }
  .panel-heading {
    padding: 20px;
    align-items: start;
    flex-direction: column;
    gap: 14px;
  }
  .figure-body {
    padding: 18px 13px;
  }
  .finding-layout {
    grid-template-columns: 1fr;
  }
  .finding-numbers {
    border-right: 0;
    border-bottom: 1px solid var(--wi-border);
    padding: 22px;
  }
  .finding-analysis {
    padding: 24px 22px;
  }
  .experiment-content {
    padding: 18px 13px;
  }
  .plot-canvas {
    height: 250px;
  }
  .experiment-detail {
    padding: 22px;
  }
  .detail-columns {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .experiment-detail-header {
    align-items: start;
  }
  .research-footer {
    padding: 22px;
  }
}
@media (max-width: 480px) {
  .research-hero {
    padding: 22px;
  }
  .experiment-flow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .hero-metadata {
    gap: 15px 9px;
  }
  .metadata-value {
    font-size: 20px;
  }
  .experiment-detail-header {
    flex-direction: column;
  }
  .score-highlight {
    text-align: left;
  }
  .flow-step {
    min-height: 135px;
  }
  .figure-tag {
    white-space: normal;
  }
}

/* Scientific hero: consistent contrast in both themes */
.research-hero .eyebrow {
  color: #e2e8f0;
}

.research-hero .hero-copy h1,
.research-hero .question-text,
.research-hero .metadata-value {
  color: #f8fafc;
}

.research-hero .hero-copy h1 em {
  color: #fb923c;
}

.research-hero .hero-lead,
.research-hero .question-note,
.research-hero .metadata-label {
  color: #cbd5e1;
}

.research-hero .chapter-kicker {
  color: #2dd4bf;
}

.research-hero .hero-metadata {
  border-top-color: rgba(203, 213, 225, 0.22);
}

.research-hero .metadata-item {
  border-left-color: rgba(203, 213, 225, 0.22);
}
</style>
