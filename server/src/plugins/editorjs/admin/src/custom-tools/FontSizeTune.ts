import type { API, BlockTuneConstructorOptions } from '../types/editorjs-api';

interface FontSizeData {
  fontSize: string;
  [key: string]: unknown;
}

export default class FontSizeTune {
  private api: API;
  private data: FontSizeData;
  private static readonly sizes: readonly string[] = [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'
  ] as const;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: BlockTuneConstructorOptions<FontSizeData>) {
    this.api = api;
    this.data = data || { fontSize: '16px' };
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const fontSize = this.data.fontSize || '16px';
    blockContent.style.fontSize = fontSize;
    return blockContent;
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ce-popover__item');
    wrapper.style.padding = '8px';

    const label = document.createElement('div');
    label.style.marginBottom = '4px';
    label.style.fontSize = '12px';
    label.style.fontWeight = '500';
    label.textContent = 'Font Size';
    wrapper.appendChild(label);

    const select = document.createElement('select');
    select.style.width = '100%';
    select.style.padding = '8px';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid #e0e0e0';
    select.style.backgroundColor = 'transparent';
    select.style.cursor = 'pointer';

    FontSizeTune.sizes.forEach((size: string) => {
      const option = document.createElement('option');
      option.value = size;
      option.textContent = size;
      option.selected = this.data.fontSize === size;
      select.appendChild(option);
    });

    select.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLSelectElement;
      this.data.fontSize = target.value;

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

      if (currentBlock) {
        this.api.blocks.update(currentBlock.id, {
          tunes: { fontSize: this.data }
        });
      }
    });

    wrapper.appendChild(select);
    return wrapper;
  }

  save(): FontSizeData {
    return this.data;
  }
}