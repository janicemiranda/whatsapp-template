// Create a simple state management store for templates
function createStore(initialState = []) {
	let state = initialState; // Initial state of the store (defaults to an empty array)

	const listeners = []; // List of functions to call whenever the state updates

	// Returns the current state
	function getState() {
		return state;
	}

	// Sets a new state and notifies all subscribed listeners
	function setState(newState) {
		state = newState;
		listeners.forEach(function (listener) {
			listener(state); // Notify each subscriber of the new state
		});
	}

	// Adds a new template to the store and shows a success notification
	function addTemplate(newTemplate) {
		const newState = [...state, newTemplate];

		showNotification('success', 'Notificación Creada', 'Notificación creada correctamente');

		setState(newState); // Update the state and notify subscribers
	}

	// Allows functions to subscribe to state changes
	function subscribe(listener) {
		listeners.push(listener); // Add the listener to the array

		// Return a function to unsubscribe later
		return () => {
			const index = listeners.indexOf(listener);
			if (index > -1) {
				listeners.splice(index, 1); // Remove the listener from the array
			}
		};
	}

	// Loads templates from localStorage when the app initializes
	function initializeStore() {
		const templates = localStorage.getItem('templates');
		const newTemplates = templates === null ? [] : JSON.parse(templates);

		// Reconstruct Template instances from plain objects
		const mappedTemplates = newTemplates.map(function (newTemplate) {
			return new Template(
				newTemplate.title,
				newTemplate.message,
				newTemplate.hashTag,
				newTemplate.link,
				newTemplate.date
			);
		});

		setState(mappedTemplates); // Set the reconstructed templates as the new state
	}

	// Deletes templates from the store using a list of IDs
	function deleteTemplatesByIds(ids) {
		state = state.filter((template) => !ids.includes(template.id)); // Keep only templates not in the provided list
		setState(state); // Notify subscribers of the change
	}

	return {
		getState,
		setState,
		addTemplate,
		subscribe,
		initializeStore,
		deleteTemplatesByIds,
	};
}

// Create the store instance and attach it to the global window object
const templatesStore = createStore([]);
window.templatesStore = templatesStore;
