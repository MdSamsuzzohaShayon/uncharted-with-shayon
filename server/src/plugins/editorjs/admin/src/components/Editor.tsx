// /src/plugins/editorjs/admin/src/components/Editor.tsx
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import EditorJS from '@editorjs/editorjs';
// Import your desired Editor.js tools
// Example: import Header from '@editorjs/header';
// Example: import List from '@editorjs/list';

// Define the props that Strapi will pass to your custom field's Input component
interface EditorInputProps {
    attribute: any;
    name: string;
    value: string; // Strapi will pass the current JSON string value
    onChange: (event: { target: { name: string; value: any; type: string } }) => void;
    disabled: boolean;
    error?: string;
    required?: boolean;
}

const EditorInput = forwardRef<any, EditorInputProps>(({
    name,
    value,
    onChange,
    disabled,
}, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const editorContainerId = `editorjs-${name}`;

    // Expose a ref to the parent component if needed, though not strictly required
    useImperativeHandle(ref, () => ({}));

    // Initialize Editor.js
    useEffect(() => {
        if (!editorInstance.current) {
            const editor = new EditorJS({
                holder: editorContainerId,
                readOnly: disabled,
                data: value ? JSON.parse(value) : { blocks: [] }, // Parse initial data
                placeholder: 'Let\'s write something amazing!',
                // Configure your tools here
                tools: {
                    // Example tool configuration:
                    // header: {
                    //   class: Header,
                    //   inlineToolbar: true,
                    // },
                    // list: {
                    //   class: List,
                    //   inlineToolbar: true,
                    // },
                },
                async onChange() {
                    // When content changes, save it and pass it back to Strapi via the onChange prop
                    const savedData = await editor.save();
                    onChange({
                        target: {
                            name,
                            value: JSON.stringify(savedData), // Strapi expects a string for JSON fields
                            type: 'json',
                        },
                    });
                },
            });

            editorInstance.current = editor;
        }

        // Cleanup on unmount
        return () => {
            if (editorInstance.current && editorInstance.current.destroy) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, []); // Only initialize once on mount

    // Handle external value changes (e.g., when resetting the form)
    useEffect(() => {
        if (editorInstance.current && value) {
            // Avoid updating if the content is the same to prevent cursor jumping
            editorInstance.current.save().then((currentData) => {
                if (JSON.stringify(currentData) !== value) {
                    // You might need a more sophisticated way to update Editor.js content
                    // without re-initializing. For simplicity, we'll only handle initial load.
                    // A full implementation would use editorInstance.current.render(data).
                }
            });
        }
    }, [value]);

    return (
        <div
            id={editorContainerId}
            style={{
                border: '1px solid #EAEAEF',
                borderRadius: '4px',
                padding: '16px',
                backgroundColor: '#FFFFFF',
            }}
        />
    );
});

EditorInput.displayName = 'EditorInput';
export default EditorInput;