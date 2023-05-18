import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
//import ImageGallery from './ImageGallery/ImageGallery';
import api from 'servise/api';

export default class App extends Component {
  state = {
    searchName: '',
    page: 1,
    images: [],
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      api
        .getImages(this.state.searchName, this.state.page)
        .then(response => {
          //const { hits: images, totalHits } = response;
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...this.normalizetImage(response.hits),
            ],
            //      showBtn: this.state.page < Math.ceil(response.totalHits / 12),
          }));
        })
        .catch(error => {
          console.log(error.message);
          /* this.setState({ showBtn: false }); */
        });
      //  .finally(() => this.setState({ isLoading: false }));
    }
  }

  normalizetImage(hits) {
    return hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }
  handleFormSubmit = searchName => {
    if (searchName === this.state.searchName) return;
    this.setState({
      searchName: searchName,
    });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/*     //<ImageGallery /> */}
      </>
    );
  }
}
