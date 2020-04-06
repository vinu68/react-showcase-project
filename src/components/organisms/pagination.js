import React, { Fragment } from 'react';

const renderPageNumbers = (page, pageNumbers, pageClick) => {
	console.log('pageNumbers', pageNumbers);
	console.log('page', page);
	return pageNumbers.map((number, index) => {
		return (
			<Fragment key={index}>
				{page > 5 && number > page - 3 && number < page + 3 ? (
					<li className={`page-item ${page === number ? 'active ' : 'cursor-pointer'}`} key={number}>
						<a className='page-link' href={number} tabIndex='-1' data-value={number} onClick={pageClick}>
							{number}
						</a>
					</li>
				) : number <= 5 ? (
					<li
						className={`page-item ${page < 6 ? '' : 'd-none'} ${
							page === number ? 'active' : 'cursor-pointer'
						}`}
						key={number}>
						<a className='page-link' href={number} tabIndex='-1' data-value={number} onClick={pageClick}>
							{number}
						</a>
					</li>
				) : null}
			</Fragment>
		);
	});
};

const Pagination = props => {
	let pageNumbers = [];
	let recordsLimit = props.limit || 20;
	for (let i = 1; i <= Math.ceil(props.count / recordsLimit); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='row  align-items-center justify-content-center '>
			<nav className='justify-content-center'>
				<ul className='pagination' role='navigation'>
					<li
						className={`page-item ${props.page <= 1 ? 'disabled' : ''}`}
						name='Previous'
						value={`${props.page - 1}`}>
						<a
							className='page-link'
							href='#'
							tabIndex='-1'
							data-value={`${props.page - 1}`}
							onClick={props.pageClick}>
							Previous
						</a>
					</li>
					{renderPageNumbers(props.page, pageNumbers)}

					<li
						className={`page-item ${
							props.page >= Math.floor(props.count / recordsLimit) ? 'disabled' : ''
						}`}
						name='Next'
						value={props.page + 1}>
						<a
							className='page-link'
							href='#'
							tabIndex='-1'
							data-value={props.page + 1}
							onClick={props.pageClick}>
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};
export default Pagination;
