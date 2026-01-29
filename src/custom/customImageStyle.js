import { ImageStyleUI } from '@ckeditor/ckeditor5-image/src/imagestyle/imagestyleui';
import { ButtonView } from '@ckeditor/ckeditor5-ui/src/button/buttonview'; // Import ButtonView if necessary

export default class CustomImageStyleUI extends ImageStyleUI {
    constructor(editor) {
        // Call the parent class method to keep the existing button creation logic
        super(editor)
    }
    /**
     * Override the _createButton method to modify the execute event.
     */
    _createButton(buttonConfig) {
        // if (!buttonConfig) {
        //     console.error("buttonConfig is undefined!");
        //     return;
        // }
        const buttonName = buttonConfig.name;

        this.editor.conversion.for('downcast').elementToElement({
            model: 'figure', // The model element name
            view: (modelElement, { writer }) => {
                const imgElement = writer.createContainerElement('figure', {
                    style: modelElement.getAttribute('style') // Apply the styles from the model
                });
        
                // Create the image element
                const img = writer.createEmptyElement('img', {
                    src: modelElement.getAttribute('src'),
                    alt: modelElement.getAttribute('alt')
                });
        
                writer.append(img, imgElement); // Append the image to the figure
                return imgElement; // Return the figure element
            }
        });

        
        // Use the editor's UI componentFactory to create a button
        this.editor.ui.componentFactory.add(`imageStyle:${buttonName}`, locale => {
            const command = this.editor.commands.get('imageStyle');
            const view = new ButtonView(locale);

            view.set({
                label: buttonConfig.title,
                icon: buttonConfig.icon,
                tooltip: true,
                isToggleable: true
            });

            view.bind('isEnabled').to(command, 'isEnabled');
            view.bind('isOn').to(command, 'value', value => value === buttonName);

            // Override the execute event with your custom logic
            view.on('execute', () => {
                // Call your custom event handler here
                this._customExecuteCommand(buttonName);
            });

            return view;
        });
    }
    /**
     * Your custom command logic that will be called on execute.
     */
    _customExecuteCommand(requestedStyle) {
        const editor = this.editor;
        const model = editor.model;

        // model.change(writer => {
        //     const imageElement = this.editor.editing.view.document.selection.getSelectedElement();
            
        //     // Ensure we have a valid image element.
        //     if (!imageElement || imageElement.name !== 'figure') {
        //         console.warn('Selected element is not a figure or image.');
        //         return;
        //     }
    
        //     const figureElement = Array.from(imageElement.getChildren()).find(child => child.name === 'img');

        //     // Remove existing styles
        //     // writer.removeAttribute('style', figureElement);
    
        //     // Apply new styles based on requested style value
        //     switch (requestedStyle) {
        //         case 'wrapText':
        //             writer.setAttribute('style', 'float:left; margin:0 10px 10px 0; display:inline;', figureElement);
        //             break;
        //         case 'breakText':
        //             writer.setAttribute('style', 'margin:10px 0; display:block;', figureElement);
        //             break;
        //         case 'inline':
        //             writer.setAttribute('style', 'display:inline;', figureElement);
        //             break;
        //         case 'alignLeft':
        //             writer.setAttribute('style', 'float:left; margin:0 10px 10px 0;', figureElement);
        //             break;
        //         case 'alignRight':
        //             writer.setAttribute('style', 'float:right; margin:0 0 10px 10px;', figureElement);
        //             break;
        //         case 'alignCenter':
        //             writer.setAttribute('style', 'max-width:100%; margin:0 auto; display:block;', figureElement);
        //             break;
        //         default:
        //             // Remove any custom inline styles if no style is requested
        //             // writer.removeAttribute('style', figureElement);
        //             break;
        //     }
    
        //     // Keep the focus on the editor
        //     this.editor.editing.view.focus();
        // });

        model.change(writer => {
            const figureElement = this.editor.editing.view.document.selection.getSelectedElement();
            // Ensure we have a valid image element.
            if (figureElement) {
                figureElement._removeStyle('float');
                figureElement._removeStyle('display');
                figureElement._removeStyle('margin');
                figureElement._removeStyle('maxWidth');

                // Apply inline styles based on requested style value (e.g., align left, right, center).
                switch (requestedStyle) {
                    case 'wrapText':
                        figureElement._setStyle({
                            'float': 'left',
                            'margin': '0 10px 10px 0',  // Adjust margin as needed
                            'display': 'inline' // Ensures the image wraps text
                        });
                        break;
                    case 'breakText':
                        figureElement._setStyle({
                            'margin': '10px 0', // Adds vertical spacing
                            'display': 'block' // Forces the image to break the text flow
                        });
                        break;
                    case 'inline':
                        figureElement._setStyle({
                            'display': 'inline' // Forces the image to break the text flow
                        });
                        break;
                    case 'side':
                        figureElement._setStyle({
                            'float': 'left',
                            'margin': '0 10px 10px 0'  // Adds spacing on the right and bottom
                        });
                        break;
                    case 'alignLeft':
                        figureElement._setStyle({
                            'float': 'left',
                            'margin': '0 10px 10px 0'// Adds spacing on the right and bottom
                        });
                        break;

                    case 'alignRight':
                        figureElement._setStyle({
                            'float': 'right',
                            'margin': '0 0 10px 10px', // Adds spacing on the left and bottom
                        });
                        break;

                    case 'alignCenter':
                        figureElement._setStyle({
                            'maxWidth': '100%', // Ensures it doesn't overflow
                            'margin': '0 auto',// Centers the image
                            'display': 'block', // Treats image as a block element
                        });
                        break;

                    default:
                        // Remove any custom inline styles if no style is requested or it's the default.
                        // writer.removeAttribute('style', figureElement);
                        break;
                }

                // Keep the focus on the editor
                this.editor.editing.view.focus();
            }
        });

    }
}
