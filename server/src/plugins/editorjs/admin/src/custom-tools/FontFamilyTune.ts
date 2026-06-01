import type { API, BlockTuneConstructorOptions } from '../types/editorjs-api';

interface FontFamilyData {
  fontFamily: string;
  [key: string]: unknown;
}

export default class FontFamilyTune {
  private api: API;
  private data: FontFamilyData;
  private static readonly fonts: readonly string[] = [
    'inherit',
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Monaco, monospace',
    'Impact, sans-serif',
    'Trebuchet MS, sans-serif',
    'Comic Sans MS, cursive',
  ] as const;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: BlockTuneConstructorOptions<FontFamilyData>) {
    this.api = api;
    this.data = data || { fontFamily: 'inherit' };
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const fontFamily = this.data.fontFamily || 'inherit';
    blockContent.style.fontFamily = fontFamily;
    return blockContent;
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ce-popover__item');
    wrapper.style.padding = '8px';

    const label = document.createElement('div');
    label.style.padding = '4px 8px';
    label.style.fontSize = '12px';
    label.style.fontWeight = '500';
    label.textContent = 'Font Family';
    wrapper.appendChild(label);

    const select = document.createElement('select');
    select.style.margin = '8px';
    select.style.padding = '8px';
    select.style.width = 'calc(100% - 16px)';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid #e0e0e0';
    select.style.backgroundColor = 'transparent';
    select.style.cursor = 'pointer';

    FontFamilyTune.fonts.forEach((font: string) => {
      const option = document.createElement('option');
      option.value = font;
      option.textContent = font.split(',')[0];
      option.style.fontFamily = font;
      option.selected = this.data.fontFamily === font;
      select.appendChild(option);
    });

    select.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      this.data.fontFamily = target.value;

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

      if (currentBlock) {
        this.api.blocks.update(currentBlock.id, {
          tunes: { fontFamily: this.data }
        });
      }
    });

    wrapper.appendChild(select);
    return wrapper;
  }

  save(): FontFamilyData {
    return this.data;
  }
}