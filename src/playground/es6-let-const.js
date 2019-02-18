var nameVar = 'Andrew';
nameVar = 'Mike';
console.log('nameVar',nameVar);

let nameLet = 'Jen';
console.log('nameLet',nameLet);

const add = (a,b) =>{
	return a+b;
}

const user = {
	name: 'Nikhil',
	cities: ['Delhi','Jaipur','Gurgaon'],
	printPlacesLived
}

console.log(add(5,6));



//Counter Example

let count = 0;
const addOne = ()=>{
	count++;
	renderReactApp();
	console.log('addOne');
}

const subOne = ()=>{
	count--;
	renderReactApp();
	console.log('subone');
}

const reset = ()=>{
	count=0;
	renderReactApp();
	console.log('reset');
}

const renderReactApp = ()=>{

	const Templatetwo = (
	<div>
		<h1>Count : {count}</h1>
		<button onClick={addOne}>+1</button>
		<button onClick={subOne}>-1</button>
		<button onClick={reset}>Reset</button>

	</div> 
	);
	ReactDOM.render(Templatetwo,appRoot);
}

renderReactApp();