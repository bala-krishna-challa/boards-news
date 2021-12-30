import { useHistory } from "react-router-dom";

const GoBack = () => {
  const { goBack } = useHistory();
  return (
    <div>
      <button onClick={() => goBack()}>Back</button>
    </div>
  );
};

export default GoBack;
