import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FavoriteActions from '~/store/actions/favorites';

import styles from './styles';

class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape),
      errorOnAdd: PropTypes.oneOfType([null, PropTypes.string]),
      loading: PropTypes.bool,
    }).isRequired,
  };

  state = {
    repoNameInput: '',
  };

  navigateToFavorites = () => {
    const { navigation } = this.props;
    navigation.navigate('Favorites');
  };

  addRepository = () => {
    const { repoNameInput } = this.state;
    const { addFavoriteRequest } = this.props;

    if (!repoNameInput.length) return;

    addFavoriteRequest(repoNameInput);
  };

  render() {
    const { repoNameInput } = this.state;
    const { favorites } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.content}>
          <Text style={styles.title}>GitMark</Text>
          <Text style={styles.description}>
            Comece adicionando alguns repositórios aos seus favoritos
          </Text>

          <View style={styles.form}>
            {!!favorites.errorOnAdd && <Text style={styles.error}>{favorites.errorOnAdd}</Text>}

            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="usuário/repositório"
              underlineColorAndroid="transparent"
              value={repoNameInput}
              onChangeText={text => this.setState({ repoNameInput: text })}
            />

            <TouchableOpacity style={styles.button} onPress={this.addRepository}>
              {favorites.loading ? (
                <ActivityIndicator size="small" color={styles.loading.color} />
              ) : (
                <Text style={styles.buttonText}>Adicionar aos favoritos</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.navigateToFavorites}>
            <Text style={styles.footerLink}>
Meus favoritos (
              {favorites.data.length}
)
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
