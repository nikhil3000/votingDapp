const apRoot = document.getElementById('app');
let toggle = true;
let buttonName = 'Show Details';
const tog = ()=>{
	toggle = !toggle;
	if(toggle)
		buttonName = 'Show Details';
	else
		buttonName = 'Hide Details';
	reactRender();
}
const reactRender = ()=>{
	const template = (
		<div>
			<h1>Visibility Toggle</h1>
			<button onClick={tog}>{buttonName}</button>
			{toggle && <p>Tex to toggle</p>}
		</div>
		);
	ReactDOM.render(template,apRoot);
	
}

reactRender();
