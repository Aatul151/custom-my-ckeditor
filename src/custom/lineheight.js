import { Plugin } from '@ckeditor/ckeditor5-core/src/plugin';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { UIModel as Model } from '@ckeditor/ckeditor5-ui/src/model';
import { Command } from '@ckeditor/ckeditor5-core/src/command';
import { Collection } from '@ckeditor/ckeditor5-utils/src/collection';
import { first } from '@ckeditor/ckeditor5-utils/src/first';

export default class LineHeight extends Plugin {
	static get pluginName() {
		return 'LineHeight';
	}
	init() {
		const editor = this.editor;
		const lineHeightOptions = [
			{ commandValue: '0', label: 'None' },
			{ commandValue: '1', label: '1' },
			{ commandValue: '2', label: '2' },
			{ commandValue: '3', label: '3' },
			{ commandValue: '4', label: '4' },
			{ commandValue: '5', label: '5' },
			{ commandValue: '6', label: '6' }
		];
		const options = editor.config.get('lineHeight.options') || lineHeightOptions;

		// Extend the schema to allow the `lineHeight` attribute.
		editor.model.schema.extend('$block', { allowAttributes: 'lineHeight' });

		// Downcast: Apply the `line-height` style to the view (HTML) when the `lineHeight` attribute is present in the model.
		editor.conversion.for('downcast').attributeToAttribute({
			model: 'lineHeight',
			view: modelAttributeValue => {
				return {
					key: 'style',
					value: {
						'line-height': modelAttributeValue
					}
				};
			}
		});

		// Upcast: From view to model, read the `line-height` style and store it in the model as the `lineHeight` attribute.
		editor.conversion.for('upcast').attributeToAttribute({
			view: {
				name: 'p',
				styles: {
					'line-height': /[\s\S]+/
				}
			},
			model: {
				key: 'lineHeight',
				value: viewElement => viewElement.getStyle('line-height')
			}
		});

		// Add the dropdown to the editor toolbar.
		editor.ui.componentFactory.add('lineHeight', locale => {
			const dropdownView = createDropdown(locale);
			dropdownView.buttonView.set({
				label: 'Line Spacing',
				withText: true,
				tooltip: true
			});

			// Create a collection of options to populate the dropdown.
			const itemDefinitions = new Collection();

			// Create a button for each option in the line height options.
			for (const option of options) {
				const item = {
					type: 'button',
					model: new Model({
						commandValue: option.commandValue,
						label: option.label,
						withText: true
					})
				};

				// Add each item to the collection.
				itemDefinitions.add(item);
			}



			// Add the options to the dropdown.
			addListToDropdown(dropdownView, itemDefinitions);


			// When an option is selected, execute the lineHeight command.
			this.listenTo(dropdownView, 'execute', evt => {
				console.log("evt.source.commandValue", evt.source.commandValue);

				editor.execute('lineHeight', { value: evt.source.commandValue });
			});

			return dropdownView;
		});

		// Add the lineHeight command.
		editor.commands.add('lineHeight', new LineHeightCommand(editor));
	}
}

class LineHeightCommand extends Command {
	refresh() {
		const model = this.editor.model;
		const firstBlock = first(model.document.selection.getSelectedBlocks());

		// Check the current lineHeight value for the selected block.
		this.value = firstBlock.getAttribute('lineHeight');
		this.isEnabled = true;
	}

	execute({ value }) {
		const model = this.editor.model;
		const document = model.document;

		model.change(writer => {
			// Get all selected blocks.
			const blocks = Array.from(document.selection.getSelectedBlocks());

			// Apply or remove the lineHeight attribute.
			blocks.forEach(block => {
				if (value) {
					writer.setAttribute('lineHeight', value, block);
				} else {
					writer.removeAttribute('lineHeight', block);
				}
			});
		});
	}
}
