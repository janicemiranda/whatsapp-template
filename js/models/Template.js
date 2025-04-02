class Template {
	constructor(title, message, hashtag, link, date) {
		this.title = title;
		this.message = message;
		this.hashtag = hashtag;
		this.link = link;
		this.date = date;
	}
	// Update global templates array in app.js
	saveTemplate() {
		templates.push(this);
	}

	// Create the html for each template object
	render() {
		const li = document.createElement('li');
		li.classList.add('border', 'border-green-500', 'shadow-md', 'rounded', 'm-4', 'p-2', 'bg-white');

		const h4 = document.createElement('h4');
		h4.classList.add('text-xl', 'mb-3', 'bg-green-200', 'text-emerald-800', 'p-2', 'rounded');
		h4.textContent = this.title;

		const message = document.createElement('p');
		message.classList.add('text-md', 'my-3', 'text-gray-700', 'px-2');
		message.textContent = this.message;

		const hashtags = document.createElement('p');
		hashtags.classList.add('text-sm', 'my-3', 'text-emerald-600', 'px-2');
		hashtags.textContent = this.hashtag;

		li.appendChild(h4);
		// li.appendChild(hr);
		li.appendChild(message);
		li.appendChild(hashtags);

		templatesContainer.appendChild(li);
	}
}
