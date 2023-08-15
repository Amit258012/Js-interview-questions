// currying

// Currying is the process of converting a function that takes multiple arguments into a sequence of functions each with only one argument.

//1) Example f(a,b) into f(a)(b)

function f(a, b) {
	console.log(a, b);
}
f(1, 2);

function f1(a) {
	return function (b) {
		console.log(a, b);
	};
}
f1(1)(2);

// 2) why should we use currying?

// 3) sum(2)(6)(1)

function sum(a) {
	return (b) => {
		return (c) => a + b + c;
	};
}
sum(2)(6)(1); //9

// 4)  eval("add")(4)(2)=>6
// 	   eval("sub")(4)(2)=>2
// 	   eval("mul")(4)(2)=>8
// 	   eval("div")(4)(2)=>2

function eval(op) {
	return (a) => {
		return (b) => {
			if (op === "add") return a + b;
			if (op === "sub") return a - b;
			if (op === "mul") return a * b;
			if (op === "div") return a / b;
		};
	};
}
console.log(eval("add")(4)(2));

const mul = eval("mul");
const add = eval("add");
const sub = eval("sub");
const div = eval("div");
console.log(div(4)(2));

// 5) Infinite currying -> sum(1)(2)(3)...(n)

// add(5)(2)(4)(5)()
function sum(a) {
	return (b) => {
		if (b) return add(a + b);
		return a;
	};
}

// 6) Currying v/s partial Application
// add(5)(2)(4) v/s add(5)(2,4)

// 7) Currying application (Dom Manipulation)

function updateDom(id) {
	return function (content) {
		document.querySelector("#" + id).textContent = content;
	};
}
const txt = updateDom("txt");
txt("Amit");

// 8) curry implementation => converts f(a,b,c) into f(a)(b)(c)

function curry(func) {
	return function curriedFunc(...args) {
		if (args.length >= func.length) {
			return func(...args);
		} else {
			return function (...next) {
				return curriedFunc(...args, ...next);
			};
		}
	};
}

const sum = (a, b, c, d) => a + b + c + d;
const total = curry(sum);
console.log(total(1)(2)(3)(4));
