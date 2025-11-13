interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    onChange,
    disabled
}) => {
    return (
        <input
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
            className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70"
        />
    )
}

export default Input;