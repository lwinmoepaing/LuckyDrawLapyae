import React, { useState, useRef } from 'react';
// Scss
import classes from './App.scss'
// Dummy Data
import dummyData from './data/dummy-data'
// Helper Func
import { initialSetUser } from './utils/initialUser'

// Components
import Navbar from './components/Navbar/Navbar';
import ProfileCard from './components/ProfileCard/ProfileCard'
import LuckyCard from './components/LuckyCard/LuckyCard'

function App() {
	const [users, setUser] = useState(initialSetUser(dummyData))
	const doneUser = useRef(users.filter(user => !user.isDone))
	const unDoneUser = useRef(users.filter(user => user.isDone))
	const addDoneUser = (addUser) => {
		setUser(users => {
			const index = users.indexOf(addUser)
			users[index].isDone = true
			users[index].isSelected = false
			setDoneUser(users)
			setUndoneUser(users)
			return [...users]
		})
	}

	const addSelectUser = (addUser) => {
		setUser(users => {
			// Firstly, set All user to False
			const setUnSelectUsers = users.map(user => ({ ...user, isSelected: false}))
			// Find This User
			const index = users.indexOf(addUser)
			// Sepcific Select True
			setUnSelectUsers[index].isSelected = true
			// We Use Current
			setDoneUser(setUnSelectUsers)
			return [...setUnSelectUsers]
		})
	}

	const unSelectAllUser = () => {
		// Firstly, set All user to False
		console.log('Click')
		setUser(users => {
			const setUnSelectUsers = users.map(user => ({ ...user, isSelected: false}))
			// We Use Current
			setDoneUser(setUnSelectUsers)
			return [
				...setUnSelectUsers
			]
		})
	}

	const setDoneUser = (setDoneUserProps) => {
		doneUser.current = [ ...setDoneUserProps ].filter(user => !user.isDone)
	}

	const setUndoneUser = (unDoneUserProps) => {
		unDoneUser.current = [ ...unDoneUserProps ].filter(user => user.isDone)
	}

  return (
    <div className="App">
			<Navbar />
			<div className={classes.Container}>
				<ProfileCard
					users={doneUser.current}
					addSelectUser={addSelectUser}
					unSelectAllUser={unSelectAllUser}
					type='unDone'
				/>
				<LuckyCard users={users} />
				<ProfileCard
					users={unDoneUser.current}
					unSelectAllUser={unSelectAllUser}
					type='done'
				/>
			</div>
    </div>
  );
}

export default App;
