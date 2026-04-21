import type { API, BlockToolConstructorOptions, BlockToolInstance } from '../types/editorjs-api';
import Chart from 'chart.js/auto';

interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  title: string;
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }>;
  [key: string]: unknown;
}

export default class ChartBlock implements BlockToolInstance {
  private api: API;
  private data: ChartData;
  private wrapper: HTMLElement | null = null;
  private chart: Chart | null = null;
  private static readonly chartTypes: readonly string[] = [
    'bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'
  ] as const;

  static get toolbox() {
    return {
      title: 'Chart',
      icon: '<svg width="17" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v16a2 2 0 0 0 2 2h16" stroke="currentColor" fill="none" stroke-width="2"/><path d="M7 16l2-4 3 3 4-6 3 4" stroke="currentColor" fill="none" stroke-width="2"/></svg>'
    };
  }

  constructor({ api, data }: BlockToolConstructorOptions<ChartData>) {
    this.api = api;
    this.data = data || {
      type: 'bar',
      title: 'Chart Title',
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [{
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  }

  render(): HTMLElement {
    this.wrapper = document.createElement('div');
    this.wrapper.style.padding = '20px';
    this.wrapper.style.backgroundColor = 'var(--bg-color, #ffffff)';
    this.wrapper.style.borderRadius = '8px';

    // Title input
    const titleInput = document.createElement('input');
    titleInput.value = this.data.title || 'Chart Title';
    titleInput.placeholder = 'Chart Title';
    titleInput.style.width = '100%';
    titleInput.style.marginBottom = '16px';
    titleInput.style.padding = '8px';
    titleInput.style.fontSize = '18px';
    titleInput.style.fontWeight = 'bold';
    titleInput.style.border = '1px solid var(--border-color, #e0e0e0)';
    titleInput.style.borderRadius = '4px';
    titleInput.style.backgroundColor = 'transparent';
    titleInput.style.color = 'inherit';

    titleInput.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.data.title = target.value;
    });

    this.wrapper.appendChild(titleInput);

    // Chart type selector
    const typeSelect = document.createElement('select');
    typeSelect.style.marginBottom = '16px';
    typeSelect.style.padding = '8px';
    typeSelect.style.borderRadius = '4px';
    typeSelect.style.border = '1px solid var(--border-color, #e0e0e0)';
    typeSelect.style.backgroundColor = 'transparent';
    typeSelect.style.color = 'inherit';
    typeSelect.style.cursor = 'pointer';

    ChartBlock.chartTypes.forEach((type: string) => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      option.selected = this.data.type === type;
      typeSelect.appendChild(option);
    });

    typeSelect.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      this.data.type = target.value as ChartData['type'];
      this.updateChart();
    });

    this.wrapper.appendChild(typeSelect);

    // Chart canvas
    const canvasWrapper = document.createElement('div');
    canvasWrapper.style.position = 'relative';
    canvasWrapper.style.height = '300px';
    canvasWrapper.style.width = '100%';

    const canvas = document.createElement('canvas');
    canvasWrapper.appendChild(canvas);
    this.wrapper.appendChild(canvasWrapper);

    setTimeout(() => this.initializeChart(canvas), 100);

    return this.wrapper;
  }

  private initializeChart(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: this.data.type,
        data: {
          labels: this.data.labels,
          datasets: this.data.datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: 'inherit'
              }
            }
          }
        }
      });
    }
  }

  private updateChart(): void {
    if (this.chart && this.wrapper) {
      const canvas = this.wrapper.querySelector('canvas');
      if (canvas) {
        this.chart.destroy();
        this.initializeChart(canvas);
      }
    }
  }

  save(): ChartData {
    return this.data;
  }
}