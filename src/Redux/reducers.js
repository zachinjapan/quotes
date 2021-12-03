export default function reducerFunc(
  state = {
    roundOver: true,
  },
  action
) {
  switch (action.type) {
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
