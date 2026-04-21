import type { API, BlockTuneConstructorOptions } from '../types/editorjs-api';

// Add index signature to make it compatible with Record<string, unknown>
interface AlignmentData {
  alignment: 'left' | 'center' | 'right' | 'justify';
  [key: string]: unknown; // This allows any string key with unknown value
}

export default class AlignmentTune {
  private api: API;
  private data: AlignmentData;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: BlockTuneConstructorOptions<AlignmentData>) {
    this.api = api;
    this.data = data || { alignment: 'left' };
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const alignment = this.data.alignment || 'left';
    blockContent.style.textAlign = alignment;
    return blockContent;
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ce-popover__item');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '4px';
    wrapper.style.padding = '8px';

    const alignments = ['left', 'center', 'right', 'justify'] as const;

    alignments.forEach((align) => {
      const button = this.createAlignmentButton(align);
      wrapper.appendChild(button);
    });

    return wrapper;
  }

  private createAlignmentButton(alignment: 'left' | 'center' | 'right' | 'justify'): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = this.getAlignmentIcon(alignment);
    button.classList.add('ce-popover__item');
    button.style.padding = '8px';
    button.style.cursor = 'pointer';
    button.style.flex = '1';
    button.style.border = 'none';
    button.style.background = this.data.alignment === alignment ? '#e6f2ff' : 'transparent';
    button.style.borderRadius = '4px';
    button.style.transition = 'background-color 0.2s ease';

    button.addEventListener('mouseenter', () => {
      if (this.data.alignment !== alignment) {
        button.style.background = '#f5f5f5';
      }
    });

    button.addEventListener('mouseleave', () => {
      if (this.data.alignment !== alignment) {
        button.style.background = 'transparent';
      }
    });

    button.addEventListener('click', () => {
      this.data.alignment = alignment;

      const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
      const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);

      if (currentBlock) {
        this.api.blocks.update(currentBlock.id, {
          tunes: { alignment: this.data }
        });

        const parent = button.parentElement;
        if (parent) {
          Array.from(parent.children).forEach((child) => {
            if (child instanceof HTMLButtonElement) {
              child.style.background = 'transparent';
            }
          });
        }
        button.style.background = '#e6f2ff';
      }
    });

    return button;
  }

  private getAlignmentIcon(alignment: 'left' | 'center' | 'right' | 'justify'): string {
    const icons: Record<string, string> = {
      left: '⬅️',
      center: '⬆️',
      right: '➡️',
      justify: '↔️'
    };
    return icons[alignment] || '⬅️';
  }

  save(): AlignmentData {
    return this.data;
  }
}