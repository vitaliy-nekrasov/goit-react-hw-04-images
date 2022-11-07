import { useState } from 'react';
import { Header, Form, Button, ButtonText, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    onSubmit(searchQuery);
    e.target.reset();
    setSearchQuery('');
  };

  return (
    <Header>
      <Form onSubmit={submitHandler}>
        <Button type="submit">
          <ButtonText>Search</ButtonText>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setSearchQuery(e.target.value)}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     searchQuery: '',
//   };

//   inputHandler = e => {
//     this.setState({ searchQuery: e.target.value });
//   };

//   submitHandler = e => {
//     e.preventDefault();
//     if (this.state.searchQuery.trim() === '') {
//       return;
//     }
//     this.props.onSubmit(this.state.searchQuery);
//     e.target.reset();
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
//       <Header>
//         <Form onSubmit={this.submitHandler}>
//           <Button type="submit">
//             <ButtonText>Search</ButtonText>
//           </Button>

//           <Input
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.inputHandler}
//           />
//         </Form>
//       </Header>
//     );
//   }
// }
