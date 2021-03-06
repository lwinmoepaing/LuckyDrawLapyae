/**
 * Initial Adding User
 * @return { Object }
 */

export const initialSetUser = (users) => {
	return users.map(user => ({
		...user,
		isDone: false,
		isSelected: false,
		isWinner: false
	}))
}

/**
 * Initial Managing Cards
 * @return { Object }
 */

 export const initialManageCard = (users) => {
	const { first, second } = generateRandomNumber(users)
	return users.map((user, index) => {
		const cardNumber = index + 1
		const isWin = cardNumber === first || cardNumber === second
		return {
			id: user.id,
			disabled: false,
			cardNumber,
			isWin
		}
	})
 }

 /**
	* Random 2 Numbers
	*/
export const generateRandomNumber = (users) => {
	const min = 1
	const max = users.length
	const first = generateNumber(min, max, null)
	const second = generateNumber(min, max, first)
	return {
		first,
		second
	}
}

function generateNumber (min, max, exclude) {
	min = Math.ceil(min);
  max = Math.floor(max);
	const random =  Math.floor(Math.random() * (max - min)) + min;
	if(random === exclude) {
		return generateNumber(min, max, exclude)
	}
	return random
}

export function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
	}
	return a;
}
