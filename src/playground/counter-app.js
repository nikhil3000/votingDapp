class Counter extends React.Component {
	constructor(props)
	{
		super(props);
		this.handleAddOne = this.handleAddOne.bind(this);
		this.handleSubOne = this.handleSubOne.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.state = {
			count:0
		}
	}

	componentDidUpdate(prevProps,prevState) {
		if(prevState.count != this.state.count){
			localStorage.setItem('count', this.state.count);
		}
	}

	componentDidMount(){
		const StringCount = localStorage.getItem('count');
		const count = parseInt(StringCount, 10);
		
		if(!isNaN(count))
		{
			this.setState(()=>({count:count}));
		}
	}
	handleAddOne(){
		console.log('AddOne');
		this.setState((obj)=>{
			return {
				count: obj.count+1
			}
		});		
	}

	handleSubOne(){
		this.setState((obj)=>{
			return {
				count: obj.count-1
			}
		});
	}

	handleReset(){
		this.setState(()=>{
			return {
				count:0
			};
		});
	}

	render(){
		return (
			<div>
				<h1>Count : {this.state.count} </h1>
				<button onClick={this.handleAddOne}>+1</button>
				<button onClick={this.handleSubOne}>-1</button>
				<button onClick={this.handleReset}>reset</button>
			</div>
			);
	}
}

ReactDOM.render(<Counter />,document.getElementById('app'));