import { fireEvent, render, screen, act } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import { GlobalContextProvider, UserData } from "../contexts/GlobalContext";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  //Clear up Mock before tests
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
  });
  //Clear up Mock after tests
  afterAll(() => {
    global.fetch.mockRestore();
  });

  test("renders SearchBar component", () => {
    render(
      <GlobalContextProvider>
        <SearchBar />
      </GlobalContextProvider>
    );

    // Check if the input and button are rendered
    expect(
      screen.getByPlaceholderText("Put your fave animal name!")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  // Mock the initial context values
  const mockContextValues = {
    animalsList: [],
    setAnimalsList: jest.fn(),
    isLoading: false,
    setIsLoading: jest.fn(),
    hasError: false,
    setHasError: jest.fn(),
    faveAnimalStates: {},
    setFaveAnimalStates: jest.fn(),
  };

  test("fetches animal data when the search button is clicked", async () => {
    // Mocking the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: "Lion" }]),
      })
    );

    // Render the component within the UserData.Provider
    render(
      <UserData.Provider value={mockContextValues}>
        <SearchBar />
      </UserData.Provider>
    );

    // Mock user input in the text field
    fireEvent.change(
      screen.getByPlaceholderText("Put your fave animal name!"),
      {
        target: { value: "lion" },
      }
    );

    // Trigger the search button click
    fireEvent.click(screen.getByText("Search"));

    await act(() => Promise.resolve());

    //Assertions based on the context values
    expect(mockContextValues.setAnimalsList).toHaveBeenCalledWith([
      { name: "Lion" },
    ]);

    expect(mockContextValues.setIsLoading).toHaveBeenCalledWith(false);
    expect(mockContextValues.setHasError).toHaveBeenCalledWith(false);
  });

  test("fetches data with no string value", async () => {
    // Mocking the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{}]),
      })
    );

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Render the component within the UserData.Provider
    render(
      <UserData.Provider value={mockContextValues}>
        <SearchBar />
      </UserData.Provider>
    );

    // Mock user input in the text field
    fireEvent.change(
      screen.getByPlaceholderText("Put your fave animal name!"),
      {
        target: { value: "" },
      }
    );
    // Trigger the search button click
    fireEvent.click(screen.getByText("Search"));

    await act(() => Promise.resolve());

    // Assertions based on the context values
    expect(mockContextValues.setHasError).toHaveBeenCalledWith(true);
    expect(consoleSpy).toHaveBeenCalledWith("Invalid name value");

    // Clean up consoleSpy after the test
    consoleSpy.mockRestore();
  });
});
