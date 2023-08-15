// closure
//1 => lexical scope

var userAge = 20;
function myFun() {
	var name = "Amit Jahagirdar";
	function displayName(num) {
		console.log(name, num); //Amit jahagirdar 3
	}
	return displayName;
}
myFun()(3);

// 2=> closure scope chain
//Closure scope chain
// Every closure has three scopes:

/* 

   1) Local scope (Own scope)
   2) Enclosing scope (can be block, function, or module scope)
   3) Global scope 

*/

// global scope
const e = 10;
function sum(a) {
	return function (b) {
		return function (c) {
			// outer functions scope
			return function (d) {
				// local scope
				return a + b + c + d + e; //Access to all values
			};
		};
	};
}

console.log(sum(1)(2)(3)(4)); // 20

// Questions
// 1) op?

let count = 0;
(function printCount() {
	if (count === 0) {
		let count = 1; //Block scope variable (shadowing)
		console.log(count); //1
	}
	console.log(count); //0
})();

// 2) write a function that would allow you to do this

var addSix = createBase(6);
addSix(10); //16
addSix(21); //27

function createBase(b) {
	return (x) => x + b;
}

// 3) Time optimization using closures
// original

function find(idx) {
	let a = [];
	for (let i = 0; i < 10000; i++) {
		a[i] = i * i;
	}
	console.log(a[idx]);
}
console.time("6");
find(6);
console.timeEnd("6");
console.time("12");
find(50);
console.timeEnd("12");

// solution
function find() {
	let a = [];
	for (let i = 0; i < 10000; i++) {
		a[i] = i * i;
	}
	return (idx) => console.log(a[idx]);
}
const closure = find();

console.time("6");
closure(6);
console.timeEnd("6");
console.time("50");
closure(50);
console.timeEnd("50");

// 4) Block scope and setTimeout

for (var i = 0; i < 3; i++) {
	setTimeout(() => {
		console.log(i); //3 3 3
	}, 1000);
}

for (let i = 0; i < 3; i++) {
	setTimeout(() => {
		console.log(i); //0 1 2
	}, 1000);
}

for (var i = 0; i < 3; i++) {
	function inner(i) {
		setTimeout(() => {
			console.log(i); //3 3 3
		}, 1000);
	}
	inner(i);
}

// 5) How would you use a closure to create private counter?

function counter() {
	var _counter = 0;
	function add(incr) {
		_counter += incr;
	}
	function retrieve() {
		return _counter;
	}
	return {
		add,
		retrieve,
	};
}
const c = counter();
c.add(5);
c.add(15);
c.retrieve(); //20

// 6) What is module pattern

var Module = (function () {
	function privateMethod() {
		console.log("private");
	}
	return {
		publicMethod: function () {
			console.log("public");
		},
	};
})();

Module.publicMethod(); //public
Module.privateMethod(); //!error

// 7) Make this run only once

// original

let view;
function runOnce() {
	view = "Amit";
	console.log("Hi", view);
}
runOnce();
runOnce();
runOnce();
runOnce();

// solution
let view1;
function runOnce() {
	let count = 0;
	return function () {
		if (count > 0) {
			console.log("Hlo");
		} else {
			view1 = "Amit";
			console.log("Hi", view1);
			count++;
		}
	};
}
const wel = runOnce();
wel();
wel();
wel();
wel();

//8) Once PolyFill (Load dash)

function once(func, context) {
	let ran;

	return function () {
		if (func) {
			ran = func.apply(context || this, arguments);
			func = null;
		}
		return ran;
	};
}

const hello = once((a, b) => console.log("hello", a, b));
hello(1, 2);
hello(1, 2);
hello(1, 3);

// 9) Memoize/caching polyfill

// original
const slow = (num1, num2) => {
	for (let i = 1; i <= 10000; i++) {}
	return num1 * num2;
};

console.time("1:");
slow(993, 345);
console.timeEnd("1:");
console.time("2:");
slow(912, 3450);
console.timeEnd("2:");

// solution
// using memoization

function myMemoize(fn) {
	const res = {};
	return function (...args) {
		var argsCache = JSON.stringify(args);
		if (!res[argsCache]) {
			res[argsCache] = fn.call(context || this, ...args);
		}
		return res[argsCache];
	};
}
const memoSlow = myMemoize(slow);
console.time("1:");
console.log(memoSlow(993, 345));
console.timeEnd("1:");
console.time("2:");
console.log(memoSlow(993, 345));
console.timeEnd("2:");

// 10) closure vs scope
