export default function reducerFunc(
  state = {
    count: 0,
    roundOver: true,
    quoteType: "famous",
  },
  action
) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "RESET":
      return {
        ...state,
        count: 0,
      };
    case "ROUND_OVER":
      return {
        ...state,
        roundOver: true,
      };
    case "ROUND_START":
      return {
        ...state,
        roundOver: false,
      };
    case "CHANGE_QUOTE_TYPE_TO_FAMOUS":
      return {
        ...state,
        quoteType: "famous",
      };
    case "CHANGE_QUOTE_TYPE_TO_MOVIE":
      return {
        ...state,
        quoteType: "movie",
      };
    default:
      return state;
  }
}
