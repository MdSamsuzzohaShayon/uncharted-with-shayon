/**
 * Custom middleware to route uploads to specific folders based on the upload context
 */
export default (config: any, { strapi }: { strapi: any }) => {
    // Default folder mapping
    const folderMap = config.folders || {
      featured_image: 'posts',
      gallery: 'gallery',
      cover_image: 'locations',
      default: 'others'
    };
  
    return async (ctx: any, next: any) => {
      // Only process upload requests
      if (ctx.request.url.includes('/upload')) {
        const { files } = ctx.request;
        
        if (files && files.files) {
          const fileArray = Array.isArray(files.files) ? files.files : [files.files];
          
          for (const file of fileArray) {
            // Skip if file is invalid
            if (!file) continue;
            
            let folder = folderMap.default;
            let detectedField = null;
  
            // Method 1: Check direct field property
            if (file.field && folderMap[file.field]) {
              folder = folderMap[file.field];
              detectedField = file.field;
            }
            
            // Method 2: Check from related data (for Content Manager)
            else if (file.related && Array.isArray(file.related) && file.related.length > 0) {
              const related = file.related[0];
              if (related && related.field && folderMap[related.field]) {
                folder = folderMap[related.field];
                detectedField = related.field;
              }
            }
            
            // Method 3: Parse from referer URL (last resort)
            else if (ctx.request.header.referer) {
              const referer = ctx.request.header.referer;
              for (const [field, mappedFolder] of Object.entries(folderMap)) {
                if (field !== 'default' && referer.includes(field)) {
                  folder = mappedFolder as string;
                  detectedField = field;
                  break;
                }
              }
            }
  
            // Get the filename safely
            let fileName = '';
            
            // Check different possible locations for the filename
            if (file.name) {
              fileName = file.name;
            } else if (file.filename) {
              fileName = file.filename;
            } else if (file.originalFilename) {
              fileName = file.originalFilename;
            } else {
              // Generate a default name if none exists
              fileName = `upload-${Date.now()}`;
            }
  
            // Clean the filename (remove special characters)
            const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
            
            // Create the new path with folder structure
            const timestamp = Date.now();
            const newFileName = `${folder}/${timestamp}-${cleanFileName}`;
            
            // Set the filename in all possible locations to ensure it's picked up
            file.name = newFileName;
            file.filename = newFileName;
            file.originalFilename = newFileName;
            file.key = newFileName; // For S3/R2 compatibility
            
            // Store original info for reference
            file.originalName = fileName;
            file.folder = folder;
            file.detectedField = detectedField;
            
            strapi.log.debug(`Upload routed to ${folder}`, { 
              field: detectedField,
              originalName: fileName,
              newName: newFileName
            });
          }
        } else {
          strapi.log.debug('No files found in upload request', { 
            hasFiles: !!files,
            bodyKeys: Object.keys(ctx.request.body || {})
          });
        }
      }
      
      await next();
    };
  };