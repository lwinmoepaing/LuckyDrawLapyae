import React, { useState, useRef } from 'react';
// Scss
import classes from './App.scss'
// Dummy Data
import dummyData from './data/dummy-data'
// Helper Func
import { initialSetUser, shuffle } from './utils/initial'

// Components
import Navbar from './components/Navbar/Navbar';
import ProfileCard from './components/ProfileCard/ProfileCard'
import LuckyCard from './components/LuckyCard/LuckyCard'
import UserList from './components/UserList/UserList';

function App() {
	const [users, setUser] = useState(initialSetUser(dummyData))
	const [startGame, setStart] = useState(false)
	const [gameOver] = useState(false)
	const doneUser = useRef(users.filter(user => user.isDone))
	const unDoneUser = useRef(users.filter(user => !user.isDone))

	const addDoneUser = (addUser, isWin) => {
		setUser(users => {
			const index = users.indexOf(addUser)
			users[index].isDone = true
			users[index].isSelected = false
			users[index].isWin = isWin
			setDoneUser(users)
			setUndoneUser(users)
			if(unDoneUser.current.length){
				setSelectUser(unDoneUser.current[0])
			}
			return [...users]
		})
	}

	const setSelectUser = (addUser) => {
		setUser(users => {
			// Firstly, Unselect All user
			const setUnSelectUsers = users.map(user => ({ ...user, isSelected: false}))
			// Find This User
			const index = users.indexOf(addUser)
			// Sepcific Select True
			setUnSelectUsers[index].isSelected = true
			// We Use Current
			setUndoneUser(setUnSelectUsers)
			return [...setUnSelectUsers]
		})
	}

	const unSelectAllUser = () => {
		// Firstly, set All user to False
		setUser(users => {
			const setUnSelectUsers = users.map(user => ({ ...user, isSelected: false}))
			// We Use Current
			setUndoneUser(setUnSelectUsers)
			return [
				...setUnSelectUsers
			]
		})
	}

	const setDoneUser = (setDoneUserProps) => {
		doneUser.current = [ ...setDoneUserProps ].filter(user => user.isDone)
	}

	const setUndoneUser = (unDoneUserProps) => {
		unDoneUser.current = [ ...unDoneUserProps ].filter(user => !user.isDone)
	}

	const onDelete = (id) => {
		setUser(prevUser => {
			return prevUser.filter(user => user.id !== id )
		})
	}

	const onStart = () => {
		setUser(prevUser => {
			const shuffleUser = shuffle(prevUser)
			setDoneUser(shuffleUser)
			setUndoneUser(shuffleUser)
			if(unDoneUser.current.length){
				setSelectUser(unDoneUser.current[0])
			}
		  return [
				...shuffleUser
			]
		})

		setStart(true)
	}

	const addUser = (name) => {
		const id = new Date().getMilliseconds() + Math.floor( Math.random() * 1000000)

		setUser(prevUser => {
			return  [
				...prevUser,
				{
					id,
					name,
					url: '',
					isDone: false,
					isSelected: false,
					isWinner: false
				}
			]
		})
	}

	let showContainer = (
		<UserList
			users={users}
			addUser={addUser}
			onDelete={onDelete}
			onStart={onStart}
		/>
	)

	if(startGame) {
		showContainer = (
			<div className={classes.Container}>
				<ProfileCard
					users={unDoneUser.current}
					addSelectUser={setSelectUser}
					unSelectAllUser={unSelectAllUser}
					type='unDone'
				/>
				<LuckyCard
				 	users={users}
					isSelectedUser={unDoneUser.current.find(user => user.isSelected)}
					addDoneUser={addDoneUser}
				/>
				<ProfileCard
					users={doneUser.current}
					unSelectAllUser={unSelectAllUser}
					type='done'
				/>
			</div>
		)
	}

	if(gameOver) {
		showContainer = <div> Game Over </div>
	}
  return (
    <div className="App">
			<Navbar />
			{ showContainer }
    </div>
  );
}

export default App;
