import React, { useState, useRef, useEffect } from 'react'
import classes from './UserList.scss'

const UserList = (props) => {
	const { users, addUser, onDelete, onStart } = props
	const [ value, setValue ] = useState('')
	const containerRef = useRef(null)

	const handleInput = (e) => {
		setValue(e.target.value)
	}

	const onSubmit = (e) => {
		if( e.key === 'Enter' || e.keyCode === 13) {
			const input = value.trim()
			if(!input) return
			addUser(input)
			setValue('')
			setTimeout( () => {
				containerRef.current.scrollTop = containerRef.current.scrollHeight
				containerRef.current.focus()
			}, 50)
		}
	}

	const deleteUser = (id) => {
		onDelete(id)
	}

	const onStartGame = () => {
		if(users.length < 3) {
			alert('အနည်းဆုံး ၃ ယောက်ထည့်ရမည်။')
			return
		}
		onStart()
	}

	useEffect( () => {
		setTimeout( () => {
			containerRef.current.focus()
		}, 50)
	}, [ users ])

	return (
		<div className={classes.Container} ref={containerRef}>
			<div className={classes.Header}>
				<div className={classes.TitleText}> <span className="mm-font"> ဂိမ်းကစားသူများ </span>( {users.length} )</div>
				<input className={classes.Input} type="text" value={value} onKeyPress={onSubmit} onChange={handleInput} />
			</div>
			<ul className={classes.Ul}>
				{
					users.map( user =>
						<li className={classes.Li} key={user.id}> { user.name}
							<button
								className={classes.Del}
								disabled={!users.length}
								onClick={() => deleteUser(user.id)}
							> Remove </button>
						</li>
					)
				}
			</ul>

			<div className={classes.Footer}>
				<button onClick={onStartGame} className={classes.Button}>
					Start Game
				</button>
			</div>

		</div>
	)
}

export default UserList
