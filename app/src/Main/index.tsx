import React, { useEffect, useState } from 'react';


import {Container, 
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContainer,
    CenteredContainer} from './styles';

import { Header } from "../components/Header";
import { Button } from '../components/Button';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { CarItem } from '../types/CartItem';
import { Categories } from '../components/Categories';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';


import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';

import { api } from '../utils/api';





export function Main(){
const [isTableModalVisible,setIsTableVisible]= useState(false);
const [selectedTable,setSelectedTable] = useState('');
const [cartItems,setCartItems] = useState<CarItem[]>([]);
const [isloading,setisloading] = useState(true);
const [categories,setCategories] = useState<Category[]>([]);
const [products,setProducts] = useState<Product[]>([]);
const [isLoadingProducts,setIsLoadingProducts] = useState(false)

 useEffect( () => {
 Promise.all([
 api.get('/categories'),
 api.get('/products'),
 ]).then(([categoriesResponse,productsResponse])=>{
 setCategories(categoriesResponse.data);
 setProducts(productsResponse.data);
 setisloading(false);
 });

 },[]);

 async function handleSelectCategory(categoryId:string){
     const route = !categoryId
     ? '/products'
     :`/categories/${categoryId}/products`;

     setIsLoadingProducts(true);

 
    const {data} = await api.get(route);
    
    setProducts(data);
    setIsLoadingProducts(false);

 }

function handleSaveTable(table:string) {
    setSelectedTable(table);
}

function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
}

function handleAddToCart(product:Product){
    if(!selectedTable){
        setIsTableVisible(true);
    }


    setCartItems((prevState)=>{
        const itemIndex = prevState.findIndex(
            cartItem => cartItem.product._id === product._id
            );

        if(itemIndex < 0) {
            return prevState.concat({
                quantity:1,
                product,
            });
        }

        const newCartItems = [...prevState];
        const item =newCartItems[itemIndex];
         
            newCartItems[itemIndex]={
                ...item,
                quantity: newCartItems[itemIndex].quantity + 1
            };
           
        return newCartItems;
    });
}

 
   function handleDecerementCartItem(product:Product){

     setCartItems((prevState) =>{
        const itemIdex = prevState.findIndex(
            cartItems => cartItems.product._id === product._id
        );
        const item = prevState[itemIdex];
        const newCartItems = [...prevState];

        if(item.quantity === 1){
            newCartItems.splice(itemIdex,1);
            return newCartItems;
        }

        newCartItems[itemIdex] = {
            ...item,
            quantity:item.quantity - 1,
        }
          return newCartItems;



        });
    }

   



    return(
        <>
        <Container>
        <Header 
        selectedTable={selectedTable}
        onCancelOrder={handleResetOrder}
        />
         {isloading ? (
            <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large"/>
            </CenteredContainer>
         ):(

        <>
        <CategoriesContainer>
         <Categories
         categories= {categories}
         onSelectCategory={handleSelectCategory}
         /> 
        </CategoriesContainer>

        {isLoadingProducts ? (
            <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large"/>
          </CenteredContainer>
        ):(
            <>
            {products.length > 0 ?(
                <MenuContainer>
                 <Menu 
                  onAddToCart={handleAddToCart}
                  products={products}
                />
                </MenuContainer>
             ):(
                <CenteredContainer>
                    <Empty/>
                <Text color="#666" style={{marginTop:24}}>Nenhum produto foi encontrado!</Text>
                </CenteredContainer>
             )}
             </>

        )}

         
        </>

        )}
       

        <Footer>
            <FooterContainer>
                {!selectedTable &&(
                <Button 
                onPress={() => setIsTableVisible(true)}
                disabled={isloading}
                >
                    Novo Pedido
                 </Button>
                )}

                {selectedTable && (
                    <Cart 
                    cartItems={cartItems}
                    onAdd={handleAddToCart}
                    onDecrement={handleDecerementCartItem}
                    onConfimOrder={handleResetOrder}
                    selectedTable={selectedTable}
                    />
                )}
            
            </FooterContainer>
        </Footer>
        <TableModal visible={isTableModalVisible}
         onClose={() =>setIsTableVisible(false)}
         onSave={handleSaveTable}
        />

        </Container>
        </>
    )
}