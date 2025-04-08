const templatesContainer = document.querySelector('#templates-container');
const btnNewTemplate = document.querySelector('#new-template');

btnNewTemplate.addEventListener('click', function () {
	const title = prompt('Ingrese titulo');
	const message = prompt('Ingrese message');
	const hashTags = prompt('Ingrese hashTags');

	window.templatesStore.addTemplate(new Template(title, message, hashTags, 'link', '2025'));
});

function renderTemplates() {
	templatesContainer.innerHTML = '';

	// traer la lista de templates desde el store
	const templates = window.templatesStore.getState();

	templates.forEach(function (template) {
		const li = document.createElement('li'); // li
		li.classList.add('border', 'border-green-500', 'shadow-md', 'rounded', 'm-4', 'p-2', 'bg-white');
		const h4 = document.createElement('h4');
		h4.classList.add('text-xl', 'mb-3', 'bg-green-200', 'text-emerald-800', 'p-2', 'rounded');
		h4.textContent = template.title;
		// const hr = document.createElement('hr');
		// hr.classList.add('block', 'my-3');
		const message = document.createElement('p');
		message.classList.add('text-md', 'my-3', 'text-gray-700', 'px-2');
		message.textContent = template.message;
		const hashTag = document.createElement('p');
		hashTag.classList.add('text-sm', 'my-3', 'text-emerald-600', 'px-2');
		hashTag.textContent = template.hashTag;
		li.appendChild(h4);
		// li.appendChild(hr);
		li.appendChild(message);
		li.appendChild(hashTag);
		templatesContainer.appendChild(li);
	});
}

window.templatesStore.suscribe(renderTemplates);

document.addEventListener('DOMContentLoaded', function () {
	window.templatesStore.initializeStore();
});
