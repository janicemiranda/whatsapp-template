function createStore(initialState = []) {
	// Estado interno de la funcion
	// variable privda
	let state = initialState; // por defecto es un []

	// arreglo de funciones que se ejecutan cuando el estado cambia
	const listeners = [];

	function getState() {
		return state;
	}

	function setState(newState) {
		state = newState;
		listeners.forEach(function (listener) {
			listener(state);
		});
	}

	function addTemplate(newTemplate) {
		const newState = [...state, newTemplate];

		setState(newState);
	}

	function suscribe(listener) {
		listeners.push(listener);

		return () => {
			const index = listeners.indexOf(listener);
			if (index > -1) {
				listeners.splice(index, 1);
			}
		};
	}

	function initializeStore() {
		const newTemplates = [
			new Template(
				'Lost Pet Alert Message',
				'Hey everyone, my [dog/cat/etc.], [Pet’s Name], is missing! Last seen near [Location] on [Date/Time]. If you spot [him/her], please contact me at [Your Number]. 🙏🐾',
				'#LostPet #MissingDog #LostAndFoundPets #PetAlert',
				'https://www.google.com',
				'day'
			),
			new Template(
				'Found Pet Alert Message',
				'Hey everyone, I found a [dog/cat/etc.] near [Location] on [Date/Time]. [Brief description: color, size, collar, special markings]. If you recognize this pet, please contact me!',
				'#FoundPet #LostAndFound #HelpFindOwner #FoundDog #FoundCat',
				'https://www.google.com',
				'day'
			),
			new Template(
				'Pet Adoption Announcement',
				'Hey friends! [Pet’s Name], a sweet [breed/species], is looking for a loving home. [He/She] is [age] old, [temperament], and fully [vaccinated/trained]. Let me know if you or someone you know is interested!',
				'#PetAdoption #AdoptDontShop #RescuePet #LookingForAHome',
				'https://www.google.com',
				'2025-04-02'
			),
			new Template(
				'Pet Birthday Invitation',
				'🎉 It’s [Pet’s Name]’s birthday! 🎂🐾 Join us on [Date/Time] at [Location] for a fun celebration. There will be treats, games, and lots of tail wags! Let me know if you can make it!',
				'#PetBirthday #DogParty #CatCelebration #PawtyTime',
				'https://www.google.com',
				'2025-04-02'
			),
			new Template(
				'Pet Playdate Invitation',
				'Hey pet parents! I’m planning a playdate for our furry friends at [Location] on [Date/Time]. Bring your [dog/cat/etc.] for some fun and socializing! Let me know if you’re interested!',
				'#PetPlaydate #DogMeetup #CatFriends #FurryFun',
				'https://www.google.com',
				'2025-04-02'
			),
		];

		setState(newTemplates);
	}

	return {
		getState,
		setState,
		addTemplate,
		suscribe,
		initializeStore,
	};
}

const templatesStore = createStore([]);

window.templatesStore = templatesStore;
