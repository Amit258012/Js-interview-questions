// Call (Explicit binding)

// 1) what is call
const user = {
	name: "Amit",
};
function greet(age, x) {
	return `Hello ${this.name} is ${age} & ${x}`; //Hello Amit is 20,2 & undefined
}
console.log(greet.call(user, [20, 2]));

// 2) what is Apply
const user1 = {
	name: "Amit",
};
function greet1(age, x) {
	return `Hello ${this.name} is ${age} & ${x}`;
}
console.log(greet1.apply(user1, [20, 2])); //Hello Amit is 20 & 2

// 3) what is bind (Reuseable function)
const user2 = {
	name: "Amit",
};
function greet2(age, x) {
	return `Hello ${this.name} is ${age} & ${x}`;
}
const bindFunc = greet2.bind(user2);

// reuseable functions
console.log(bindFunc(21, 300)); //
console.log(bindFunc(21, -1)); //

// 4) output?

const person = {
	name: "Amit",
};

function sayHi(age) {
	return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 24));
console.log(sayHi.bind(person)(25));

// 5) output?

const age = 10;

var p = {
	name: "Amit",
	age: 20,
	getAge: function () {
		return this.age;
	},
};

var p2 = { age: 24 };
console.log(p.getAge.call(p2)); //24

// 6) output?

var status = "😎";

setTimeout(() => {
	const status = "😅";

	const data = {
		status: "🤔",
		getStatus() {
			return this.status;
		},
	};
	console.log(data.getStatus()); // 🤔
	console.log(data.getStatus.call(this)); // 😎
}, 0);

// 7) call printAnimals such that it prints all animals in object

const animals = [
	{ species: "Lion", name: "king" },
	{ species: "Whale", name: "Queen" },
];

function printAnimals(i) {
	this.print = function () {
		console.log("#" + i + " " + this.species + " " + this.name);
	};
	this.print();
}

for (let i = 0; i < animals.length; i++) {
	printAnimals.call(animals[i], i);
}

// 8) Append an array to another array

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.push.apply(arr1, arr2);
console.log(arr1);

// 9) Bound function

function f() {
	console.log(this);
}

let u1 = {
	g: f.bind(null),
};
u1.g();

// 10) bind chaining

function f1() {
	console.log(this.name);
}

// bind chaining doesn't exist ,
// once this is bind then it will be fixed to that object
f1 = f1.bind({ name: "Amit" }).bind({ name: "Raju" }); //Amit
f1();

// 10) polyfill for call Method

// original

let car1 = {
	color: "Red",
	company: "Ferrari",
};
function purchase(currency, price) {
	console.log(
		`I have purchase ${this.color}-${this.company} car for ${currency}${price}`
	);
}

// purchase.call(car1, "Rs.", 5000000);

// polyfill
Function.prototype.myCall = function (context = {}, ...args) {
	if (typeof this !== "function") {
		throw new Error("Its not callable");
	}
	context.fn = this;
	context.fn(...args);
};
purchase.myCall(car1, "Rs.", 5000000);

// 11) polyfill for apply
Function.prototype.myApply = function (context = {}, args = []) {
	if (typeof this !== "function") {
		throw new Error("Its not callable");
	}
	if (!Array.isArray(args)) {
		throw new Error("Argument must be in array format");
	}
	context.fn = this;
	context.fn(...args);
};
purchase.myApply(car1, ["Rs.", 5000000]);

// 12) polyfill for bind
Function.prototype.myBind = function (context = {}, ...args) {
	if (typeof this !== "function") {
		throw new Error("Its not callable");
	}
	context.fn = this;
	return function (...newArgs) {
		return context.fn(...args, ...newArgs);
	};
};
const f2 = purchase.myBind(car1);
console.log(f2("Rs.", 5000000));
