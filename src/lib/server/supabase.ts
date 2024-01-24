export let users=[{
	id:1,
	name:"sdf",
	email:"sdf@gmail.com",
	password:"sdf",
	access_token:"sdf",
	watchlist:[1022796,906126,507089,438631]
}]
export const db={
	create:(user:any)=>{
		users.push(user);
		return user;
	},
	signIn: (email: string, password: string) => {
		let user = users.find(user => user.email == email && user.password == password);
		// Check if user exists
		if (user) {
		  // return access token
		  return user.access_token;
		} else {
		  // return null or throw an error if user doesn't exist
		  return null;
		}
	  },

	signOut: (access_token: string) => {
		// Check if user exists
		let user = users.find(user => user.access_token == access_token);
		if (user) {
		  // return access token
		  return user.access_token;
		} else {
		  // return null or throw an error if user doesn't exist
		  return null;
		}
	  },

	get:(id:number)=>{

		return users.find(user=>user.id==id);

	},
	getname:(name:string)=>{
		let user =users.find(user=>user.name==name);
		return user?.name;
	},
	delete:(id:number)=>{
		const userToDelete = users.find(user => user.id == id);
		users = users.filter(user => user.id != id);
		return userToDelete;
	},
	getwatchlist:(id:string)=>{
		let user =users.find(user=>user.name==id);
		return user?.watchlist;
	},
}