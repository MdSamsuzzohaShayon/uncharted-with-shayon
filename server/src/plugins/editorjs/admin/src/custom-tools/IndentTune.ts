import type { API, BlockTuneConstructorOptions } from '../types/editorjs-api';

interface IndentData {
  indent: number;
  [key: string]: unknown;
}

export default class IndentTune {
  private api: API;
  private data: IndentData;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: BlockTuneConstructorOptions<IndentData>) {
    this.api = api;
    this.data = data || { indent: 0 };
  }

  wrap(blockContent: HTMLElement): HTMLElement {
    const indent = this.data.indent || 0;
    blockContent.style.paddingLeft = `${indent * 20}px`;
    return blockContent;
  }

  render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('ce-popover__item');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '8px';
    wrapper.style.padding = '8px';

    const decreaseBtn = document.createElement('button');
    decreaseBtn.type = 'button';
    decreaseBtn.textContent = '←';
    decreaseBtn.style.flex = '1';
    decreaseBtn.style.padding = '8px';
    decreaseBtn.style.cursor = 'pointer';
    decreaseBtn.style.border = '1px solid #e0e0e0';
    decreaseBtn.style.borderRadius = '4px';
    decreaseBtn.style.backgroundColor = 'transparent';
    decreaseBtn.style.fontSize = '16px';

    decreaseBtn.addEventListener('click', () => {
      this.data.indent = Math.max(0, (this.data.indent || 0) - 1);
      this.updateBlock();
      this.updateLabel(label);
    });

    const increaseBtn = document.createElement('button');
    increaseBtn.type = 'button';
    increaseBtn.textContent = '→';
    increaseBtn.style.flex = '1';
    increaseBtn.style.padding = '8px';
    increaseBtn.style.cursor = 'pointer';
    increaseBtn.style.border = '1px solid #e0e0e0';
    increaseBtn.style.borderRadius = '4px';
    increaseBtn.style.backgroundColor = 'transparent';
    increaseBtn.style.fontSize = '16px';

    increaseBtn.addEventListener('click', () => {
      this.data.indent = Math.min(5, (this.data.indent || 0) + 1);
      this.updateBlock();
      this.updateLabel(label);
    });

    const label = document.createElement('div');
    label.style.flex = '2';
    label.style.textAlign = 'center';
    label.style.fontSize = '12px';
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.justifyContent = 'center';
    label.textContent = `Indent: ${this.data.indent || 0}`;

    wrapper.appendChild(decreaseBtn);
    wrapper.appendChild(increaseBtn);
    wrapper.appendChild(label);

    return wrapper;
  }

  private updateBlock(): void {
    const currentBlockIndex = this.api.blocks.getCurrentBlockIndex();
    const currentBlock = this.api.blocks.getBlockByIndex(currentBlockIndex);
    
    if (currentBlock) {
      this.api.blocks.update(currentBlock.id, {
        tunes: { indent: this.data }
      });
    }
  }

  private updateLabel(label: HTMLElement): void {
    label.textContent = `Indent: ${this.data.indent || 0}`;
  }

  save(): IndentData {
    return this.data;
  }
}