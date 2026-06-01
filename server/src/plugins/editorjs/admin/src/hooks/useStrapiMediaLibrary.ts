/**
 * Docs
 * https://docs.strapi.io/cms/migration/v4-to-v5/additional-resources/helper-plugin#auth
 */

import { useFetchClient } from '@strapi/strapi/admin';

export const useStrapiMediaLibrary = () => {
    const { get, post } = useFetchClient();

    const openMediaLibrary = (): Promise<{ url: string; name: string; size: number } | null> => {
        return new Promise((resolve) => {
            // Create the modal
            const overlay = document.createElement('div');
            overlay.id = 'editorjs-media-overlay';
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5); z-index: 99999;
                display: flex; align-items: center; justify-content: center;
            `;

            const dialog = document.createElement('div');
            dialog.style.cssText = `
                background: #ffffff; border-radius: 8px;
                width: 90%; max-width: 1100px; max-height: 85vh;
                display: flex; flex-direction: column;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            `;

            dialog.innerHTML = `
                <header style="padding: 16px 24px; border-bottom: 1px solid #eaeaef; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 1rem; font-weight: 600; color: #32324d;">Media Library</h2>
                    <button id="ml-close-btn" style="background: none; border: none; font-size: 22px; cursor: pointer; color: #666687; line-height: 1;">&times;</button>
                </header>
                <div style="padding: 12px 24px; border-bottom: 1px solid #eaeaef; display: flex; align-items: center; gap: 12px;">
                    <input type="file" accept="image/*,video/*,.pdf,.doc,.docx" multiple id="ml-upload-input" style="display: none;">
                    <button id="ml-add-btn" style="padding: 8px 16px; background: #4945ff; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 13px;">
                        + Add new assets
                    </button>
                </div>
                <div id="ml-assets-grid" style="flex: 1; overflow-y: auto; padding: 16px 24px;">
                    <div style="text-align: center; padding: 60px; color: #666687;">Loading assets...</div>
                </div>
                <footer style="padding: 12px 24px; border-top: 1px solid #eaeaef; display: flex; justify-content: flex-end;">
                    <button id="ml-cancel-btn" style="padding: 6px 16px; border: 1px solid #dcdce4; background: #fff; border-radius: 4px; cursor: pointer; color: #32324d; font-size: 13px;">
                        Cancel
                    </button>
                </footer>
            `;

            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            const grid = overlay.querySelector('#ml-assets-grid')!;
            let allFiles: any[] = [];

            const closeModal = () => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                resolve(null);
            };

            // Close handlers
            overlay.querySelector('#ml-close-btn')?.addEventListener('click', closeModal);
            overlay.querySelector('#ml-cancel-btn')?.addEventListener('click', closeModal);
            overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
            });

            // Load assets using Strapi's fetch client
            const loadAssets = async () => {
                grid.innerHTML = '<div style="text-align: center; padding: 60px; color: #666687;">Loading assets...</div>';

                try {
                    const response = await get('/upload/files?sort=createdAt:DESC&pageSize=100&populate=*');
                    allFiles = response.data?.results || response.data || [];
                    renderFiles(allFiles);
                } catch (error) {
                    console.error('Error loading media:', error);
                    grid.innerHTML = `
                        <div style="text-align: center; padding: 60px; color: #d02b20;">
                            <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
                            <div style="font-weight: 500;">Failed to load assets</div>
                            <button id="ml-retry-btn" style="margin-top: 16px; padding: 8px 20px; background: #4945ff; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
                                Retry
                            </button>
                        </div>`;
                    grid.querySelector('#ml-retry-btn')?.addEventListener('click', loadAssets);
                }
            };

            const renderFiles = (files: any[]) => {
                if (!files || files.length === 0) {
                    grid.innerHTML = `
                        <div style="text-align: center; padding: 60px; color: #666687;">
                            <div style="font-size: 40px; margin-bottom: 12px;">📁</div>
                            <div style="font-weight: 500;">No assets yet</div>
                            <div style="font-size: 12px; margin-top: 8px;">Upload assets using the button above</div>
                        </div>`;
                    return;
                }

                grid.innerHTML = `
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px;">
                        ${files.map((file: any, index: number) => {
                            const isImage = file.mime?.startsWith('image/');
                            const thumb = file.formats?.thumbnail?.url || file.url;
                            
                            return `
                                <article class="ml-asset-card" data-index="${index}"
                                     style="border: 2px solid #eaeaef; border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.15s; background: #fff;">
                                    <div style="width: 100%; height: 120px; background: #f6f6f9; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                        ${isImage 
                                            ? `<img src="${thumb}" alt="${file.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">`
                                            : `<div style="font-size: 40px; opacity: 0.5;">📄</div>`
                                        }
                                    </div>
                                    <div style="padding: 10px;">
                                        <div style="font-size: 12px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #32324d;">
                                            ${file.name}
                                        </div>
                                        <div style="font-size: 10px; color: #666687; margin-top: 4px;">
                                            ${file.ext?.toUpperCase() || ''} • ${Math.round(file.size / 1024)}KB
                                        </div>
                                    </div>
                                </article>`;
                        }).join('')}
                    </div>`;

                // Add hover effects and click handlers
                grid.querySelectorAll('.ml-asset-card').forEach((card, index) => {
                    card.addEventListener('mouseenter', () => {
                        (card as HTMLElement).style.borderColor = '#4945ff';
                        (card as HTMLElement).style.boxShadow = '0 2px 8px rgba(73,69,255,0.15)';
                        (card as HTMLElement).style.transform = 'translateY(-1px)';
                    });
                    card.addEventListener('mouseleave', () => {
                        (card as HTMLElement).style.borderColor = '#eaeaef';
                        (card as HTMLElement).style.boxShadow = 'none';
                        (card as HTMLElement).style.transform = 'none';
                    });
                    card.addEventListener('click', () => {
                        const file = files[index];
                        resolve({
                            url: file.url,
                            name: file.name,
                            size: file.size,
                        });
                        closeModal();
                    });
                });
            };

            // Upload handler using Strapi's fetch client
            const uploadInput = overlay.querySelector('#ml-upload-input') as HTMLInputElement;
            overlay.querySelector('#ml-add-btn')?.addEventListener('click', () => {
                uploadInput.click();
            });

            uploadInput?.addEventListener('change', async (e: any) => {
                const files = e.target.files;
                if (!files?.length) return;

                const btn = overlay.querySelector('#ml-add-btn') as HTMLButtonElement;
                if (btn) btn.textContent = 'Uploading...';

                const formData = new FormData();
                Array.from(files).forEach((file: any) => {
                    formData.append('files', file);
                });

                try {
                    const response = await post('/upload', formData);
                    const result = response.data;

                    if (result?.[0]) {
                        resolve({
                            url: result[0].url,
                            name: result[0].name,
                            size: result[0].size,
                        });
                        closeModal();
                    } else if (btn) {
                        btn.textContent = 'Upload failed';
                        setTimeout(() => { btn.textContent = '+ Add new assets'; }, 2000);
                    }
                } catch (error) {
                    console.error('Upload failed:', error);
                    if (btn) {
                        btn.textContent = 'Upload failed';
                        setTimeout(() => { btn.textContent = '+ Add new assets'; }, 2000);
                    }
                }
            });

            // Initial load
            loadAssets();
        });
    };

    return { openMediaLibrary };
};