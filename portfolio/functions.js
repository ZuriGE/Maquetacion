const elements1 = document.querySelectorAll(".__project--left");
const elements2 = document.querySelectorAll(".__project--right");
const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.4,
};
const callbacks = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("active");
		}
	});
};

let observer1 = new IntersectionObserver(callbacks, options);
elements1.forEach((element) => {
	observer1.observe(element);
});

let observer2 = new IntersectionObserver(callbacks, options);
elements2.forEach((element) => {
	observer2.observe(element);
});
