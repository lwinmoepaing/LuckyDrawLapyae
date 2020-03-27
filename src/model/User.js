class User {
	constructor (name, url = '') {
		this.id = new Date().getMilliseconds() + Math.floor( Math.random() * 1000000)
		this.name = name
		this.url = url
	}
}

export default User
