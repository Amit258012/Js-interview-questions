// Object {key: value}

// 1) op

const func = (function (a) {
	delete a;
	return a;
})(5);

console.log(func); //5

// 2) dynamic value

const property = "firstName";
const userName = "Amit";

const obj = {
	[property]: userName,
	age: 20,
	adult: true,
};

// console.log(obj[property]); //

// 3) loop through all key

for (key in obj) {
	console.log(key);
}

// 4) op based

const obj1 = {
	a: "one",
	b: "two",
	a: "three",
};
console.log(obj1);

// 5) create a func mulByTwo(obj) that mul all numeric value of nums by 2.

const nums = {
	a: 100,
	b: 200,
	title: "hero",
};

console.log(nums);
mulByTwo(nums);

function mulByTwo(obj) {
	for (key in obj) {
		if (typeof obj[key] === "number") obj[key] *= 2;
	}
}
console.log(nums);

// 6) output?

const a = {};
const b = {
	key: "b",
};
const c = {
	key: "c",
};

a[b] = 123;
a[c] = 456;

// a["[object object]"] = 123;  =>when you try to convert obj->str forcefully
// a["[object object]"] = 456;

console.log(a[b]); //456

// 7) JSON.stringify v/s JSON.parse
//obj->str v/s str->obj

const ob = {
	a: 100,
	b: 200,
	title: "hero",
};

const strObj = JSON.stringify(ob);

localStorage.setItem("test", strObj);
localStorage.setItem("test1", ob); //[object object]

console.log(localStorage.getItem("test"));
console.log(JSON.parse(localStorage.getItem("test")));

// 8) output ?
console.log([..."Hello"]);

// 9) output ?
const user = {
	name: "Amit",
	age: 20,
};
const admin = {
	admin: true,
	...user,
};
console.log(admin);

// 10) output ?
const setting = {
	username: "Amit",
	level: 20,
	health: 88,
};
console.log(JSON.stringify(setting, ["level", "health"]));

// 10) output ?
const shape = {
	radius: 10,
	color: {
		white: "#fff",
		black: "#000",
	},
	diameter() {
		return this.radius * 2;
	},
	perimeter: () => this.radius * 2 * Math.PI,
};

console.log(shape.diameter()); //20
console.log(shape.perimeter()); //NaN

// 11) output?
const { radius: r } = shape;
console.log("r", r); //10
const {
	color: { white: lightTheme },
} = shape;
console.log(lightTheme); //#fff

// 12) output?

let c1 = {
	greeting: "Hey",
};

let d;
d = c; //reference to the same obj
c.greeting = "Hello";
console.log(d.greeting);

//13) output?

console.log({ a: 1 } == { a: 1 });
console.log({ a: 1 } === { a: 1 });

// 14) output?

let person1 = {
	name: "Amit",
};
let members = [person1]; //member[0]=person
person1 = null;
// person1.name = null;  => members.name=null
console.log(members);

// 15) output?

const val = { num: 10 };

const multiply = (x = { ...val }) => {
	console.log((x.num *= 2));
};

multiply(); //20 (clone the object)
multiply(); //20 (clone the object)
multiply(val); //20 (Changes the original obj)
multiply(val); //40 (Changes the original obj)

// 15) output?

function changeAgeAndRef(p) {
	p.age = 20;
	p = {
		name: "Amit",
		age: 50,
	};
	return p;
}
const pObj = {
	name: "Raju",
	age: 69,
};

const pObj2 = changeAgeAndRef(pObj);
console.log(pObj);
console.log(pObj2);

// 16) Shallow copy v/s deep copy

// 17) Deep copy /object cloning methods

let user2 = {
	name: "Amit",
	age: 20,
};

// 1)
const objClone = Object.assign({}, user2);
// 2)
const objClone2 = JSON.parse(JSON.stringify(objClone));
// 3)
const objClone3 = { ...user2 };

objClone.name = "Raju";

console.log(user2, objClone);
