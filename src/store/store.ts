import { create } from "zustand";
import { Chess, Move, Square } from "chess.js";

const chess = new Chess();

export type BoardDesk = Array<Square[]>;

type PieceType = "p" | "n" | "b" | "r" | "q" | "k";

export type FigureType = {
  square: Square;
  type: PieceType;
  color: "b" | "w";
};

export type SceneBackgrounds =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse";

type BoardStateType = {
  board: BoardDesk;
  figures: Array<Array<FigureType | null>>;
  selectedCell: Square | null;
  availableMoves: Array<Move> | [];
  AiAvailableMoves: Array<string> | [];
  history: Array<Move>;
  whoseMove: "w" | "b";
  gameType: "singlePlayer" | "AI";
  isCheck: boolean;
  isMate: boolean;
  sceneBackground: SceneBackgrounds;
};

type GameStoreType = {
  state: BoardStateType;
  actions: {
    moveFigure: (target: Square) => void;
    setSelectCell: (cell: Square) => void;
    setGameType: (gameType: "singlePlayer" | "AI") => void;
    setSceneBackground: (background: SceneBackgrounds) => void;
    newGame: () => void;
  };
};

export const useGameStore = create<GameStoreType>((set, get) => ({
  state: {
    board: [
      ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
      ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
      ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
      ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
      ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
      ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
      ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
      ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
    ],
    figures: chess.board(),
    selectedCell: null,
    availableMoves: [],
    AiAvailableMoves: [],
    whoseMove: "w",
    history: chess.history({ verbose: true }),
    gameType: "AI",
    isCheck: chess.inCheck(),
    isMate: chess.isCheckmate(),
    sceneBackground: "sunset",
  },

  actions: {
    moveFigure: (target: Square) => {
      const state = get().state;
      if (state.selectedCell && state.gameType === "singlePlayer") {
        chess.move({
          from: state.selectedCell,
          to: target,
          promotion: "q", // promotion q  significa que se convierte en una reina
        });

        set((state) => ({
          ...state,
          figures: chess.board(),
          selectedCell: null,
          availableMoves: [],
          history: chess.history({ verbose: true }),
          whoseMove: state.state.whoseMove === "w" ? "b" : "w",
          isCheck: chess.inCheck(),
          isMate: chess.isCheckmate(),
        }));
      }

      if (state.gameType === "AI" && state.selectedCell) {
        chess.move({
          from: state.selectedCell,
          to: target,
          promotion: "q",
        });

        const randomMove = Math.floor(
          Math.random() * state.AiAvailableMoves.length
        );

        set((state) => ({
          ...state,
          figures: chess.board(),
          selectedCell: null,
          availableMoves: [],
          history: chess.history({ verbose: true }),
          AiAvailableMoves: chess.move(state.state.AiAvailableMoves[randomMove])
            ? chess.moves()
            : console.log("doensn't work"),
          isCheck: chess.inCheck(),
          isMate: chess.isCheckmate(),
          figures: chess.board(),
        }));
      }
    },
  },
}));
