import { render, screen, fireEvent } from "@testing-library/react";
import Rating from "../components/Rating";

describe("Rating", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test("renders stars with correct initial rating and changes rating on click", () => {
    const onRatingChangeMock = jest.fn();

    render(
      <Rating
        totalStars={5}
        initialRating={3}
        onRatingChange={onRatingChangeMock}
      />
    );

    // Check if the correct number of stars is rendered
    const starIcons = screen.getAllByTestId("star-icon");
    expect(starIcons).toHaveLength(5);

    // Check if the initial rating is displayed correctly
    expect(starIcons[0]).toHaveClass("text-yellow-300");
    expect(starIcons[1]).toHaveClass("text-yellow-300");
    expect(starIcons[2]).toHaveClass("text-yellow-300");
    expect(starIcons[3]).toHaveClass("text-gray-400");
    expect(starIcons[4]).toHaveClass("text-gray-400");

    // Click on a star and check if the rating changes
    fireEvent.click(starIcons[1]);
    expect(onRatingChangeMock).toHaveBeenCalledWith(2);

    // Check if the stars are updated after the click
    expect(starIcons[0]).toHaveClass("text-yellow-300");
    expect(starIcons[1]).toHaveClass("text-yellow-300");
    expect(starIcons[2]).toHaveClass("text-gray-400");
    expect(starIcons[3]).toHaveClass("text-gray-400");
    expect(starIcons[4]).toHaveClass("text-gray-400");
  });

  test("does not change rating when disabled", () => {
    const onRatingChangeMock = jest.fn();

    render(<Rating onRatingChange={onRatingChangeMock} disabled />);

    const starIcons = screen.getAllByTestId("star-icon");

    // Click on a star and check if the rating does not change when disabled
    fireEvent.click(starIcons[1]);
    expect(onRatingChangeMock).not.toHaveBeenCalled();
  });
});
