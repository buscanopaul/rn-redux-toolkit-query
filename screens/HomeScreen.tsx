import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { productApi } from '../redux/api';
import { setOnBoard } from '../redux/onBoardSlice';
import { setUserIsLogin } from '../redux/userSlice';
import { Data } from '../typings';

type Props = {};

const HomeScreen = (props: Props) => {
  const onBoard = useSelector((state: any) => state.onboard.isOnBoard);
  const user = useSelector((state: any) => state.user.isLogin);
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
    isError: isProductError,
  } = productApi.useGetAllQuery();
  const [addProduct] = productApi.useAddProductMutation();
  const [updateProduct] = productApi.useUpdateProductMutation();
  const [deleteProduct] = productApi.useDeleteTodoMutation();
  const [name, setName] = useState('');

  const handleAdd = useCallback(() => addProduct(name), [addProduct]);

  const handleUpdate = useCallback(
    (product: Data) => updateProduct({ ...product, name: 'paulski' }),
    [updateProduct]
  );

  const handleDelete = useCallback(
    (product: Data) => deleteProduct(product),
    [deleteProduct]
  );

  const handleOnboard = () => {
    dispatch(setOnBoard(true));
  };

  const handleIsLogin = () => {
    dispatch(setUserIsLogin(false));
  };

  useEffect(() => {
    console.log(onBoard);
  }, [onBoard, products]);

  const Item = ({ product }: any) => {
    return (
      <View>
        <Text>{product?.name}</Text>
        <TouchableOpacity onPress={() => handleUpdate(product)}>
          <Text>update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(product)}>
          <Text>delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ApiProvider api={productApi}>
      <SafeAreaView>
        {isProductLoading && <Text>loading...</Text>}
        {isProductSuccess && <Text>success</Text>}
        {isProductError && <Text>error</Text>}
        <FlatList
          data={products}
          renderItem={({ item }) => <Item product={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput onChangeText={(text) => setName(text)} value={name} />
        <TouchableOpacity onPress={handleAdd}>
          <Text>add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnboard}>
          <Text>toggIsOnboard</Text>
        </TouchableOpacity>
        <Text>is onboard? {String(onBoard)}</Text>
        <TouchableOpacity onPress={handleIsLogin}>
          <Text>toggle is login</Text>
        </TouchableOpacity>
        <Text>Is login? {String(user)}</Text>
      </SafeAreaView>
    </ApiProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
