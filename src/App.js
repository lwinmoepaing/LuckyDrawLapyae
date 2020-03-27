import React, { useState } from 'react';
import dummyData from './data/dummy-data'
import Navbar from './components/Navbar/Navbar';

function App() {
	const [user, setUser] = useState(dummyData)
  return (
    <div className="App">
			<Navbar />
			<pre>{JSON.stringify(user, null, '\t')}</pre>

			<button onClick={ () => { setUser([])}}> Set User </button>
    </div>
  );
}

export default App;
