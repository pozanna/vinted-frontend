const InputPublish = ({ label, id, type, state, setState, textArea }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {!textArea ? (
        <input
          id={id}
          type={type}
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
      ) : (
        <textarea
          id={id}
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        ></textarea>
      )}
    </div>
  );
};

export default InputPublish;
