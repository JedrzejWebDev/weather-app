interface CityInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
  }
  
  const CityInput = ({ value, onChange, id }: CityInputProps) => {
    return (
      <>
        <label htmlFor={id}>Nazwa miasta:</label>
        <input id={id} type="text" value={value} onChange={onChange} />
      </>
    );
  };
  
  export default CityInput;
  