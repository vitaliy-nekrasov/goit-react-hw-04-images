import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { getPictures } from 'services/api';
import * as Scroll from 'react-scroll';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setIsLoading(true);
    if (page === 1) {
      setResult([]);
    }
    getPictures(searchQuery, page)
      .then(response => {
        setResult(prevResult => [...prevResult, ...response]);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [page, searchQuery]);

  const loadMore = () => {
    if (searchQuery) {
      setPage(prevPage => prevPage + 1);
      Scroll.animateScroll.scrollMore(900, { duration: 1000 });
    }
  };

  const submitForm = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };

  return (
    <div>
      <Searchbar onSubmit={submitForm} />
      <ImageGallery>
        <ImageGalleryItem
          result={result}
          onClick={() => setShowModal(prevState => !prevState)}
          getBigImg={img => setBigImg(img)}
        />
      </ImageGallery>
      {searchQuery !== '' && isLoading === false && (
        <Button loadMore={loadMore} />
      )}
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={() => setShowModal(prevState => !prevState)}>
          <img src={bigImg} alt={searchQuery} />
        </Modal>
      )}
    </div>
  );
}

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     result: [],
//     page: 1,
//     isLoading: false,
//     showModal: false,
//     bigImg: '',
//   };

//   getBigImg = img => {
//     this.setState({ bigImg: img });
//   };

//   toggleModal = () => {
//     this.setState(prevState => ({ showModal: !prevState.showModal }));
//   };

//   getItems = items => {
//     this.setState({ result: items });
//   };

//   isLoadingToggle = bool => {
//     this.setState({ isLoading: bool });
//   };

//   loadMore = () => {
//     if (this.state.searchQuery) {
//       this.setState(prevState => ({ page: prevState.page + 1 }));
//       setTimeout(() => {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       }, 700);
//     }
//   };
//   submitForm = searchQuery => {
//     this.setState({ searchQuery, page: 1 });
//   };
//   render() {
//     const { searchQuery, page, isLoading, showModal, bigImg } = this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.submitForm} />
//         <ImageGallery>
//           <ImageGalleryItem
//             searchQuery={searchQuery}
//             page={page}
//             loading={this.isLoadingToggle}
//             getItems={this.getItems}
//             onClick={this.toggleModal}
//             getBigImg={this.getBigImg}
//           />
//         </ImageGallery>
//         {searchQuery !== '' && isLoading === false && (
//           <Button loadMore={this.loadMore} />
//         )}
//         {isLoading && <Loader />}
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={bigImg} alt={searchQuery} />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
