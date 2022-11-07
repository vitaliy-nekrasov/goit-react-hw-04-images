import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ onClick, getBigImg, result }) {
  return result.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <Item
        key={id}
        onClick={() => {
          onClick();
          getBigImg(largeImageURL);
        }}
      >
        <Image src={webformatURL} alt="" />
      </Item>
    );
  });
}

ImageGalleryItem.propTypes = {
  result: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  getBigImg: PropTypes.func.isRequired,
};

// export class ImageGalleryItem extends Component {
//   static propTypes = {
//     loading: PropTypes.func.isRequired,
//     onClick: PropTypes.func.isRequired,
//     getBigImg: PropTypes.func.isRequired,
//   };

//   state = {
//     result: [],
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.searchQuery;
//     const nextQuery = this.props.searchQuery;
//     const prevPage = prevProps.page;
//     const nextPage = this.props.page;

//     if (prevQuery !== nextQuery) {
//       this.setState({ result: [] });
//     }
//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.props.loading(true);
//       setTimeout(() => {
//         getPictures(nextQuery, nextPage)
//           .then(response => {
//             this.setState(prevState => ({
//               result: [...prevState.result, ...response],
//             }));
//             this.props.loading(false);
//           })
//           .catch(error => console.log(error));
//       }, 300);
//     }
//   }
//   render() {
//     const { result } = this.state;
//     const { onClick, getBigImg } = this.props;

//     return result.map(({ id, webformatURL, largeImageURL }) => {
//       return (
//         <Item
//           key={id}
//           onClick={() => {
//             onClick();
//             getBigImg(largeImageURL);
//           }}
//         >
//           <Image src={webformatURL} alt="" />
//         </Item>
//       );
//     });
//   }
// }
