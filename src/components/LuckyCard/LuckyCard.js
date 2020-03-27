import React from 'react'
import classes from './LuckyCard.scss'

const LuckyCard = (props) => {
	const { users } = props

	const RenderCard = ({index}) => (
		<div className={classes.CardContainer}>
			<div className={classes.CardNumber}>{index + 1}</div>
		</div>
	)
	return (
		<div className={classes.Container}>
			 {
				 users.map((user, index) => (
					 <RenderCard user={user} key={user.id} index={index} />
				 ))
			 }
		</div>
	)
}

export default LuckyCard
