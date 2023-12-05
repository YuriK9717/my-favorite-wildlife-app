import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AnimalListFaveAndRating from "../components/AnimalListFaveAndRating";

describe("AnimalListFaveAndRating", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock data
  const name = "Lion";
  const isMyFave = false;
  const userRating = 0;

  test("renders correctly", () => {
    // Render the component
    render(
      <AnimalListFaveAndRating
        name={name}
        isMyFave={isMyFave}
        userRating={userRating}
      />
    );

    // Assertions
    expect(screen.getAllByText("Lion")).toHaveLength(2);
    expect(screen.getByTestId("fave-btn")).toBeInTheDocument();
  });

  test("handles toggle favorite change", async () => {
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

    // Render the component
    render(
      <AnimalListFaveAndRating
        name={name}
        isMyFave={isMyFave}
        userRating={userRating}
      />
    );

    // Simulate click on the heart button
    fireEvent.click(screen.getByTestId("fave-btn"));

    // Assertions
    expect(mockSetFaveAnimalStates).toHaveBeenCalledTimes(1);
    expect(nextState).toEqual({ Lion: { isMyFave: true } });
  });
});
