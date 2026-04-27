export default class StrapiImageTool {
    private data: any;
    private config: any;
    private api: any;
    private wrapper: HTMLElement | null = null;

    static get toolbox() {
        return {
            title: 'Image',
            icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg">
                <path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-72-67 44v25c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/>
            </svg>`,
        };
    }

    static get isReadOnlySupported() {
        return true;
    }

    constructor({ data, config, api }: any) {
        this.data = data || {};
        this.config = config || {};
        this.api = api;
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('strapi-image-tool');
        this.wrapper.style.cssText = `
            border: 2px dashed #ccc;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            min-height: 100px;
        `;

        if (this.data?.file?.url) {
            this.showImage(this.data.file.url, this.data.caption || '');
        } else {
            this.showUploadButton();
        }

        return this.wrapper;
    }

    private showUploadButton() {
        this.wrapper!.innerHTML = `
            <div class="strapi-image-tool__placeholder" style="display:flex; flex-direction:column; align-items:center; gap:8px; color:#999; padding:20px 0;">
                <svg width="40" height="40" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg" fill="#ccc">
                    <path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-72-67 44v25c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/>
                </svg>
                <span style="font-size:14px; font-weight:500;">Click to select image from Media Library</span>
            </div>
        `;

        this.wrapper!.addEventListener('click', () => this.openMediaLibrary());
    }

    private showImage(url: string, caption: string) {
        this.wrapper!.style.border = 'none';
        this.wrapper!.style.padding = '0';
        this.wrapper!.innerHTML = `
            <div style="position:relative; display:inline-block; width:100%;">
                <img src="${url}" alt="${caption}" style="max-width:100%; border-radius:6px; display:block;" />
                <button class="strapi-image-tool__replace" style="
                    position:absolute; top:8px; right:8px;
                    background:rgba(0,0,0,0.6); color:white;
                    border:none; border-radius:4px; padding:6px 12px;
                    cursor:pointer; font-size:12px;
                ">Replace</button>
            </div>
            <div contenteditable="true" 
                 data-placeholder="Add a caption..."
                 class="strapi-image-tool__caption"
                 style="margin-top:8px; font-size:13px; color:#999; text-align:center; outline:none; min-height:20px;">
                ${caption}
            </div>
        `;

        this.wrapper!.querySelector('.strapi-image-tool__replace')
            ?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openMediaLibrary();
            });
    }

    private async openMediaLibrary() {
        const opener = this.config.mediaLibraryOpener;
        if (!opener) {
            console.error('StrapiImageTool: mediaLibraryOpener not provided in config');
            return;
        }

        const media = await opener();
        if (media?.url) {
            this.data = {
                file: { url: media.url, name: media.name, size: media.size },
                caption: '',
            };
            this.showImage(media.url, '');
        }
    }

    save() {
        const caption = this.wrapper?.querySelector('.strapi-image-tool__caption')?.textContent || '';
        return {
            file: this.data?.file || {},
            caption,
        };
    }

    validate(savedData: any) {
        return !!savedData?.file?.url;
    }
}