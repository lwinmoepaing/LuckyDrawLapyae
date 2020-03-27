import { useEffect, useState } from 'react'

export default () => {
	const [count, setCount] =  useState(1)
	useEffect(() => {
		console.log('Count', count)
	}, [count])
}
