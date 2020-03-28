import React, { useMemo, useCallback } from 'react'
import classes from './ProfileCard.scss'

const ProfileCard = (props) => {
	const { users, type, addSelectUser, unSelectAllUser } = props

	const selectUser = (user) => {
		if(type === 'done') return
		addSelectUser(user)
	}

	const unSelectSpace = useCallback (() => {
		if(type === 'done') return
		unSelectAllUser()
	}, [type, unSelectAllUser])

	const RenderItem = ({user}) => {
		const { ProfileContainer, ProfileImage, ProfileName, Selected, isWin, Active} = classes
		let ContainerStyle = !user.isDone ? [ ProfileContainer, Active ] :  [ProfileContainer]
		if(user.isSelected) {
			ContainerStyle.push(Selected)
		}
		return	(
			<div
				className={ContainerStyle.join(' ')}
				onClick={ () => selectUser(user)}
			>
				<span className={ProfileImage}>
					{ user.name[0].toUpperCase() }
				</span>
				<span className={ProfileName}>
					{ user.name }
				</span>
				{ user.isWin  && <span className={isWin}/> }

			</div>
		)
	}

	return useMemo( () => (
		<div className={classes.Container}>
			<div className={classes.PositionOverLay} onClick={unSelectSpace}/>
			{ users.map(user => <RenderItem user={user} key={user.id} /> )}
		</div>
	), [unSelectSpace, users])
}

export default ProfileCard
