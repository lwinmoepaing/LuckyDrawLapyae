import React, { useState, useEffect } from 'react'
import classes from './LuckyCard.scss'
import { initialManageCard } from '../../utils/initial'

const RenderCard = ({card, onFlipCard}) => {

	const FrontStyle =  card.disabled ?
		classes.FlipCardFront:
		[classes.FlipCardFront, classes.Active].join(' ')

	const ContainerStyle = card.disabled ?
		[classes.CardContainer, classes.Rotate].join(' '):
		classes.CardContainer

	const Text = card.isWin ?
	(<div className={classes.Winner}>
		Winner <br />50 Hour
	</div>) :
	(	<div className={classes.Text}>
		Thank
		<br />
		You
	</div>)

	return (
		<div className={ContainerStyle} onClick={ () => onFlipCard(card)}>
			<div className={FrontStyle}>
				<div className={classes.CardNumber}>
					{card.cardNumber}
				</div>
			</div>
			<div className={classes.FlipCardBack}>
				{ Text }
			</div>
		</div>
	)
}

const LuckyCard = (props) => {
	const { users, isSelectedUser, addDoneUser } = props
	const [ cards, setCard ] = useState(initialManageCard(users))

	const onFlipCard = (card) => {
		if(card.disabled) return

		if(!isSelectedUser) return

		// Call Parent Function to Update Winner
		setCard( prevCards => {
			const index = prevCards.indexOf(card)
			prevCards[index].disabled = true
			return [...prevCards]
		})
		addDoneUser(isSelectedUser, card.isWin)
	}

	return (
		<div className={classes.Container}>
			 {
				 cards.map((card) => (
					 <RenderCard
						card={card}
						key={card.id}
						onFlipCard={onFlipCard}
					/>
				 ))
			 }
		</div>
	)
}

export default LuckyCard
