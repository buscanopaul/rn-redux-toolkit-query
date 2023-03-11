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
import { productApi } from '../redux/api';
import { Data } from '../typings';

type Props = {};

const HomeScreen = (props: Props) => {
  const { data: products } = productApi.useGetAllQuery();
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

  useEffect(() => {}, [products]);

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
        <FlatList
          data={products}
          renderItem={({ item }) => <Item product={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <TextInput onChangeText={(text) => setName(text)} value={name} />
        <TouchableOpacity onPress={handleAdd}>
          <Text>add</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ApiProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
