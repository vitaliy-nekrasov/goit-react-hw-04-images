import { LoadMoreBtn, Wrapper } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ loadMore }) {
  return (
    <Wrapper>
      <LoadMoreBtn onClick={loadMore} type="button">
        Load more
      </LoadMoreBtn>
    </Wrapper>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
