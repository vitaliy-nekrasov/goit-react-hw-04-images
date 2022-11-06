import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export function ImageGallery({ children }) {
  return <List>{children}</List>;
}

ImageGallery.propTypes = {
  children: PropTypes.element.isRequired,
};
