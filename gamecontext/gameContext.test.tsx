// import { renderHook, act } from "@testing-library/react-hooks";
// import { GameProvider, useGame } from "./GameContext"; // Adjust the import based on your file structure

// describe("GameProvider", () => {
//   test("handleInputChange updates team members", () => {
//     const wrapper = ({ children }) => <GameProvider>{children}</GameProvider>;
//     const { result } = renderHook(() => useGame(), { wrapper });

//     act(() => {
//       result.current.handleInputChange("top", "Warrior", "Alice");
//     });

//     // expect(result.current.teamMembers.top.Warrior).toBe("Alice");
//   });

//   test("generatePositions sets turn order and initializes tokens", () => {
//     const wrapper = ({ children }) => <GameProvider>{children}</GameProvider>;
//     const { result } = renderHook(() => useGame(), { wrapper });

//     act(() => {
//       result.current.generatePositions();
//     });

//     expect(result.current.turnOrder.length).toBeGreaterThan(0);
//     expect(result.current.turnOrder[0].tokens).toBe(2);
//   });

//   // Add similar tests for updateStat, handleNextTurn, and resetGame functions
// });
