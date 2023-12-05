import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LikeAndDislikeButton from "../components/LikeAndDislikeButton";

// // Mock the UserData context
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("LikeAndDislikeButton component", () => {
  let nextState;
  // Mock the context value
  const mockSetFaveAnimalStates = jest.fn().mockImplementation((callback) => {
    nextState = callback((mockPrevState) => ({
      ...mockPrevState,
      ...nextState,
    }));
  });
  jest.spyOn(React, "useContext").mockReturnValue({
    setFaveAnimalStates: mockSetFaveAnimalStates,
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("handles like button click correctly", () => {
    const mockPrevState = {
      cat: {
        likedCharacteristics: ["friendly"],
        dislikedCharacteristics: [],
      },
    };

    render(
      <LikeAndDislikeButton
        name="cat"
        characteristic="furry"
        likedCharacteristics={["friendly"]}
        preference="like"
      />
    );

    // Click the button
    fireEvent.click(screen.getByRole("button"));

    // Check if setFaveAnimalStates is called with the correct arguments
    expect(mockSetFaveAnimalStates).toHaveBeenCalledTimes(1);
    expect(mockSetFaveAnimalStates).toHaveBeenCalledWith(expect.any(Function));
    // Update state
    const [updater] = mockSetFaveAnimalStates.mock.lastCall;
    nextState = updater(mockPrevState);

    // Assertions
    expect(nextState).toEqual({
      cat: {
        likedCharacteristics: ["friendly", "furry"],
        dislikedCharacteristics: [],
      },
    });
  });

  test("handles dislike button click correctly", () => {
    const mockPrevState = {
      dog: {
        likedCharacteristics: [],
        dislikedCharacteristics: ["loud"],
      },
    };
    render(
      <LikeAndDislikeButton
        name="dog"
        characteristic="bark"
        dislikedCharacteristics={["loud"]}
        preference="dislike"
      />
    );

    // Click the button
    fireEvent.click(screen.getByRole("button"));

    // Check if setFaveAnimalStates is called with the correct arguments
    expect(mockSetFaveAnimalStates).toHaveBeenCalledTimes(1);
    expect(mockSetFaveAnimalStates).toHaveBeenCalledWith(expect.any(Function));
    // Update state
    const [updater] = mockSetFaveAnimalStates.mock.lastCall;
    nextState = updater(mockPrevState);
    // Assertion
    expect(nextState).toEqual({
      dog: {
        likedCharacteristics: [],
        dislikedCharacteristics: ["loud", "bark"],
      },
    });
  });
});
