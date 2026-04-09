import { Plugin } from '@ckeditor/ckeditor5-core/src/plugin';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { UIModel as Model } from '@ckeditor/ckeditor5-ui/src/model';
import { Collection } from '@ckeditor/ckeditor5-utils/src/collection';

export default class CustomActions extends Plugin {
	static get pluginName() {
		return 'CustomActions';
	}

	init() {
		const editor = this.editor;

		// Get custom actions from configuration
		const customActions = editor.config.get('customActions') || [];

		// Add the dropdown to the editor toolbar if there are custom actions configured
		if (customActions.length > 0) {
			editor.ui.componentFactory.add('customActions', locale => {
				const dropdownView = createDropdown(locale);
				dropdownView.buttonView.set({
					label: 'More',
					withText: true,
					tooltip: true
				});

				// Create a collection of options to populate the dropdown
				const itemDefinitions = new Collection();

				// Create a button for each custom action
				for (const action of customActions) {
					const item = {
						type: 'button',
						model: new Model({
							actionId: action.id,
							label: action.label,
                            icon: action.icon || null,
							withText: true
						})
					};

					// Add each item to the collection
					itemDefinitions.add(item);
				}

				// Add the options to the dropdown
				addListToDropdown(dropdownView, itemDefinitions);

				// When an action is selected, execute the custom action
				this.listenTo(dropdownView, 'execute', evt => {
					const actionId = evt.source.actionId;
					this._executeCustomAction(actionId);
				});

				return dropdownView;
			});
		}
	}

	/**
	 * Execute a custom action by its ID
	 * @param {string} actionId - The ID of the action to execute
	 */
	_executeCustomAction(actionId) {
		const editor = this.editor;
		const customActions = editor.config.get('customActions') || [];
		const action = customActions.find(a => a.id === actionId);

		if (action && typeof action.execute === 'function') {
			try {
				action.execute(editor);
			} catch (error) {
				console.error(`Error executing custom action "${actionId}":`, error);
			}
		} else {
			console.warn(`Custom action "${actionId}" not found or has no execute function`);
		}
	}
}