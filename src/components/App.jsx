import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    result: [],
    page: 1,
    isLoading: false,
    showModal: false,
    bigImg: '',
  };

  getBigImg = img => {
    this.setState({ bigImg: img });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  getItems = items => {
    this.setState({ result: items });
  };

  isLoadingToggle = bool => {
    this.setState({ isLoading: bool });
  };

  loadMore = () => {
    if (this.state.searchQuery) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 700);
    }
  };
  submitForm = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };
  render() {
    const { searchQuery, page, isLoading, showModal, bigImg } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.submitForm} />
        <ImageGallery>
          <ImageGalleryItem
            searchQuery={searchQuery}
            page={page}
            loading={this.isLoadingToggle}
            getItems={this.getItems}
            onClick={this.toggleModal}
            getBigImg={this.getBigImg}
          />
        </ImageGallery>
        {searchQuery !== '' && isLoading === false && (
          <Button loadMore={this.loadMore} />
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={bigImg} alt={searchQuery} />
          </Modal>
        )}
      </div>
    );
  }
}
