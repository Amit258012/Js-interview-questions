// this (implicit binding) (immediate parent)

// 1) Explain 'this' keyword

// global object(window)
this.a = 5;
const getParm = () => {
	console.log(this.a); //5
};
getParm();

// local object
let user = {
	name: "Amit",
	age: 20,
	child: {
		newName: "Raju",
		getDetails() {
			console.log(this.newName, " and ", this.name);
		},
		getArrowAge() {
			const nestedArrow = () => console.log("hi", this.newName);
			nestedArrow();
		},
	},
	getAge: () => console.log(this.age), //undefined
};
user.child.getArrowAge();
user.getAge();

// 2) op?

let user2 = {
	firstName: "Amit",
	getName() {
		const firstName = "Raju";
		return this.firstName;
	},
};

console.log("name: ", user2.getName());

// 3) op?

function makeUser() {
	return {
		name: "amit",
		ref() {
			return this;
		},
	};
}

let u = makeUser();
console.log(u.ref().name);

// 4 op ?

const u1 = {
	name: "amit",
	log() {
		console.log("4: ", this.name); //nothing
	},
};
setTimeout(u1.log, 1000); //u1.log is a callback => this = window
setTimeout(function () {
	u1.log(); //amit
}, 1000);

// 5) create object calculator

let cal = {
	read() {
		// this.a = Number(prompt("a= ", 0));
		// this.b = Number(prompt("b= ", 0));
	},
	sum() {
		return this.a + this.b;
	},
	mul() {
		return this.a * this.b;
	},
};

cal.read();
console.log("sum:", cal.sum());
console.log("mul:", cal.mul());

// 6) op?
var length = 4;
function callback() {
	console.log(this.length); //?
}
const object = {
	length: 3,
	// method(fn) {
	// 	fn(); //target global object
	// },
	method() {
		arguments[0](); //3 => argument.length==3
	},
};

object.method(callback, 2, 3);

// 7) implement calc

const ca = {
	total: 0,
	add(a) {
		this.total += a;
		return this;
	},
	sub(a) {
		this.total -= a;
		return this;
	},
	mul(a) {
		this.total *= a;
		return this;
	},
	div(a) {
		this.total /= a;
		return this;
	},
};

const res = ca.add(10).mul(5).sub(30).add(10);
console.log("res:", res.total);
