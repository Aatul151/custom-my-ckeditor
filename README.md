# Custom CKEditor 5 Build with Custom Actions Plugin

This is a custom build of CKEditor 5 that includes a **Custom Actions** plugin allowing end users to define and execute their own custom actions within the editor.

## Features

- **Custom Actions Plugin**: Allows developers to define custom actions that users can execute through a dropdown menu in the toolbar
- **Flexible Configuration**: Actions are defined through the editor configuration, making it easy to customize per implementation
- **Safe Execution**: Actions are executed in a controlled environment with error handling

## Custom Actions Plugin

The Custom Actions plugin provides a dropdown button in the toolbar that contains user-defined actions. Each action is a JavaScript function that receives the editor instance as a parameter.

### Configuration

Configure custom actions when initializing the editor:

```javascript
ClassicEditor.create(document.querySelector('#editor'), {
    customActions: [
        {
            id: 'insertTimestamp',
            label: 'Insert Timestamp',
            execute: (editor) => {
                const timestamp = new Date().toLocaleString();
                editor.model.change(writer => {
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText(timestamp, insertPosition);
                });
            }
        },
        {
            id: 'highlightSelection',
            label: 'Highlight Selection',
            execute: (editor) => {
                editor.execute('highlight', { value: 'yellowMarker' });
            }
        },
        {
            id: 'clearFormatting',
            label: 'Clear Formatting',
            execute: (editor) => {
                editor.execute('removeFormat');
            }
        }
    ]
});
```

### Action Properties

Each custom action object should have:

- **`id`** (string): Unique identifier for the action
- **`label`** (string): Display text shown in the dropdown menu
- **`execute`** (function): Function that takes the editor instance as a parameter and performs the action

### Example Actions

#### Insert Timestamp
```javascript
{
    id: 'insertTimestamp',
    label: 'Insert Timestamp',
    execute: (editor) => {
        const timestamp = new Date().toLocaleString();
        editor.model.change(writer => {
            const insertPosition = editor.model.document.selection.getFirstPosition();
            writer.insertText(timestamp, insertPosition);
        });
    }
}
```

#### Insert Custom HTML
```javascript
{
    id: 'insertCustomHTML',
    label: 'Insert Custom HTML',
    execute: (editor) => {
        const customHTML = '<div style="border: 2px solid #ccc; padding: 10px; margin: 10px 0; background-color: #f9f9f9;">Custom Content Block</div>';
        editor.model.change(writer => {
            const viewFragment = editor.data.processor.toView(customHTML);
            const modelFragment = editor.data.toModel(viewFragment);
            const insertPosition = editor.model.document.selection.getFirstPosition();
            writer.insert(modelFragment, insertPosition);
        });
    }
}
```

#### Execute Existing Commands
```javascript
{
    id: 'highlightSelection',
    label: 'Highlight Selection',
    execute: (editor) => {
        editor.execute('highlight', { value: 'yellowMarker' });
    }
}
```

## Building

To build the editor:

```bash
npm run build
```

This will create the bundled `build/ckeditor.js` file.

## Usage

Include the built editor in your HTML:

```html
<script src="build/ckeditor.js"></script>
<script>
    ClassicEditor.create(document.querySelector('#editor'), {
        // Your configuration including customActions
    });
</script>
```

## Toolbar

The custom actions dropdown appears in the toolbar as "Custom Actions" and will only be visible if custom actions are configured.

## Error Handling

The plugin includes error handling for action execution. If an action throws an error, it will be logged to the console but won't break the editor.

## Development

The plugin source code is located in `src/custom/customActions.js`. Modify this file to extend the plugin's functionality.