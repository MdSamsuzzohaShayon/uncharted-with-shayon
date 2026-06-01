import type { API, BlockTuneConstructorOptions } from '../types/editorjs-api';

interface TextColorData {
  color: string;
  [key: string]: unknown;
}

export default class TextColorTune {
  private api: API;
  private data: TextColorData;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: BlockTuneConstructorOptions<TextColorData>) {
    this.api = api;
    // Set default color based on theme
    const isDark = document.documentElement.getAttribute('data-strapi-theme') === 'dark';
    this.data = data || { color: isDark ? '#ffffff' : '#000000' };
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const color = this.data.color || '#000000';
    blockContent.style.color = color;
    return blockContent;
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ce-popover__item');
    wrapper.style.padding = '12px';

    const label = document.createElement('div');
    label.style.marginBottom = '8px';
    label.style.fontSize = '12px';
    label.style.fontWeight = '500';
    label.style.color = 'inherit';
    label.textContent = 'Text Color';
    wrapper.appendChild(label);

    const input = document.createElement('input');
    input.type = 'color';
    input.value = this.data.color || '#000000';
    input.style.width = '100%';
    input.style.height = '40px';
    input.style.padding = '4px';
    input.style.border = '1px solid var(--border-color, #e0e0e0)';
    input.style.borderRadius = '6px';
    input.style.cursor = 'pointer';
    input.style.backgroundColor = 'transparent';

    // Color presets
    const presetWrapper = document.createElement('div');
    presetWrapper.style.display = 'flex';
    presetWrapper.style.gap = '8px';
    presetWrapper.style.marginTop = '8px';
    presetWrapper.style.flexWrap = 'wrap';

    const isDark = document.documentElement.getAttribute('data-strapi-theme') === 'dark';
    const presets = isDark
      ? ['#ffffff', '#e0e0e0', '#a0a0a0', '#4945ff', '#ff6b6b', '#51cf66', '#ffd43b']
      : ['#000000', '#4a4a4a', '#6a6a6a', '#4945ff', '#ff6b6b', '#51cf66', '#ffd43b'];

    presets.forEach((presetColor) => {
      const preset = document.createElement('button');
      preset.type = 'button';
      preset.style.width = '28px';
      preset.style.height = '28px';
      preset.style.borderRadius = '6px';
      preset.style.border = presetColor === this.data.color ? '2px solid #4945ff' : '1px solid var(--border-color, #e0e0e0)';
      preset.style.backgroundColor = presetColor;
      preset.style.cursor = 'pointer';
      preset.style.padding = '0';

      preset.addEventListener('click', () => {
        this.data.color = presetColor;
        input.value = presetColor;

        const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
        const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

        if (currentBlock) {
          this.api.blocks.update(currentBlock.id, {
            tunes: { textColor: this.data }
          });
        }

        // Update preset borders
        presetWrapper.querySelectorAll('button').forEach((btn) => {
          (btn as HTMLButtonElement).style.border = '1px solid var(--border-color, #e0e0e0)';
        });
        preset.style.border = '2px solid #4945ff';
      });

      presetWrapper.appendChild(preset);
    });

    input.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.data.color = target.value;

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

      if (currentBlock) {
        this.api.blocks.update(currentBlock.id, {
          tunes: { textColor: this.data }
        });
      }

      // Update preset borders
      presetWrapper.querySelectorAll('button').forEach((btn) => {
        (btn as HTMLButtonElement).style.border = '1px solid var(--border-color, #e0e0e0)';
      });
    });

    wrapper.appendChild(input);
    wrapper.appendChild(presetWrapper);

    return wrapper;
  }

  save(): TextColorData {
    return this.data;
  }
}