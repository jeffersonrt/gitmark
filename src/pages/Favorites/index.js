import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Text, FlatList, SafeAreaView } from 'react-native';

import FavoriteItem from './FavoriteItem';
import styles from './styles';

class Favorites extends Component {
  static navigationOptions = {
    title: 'Meus Favoritos',
  };

  static propTypes = {
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ).isRequired,
  };

  renderList = () => {
    const { favorites } = this.props;

    return (
      <FlatList
        data={favorites}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <FavoriteItem favorite={item} />}
      />
    );
  };

  render() {
    const { favorites } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {!favorites.length ? (
          <Text style={styles.empty}>Nenhum favorito adicionado</Text>
        ) : (
          this.renderList()
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProp = state => ({
  favorites: state.favorites.data,
});

export default connect(mapStateToProp)(Favorites);
