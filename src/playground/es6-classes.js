class Person {
	constructor(name='Anonymous',age=0) {
		this.name = name;
		this.age=age;
	}
	getGreeting()
	{
		return `Hi. I am ${this.name}!` ;
	}
}

class Traveler extends Person{
	constructor(name,age,homelocation) {
		super(name,age);
		this.homelocation = homelocation;
	}

	getGreeting()
	{
		if(!!this.homelocation)
		{
			return `Hi. I am ${this.name}. I am visiting ${this.homelocation}.`;
		}
		else
		{
			return `Hi. I am ${this.name}.`;	
		}
	}	 

}
const me = new Traveler('Nikhil',20,'Delhi');

console.log(me.getGreeting());

const you = new Traveler();

console.log(you.getGreeting());