import React from "react";
import styles from "./Search.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Search: React.FC<Props> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    className={styles.input}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder || "Search Pokémon..."}
  />
);

export default Search;
