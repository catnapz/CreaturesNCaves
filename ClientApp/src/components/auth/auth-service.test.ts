import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { UserManager } from 'oidc-client';
import { initUserManager, loadUser } from './auth-service';

describe('AuthService', () => {

    afterEach(() => {
        delete (global as any)['fetch'];
    });

    describe('initUserManager', () => {

        it('should catch error on config fetch and return null', async () => {
            (global as any)['fetch'] = jest.fn().mockReturnValue(new Error("Ignore Me, I'm a Mock Error"));
            const userManager = await initUserManager();
            expect(userManager).toBeNull();
        });

        it('should Initialize UserManager', async () => {
            var response = {
                ok: true,
                status: 200,
                json: jest.fn().mockResolvedValue({}),
            };
            (global as any)['fetch'] = jest.fn().mockReturnValue(response);
            const userManager = await initUserManager();
            expect(userManager?.settings.silent_redirect_uri).toBe("https://localhost:5001/silentrenew.html")
        });

    });

    describe('loadUser', () => {
        const middleware = [thunk];
        const mockStore = configureStore(middleware);

        it('should dispatch to load user from the store', () => {
            const expectedData = {
                "payload": undefined, "type": "authStore/userLoading"
            };
            const store = mockStore({});
            loadUser(new UserManager({}), store);
            const actualData = store.getActions();
            expect(actualData).toContainEqual(expectedData)
        });

        it('should dispatch an error with invalid UserManager', async () => {
            const store = mockStore({});
            await loadUser(new UserManager({}), store);
            const actualData = store.getActions();
            expect(actualData.find(action => action.type === "authStore/userLoadingError")).not.toBeUndefined();
        });

    });

});