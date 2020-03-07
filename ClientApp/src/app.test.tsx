import React from 'react';

it("Dummy", () => {
  expect(2).toBe(2);
})
// import { cleanup, getByText, render, wait } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import React from 'react';
// import * as ReactRedux from "react-redux";
// import { App, AppProps } from './app';
// import { StaticRouter } from 'react-router'

// // it('renders without crashing', () => {
// //     const storeFake = (state: any) => ({
// //         default: () => {},
// //         subscribe: () => {},
// //         dispatch: () => {},
// //         getState: () => ({ ...state })
// //     });
// //     const store = storeFake({}) as any;

// //     ReactDOM.render(
// //         <Provider store={store}>
// //             <MemoryRouter>
// //                 <App/>
// //             </MemoryRouter>
// //         </Provider>, document.createElement('div'));
// // });

// // Test setup
// // const store = configureStore({
// //   reducer: { 
// //     [I18N_STORE_FEATURE_KEY]: i18nStoreReducer,
// //   }
// // });

// // function wrappedRender( componentToRender ) {
// //   return render(
// //     <ReactRedux.Provider store={store}>
// //         <StaticRouter>
// //             {componentToRender}
// //         </StaticRouter>
// //     </ReactRedux.Provider>)
// // }

// jest.mock('./components/layout/layout', () => ({
//     Layout: 'mocked-layout'
// }));

// jest.mock('./components/home', () => ({
//     Home: 'mocked-home'
// }));

// jest.mock('./components/counter/counter', () => ({
//   Counter: 'mocked-counter'
// }));

// const useSelectorMock = jest.spyOn(ReactRedux, "useSelector");

// const loadingMock = jest.fn();
// const loadedMock = jest.fn();

// // Unit Tests 
// describe('App', () => {
// 	let props: AppProps;

// 	beforeEach(() => {
// 		props = {
// 			loading: loadingMock,
// 			loaded: loadedMock
// 		}
// 	});

// 	afterEach(() => {
// 		loadingMock.mockReset();
// 		loadedMock.mockReset();
// 		useSelectorMock.mockReset();
// 		cleanup();
// 	});

//   //// put back in when useSelecter(appLoaded)
// 	// it('should call loading prop when loading', () => {
// 	// 	useSelectorMock.mockReturnValue(false);
// 	// 	// wrappedRender(<App {...props}/>);
// 	// 	// render(<App {...props}/>);
// 	// 	expect(loadingMock).toHaveBeenCalled();
// 	// });
	
// 	it('should call loaded prop when loaded', () => {
// 		useSelectorMock.mockReturnValue(true);
// 		render(<App {...props}/>);
// 		expect(loadedMock).toHaveBeenCalled();
// 	});

	
// 	it('should contain Layout component', async () => {
// 		const { baseElement } = render(<App {...props}/>);
// 		await wait(() => getByText(baseElement, (content, element) => {
// 			return element.tagName.toLowerCase() === 'mocked-layout';
// 		}));
// 	});

//   it('should contain Counter component', async () => {
// 		const { baseElement } = render(<App {...props}/>);
// 		await wait(() => getByText(baseElement, (content, element) => {
// 			return element.tagName.toLowerCase() === 'mocked-counter';
// 		}));
// 	});
	
// 	afterAll(() => {
// 		jest.clearAllMocks();
// 	 });
// });

