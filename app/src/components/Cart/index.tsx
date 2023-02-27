import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CarItem } from "../../types/CartItem";
import { ProductContainer,
        Item,
        Actions, 
        Image,
        QuantityContainer,
        ProductDetails,
        Summary,
        TotalContainer } from "./styles";
 import {Text} from "../Text";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { formatCurrency } from "../utils/formatCurrency";
import { Button } from "../Button";
import { Product } from "../../types/Product";
import { OrderConformedModal } from "../OrderConformedModal";
import { api } from "../../utils/api";


interface CartProps {
    cartItems: CarItem[];
    onAdd:  (product:Product) => void;
    onDecrement:(product:Product) => void;
    onConfimOrder:() => void;
    selectedTable: string;
}

export function Cart({cartItems, onAdd, onDecrement,onConfimOrder,selectedTable}:CartProps){
const [isLoading,setIsLoading] = useState(false)
const [isModalVisible,setIsModalVisible] = useState(false);

const total = cartItems.reduce((acc,cartItem) =>{
    return acc + cartItem.quantity * cartItem.product.price

},0);

async  function handleConfirmaOrder(){
    setIsLoading(true);
  const payload = {
    table:selectedTable,
    products:cartItems.map((cartItem) => ({
        product:cartItem.product._id,
        quantity:cartItem.quantity
    }))
  };


  await api.post('/orders',payload);

  setIsLoading(false);
  setIsModalVisible(true);
}

function  handleOk(){
    onConfimOrder();
    setIsModalVisible(false);
}



    return (
        <>
        <OrderConformedModal
        visible={isModalVisible}
        onOK={handleOk}
        />
        {cartItems.length > 0 && (
               <FlatList
                data={cartItems}
                keyExtractor={cartItem => cartItem.product._id}
                showsVerticalScrollIndicator={false}
                style={{marginBottom:20}}
                renderItem={({item:cartItem}) =>(
                   <Item>
                   <ProductContainer>
                       <Image 
                       source={{
                           uri:`http://192.168.0.119:3001/uploads/${cartItem.product.imagePath}`
                           }}/>
       
                       <QuantityContainer>
                       <Text size={14} >
                           {cartItem.quantity}x
                       </Text>
                   </QuantityContainer>
                   <ProductDetails>
                       <Text size={14} weight="600">{cartItem.product.name}</Text>
                       <Text size={14} color="#666" style={{marginTop:4}}>{cartItem.product.price}</Text>
                   </ProductDetails>
                   </ProductContainer>
       
                   <Actions>
                       <TouchableOpacity 
                       style={{marginRight:24}}
                       onPress ={() => onAdd(cartItem.product)}
                       >
                           <PlusCircle/>
                       </TouchableOpacity>
       
                       <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                           <MinusCircle/>
                       </TouchableOpacity>
                   </Actions>
                   </Item>
       
               )}
               />
            
        )}
     

        <Summary>
            <TotalContainer>
                {cartItems.length > 0 ? (
                <>
                <Text color="#666">Total</Text>
                <Text size={20} weight="600">{formatCurrency(total)}</Text>
                 </>
                ) : (
                <Text color="#999">Seu carrinho está vazio</Text>
                )}
            </TotalContainer>

            <Button 
            onPress={handleConfirmaOrder}
            disabled={cartItems.length === 0}
            >
                Confirmar pedido
            </Button>
        </Summary>
         </>
    );
}