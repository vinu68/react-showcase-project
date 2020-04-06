import React, { Component, Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import constants from '../../config';
import Filters from '../organisms/filter';
import ResultList from '../organisms/resultList';
import Search from '../molecules/search';
import Pagination from '../organisms/pagination';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this._getShowRecords = this._getShowRecords.bind(this);
		this._renderListItems = this._renderListItems.bind(this);
		this._applyFilters = this._applyFilters.bind(this);
		this._search = this._search.bind(this);
		this._getNextPageRecords = this._getNextPageRecords.bind(this);

		this.state = {
			data: '',
			info: [],
			loading: true,
			error: '',
			sortValue: '',
			searchValue: '',
			page: 1,
			selectFilters: []
		};
	}

	componentWillMount() {
		this._getShowRecords();
	}

	_renderListItems = () => {
		if (this.state.data) {
			return <ResultList resultItem={this.state.data} />;
		} else {
			return <p className='noresults'> No Results Found</p>;
		}
	};

	_search(event) {
		this.setState({ searchValue: event.target.value });
	}

	_applyFilters(event) {
		let selectedFilters = this.state.selectFilters;
		if (event.target.checked) {
			selectedFilters.push({ type: event.target.dataset.filtertype, value: event.target.value });
		} else {
			selectedFilters = selectedFilters.filter(item => {
				return item.type !== event.target.dataset.filtertype && item.value !== event.target.value;
			});
		}
		this.setState({ selectFilters: selectedFilters });
	}

	_getNextPageRecords(event) {}

	_getShowRecords(page = '', queryUrl = '') {
		let url = constants.API_URL + '?page=' + (page ? page : '1') + (queryUrl ? '&' + queryUrl : '');
		axios.get(url).then(response => {
			console.log('response', response);
			this.setState(state => {
				return { ...state, ...{ data: response.data.results }, ...{ info: response.data.info },...{loading:false} };
			});
		});
	}

	render() {
		console.log('data', this.state.data);

		return (
			<div class='container'>
				<div class='row'>
					{/* BEGIN SEARCH RESULT */}
					<div class='col-md-12'>
						<div class='grid search'>
							<div class='grid-body'>
								<div class='row'>
									{/* BEGIN FILTERS */}
									<Filters checkboxClick={this._applyFilters} />
									{/* END FILTERS */}
									{/* BEGIN RESULT */}
									<div class='col-md-9 float-left'>
										<h2>
											<i class='fa fa-file-o'></i>
											{'Result'}
										</h2>
										<hr />
										{/* BEGIN SEARCH INPUT */}
										<Search searchClick={this._search} searchValue={this.state.searchValue} />
										{/* END SEARCH INPUT */}
										<p>{''}</p>

										<div class='padding'></div>

										<div class='row'>
											{/* BEGIN ORDER RESULT */}
											<div class='col-sm-6'>
												<div class='btn-group dropdown'>
													<button
														type='button'
														class='btn btn-default dropdown-toggle'
														data-toggle='dropdown'>
														Order by
													</button>
													<ul class='dropdown-menu' role='menu'>
														<li>
															<a href='#'>Name</a>
														</li>
														<li>
															<a href='#'>Date</a>
														</li>
														<li>
															<a href='#'>View</a>
														</li>
														<li>
															<a href='#'>Rating</a>
														</li>
													</ul>
												</div>
											</div>
											{/* END ORDER RESULT */}
										</div>

										{/*  BEGIN TABLE RESULT */}
										{this.state.loading ? (
											<div className='row align-items-center justify-content-center'>
												<div className='overlay'>
													<div className='spinnerWrapper'>
														<Spinner animation='border' role='status'>
															<span className='sr-only'>Loading...</span>
														</Spinner>
														<p>LOADING...</p>
													</div>
												</div>
											</div>
										) : null}
										{this._renderListItems(this.state.data)}

										{/* END TABLE RESULT */}
										{/* BEGIN PAGINATION */}
										{this.state.data.length ? (
											<Pagination
												count={this.state.info.count}
												totalPage={this.state.info.pages}
												page={this.state.page}
												pageClick={this._getNextPageRecords}
											/>
										) : null}

										{/*  END PAGINATION */}
									</div>
									{/* END RESULT */}
								</div>
							</div>
						</div>
					</div>
					{/* END SEARCH RESULT */}
				</div>
			</div>
		);
	}
}

export default Dashboard;
