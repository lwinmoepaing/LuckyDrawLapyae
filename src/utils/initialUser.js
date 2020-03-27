/**
 * Initial Adding User
 * @return { Object }
 */

export const initialSetUser = (users) => {
	return users.map(user => ({
		...user,
		isDone: false,
		isSelected: false,
	}))
}
