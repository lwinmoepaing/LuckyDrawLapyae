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
		const { ProfileContainer, ProfileImage, ProfileName, Selected, isWin} = classes
		const ContainerStyle = user.isSelected ? [ ProfileContainer, Selected ].join(' ') :  [ProfileContainer]
		return	(
			<div
				className={ContainerStyle}
				onClick={ () => selectUser(user)}
			>
				<span className={ProfileImage}>
					{ user.name[0].toUpperCase() }
				</span>
				<span className={ProfileName}>
					{ user.name }
				</span>
				<span className={isWin}>
					{ user.isWin ? 'Win': ''}
				</span>
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
