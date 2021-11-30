export default function reducerFunc(
  state = {
    count: 0,
    roundOver: false,
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
    default:
      return state;
  }
}
