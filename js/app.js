// Select DOM elements for creating a new template
const btnNewTemplate = document.querySelector('#new-template');
const titleInput = document.querySelector('#title');
const messageInput = document.querySelector('#message');
const hashTagInput = document.querySelector('#hashTag');

// Select DOM elements for displaying templates and controls
const templatesContainer = document.querySelector('#templates-container');
const templatesHeader = document.querySelector('#template-header');
const noTemplateMessage = document.querySelector('#no-template');
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');

// Select DOM elements related to edit and delete actions
const editTemplatesBtn = document.querySelector('#editTemplatesBtn');
const deleteSelectedBtn = document.querySelector('#deleteSelectedBtn');
const deleteBar = document.querySelector('#deleteBar');
const toggleEditModeBtn = document.querySelector('#toggle-edit-mode-btn');

// Add a new template when the "New Template" button is clicked
btnNewTemplate.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent form submission
	const title = titleInput.value;
	const message = messageInput.value;
	const hashTag = hashTagInput.value;

	// Create a new Template object and add it to the store
	window.templatesStore.addTemplate(new Template(title, message, hashTag, 'link', '2025'));
});

// Function to toggle between grid view and list view for the templates
const setView = (isGrid) => {
	// Adjust CSS classes based on the selected view
	templatesContainer.classList.toggle('grid', isGrid);
	templatesContainer.classList.toggle('lg:grid-cols-2', isGrid);
	templatesContainer.classList.toggle('flex', !isGrid);
	templatesContainer.classList.toggle('flex-col', !isGrid);

	// Highlight the active button with different colors
	gridBtn.classList.toggle('bg-green-700', isGrid);
	gridBtn.classList.toggle('bg-green-500', !isGrid);
	listBtn.classList.toggle('bg-green-700', !isGrid);
	listBtn.classList.toggle('bg-green-500', isGrid);
};

// Event listeners to switch view modes
gridBtn.addEventListener('click', () => setView(true));
listBtn.addEventListener('click', () => setView(false));

// Track whether the app is currently in edit mode
let isEditMode = false;

// Toggle edit mode and show/hide delete bar
editTemplatesBtn.addEventListener('click', () => {
	isEditMode = !isEditMode;
	deleteBar.classList.toggle('hidden', !isEditMode);
	renderTemplates(); // Re-render templates to show/hide checkboxes
});

// Handle click on "Delete Selected" button
deleteSelectedBtn.addEventListener('click', () => {
	// Get all checked checkboxes
	const checkboxes = document.querySelectorAll('.template-checkbox:checked');

	// Extract data-id attributes from selected checkboxes
	const selectedIds = Array.from(checkboxes).map((cb) => cb.getAttribute('data-id'));

	// If no templates are selected, show an alert and exit
	if (selectedIds.length === 0) {
		alert('Please select at least one template to delete.');
		return;
	}

	// Call method to delete selected templates from the store
	window.templatesStore.deleteTemplatesByIds(selectedIds);
});

// Render the list of templates
function renderTemplates() {
	// Clear out previous template content
	templatesContainer.innerHTML = '';

	const templates = window.templatesStore.getState();

	// Show message if there are no templates
	if (templates.length === 0) {
		noTemplateMessage.classList.remove('hidden');
		return;
	}

	noTemplateMessage.classList.add('hidden');

	// Loop through each template and create its DOM structure
	templates.forEach(function (template) {
		const li = document.createElement('li');
		li.classList.add('border', 'border-green-500', 'shadow-md', 'rounded', 'm-4', 'p-2', 'bg-white', 'relative');

		//If in edit mode, add a checkbox for selecting the template
		if (isEditMode) {
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.classList.add('template-checkbox', 'absolute', 'top-2', 'left-2', 'w-4', 'h-4');
			checkbox.setAttribute('data-id', template.id); // Store template ID in a data attribute
			li.appendChild(checkbox);
		}

		// Create and style the title
		const h4 = document.createElement('h4');
		h4.classList.add('text-xl', 'mb-3', 'bg-green-200', 'text-emerald-800', 'p-2', 'rounded');
		h4.textContent = template.title;

		// Create and style the message
		const message = document.createElement('p');
		message.classList.add('text-md', 'my-3', 'text-gray-700', 'px-2');
		message.textContent = template.message;

		// Create and style the hashtag
		const hashTag = document.createElement('p');
		hashTag.classList.add('text-sm', 'my-3', 'text-emerald-600', 'px-2');
		hashTag.textContent = template.hashTag;

		// Add elements to the template card
		li.appendChild(h4);
		li.appendChild(message);
		li.appendChild(hashTag);

		// Add template card to the container
		templatesContainer.appendChild(li);
	});
}

// Re-render templates and save whenever the store is updated
window.templatesStore.subscribe(renderTemplates);
window.templatesStore.subscribe(saveTemplates);

// Initialize the store when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
	window.templatesStore.initializeStore();
});
