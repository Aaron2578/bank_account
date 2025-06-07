import { useReducer } from "react";

function App() {
  const initialState = {
    state: 0,
    balance: 0,
    isActive: false,
    loan: 0,
    secondsRemaining: 10,
  };

  function reducer(state, action) {
    if (!state.isActive && action.type !== "open") return state;
    switch (action.type) {
      case "open":
        return {
          ...state,
          balance: 500,
          isActive: true,
        };
      case "deposit":
        return {
          ...state,
          balance: state.balance + action.payload,
        };
      case "withdraw":
        return {
          ...state,
          balance: state.balance - action.payload,
        };
      case "loan":
        if (state.loan > 0) return state;
        return {
          ...state,
          loan: state.loan + action.payload,
          balance: state.balance + action.payload,
        };
      case "payloan":
        return {
          ...state,
          loan: 0,
          balance: state.balance - state.loan,
        };
      case "close":
        if (state.loan > 0 || state.balance !== 0) return state;
        return initialState;
      default:
        throw new Error("Unknown action");
    }
  }

  const [{ balance, isActive, loan }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">Bank Account</h1>
        <div className="text-lg space-y-2">
          <p><span className="font-semibold text-gray-700">Balance:</span> ₹{balance}</p>
          <p><span className="font-semibold text-gray-700">Loan:</span> ₹{loan}</p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => dispatch({ type: "open", payload: 500 })}
            disabled={isActive}
            className="btn"
          >
            Open Account
          </button>
          <button
            onClick={() => dispatch({ type: "deposit", payload: 500 })}
            disabled={!isActive}
            className="btn"
          >
            Deposit ₹500
          </button>
          <button
            onClick={() => dispatch({ type: "withdraw", payload: 100 })}
            disabled={!isActive}
            className="btn"
          >
            Withdraw ₹100
          </button>
          <button
            onClick={() => dispatch({ type: "loan", payload: 2000 })}
            disabled={!isActive}
            className="btn"
          >
            Take Loan ₹2000
          </button>
          <button
            onClick={() => dispatch({ type: "payloan" })}
            disabled={!isActive}
            className="btn"
          >
            Pay Loan
          </button>
          <button
            onClick={() => dispatch({ type: "close" })}
            disabled={!isActive}
            className="btn text-red-500 border-red-500 hover:bg-red-100"
          >
            Close Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
