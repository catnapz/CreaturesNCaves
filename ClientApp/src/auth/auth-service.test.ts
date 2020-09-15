import firebase from "firebase"
import { AuthService } from './auth-service';
import { initializeTestApp } from '@firebase/testing';

const mockGetIdToken = jest.fn().mockResolvedValue("mockIdToken");

jest.mock('firebase', () => {
  const auth: any = function () {
    return {
      currentUser: {
        email: 'test@test.ca',
        uid: 1,
        emailVerified: true,
        getIdToken: mockGetIdToken
      }
    }
  };
  auth.EmailAuthProvider = { PROVIDER_ID: "mock" };
  auth.GoogleAuthProvider = { PROVIDER_ID: "mock" };
  auth.FacebookAuthProvider = { PROVIDER_ID: "mock" };
  return {
    auth: auth
  };
});

describe('auth-service', () => {
  
  let authService: AuthService;
  
  beforeAll(() => {
    const testApp = initializeTestApp({ projectId: "test_app", auth: { uid: 1 } });
    (firebase.initializeApp as jest.Mocked<any>) = () => testApp; 
    authService = new AuthService();
  });

  afterEach(() => {
    mockGetIdToken.mockClear();
  });

  it('gets token if one exists', async () => {
    // Arrange
    const expectedData = await authService.getToken();
    // Act
    console.log(expectedData);
    // Assert
  });

});
