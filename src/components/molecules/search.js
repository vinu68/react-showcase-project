import React from 'react';

const Search = props => {
	return (
		<div class='input-group'>
			<input type='text' class='form-control' value={props.searchValue ? props.searchValue : ''} />
			<span class='input-group-btn'>
				<button class='btn btn-primary' type='button' onClick={props.searchClick}>
					<i class='fa fa-search'></i>
				</button>
			</span>
		</div>
	);
};
export default Search;
