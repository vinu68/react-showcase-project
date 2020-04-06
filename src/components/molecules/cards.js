import React from 'react';

const Card = props => {
	return (
		<div class='card'>
			<img class='card-img-top img-fluid' src={props.data.image} alt='Card image cap' width='400' />
			<div class='card-body'>
				<h4 class='card-title'>{props.data.name}</h4>
				<p class='card-text'>{props.data.species}</p>
			</div>
		</div>
	);
};

export default Card;
