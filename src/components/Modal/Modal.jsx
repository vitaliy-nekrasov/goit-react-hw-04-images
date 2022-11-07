import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Image } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Image>{children}</Image>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

// export class Modal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//     children: PropTypes.element.isRequired,
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <Image>{this.props.children}</Image>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
