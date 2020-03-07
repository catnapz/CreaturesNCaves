import { getFromLocalState, saveToLocalState } from "./persistStore";

describe("Persist functions", ()=> {
  
  class LocalStorageMock {
    store: any;
    constructor() {
      this.store = {};
    }
    clear() {
      this.store = {};
    }
    getItem(key: string) {
      return this.store[key] || null;
    }
    setItem(key: string, value: string) {
      this.store[key] = value.toString();
    }
    removeItem(key: string) {
      delete this.store[key];
    }
  };

  beforeEach(function () {
    delete global["localStorage"];
    global["localStorage"] = new LocalStorageMock();
  });
 
  describe("getFromLocalState", () => {
    
    it("should get item from localStorage if exists", () => {
      const expectedData = {
        state1: true,
        state2: "true",
        state3: {
          nestedState1: "state",
          nestedState2: false
        }
      };
      localStorage.setItem("testState", JSON.stringify(expectedData));
      expect(getFromLocalState("testState")).toStrictEqual(expectedData);
    });

    it("should return undefined if item does not exist", () => {
      expect(getFromLocalState("testState")).toBeUndefined();
    });

    it("should return undefined if error occurred", () => {
      const mockError = new Error("Ignore Me, I'm a Mock Error");
      jest.spyOn(localStorage, "getItem").mockImplementation(() => { throw mockError})
      expect(getFromLocalState("testState")).toBeUndefined();
    });
    
  });
  
  describe("saveToLocalState", () => {
    
    it("should set item in localStorage", () => {
      const expectedData = {
        state1: true,
        state2: "true",
        state3: {
          nestedState1: "state",
          nestedState2: false
        }
      }
      saveToLocalState("testState", expectedData);
      localStorage.getItem("testState");
      expect(localStorage.getItem("testState")).toStrictEqual(JSON.stringify(expectedData));
    });

    it("should return true if success", () => {
      const expectedData = {
        state1: true,
        state2: "true",
        state3: {
          nestedState1: "state",
          nestedState2: false
        }
      }
      expect(saveToLocalState("testState", expectedData)).toBeTruthy();      
    });

    it("should return false if error occurred", () => {
      const mockError = new Error("Ignore Me, I'm a Mock Error");
      jest.spyOn(localStorage, "setItem").mockImplementation(() => { throw mockError})
      expect(saveToLocalState("", "")).toBeFalsy();
    });
    
  });
  
  afterAll(() => {
    delete global["localStorage"];
  })

})