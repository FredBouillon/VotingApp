import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('should add the entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 Days Later');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});

		it('should convert the entries to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		})
	});

	describe('next', () => {

		it('should take the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));
		});
	});

	describe('vote', () => {

		it('should create a tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));
		});

		it('should increment the tally if it already exists', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 2
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			}));
		})
	})
});