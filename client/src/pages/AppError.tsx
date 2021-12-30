interface Props {
  error: string;
}

const AppError: React.FC<Props> = ({ error }) => {
  return <div>Error: {error}</div>;
};

export default AppError;
