import React from 'react';


const Navigation = ({ onRouteChange, isSignedin }) => {
	if (isSignedin) {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out </p>
			</nav>
		);
	} else {
		return (
			<div style={{ display: 'flex', justifyContent: 'flex-end'}}>
				<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In </p>
				</nav>
				<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register </p>
				</nav>
			</div>
		);
	}
};


export default Navigation;