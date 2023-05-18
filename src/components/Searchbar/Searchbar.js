import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

export default class Searchbar extends Component {
  state = {
    searchName: '',
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch />
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.searchName}
          />
        </form>
      </header>
    );
  }
}
