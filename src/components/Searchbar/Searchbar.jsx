import PropTypes from 'prop-types';
import { useState } from "react";
import css from './Searchbar.module.css'

const { searchbar, form, button, button_label, input } = css;

function Searchbar({onSubmit}) {
  const [search, setSearch] = useState('');
  console.log(search);
  
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };
      
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (<header className={searchbar}>
    <form className={form} onSubmit={handleSubmit}>
      <button type="submit" className={button}>
        <span className={button_label}>Search</span>
      </button>
      <input
        onChange={handleChange}
        name='search'
        value={search}
        className={input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>);  
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};