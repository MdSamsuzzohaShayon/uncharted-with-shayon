import type { API, BlockTuneConstructorOptions } from '../types/editorjs-api';

interface BackgroundColorData {
  backgroundColor: string;
  [key: string]: unknown;
}

export default class BackgroundColorTune {
  private api: API;
  private data: BackgroundColorData;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: BlockTuneConstructorOptions<BackgroundColorData>) {
    this.api = api;
    this.data = data || { backgroundColor: 'transparent' };
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const backgroundColor = this.data.backgroundColor || 'transparent';
    blockContent.style.backgroundColor = backgroundColor;
    blockContent.style.padding = '8px';
    blockContent.style.borderRadius = '4px';
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
    label.textContent = 'Background Color';
    wrapper.appendChild(label);

    const input = document.createElement('input');
    input.type = 'color';
    input.value = this.data.backgroundColor || '#ffffff';
    input.style.width = '100%';
    input.style.height = '40px';
    input.style.padding = '4px';
    input.style.border = '1px solid #e0e0e0';
    input.style.borderRadius = '4px';
    input.style.cursor = 'pointer';

    input.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.data.backgroundColor = target.value;

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

      if (currentBlock) {
        this.api.blocks.update(currentBlock.id, {
          tunes: { backgroundColor: this.data }
        });
      }
    });

    wrapper.appendChild(input);
    return wrapper;
  }

  save(): BackgroundColorData {
    return this.data;
  }
}