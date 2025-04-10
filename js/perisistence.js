function saveTemplates() {
	localStorage.setItem('templates', JSON.stringify(window.templatesStore.getState()));
}
