//File that contains our code 
//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch 

const app = {
	title: 'Indecision App', 
	options: ['one','two']

};

const onFormSubmit = (e) =>{
	e.preventDefault();
	const option = e.target.elements.option.value;

	if(option)
	{
		app.options.push(option);
		e.target.elements.option.value = '';
		console.log(app.options.length);
		reactRender();
	}
}

const onMakeDecision = ()=>{
	const randnum = Math.floor(Math.random()*app.options.length);
	const option = app.options[randnum];
	alert(option);
}

const removeall = ()=>{
	app.options = [];
	reactRender();
}


const appRoot = document.getElementById('app');

const reactRender = ()=>{

	const template = (
	<div>
		<h1>{app.title}</h1>
		{app.subtitle && <p>{app.subtitle}</p>}
		<button onClick={removeall}>Remove all</button>
		<button disabled={!app.options.length===0} onClick={onMakeDecision}>What should i do?</button>
		
		<p>Count: {app.options.length}</p>
		<ol>		
		{
			app.options.map((option)=>{
				return <li key={option}>{option}</li>;  
			}) 
		}
		</ol>
		
		<form onSubmit={onFormSubmit}>
			<input type="text" name="option"/>
			<button>Add Option</button>
		</form>

	</div>

	);

ReactDOM.render(template,appRoot);

}
reactRender();
